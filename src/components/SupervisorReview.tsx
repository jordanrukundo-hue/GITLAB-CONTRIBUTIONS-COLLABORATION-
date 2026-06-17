import { useState, useMemo } from 'react';
import { WeeklyLog, UserProfile } from '../types';
import { CheckCircle2, AlertOctagon, Star, MessageSquare, Clock, ShieldCheck, ChevronDown, ChevronUp, User } from 'lucide-react';

interface SupervisorReviewProps {
  supervisorProfile: UserProfile;
  weeklyLogs: WeeklyLog[];
  students: UserProfile[];
  onUpdateWeeklyLogs: (logs: WeeklyLog[]) => void;
  onUpdateStudents: (students: UserProfile[]) => void;
  onAddNotification: (title: string, message: string, type: 'info' | 'success' | 'warning' | 'error') => void;
}

export default function SupervisorReview({
  supervisorProfile,
  weeklyLogs,
  students,
  onUpdateWeeklyLogs,
  onUpdateStudents,
  onAddNotification
}: SupervisorReviewProps) {
  // Find all pending logs
  const pendingLogs = useMemo(() => {
    return weeklyLogs.filter(log => log.status === 'pending');
  }, [weeklyLogs]);

  // Find reviewed logs
  const reviewedLogs = useMemo(() => {
    return weeklyLogs.filter(log => log.status === 'approved' || log.status === 'rejected');
  }, [weeklyLogs]);

  // Active reviewing details states
  const [activeReviewId, setActiveReviewId] = useState<string | null>(
    pendingLogs.length > 0 ? pendingLogs[0].id : null
  );

  const [rating, setRating] = useState<number>(5);
  const [comments, setComments] = useState<string>('');
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [expandedLogId, setExpandedLogId] = useState<string | null>(null);

  // Active reviewing log details
  const activeLog = useMemo(() => {
    return weeklyLogs.find(log => log.id === activeReviewId);
  }, [weeklyLogs, activeReviewId]);

  // Active student being evaluated
  const activeStudentProfile = useMemo(() => {
    if (!activeLog) return null;
    return students.find(s => s.id === activeLog.studentId);
  }, [students, activeLog]);

  // Process rating & approval transition
  const handleApproveLog = () => {
    if (!activeReviewId || !activeLog) return;
    if (!comments.trim()) {
      alert('Please leave comments or coaching feedback to complete supervisor appraisal.');
      return;
    }

    // Prepare updated logbook parameters
    const updatedLog: WeeklyLog = {
      ...activeLog,
      status: 'approved',
      supervisorRating: rating,
      supervisorComments: comments,
      feedbackDate: new Date().toISOString().split('T')[0]
    };

    const newLogs = weeklyLogs.map(l => l.id === activeReviewId ? updatedLog : l);
    onUpdateWeeklyLogs(newLogs);

    // Update student's accumulated hours in state
    const targetStudent = students.find(s => s.id === activeLog.studentId);
    if (targetStudent) {
      // Re-sum approved hours
      const approvedStudentLogs = newLogs.filter(l => l.studentId === targetStudent.id && l.status === 'approved');
      const newTotalHours = approvedStudentLogs.reduce((sum, l) => sum + l.totalHours, 0);

      const updatedStudents = students.map(s => 
        s.id === targetStudent.id 
          ? { ...s, hoursWorked: newTotalHours, tasksCompleted: s.tasksCompleted + updatedLog.dailyLogs.filter(d => d.tasksCompleted).length }
          : s
      );
      onUpdateStudents(updatedStudents);
    }

    onAddNotification(
      'Logbook Approved ✓',
      `You approved ${activeLog.studentName}'s Week ${activeLog.weekNumber} logbook and rated it ${rating}.0/5.0 stars.`,
      'success'
    );

    // Clear and shift active review pointer
    const nextPending = pendingLogs.filter(l => l.id !== activeReviewId);
    setActiveReviewId(nextPending.length > 0 ? nextPending[0].id : null);
    setComments('');
    setRating(5);
  };

  // Reject / Request revision transition
  const handleRejectLog = () => {
    if (!activeReviewId || !activeLog) return;
    if (!comments.trim()) {
      alert('Please specify the reasons for requesting revision in the comments box.');
      return;
    }

    const updatedLog: WeeklyLog = {
      ...activeLog,
      status: 'rejected',
      supervisorComments: comments,
      feedbackDate: new Date().toISOString().split('T')[0]
    };

    const newLogs = weeklyLogs.map(l => l.id === activeReviewId ? updatedLog : l);
    onUpdateWeeklyLogs(newLogs);

    onAddNotification(
      'Revision Requested ⚠',
      `You marked ${activeLog.studentName}'s Week ${activeLog.weekNumber} logbook for restoration and revisions.`,
      'warning'
    );

    const nextPending = pendingLogs.filter(l => l.id !== activeReviewId);
    setActiveReviewId(nextPending.length > 0 ? nextPending[0].id : null);
    setComments('');
    setRating(5);
  };

  return (
    <div className="space-y-6">
      {/* Supervisor Header */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-full border border-blue-200 bg-slate-100 flex items-center justify-center text-slate-400 select-none shadow-3xs">
            <User className="w-6 h-6 stroke-[1.5]" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-base font-bold text-slate-800 font-sans">{supervisorProfile.name}</h2>
              <span className="text-[10px] bg-blue-50 border border-blue-100 text-blue-700 px-2.5 py-0.5 rounded-full font-bold uppercase font-mono tracking-wider">
                Industry Supervisor Clearance
              </span>
            </div>
            <p className="text-xs text-slate-400 font-sans mt-1">
              Affiliation: <span className="text-slate-600 font-semibold">{supervisorProfile.department} • National Software Development Center</span>
            </p>
          </div>
        </div>

        <div className="mt-4 md:mt-0 flex items-center space-x-2 bg-slate-50 border border-slate-205 px-4 py-2.5 rounded-xl font-mono text-xs">
          <ShieldCheck className="w-5 h-5 text-blue-500" />
          <span className="text-slate-600">Pending Actions Queue: <strong className="text-blue-605 font-bold">{pendingLogs.length} Logbooks</strong></span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pending Action queue listing */}
        <div className="space-y-4 lg:col-span-1">
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs">
            <h3 className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold mb-3.5">Review Action Queue</h3>
            
            {pendingLogs.length === 0 ? (
              <div className="text-center py-8 text-slate-400 border border-dashed border-slate-200 rounded-xl p-4 bg-slate-50/20">
                <CheckCircle2 className="w-8 h-8 mx-auto text-emerald-500 mb-2.5" />
                <p className="text-xs font-bold text-slate-800">Clear Inbox Queue!</p>
                <p className="text-[10px] text-slate-400 mt-1.5 leading-relaxed">All student weekly logs have been reviewed, graded, and countersigned.</p>
              </div>
            ) : (
              <div className="space-y-2">
                {pendingLogs.map((log) => {
                  const isActive = log.id === activeReviewId;
                  const profile = students.find(s => s.id === log.studentId);

                  return (
                    <button
                      key={log.id}
                      id={`btn-review-log-${log.id}`}
                      onClick={() => {
                        setActiveReviewId(log.id);
                        setComments('');
                        setRating(5);
                      }}
                      className={`w-full text-left p-3.5 rounded-xl border flex flex-col transition-all cursor-pointer ${
                        isActive
                          ? 'border-blue-600 bg-blue-50/40 text-blue-955 shadow-3xs'
                          : 'border-transparent hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex justify-between items-start w-full">
                        <span className="text-xs font-bold font-sans text-slate-800">{log.studentName}</span>
                        <span className="text-[9px] bg-blue-55 border border-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded-full font-mono">
                          Week {log.weekNumber}
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-400 font-mono mt-1.5 font-medium">Reg: G12-{profile?.studentNo.slice(-3)} • Hours: {log.totalHours}</p>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* History reviewed listing */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs">
            <h3 className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold mb-3.5">Recently Appraised Logs</h3>
            
            <div className="space-y-2">
              {reviewedLogs.map((log) => {
                const isExpanded = expandedLogId === log.id;
                
                return (
                  <div key={log.id} className="border border-slate-200 rounded-xl p-3.5 bg-slate-50/50 space-y-1.5 text-xs hover:border-slate-350 transition-colors">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-slate-750">{log.studentName} (W{log.weekNumber})</span>
                      <button 
                        onClick={() => setExpandedLogId(isExpanded ? null : log.id)}
                        className="text-slate-400 hover:text-slate-700 cursor-pointer"
                      >
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>
                    </div>
                    
                    <div className="flex justify-between items-center text-[10px] pt-1">
                      <span className={`font-mono text-[9px] font-bold px-2 py-0.5 border rounded-full ${
                        log.status === 'approved' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-rose-50 text-rose-700 border-rose-150'
                      }`}>
                        {log.status.toUpperCase()}
                      </span>
                      {log.status === 'approved' && (
                        <span className="text-amber-400 font-bold flex items-center text-[11px]">
                          {'★'.repeat(log.supervisorRating)}
                          {'☆'.repeat(5 - log.supervisorRating)}
                        </span>
                      )}
                    </div>

                    {isExpanded && log.supervisorComments && (
                      <div className="bg-white border border-slate-200 rounded-xl p-2.5 mt-2 shadow-4xs font-sans text-[11px] italic text-slate-500 leading-relaxed">
                        "{log.supervisorComments}"
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Reviewing Main Sheet */}
        <div className="lg:col-span-2">
          {activeLog ? (
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs space-y-6">
              <div className="border-b border-slate-100 pb-4 flex justify-between items-center gap-2">
                <div>
                  <span className="text-[10px] font-mono font-bold text-rose-705 bg-rose-50 border border-rose-105 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                    Module 4: Review Workflow Evaluation
                  </span>
                  <h3 className="text-[15px] font-bold text-slate-800 font-sans mt-2">Appraising: {activeLog.studentName} (Week {activeLog.weekNumber})</h3>
                </div>
                <span className="text-xs font-mono text-slate-400">Accrued: <strong className="text-blue-600 font-bold">{activeLog.totalHours} hrs</strong></span>
              </div>

              {/* Day logs break down on this reviewed logbook */}
              <div className="space-y-3.5">
                <h4 className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">Activity Logs Narrative</h4>
                
                {activeLog.dailyLogs.map(day => (
                  <div key={day.id} className="bg-slate-50 border border-slate-150 rounded-xl p-3.5 flex flex-col space-y-1.5">
                    <div className="flex justify-between text-xs">
                      <span className="font-bold text-slate-750">{day.day} ({day.date})</span>
                      <span className="font-mono text-slate-400 text-[10.5px] font-bold">{day.hoursWorked} hrs worked</span>
                    </div>
                    {day.tasksCompleted ? (
                      <>
                        <p className="text-xs text-slate-650 leading-relaxed">{day.tasksCompleted}</p>
                        <p className="text-[10.5px] font-mono text-blue-700 bg-blue-50/50 border border-blue-100/50 rounded-md px-1.5 py-0.5 w-fit mt-1">Acquired: {day.skillsAcquired}</p>
                      </>
                    ) : (
                      <p className="text-xs text-slate-400 italic">No activity logged for this day by the student.</p>
                    )}
                  </div>
                ))}
              </div>

              {/* Appraisal grading & action panels */}
              <div className="bg-blue-50/20 border border-blue-100 rounded-2xl p-5 space-y-5">
                <h4 className="text-xs font-bold text-slate-800 font-sans">Assign Industrial rating stars & feedback comments</h4>

                {/* Rating component */}
                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold mb-2">
                    Industrial Star Rating (Performance metrics appraisal)
                  </label>
                  <div className="flex items-center space-x-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        id={`btn-rating-star-${star}`}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(null)}
                        className="text-2xl transition-all hover:scale-110 cursor-pointer"
                      >
                        <span className={
                          (hoverRating !== null ? star <= hoverRating : star <= rating) 
                            ? 'text-amber-400 drop-shadow-2xs' 
                            : 'text-slate-200'
                        }>
                          ★
                        </span>
                      </button>
                    ))}
                    <span className="text-xs font-mono font-semibold text-slate-600 ml-2 bg-white px-2 py-1 rounded-lg border border-slate-150">
                      ({rating}.0 / 5.0) — {
                        rating === 5 ? 'Exceptional Execution' : rating === 4 ? 'Very Good Effort' : rating === 3 ? 'Meets expectation' : 'Needs revisions'
                      }
                    </span>
                  </div>
                </div>

                {/* Supervisor Coaching Feedback */}
                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold mb-1.5">
                    Industry Comments & Directives
                  </label>
                  <textarea
                    id="textarea-supervisor-comments"
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                    rows={3}
                    placeholder="Provide constructive feedback. e.g. Perfect work Jordan. Your attention to data models ensures the modularity of the system. Approved with high praise."
                    className="w-full bg-white border border-slate-350 rounded-xl p-2.5 text-xs focus:ring-1 focus:ring-blue-500 focus:outline-hidden"
                  />
                  <p className="text-[10px] text-slate-450 mt-1 font-mono">Leaves permanent remarks in student course record portfolios.</p>
                </div>

                {/* Action Buttons to trigger workflow changes */}
                <div className="flex items-center space-x-2.5 pt-2">
                  <button
                    id="btn-reject-work"
                    onClick={handleRejectLog}
                    className="flex-1 bg-white border border-rose-300 text-rose-600 hover:bg-rose-50 rounded-xl py-2.5 text-xs font-bold flex items-center justify-center space-x-1.5 transition-all cursor-pointer"
                  >
                    <AlertOctagon className="w-3.5 h-3.5" />
                    <span>Request Revision</span>
                  </button>

                  <button
                    id="btn-approve-work"
                    onClick={handleApproveLog}
                    className="flex-1 bg-emerald-600 text-white border border-emerald-700 hover:bg-emerald-700 font-bold rounded-xl py-2.5 text-xs shadow-2xs flex items-center justify-center space-x-1.5 transition-all cursor-pointer"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 animate-pulse" />
                    <span>Approve & Sign-Off</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white border border-slate-205 rounded-2xl p-10 text-center text-slate-400 flex flex-col justify-center items-center h-full min-h-[340px]">
              <ShieldCheck className="w-12 h-12 text-slate-300 mb-3.5 animate-bounce" />
              <p className="text-sm font-bold text-slate-700 font-sans">No active logbook selected for evaluation</p>
              <p className="text-xs text-slate-400 mt-1.5 max-w-xs leading-relaxed">Select a pending weekly log from the review queue side panel to run supervisor inspections.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
