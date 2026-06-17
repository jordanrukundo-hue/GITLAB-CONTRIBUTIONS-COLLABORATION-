import { useState, useMemo } from 'react';
import { UserProfile, AcademicEvaluation as EvaluationType, WeeklyLog } from '../types';
import { Award, Plus, Save, TrendingUp, CheckCircle, Sliders, ChevronRight } from 'lucide-react';

interface AcademicEvaluationProps {
  evaluations: EvaluationType[];
  students: UserProfile[];
  weeklyLogs: WeeklyLog[];
  onUpdateEvaluations: (evals: EvaluationType[]) => void;
  onAddNotification: (title: string, message: string, type: 'info' | 'success' | 'warning' | 'error') => void;
}

export default function AcademicEvaluation({
  evaluations,
  students,
  weeklyLogs,
  onUpdateEvaluations,
  onAddNotification
}: AcademicEvaluationProps) {
  const [selectedStudentId, setSelectedStudentId] = useState<string>(students[0]?.id || '');
  
  // Calculate default pre-computed averages based on log history to help evaluator
  const defaultLogMetrics = useMemo(() => {
    const studentLogs = weeklyLogs.filter(l => l.studentId === selectedStudentId);
    const approvedLogs = studentLogs.filter(l => l.status === 'approved');
    
    // Average rating
    const avgRating = approvedLogs.length > 0 
      ? approvedLogs.reduce((acc, l) => acc + l.supervisorRating, 0) / approvedLogs.length
      : 4.5; // fallback
    
    // 1. Calculate Field Supervisor Appraisals (out of 30 marks)
    // Rating 5 -> 30, Rating 4 -> 24, etc. (stars * 6)
    const fieldSupervisorScore = Math.round(avgRating * 6);

    // 2. Calculate Weekly Logbook Progress Score (out of 30 marks)
    // Logbook completeness: proportion of logs completed vs expected
    const logCompletenessScore = Math.round(Math.min(30, (studentLogs.length / 3) * 30));

    return {
      avgRating: parseFloat(avgRating.toFixed(1)),
      fieldSupervisorScore,
      logCompletenessScore,
      logsCount: studentLogs.length,
      approvedCount: approvedLogs.length
    };
  }, [weeklyLogs, selectedStudentId]);

  // Find existing evaluation or setup dynamic default values
  const currentEval = useMemo(() => {
    const existing = evaluations.find(e => e.studentId === selectedStudentId);
    if (existing) return existing;

    const studentProfile = students.find(s => s.id === selectedStudentId);
    
    const newEval: EvaluationType = {
      id: `eval-${selectedStudentId}`,
      studentId: selectedStudentId,
      studentName: studentProfile?.name || '',
      studentNo: studentProfile?.studentNo || '',
      fieldSupervisorScore: defaultLogMetrics.fieldSupervisorScore,
      weeklyLogbookScore: defaultLogMetrics.logCompletenessScore,
      academicReportScore: 35, // default starting presentation mark
      totalWeightedScore: defaultLogMetrics.fieldSupervisorScore + defaultLogMetrics.logCompletenessScore + 35,
      examinerName: 'Prof. Sserwadda Fred',
      comments: '',
      status: 'draft'
    };
    return newEval;
  }, [evaluations, selectedStudentId, students, defaultLogMetrics]);

  // Editing controllers state
  const [weeklyMark, setWeeklyMark] = useState<number>(currentEval.weeklyLogbookScore);
  const [supervisorMark, setSupervisorMark] = useState<number>(currentEval.fieldSupervisorScore);
  const [academicMark, setAcademicMark] = useState<number>(currentEval.academicReportScore);
  const [evalComments, setEvalComments] = useState<string>(currentEval.comments);
  const [evalExaminer, setEvalExaminer] = useState<string>(currentEval.examinerName);

  // Sync state whenever selected student changes
  useMemo(() => {
    setWeeklyMark(currentEval.weeklyLogbookScore);
    setSupervisorMark(currentEval.fieldSupervisorScore);
    setAcademicMark(currentEval.academicReportScore);
    setEvalComments(currentEval.comments);
    setEvalExaminer(currentEval.examinerName);
  }, [currentEval]);

  // Compute final aggregates dynamically
  const calculatedTotal = useMemo(() => {
    // Clamping to support type safety and limits
    const safeWeekly = Math.max(0, Math.min(30, weeklyMark));
    const safeSup = Math.max(0, Math.min(30, supervisorMark));
    const safeAcad = Math.max(0, Math.min(40, academicMark));
    return safeWeekly + safeSup + safeAcad;
  }, [weeklyMark, supervisorMark, academicMark]);

  // Dynamic Grade categorization mapping University divisions
  const gradeDivision = useMemo(() => {
    const total = calculatedTotal;
    if (total >= 80) return { name: 'First Class Degree Honours', code: 'A', color: 'text-emerald-700 bg-emerald-50 border-emerald-200' };
    if (total >= 70) return { name: 'Second Class Upper Division', code: 'B+', color: 'text-indigo-700 bg-indigo-50 border-indigo-200' };
    if (total >= 60) return { name: 'Second Class Lower Division', code: 'B', color: 'text-amber-700 bg-amber-50 border-amber-200' };
    if (total >= 50) return { name: 'Pass Course', code: 'C', color: 'text-gray-700 bg-gray-50 border-gray-200' };
    return { name: 'Unsatisfactory performance / Repeat', code: 'F', color: 'text-rose-700 bg-rose-50 border-rose-200' };
  }, [calculatedTotal]);

  // Save evaluations changes
  const handleSaveEvaluation = (isFinal: boolean) => {
    const freshEval: EvaluationType = {
      id: currentEval.id,
      studentId: selectedStudentId,
      studentName: currentEval.studentName,
      studentNo: currentEval.studentNo,
      weeklyLogbookScore: weeklyMark,
      fieldSupervisorScore: supervisorMark,
      academicReportScore: academicMark,
      totalWeightedScore: calculatedTotal,
      examinerName: evalExaminer,
      comments: evalComments,
      status: isFinal ? 'final' : 'draft',
      gradedDate: new Date().toISOString().split('T')[0]
    };

    const hasIndex = evaluations.findIndex(e => e.studentId === selectedStudentId);
    let updatedEvals = [...evaluations];
    if (hasIndex >= 0) {
      updatedEvals[hasIndex] = freshEval;
    } else {
      updatedEvals.push(freshEval);
    }

    onUpdateEvaluations(updatedEvals);
    onAddNotification(
      isFinal ? 'Academic Grade Finalized ✓' : 'Draft Evaluation Updated',
      `Weighted score of ${calculatedTotal}% saved for ${currentEval.studentName}.`,
      isFinal ? 'success' : 'info'
    );
  };

  return (
    <div className="space-y-6">
      {/* Dynamic Selector Header */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Student Selector sidebar panel */}
        <div className="lg:col-span-1 bg-white border border-slate-200 rounded-2xl p-4.5 shadow-2xs space-y-3">
          <h3 className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold mb-2.5">Academic Student Index</h3>
          
          <div className="space-y-1.55">
            {students.map((student) => {
              const studentEval = evaluations.find(e => e.studentId === student.id);
              const isActive = student.id === selectedStudentId;

              return (
                <button
                  key={student.id}
                  id={`btn-select-eval-student-${student.id}`}
                  onClick={() => setSelectedStudentId(student.id)}
                  className={`w-full text-left p-3.5 rounded-xl border flex flex-col transition-all cursor-pointer ${
                    isActive
                      ? 'border-blue-600 bg-blue-50/40 text-blue-950 shadow-3xs'
                      : 'border-transparent hover:bg-slate-50'
                  }`}
                >
                  <div className="flex justify-between items-center w-full">
                    <span className="text-xs font-bold font-sans text-slate-800">{student.name}</span>
                    <span className="text-[9px] font-mono text-slate-400">G12-{student.studentNo.slice(-3)}</span>
                  </div>
                  
                  {studentEval ? (
                    <div className="flex items-center justify-between text-[9px] text-slate-500 font-mono mt-2 w-full">
                      <span className="bg-emerald-50 border border-emerald-100 px-1.5 py-0.5 rounded-md text-emerald-800 font-bold">
                        {studentEval.totalWeightedScore}% Compiled
                      </span>
                      <span className="font-bold uppercase text-slate-700">Grade {studentEval.totalWeightedScore >= 80 ? 'A' : 'B+'}</span>
                    </div>
                  ) : (
                    <span className="text-[9px] text-rose-500 font-bold font-mono mt-2 flex items-center">
                      ● Grading Pending
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Academic Grading Slider Form */}
        <div className="lg:col-span-3 bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs space-y-6">
          <div className="border-b border-slate-100 pb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <span className="text-[10px] font-mono font-bold text-blue-700 bg-blue-50 border border-blue-100 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                Module 5 & 6: Score Compilation Room
              </span>
              <h2 className="text-lg font-bold text-slate-800 font-sans mt-2">
                Evaluate: {currentEval.studentName}
              </h2>
              <p className="text-xs text-slate-400 font-sans mt-1">
                ID: <span className="text-slate-600 font-mono">CSCG12-{currentEval.studentNo.slice(-3)}</span> • Placed at <span className="text-slate-600 font-medium">National Software Center</span>
              </p>
            </div>

            {/* Quick action indicator */}
            <div className={`px-3 py-1.5 rounded-xl border text-xs font-mono flex items-center space-x-1.5 ${currentEval.status === 'final' ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-blue-50 border-blue-200 text-blue-800'}`}>
              <CheckCircle className="w-4 h-4 text-blue-500" />
              <span className="font-bold uppercase tracking-wider">{currentEval.status === 'final' ? 'Final Signoff' : 'Draft Mode'}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Input Sliders section */}
            <div className="space-y-5">
              <h3 className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold flex items-center">
                <Sliders className="w-4 h-4 mr-1.5 text-slate-400" />
                University Exam Rubrics (Weighting)
              </h3>

              {/* Rubric 1 Weekly Logbooks Progress */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="font-bold text-slate-700">1. Weekly Logbook Logs Progress</span>
                  <span className="font-mono bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-lg font-bold text-blue-700">{weeklyMark} / 30 Marks</span>
                </div>
                <input
                  id="range-weekly-logbook"
                  type="range"
                  min="0"
                  max="30"
                  value={weeklyMark}
                  onChange={(e) => setWeeklyMark(parseInt(e.target.value))}
                  className="w-full accent-blue-600 h-1.5 rounded-lg cursor-pointer bg-slate-100"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                  <span>Student submitted logs counts and execution fidelity</span>
                  <span>Max: 30 Marks (30%)</span>
                </div>
              </div>

              {/* Rubric 2 Field Appraisal */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="font-bold text-slate-700">2. Field Supervisor Appraisal</span>
                  <span className="font-mono bg-purple-50 border border-purple-100 px-2 py-0.5 rounded-lg font-bold text-purple-700">{supervisorMark} / 30 Marks</span>
                </div>
                <input
                  id="range-supervisor-appraisal"
                  type="range"
                  min="0"
                  max="30"
                  value={supervisorMark}
                  onChange={(e) => setSupervisorMark(parseInt(e.target.value))}
                  className="w-full accent-purple-600 h-1.5 rounded-lg cursor-pointer bg-slate-100"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                  <span>Industry feedback ratings star (Appraisal Form)</span>
                  <span>Max: 30 Marks (30%)</span>
                </div>
              </div>

              {/* Rubric 3 Academic Presentation */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="font-bold text-slate-700">3. Board Presentation & Core Report</span>
                  <span className="font-mono bg-amber-50 border border-amber-100 px-2 py-0.5 rounded-lg font-bold text-amber-750">{academicMark} / 40 Marks</span>
                </div>
                <input
                  id="range-academic-report"
                  type="range"
                  min="0"
                  max="40"
                  value={academicMark}
                  onChange={(e) => setAcademicMark(parseInt(e.target.value))}
                  className="w-full accent-amber-500 h-1.5 rounded-lg cursor-pointer bg-slate-100"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                  <span>Oral defense representation & technical code quality</span>
                  <span>Max: 40 Marks (40%)</span>
                </div>
              </div>
            </div>

            {/* Calculations and Grades Display box */}
            <div className="border border-slate-250/70 rounded-2xl p-5 bg-slate-50/50 flex flex-col justify-between">
              <div>
                <h4 className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold mb-3">Dynamic Mark aggregation</h4>

                {/* Score Circular gauge */}
                <div className="flex flex-col items-center justify-center p-4 border border-slate-200 rounded-xl bg-white shadow-3xs space-y-1">
                  <span className="text-3xl font-extrabold text-blue-950 font-mono">{calculatedTotal}%</span>
                  <span className="text-[10px] font-sans text-slate-400 font-bold">Class Weighted Mark</span>
                  
                  <span className={`text-[9px] font-bold uppercase font-mono px-2.5 py-0.5 rounded-full border mt-2.5 ${gradeDivision.color}`}>
                    Award Value: {gradeDivision.code}
                  </span>
                </div>
                
                <p className="text-[10.5px] text-slate-400 font-sans mt-3 text-center">
                  University Division: <strong className="text-slate-700">{gradeDivision.name}</strong>
                </p>
              </div>

              <div className="space-y-2.5 pt-4 border-t border-slate-200 mt-4 text-[10.5px] font-mono text-slate-500">
                <div className="flex justify-between">
                  <span>Logbooks score contribution:</span>
                  <span className="text-slate-800 font-bold">{(weeklyMark / 30 * 30).toFixed(0)}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Supervisor review contribution:</span>
                  <span className="text-slate-800 font-bold">{(supervisorMark / 30 * 30).toFixed(0)}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Academic defense contribution:</span>
                  <span className="text-slate-800 font-bold">{(academicMark / 40 * 40).toFixed(0)}%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Remarks & Examiners signatures */}
          <div className="space-y-4 pt-4 border-t border-slate-100">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-1">
                <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold mb-1">
                  Responsible Examiner Name
                </label>
                <input
                  id="input-examiner-name"
                  type="text"
                  value={evalExaminer}
                  onChange={(e) => setEvalExaminer(e.target.value)}
                  className="w-full border border-slate-350 rounded-xl p-2.5 text-xs focus:ring-1 focus:ring-blue-500 focus:outline-hidden"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold mb-1">
                  Academic Board Verdict Remarks
                </label>
                <input
                  id="input-academic-verdict-remarks"
                  type="text"
                  value={evalComments}
                  onChange={(e) => setEvalComments(e.target.value)}
                  placeholder="Excellent system architecture. Solves the core logging parameters of weekly activities. Highly recommended."
                  className="w-full border border-slate-350 rounded-xl p-2.5 text-xs focus:ring-1 focus:ring-blue-500 focus:outline-hidden"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-2 pt-2">
              <button
                id="btn-save-draft-grade"
                onClick={() => handleSaveEvaluation(false)}
                className="border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-xl px-4 py-2.5 text-xs font-bold cursor-pointer"
              >
                Save Appraisal Draft
              </button>

              <button
                id="btn-finalize-grade"
                onClick={() => handleSaveEvaluation(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white border border-blue-700 rounded-xl px-4 py-2.5 text-xs font-bold flex items-center space-x-1.5 shadow-2xs cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Finalize & Publish Grades</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
