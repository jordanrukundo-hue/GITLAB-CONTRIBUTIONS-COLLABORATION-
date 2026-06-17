import React, { useState, useMemo } from 'react';
import { WeeklyLog, DayLog, UserProfile } from '../types';
import { Calendar, Plus, Save, Send, AlertTriangle, CheckCircle, Clock, MessageSquare, Star, User } from 'lucide-react';

interface WeeklyLogbooksProps {
  students: UserProfile[];
  currentStudentId: string;
  weeklyLogs: WeeklyLog[];
  onUpdateWeeklyLogs: (logs: WeeklyLog[]) => void;
  onAddNotification: (title: string, message: string, type: 'info' | 'success' | 'warning' | 'error') => void;
}

const DAYS_OF_WEEK: ('Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday')[] = [
  'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'
];

export default function WeeklyLogbooks({
  students,
  currentStudentId,
  weeklyLogs,
  onUpdateWeeklyLogs,
  onAddNotification
}: WeeklyLogbooksProps) {
  const [activeStudentId, setActiveStudentId] = useState<string>(currentStudentId || students[0]?.id || '');
  const [selectedWeek, setSelectedWeek] = useState<number>(3); // Default to Week 3 which is pending/editable

  // Filter logs for the active student
  const studentLogs = useMemo(() => {
    return weeklyLogs.filter(l => l.studentId === activeStudentId);
  }, [weeklyLogs, activeStudentId]);

  // Find the selected week's log or create a temporary skeleton
  const currentLog = useMemo(() => {
    const existing = studentLogs.find(l => l.weekNumber === selectedWeek);
    if (existing) return existing;

    // Build structural empty log for initialization
    const activeStudent = students.find(s => s.id === activeStudentId);
    const startOffset = (selectedWeek - 1) * 7;
    const dateStr = (offset: number) => {
      const d = new Date('2026-06-01');
      d.setDate(d.getDate() + startOffset + offset);
      return d.toISOString().split('T')[0];
    };

    const emptyLog: WeeklyLog = {
      id: `log-${activeStudentId}-w${selectedWeek}`,
      studentId: activeStudentId,
      studentName: activeStudent?.name || '',
      weekNumber: selectedWeek,
      startDate: dateStr(0),
      endDate: dateStr(4),
      totalHours: 0,
      status: 'draft',
      supervisorRating: 0,
      supervisorComments: '',
      dailyLogs: DAYS_OF_WEEK.map((day, idx) => ({
        id: `${activeStudentId}-w${selectedWeek}-d${idx + 1}`,
        day,
        date: dateStr(idx),
        tasksCompleted: '',
        skillsAcquired: '',
        hoursWorked: 0
      }))
    };
    return emptyLog;
  }, [studentLogs, selectedWeek, activeStudentId, students]);

  // Edit states for individual daily blocks
  const [editingDayIdx, setEditingDayIdx] = useState<number | null>(null);
  const [tasksText, setTasksText] = useState<string>('');
  const [skillsText, setSkillsText] = useState<string>('');
  const [hoursVal, setHoursVal] = useState<number>(8);

  const activeStudentProfile = useMemo(() => {
    return students.find(s => s.id === activeStudentId);
  }, [students, activeStudentId]);

  // Start editing a day log
  const handleEditDay = (index: number, dayLog: DayLog) => {
    setEditingDayIdx(index);
    setTasksText(dayLog.tasksCompleted);
    setSkillsText(dayLog.skillsAcquired);
    setHoursVal(dayLog.hoursWorked || 8);
  };

  // Save day log edits to active week buffer
  const handleSaveDayEdits = (index: number) => {
    if (!tasksText.trim()) return;

    const updatedDailyLogs = [...currentLog.dailyLogs];
    updatedDailyLogs[index] = {
      ...updatedDailyLogs[index],
      tasksCompleted: tasksText,
      skillsAcquired: skillsText,
      hoursWorked: hoursVal
    };

    // Calculate aggregated hours worked
    const newTotalHours = updatedDailyLogs.reduce((sum, d) => sum + d.hoursWorked, 0);

    const updatedLog: WeeklyLog = {
      ...currentLog,
      dailyLogs: updatedDailyLogs,
      totalHours: newTotalHours
    };

    // Check if we need to insert or update the list
    const logIndex = weeklyLogs.findIndex(l => l.studentId === activeStudentId && l.weekNumber === selectedWeek);
    let newWeeklyLogs = [...weeklyLogs];
    if (logIndex >= 0) {
      newWeeklyLogs[logIndex] = updatedLog;
    } else {
      newWeeklyLogs.push(updatedLog);
    }

    onUpdateWeeklyLogs(newWeeklyLogs);
    setEditingDayIdx(null);
    onAddNotification(
      'Daily Log Saved Locally',
      `Saved ${currentLog.dailyLogs[index].day} progress index. Total weekly logged: ${newTotalHours} hours.`,
      'success'
    );
  };

  // Submit weekly logbook to supervisor workflow review
  const handleSubmitWeek = () => {
    // Assert some work was logged
    const loggedDays = currentLog.dailyLogs.filter(d => d.tasksCompleted.trim().length > 0);
    if (loggedDays.length === 0) {
      alert('Please fill at least one day tasks before submitting weekly logbook review.');
      return;
    }

    const updatedLog: WeeklyLog = {
      ...currentLog,
      status: 'pending',
      submittedDate: new Date().toISOString().split('T')[0]
    };

    const logIndex = weeklyLogs.findIndex(l => l.studentId === activeStudentId && l.weekNumber === selectedWeek);
    let newWeeklyLogs = [...weeklyLogs];
    if (logIndex >= 0) {
      newWeeklyLogs[logIndex] = updatedLog;
    } else {
      newWeeklyLogs.push(updatedLog);
    }

    onUpdateWeeklyLogs(newWeeklyLogs);
    onAddNotification(
      'Logbook Submitted',
      `Week ${selectedWeek} logbook submitted successfully to Industry Supervisor ${activeStudentProfile?.organization}.`,
      'success'
    );
  };

  // Re-draft a rejected log
  const handleRecallToDraft = () => {
    const updatedLog: WeeklyLog = {
      ...currentLog,
      status: 'draft'
    };
    const logIndex = weeklyLogs.findIndex(l => l.studentId === activeStudentId && l.weekNumber === selectedWeek);
    let newWeeklyLogs = [...weeklyLogs];
    if (logIndex >= 0) {
      newWeeklyLogs[logIndex] = updatedLog;
      onUpdateWeeklyLogs(newWeeklyLogs);
      onAddNotification('Recall successful', `Week ${selectedWeek} log restored to draft mode.`, 'info');
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Sidebar Controls */}
      <div className="lg:col-span-1 space-y-4">
        {/* Student Profile Selector */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4.5 shadow-2xs">
          <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold mb-2.5">Intern Selection</label>
          <div className="space-y-1.5">
            {students.map((student) => (
              <button
                key={student.id}
                id={`btn-select-student-${student.id}`}
                onClick={() => {
                  setActiveStudentId(student.id);
                  setEditingDayIdx(null);
                }}
                className={`w-full text-left p-3 rounded-xl border transition-all duration-300 flex items-center space-x-3 ${
                  activeStudentId === student.id
                    ? 'border-blue-600 bg-blue-50/50 text-blue-900 shadow-3xs'
                    : 'border-transparent hover:bg-slate-50 text-slate-700'
                }`}
              >
                <div className="w-8 h-8 rounded-full border border-slate-200 bg-slate-100 flex items-center justify-center text-slate-400 shrink-0 select-none">
                  <User className="w-4 h-4 stroke-[1.5]" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold truncate font-sans">{student.name}</p>
                  <span className="text-[9px] font-mono font-medium text-slate-500">
                    ID: CSCG12-{student.studentNo.slice(-3)}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Week Selector Grid */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4.5 shadow-2xs">
          <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold mb-3">Academic Log Weeks</label>
          <div className="grid grid-cols-3 gap-2">
            {[1, 2, 3].map((week) => {
              const weekLog = studentLogs.find(l => l.weekNumber === week);
              const statusColors = {
                approved: 'bg-emerald-50/80 text-emerald-800 border-emerald-200',
                pending: 'bg-blue-50/80 text-blue-800 border-blue-200',
                rejected: 'bg-rose-50/80 text-rose-800 border-rose-200',
                draft: 'bg-slate-100 text-slate-600 border-slate-200'
              };
              const activeBorder = selectedWeek === week ? 'ring-2 ring-blue-500' : '';

              return (
                <button
                  key={week}
                  id={`btn-week-${week}`}
                  onClick={() => {
                    setSelectedWeek(week);
                    setEditingDayIdx(null);
                  }}
                  className={`border font-sans p-2 rounded-xl flex flex-col items-center justify-center transition-all ${
                    statusColors[weekLog?.status || 'draft']
                  } ${activeBorder}`}
                >
                  <span className="text-xs font-bold font-sans">W{week}</span>
                  <span className="text-[8px] opacity-75 font-mono uppercase tracking-wider mt-1">{weekLog?.status || 'empty'}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Badge Identifiers Display */}
        {activeStudentProfile && (
          <div className="bg-white border border-slate-200 rounded-2xl p-4.5 shadow-2xs flex flex-col justify-between">
            <h5 className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold mb-2.5">Identifier Badge Identifier</h5>
            <div className={`p-4 rounded-xl border ${activeStudentProfile.badgeBg} flex flex-col items-center justify-center text-center`}>
              <div className="w-12 h-12 rounded-full overflow-hidden mb-2.5 border border-slate-200 shadow-3xs bg-slate-100 flex items-center justify-center text-slate-400 select-none">
                <User className="w-6 h-6 stroke-[1.5]" />
              </div>
              <h6 className="text-xs font-bold font-sans text-slate-800">{activeStudentProfile.name}</h6>
              <span className="text-[9px] font-mono text-slate-500 mt-1">CSCG12-{activeStudentProfile.studentNo.slice(-3)}</span>
              <span className="text-[9px] font-bold uppercase tracking-wider px-2.5 py-0.5 mt-2 bg-white border border-slate-200 rounded-full shadow-3xs text-slate-700">
                {activeStudentProfile.badgeText}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Main Form Working Panel (Vistual Logging & Submissions) */}
      <div className="lg:col-span-3 space-y-4">
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 pb-4 mb-5">
            <div>
              <span className="text-[10px] font-mono font-bold text-blue-700 bg-blue-50 border border-blue-100 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                Module 3: Logbook Workspace
              </span>
              <h2 className="text-lg font-bold text-slate-800 font-sans mt-2">
                Weekly Implementation Diary — Week {selectedWeek}
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Duration: <strong className="text-slate-600 font-mono">{currentLog.startDate}</strong> to <strong className="text-slate-600 font-mono">{currentLog.endDate}</strong>
              </p>
            </div>

            <div className="mt-3 sm:mt-0 flex items-center space-x-2">
              {/* Status Indicator */}
              <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border text-xs font-mono">
                {currentLog.status === 'approved' && (
                  <>
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                    <span className="text-emerald-700 font-bold uppercase tracking-wider">Approved</span>
                  </>
                )}
                {currentLog.status === 'pending' && (
                  <>
                    <Clock className="w-4 h-4 text-blue-500 animate-pulse" />
                    <span className="text-blue-700 font-bold uppercase tracking-wider">Pending Review</span>
                  </>
                )}
                {currentLog.status === 'rejected' && (
                  <>
                    <AlertTriangle className="w-4 h-4 text-rose-500" />
                    <span className="text-rose-700 font-bold uppercase tracking-wider">Rejected & Revision</span>
                  </>
                )}
                {currentLog.status === 'draft' && (
                  <>
                    <Clock className="w-4 h-4 text-slate-400" />
                    <span className="text-slate-600 font-bold uppercase tracking-wider">Draft Mode</span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Supervisor Feedback Bar */}
          {(currentLog.status === 'approved' || currentLog.status === 'rejected') && currentLog.supervisorComments && (
            <div className={`p-4 rounded-xl border mb-6 flex items-start space-x-3 shadow-2xs ${
              currentLog.status === 'approved' ? 'bg-emerald-50/50 border-emerald-150' : 'bg-rose-50/50 border-rose-150'
            }`}>
              <MessageSquare className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                currentLog.status === 'approved' ? 'text-emerald-500' : 'text-rose-500'
              }`} />
              <div>
                <p className="text-xs font-bold text-slate-800">Industry Supervisor Review Feedback</p>
                {currentLog.status === 'approved' && (
                  <div className="flex items-center space-x-1 text-amber-400 my-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className={`w-3.5 h-3.5 ${star <= currentLog.supervisorRating ? 'fill-amber-400' : 'text-gray-200'}`} />
                    ))}
                    <span className="text-xs font-mono font-medium text-slate-500 ml-1">({currentLog.supervisorRating}.0 / 5.0)</span>
                  </div>
                )}
                <blockquote className="text-xs text-slate-600 italic font-serif mt-1">
                  "{currentLog.supervisorComments}"
                </blockquote>
                {currentLog.feedbackDate && (
                  <span className="text-[10px] text-slate-400 font-mono block mt-1">Appraised on {currentLog.feedbackDate}</span>
                )}
              </div>
            </div>
          )}

          {/* Daily Logs Timeline Table */}
          <div className="space-y-4">
            {currentLog.dailyLogs.map((dayLog, idx) => {
              const isEditing = editingDayIdx === idx;
              const hasContent = dayLog.tasksCompleted.trim().length > 0;
              const canEdit = currentLog.status === 'draft' || currentLog.status === 'rejected';

              return (
                <div 
                  key={dayLog.id} 
                  id={`day-block-${dayLog.day.toLowerCase()}`}
                  className={`border rounded-2xl p-5 transition-all ${
                    isEditing 
                      ? 'border-blue-300 bg-blue-50/10 shadow-xs' 
                      : hasContent 
                        ? 'border-slate-200 hover:border-slate-350 bg-white shadow-3xs' 
                        : 'border-dashed border-slate-200 bg-slate-50/30'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-bold text-slate-800 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-lg font-sans">
                        {dayLog.day}
                      </span>
                      <span className="text-[11px] text-slate-400 font-mono">{dayLog.date}</span>
                    </div>

                    {!isEditing && canEdit && (
                      <button
                        id={`btn-edit-day-${dayLog.day}`}
                        onClick={() => handleEditDay(idx, dayLog)}
                        className="text-xs text-blue-600 font-bold hover:text-blue-800 font-sans flex items-center cursor-pointer"
                      >
                        {hasContent ? 'Edit Task' : 'Log Day Activity ✓'}
                      </button>
                    )}
                  </div>

                  {isEditing ? (
                    /* Day Edit Controls form */
                    <div className="space-y-3 mt-3">
                      <div>
                        <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold mb-1">Tasks Completed (What projects/code did you build today?)</label>
                        <textarea
                          id={`textarea-tasks-${dayLog.day}`}
                          value={tasksText}
                          onChange={(e) => setTasksText(e.target.value)}
                          placeholder="e.g. Created types schemas for data integrity inside src/types.ts and wrote custom unit test assertions..."
                          rows={2}
                          className="w-full border border-slate-350 rounded-xl p-3 text-xs focus:ring-1 focus:ring-blue-500 focus:outline-hidden"
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold mb-1">Skills Acquired / Technologies used</label>
                          <input
                            id={`input-skills-${dayLog.day}`}
                            type="text"
                            value={skillsText}
                            onChange={(e) => setSkillsText(e.target.value)}
                            placeholder="e.g. TypeScript modules, Vite bundle compiler"
                            className="w-full border border-slate-350 rounded-xl p-2.5 text-xs focus:ring-1 focus:ring-blue-500 focus:outline-hidden"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold mb-1">Hours Worked Today</label>
                          <select
                            id={`select-hours-${dayLog.day}`}
                            value={hoursVal}
                            onChange={(e) => setHoursVal(parseInt(e.target.value))}
                            className="w-full border border-slate-350 rounded-xl p-2.5 text-xs focus:ring-1 focus:ring-blue-500 focus:outline-hidden"
                          >
                            {[4, 5, 6, 7, 8, 9, 10].map(h => (
                              <option key={h} value={h}>{h} hours worked</option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="flex justify-end space-x-2 pt-1">
                        <button
                          id={`btn-cancel-edit-${dayLog.day}`}
                          onClick={() => setEditingDayIdx(null)}
                          className="border border-slate-350 rounded-xl px-4 py-2 text-xs text-slate-600 hover:bg-slate-50 cursor-pointer"
                        >
                          Cancel
                        </button>
                        <button
                          id={`btn-save-day-${dayLog.day}`}
                          onClick={() => handleSaveDayEdits(idx)}
                          className="bg-emerald-600 text-white rounded-xl px-4 py-2 text-xs font-bold hover:bg-emerald-700 flex items-center space-x-1 cursor-pointer"
                        >
                          <Save className="w-3.5 h-3.5" />
                          <span>Save Day Logs</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    /* Day Display layout */
                    <div className="space-y-1.5">
                      {hasContent ? (
                        <>
                          <p className="text-xs text-slate-700 font-sans leading-relaxed">
                            {dayLog.tasksCompleted}
                          </p>
                          <div className="flex flex-wrap items-center gap-2 pt-2 text-[10px] font-mono text-slate-400">
                            <span className="bg-blue-50 text-blue-700 px-2.5 py-0.5 rounded border border-blue-100">
                              Tech: {dayLog.skillsAcquired}
                            </span>
                            <span className="bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded border border-slate-200">
                              Workload: <strong className="text-slate-800">{dayLog.hoursWorked} hrs</strong>
                            </span>
                          </div>
                        </>
                      ) : (
                        <p className="text-xs text-slate-400 italic">
                          No tasks have been logged for this day. Click 'Log Day Activity' to document your work.
                        </p>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Action Footer */}
          <div className="border-t border-slate-100 pt-5 mt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-xs text-slate-500 font-mono text-center sm:text-left">
              Weekly Totals Compiled: <strong className="text-slate-800">{currentLog.totalHours} hrs</strong> / 40 hrs required workload.
            </div>

            <div className="flex items-center space-x-2 w-full sm:w-auto justify-end">
              {currentLog.status === 'rejected' && (
                <button
                  id="btn-recall-draft"
                  onClick={handleRecallToDraft}
                  className="w-full sm:w-auto border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-xl px-4 py-2.5 text-xs font-semibold cursor-pointer"
                >
                  Recall to Draft mode
                </button>
              )}
              {currentLog.status === 'draft' || currentLog.status === 'rejected' ? (
                <button
                  id="btn-submit-week"
                  onClick={handleSubmitWeek}
                  className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-4 py-2.5 text-xs font-bold flex items-center justify-center space-x-1.5 shadow-2xs cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Week {selectedWeek} logs to Industrial Review</span>
                </button>
              ) : (
                <span className="text-xs font-mono text-slate-400 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                  Logs submitted. Modifications locked during administrative reviews.
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
