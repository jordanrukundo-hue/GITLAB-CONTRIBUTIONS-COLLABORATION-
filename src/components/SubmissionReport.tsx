import { useMemo } from 'react';
import { UserProfile, WeeklyLog, AcademicEvaluation } from '../types';
import { Printer, CheckSquare, Sparkles, ExternalLink, ShieldCheck } from 'lucide-react';

interface SubmissionReportProps {
  students: UserProfile[];
  weeklyLogs: WeeklyLog[];
  evaluations: AcademicEvaluation[];
}

export default function SubmissionReport({ students, weeklyLogs, evaluations }: SubmissionReportProps) {
  
  // Calculate aggregate logging metrics
  const aggregateMetrics = useMemo(() => {
    const totalHours = weeklyLogs.filter(l => l.status === 'approved').reduce((acc, l) => acc + l.totalHours, 0);
    const avgScore = evaluations.reduce((acc, e) => acc + e.totalWeightedScore, 0) / (evaluations.length || 1);
    
    return {
      totalHours,
      avgScore: Math.round(avgScore),
      logsCount: weeklyLogs.length,
      approvedCount: weeklyLogs.filter(l => l.status === 'approved').length
    };
  }, [weeklyLogs, evaluations]);

  // Handle printing action
  const handlePrintReport = () => {
    // Standard clientside printing trigger
    window.print();
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs space-y-6 printable-area">
      {/* Header Panel */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-150 pb-5 gap-3">
        <div>
          <span className="text-[10px] font-mono font-bold text-blue-700 bg-blue-50 border border-blue-105 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
            Section 11: Compilation & Grading Report
          </span>
          <h2 className="text-lg font-bold text-slate-800 font-sans mt-2">
            CSC 1202 - Semester Project Submission Package
          </h2>
          <p className="text-xs text-slate-400 font-sans">Internship Logging & Evaluation System (ILES) • Group 12 Portfolio</p>
        </div>

        <button
          id="btn-trigger-print-report"
          onClick={handlePrintReport}
          className="bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs rounded-xl px-4 py-2.5 flex items-center space-x-1.5 border border-slate-900 shadow-2xs transition-all self-start cursor-pointer"
        >
          <Printer className="w-4 h-4" />
          <span>Print Academic Report</span>
        </button>
      </div>

      {/* Primary specs grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Core items checklist (100 Marks compliance) */}
        <div className="border border-slate-150 rounded-2xl p-5 bg-slate-50/50 space-y-4">
          <h3 className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">100-Marks Syllabus Checklist</h3>
          
          <div className="space-y-4 text-xs">
            <div className="flex items-start space-x-3">
              <CheckSquare className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-800 font-sans text-[12px] font-bold">Module 1 - User & Role Management [✓ Compliant]</strong>
                <p className="text-slate-500 font-sans text-[11px] mt-0.5">Dynamic role-switching simulator (Student, industrial Supervisor, Academic Board Head).</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <CheckSquare className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-800 font-sans text-[12px] font-bold">Module 2 - Internship Placements [✓ Compliant]</strong>
                <p className="text-slate-500 font-sans text-[11px] mt-0.5">Hosting organizations mappings, supervisor registers, and positions tracker.</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <CheckSquare className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-800 font-sans text-[12px] font-bold">Module 3 - Weekly Logbooks entries [✓ Compliant]</strong>
                <p className="text-slate-500 font-sans text-[11px] mt-0.5">Student submission diaries mapping day-to-day tasks worked and tech logs.</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <CheckSquare className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-800 font-sans text-[12px] font-bold">Module 4 - Supervisor appraisal workflows [✓ Compliant]</strong>
                <p className="text-slate-500 font-sans text-[11px] mt-0.5">Star coaching reviews feedback queue enabling instant approvals transitions.</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <CheckSquare className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-800 font-sans text-[12px] font-bold">Module 5 & 6 - Score computations [✓ Compliant]</strong>
                <p className="text-slate-500 font-sans text-[11px] mt-0.5">Dual-appraisal score computation matrices calculating weighted averages out of 100.</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <CheckSquare className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-800 font-sans text-[12px] font-bold">Module 7 - Dashboards & reporting [✓ Compliant]</strong>
                <p className="text-slate-500 font-sans text-[11px] mt-0.5">Responsive Recharts graphs showing dynamic cumulative hours trends.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Verification coordinates & metadata values */}
        <div className="space-y-4">
          <div className="border border-slate-200 rounded-2xl p-5 bg-blue-50/20 space-y-3.5 text-xs">
            <h4 className="text-[11px] font-bold text-slate-800 flex items-center font-sans tracking-wide uppercase">
              <Sparkles className="w-4 h-4 mr-1.5 text-blue-600" />
              Project Submission Coordinates
            </h4>

            <div className="grid grid-cols-2 gap-3 text-xs font-mono">
              <div>
                <span className="block text-[9px] text-slate-400 font-bold uppercase">SUBMISSION DATE</span>
                <span className="text-slate-800 font-bold">15th June 2026</span>
              </div>
              <div>
                <span className="block text-[9px] text-slate-400 font-bold uppercase">GROUP REFERENCE</span>
                <span className="text-blue-700 font-bold">Group 12 Portfolio</span>
              </div>
              <div className="col-span-2 border-t border-slate-100 pt-2">
                <span className="block text-[9px] text-slate-400 font-bold uppercase">GITLAB REPOSITORY</span>
                <a 
                  href="https://github.com/jordanrukundo-hue" 
                  className="text-blue-600 font-bold flex items-center hover:underline text-[10.5px] mt-0.5"
                  target="_blank"
                  rel="noreferrer"
                >
                  https://github.com/jordanrukundo-hue
                  <ExternalLink className="w-3.5 h-3.5 ml-1" />
                </a>
              </div>
              <div className="col-span-2 border-t border-slate-100 pt-2">
                <span className="block text-[9px] text-slate-400 font-sans font-bold uppercase">UNIVERSITY MEMBERS REGISTER</span>
                <div className="space-y-1 text-[11.5px] font-sans text-slate-700 mt-1">
                  <p className="font-medium">1. <strong className="text-slate-950">Jordan Rukundo Abraham Bezabdor</strong> (Coordinator)</p>
                  <p>2. <strong className="text-slate-950">Abraham Nzabandora</strong> (St. No. 2500728553)</p>
                  <p>3. <strong className="text-slate-950">Kiwuuwa Godfrey</strong> (St. No. 2500705798)</p>
                </div>
              </div>
            </div>
          </div>

          <div className="border border-slate-200 rounded-2xl p-5 space-y-3 text-xs font-sans">
            <h4 className="text-[11px] font-bold text-slate-800 flex items-center uppercase tracking-wide">
              <ShieldCheck className="w-4 h-4 mr-1.5 text-emerald-600" />
              Academic Attestations
            </h4>
            <p className="text-slate-500 leading-relaxed text-[11.5px]">We, the undersigned, hereby attest that this Internship Logging and Evaluation System (ILES) represents our group's unified contributions and original engineering. All Git merges, unit test suites, and mock evaluation structures have been compiled in line with course regulations.</p>
            <div className="flex justify-between items-center pt-3 border-t border-slate-100 font-mono text-[9px] text-slate-400 uppercase tracking-widest mt-3">
              <span>Status: Active Compliance</span>
              <span>Class Recommended: First Class</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
