import { useState } from 'react';
import { Database, Image, Network, FileCode, CheckCircle2, ChevronRight } from 'lucide-react';

export default function TechnicalDesign() {
  const [activeDiagram, setActiveDiagram] = useState<'erd' | 'arch' | 'workflow'>('erd');

  return (
    <div className="space-y-6">
      {/* Design Header */}
      <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3">
          <div>
            <span className="text-[10px] font-mono font-bold text-blue-700 bg-blue-50 border border-blue-100 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              Module 9: Technical Design Evidence
            </span>
            <h2 className="text-lg font-bold text-slate-800 font-sans mt-2">Entity-Relation Mappings & System Blueprints</h2>
            <p className="text-xs text-slate-400 font-sans">Vector blueprints representing relational tables constraints, structures, data flows</p>
          </div>
          
          <div className="flex bg-slate-100 rounded-xl p-1 text-xs gap-1 self-start font-sans">
            <button
              id="btn-switch-erd"
              onClick={() => setActiveDiagram('erd')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                activeDiagram === 'erd' ? 'bg-white text-slate-800 shadow-3xs' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              Logical ERD
            </button>
            <button
              id="btn-switch-arch"
              onClick={() => setActiveDiagram('arch')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                activeDiagram === 'arch' ? 'bg-white text-slate-800 shadow-3xs' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              System Architecture
            </button>
            <button
              id="btn-switch-workflow"
              onClick={() => setActiveDiagram('workflow')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                activeDiagram === 'workflow' ? 'bg-white text-slate-800 shadow-3xs' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              Logbook Workflow
            </button>
          </div>
        </div>
      </div>

      {/* Diagram Canvas Container */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs">
        {activeDiagram === 'erd' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3.5">
              <div>
                <h3 className="text-sm font-semibold text-slate-800">Logical Entity Relationship Diagram (ERD)</h3>
                <p className="text-xs text-slate-400 font-sans">3NF Normalization mapping student indices, placements, weekly logs and evaluations relational matrices</p>
              </div>
              <span className="text-xs font-mono text-blue-700 bg-blue-50 border border-blue-100 px-2 py-1 rounded">Relational Schema verified</span>
            </div>

            {/* Custom Responsive SVG-based ERD */}
            <div className="bg-slate-950 rounded-2xl p-4 overflow-x-auto border border-slate-900 shadow-inner flex items-center justify-center">
              <svg viewBox="0 0 850 420" className="w-full max-w-4xl text-white font-mono text-[10px] select-none" fill="none" stroke="currentColor">
                
                {/* --- Table 1: USERS --- */}
                <g id="table-users" stroke="#3b82f6" strokeWidth="1.5">
                  <rect x="20" y="20" width="180" height="150" rx="8" fill="#0f172a" />
                  <line x1="20" y1="50" x2="200" y2="50" stroke="#3b82f6" />
                  <text x="35" y="40" fill="#93c5fd" fontWeight="bold">USERS (Table)</text>
                  <text x="35" y="70" fill="#e2e8f0" fontWeight="bold">pk_user_id [VARCHAR]</text>
                  <text x="35" y="90" fill="#94a3b8">name [VARCHAR]</text>
                  <text x="35" y="110" fill="#94a3b8">email [VARCHAR]</text>
                  <text x="35" y="130" fill="#94a3b8">role [VARCHAR]</text>
                  <text x="35" y="150" fill="#94a3b8">studentNo [VARCHAR]</text>
                </g>

                {/* --- Table 2: PLACEMENTS --- */}
                <g id="table-placements" stroke="#3b82f6" strokeWidth="1.5">
                  <rect x="250" y="20" width="200" height="150" rx="8" fill="#0f172a" />
                  <line x1="250" y1="50" x2="450" y2="50" stroke="#3b82f6" />
                  <text x="265" y="40" fill="#93c5fd" fontWeight="bold">PLACEMENTS (Table)</text>
                  <text x="265" y="70" fill="#e2e8f0" fontWeight="bold">pk_placement_id [VARCHAR]</text>
                  <text x="265" y="90" fill="#93c5fd">fk_student_id [VARCHAR]</text>
                  <text x="265" y="110" fill="#94a3b8">companyName [VARCHAR]</text>
                  <text x="265" y="130" fill="#94a3b8">supervisorName [VARCHAR]</text>
                  <text x="265" y="150" fill="#94a3b8">position [VARCHAR]</text>
                </g>

                {/* --- Table 3: WEEKLY_LOGS --- */}
                <g id="table-weekly-logs" stroke="#10b981" strokeWidth="1.5">
                  <rect x="250" y="220" width="200" height="170" rx="8" fill="#0f172a" />
                  <line x1="250" y1="250" x2="450" y2="250" stroke="#10b981" />
                  <text x="265" y="240" fill="#6ee7b7" fontWeight="bold">WEEKLY_LOGS (Table)</text>
                  <text x="265" y="270" fill="#e2e8f0" fontWeight="bold">pk_weekly_log_id [VARCHAR]</text>
                  <text x="265" y="290" fill="#6ee7b7">fk_student_id [VARCHAR]</text>
                  <text x="265" y="310" fill="#94a3b8">weekNumber [INT]</text>
                  <text x="265" y="330" fill="#94a3b8">totalHours [INT]</text>
                  <text x="265" y="350" fill="#94a3b8">supervisorComments [TEXT]</text>
                  <text x="265" y="370" fill="#94a3b8">status [VARCHAR]</text>
                </g>

                {/* --- Table 4: DAILY_LOGS --- */}
                <g id="table-daily-logs" stroke="#f59e0b" strokeWidth="1.5">
                  <rect x="550" y="220" width="180" height="150" rx="8" fill="#0f172a" />
                  <line x1="550" y1="250" x2="730" y2="250" stroke="#f59e0b" />
                  <text x="565" y="240" fill="#fde68a" fontWeight="bold">DAILY_LOGS (Table)</text>
                  <text x="565" y="270" fill="#e2e8f0" fontWeight="bold">pk_day_log_id [VARCHAR]</text>
                  <text x="565" y="290" fill="#fde68a">fk_weekly_log_id [VARCHAR]</text>
                  <text x="565" y="310" fill="#94a3b8">dayName [VARCHAR]</text>
                  <text x="565" y="330" fill="#94a3b8">tasksCompleted [TEXT]</text>
                  <text x="565" y="350" fill="#94a3b8">hoursWorked [INT]</text>
                </g>

                {/* --- Table 5: EVALUATIONS --- */}
                <g id="table-evaluations" stroke="#ec4899" strokeWidth="1.5">
                  <rect x="520" y="20" width="200" height="150" rx="8" fill="#0f172a" />
                  <line x1="520" y1="50" x2="720" y2="50" stroke="#ec4899" />
                  <text x="535" y="40" fill="#fbcfe8" fontWeight="bold">EVALUATIONS (Table)</text>
                  <text x="535" y="70" fill="#e2e8f0" fontWeight="bold">pk_eval_id [VARCHAR]</text>
                  <text x="535" y="90" fill="#fbcfe8">fk_student_id [VARCHAR]</text>
                  <text x="535" y="110" fill="#94a3b8">weeklyLogbookScore [INT]</text>
                  <text x="535" y="130" fill="#94a3b8">fieldSupervisorScore [INT]</text>
                  <text x="535" y="150" fill="#94a3b8">totalWeightedScore [INT]</text>
                </g>

                {/* --- Relational Connector Lines --- */}
                {/* Users to Placements (1 to 1) */}
                <path d="M 200 95 L 250 95" stroke="#60a5fa" strokeWidth="1.5" strokeDasharray="3 3"/>
                {/* Users to WeeklyLogs (1 to Many) */}
                <path d="M 110 170 L 110 305 L 250 305" stroke="#60a5fa" strokeWidth="1.5" />
                {/* Users to Evaluations (1 to 1) */}
                <path d="M 110 170 L 110 195 L 490 195 L 490 95 L 520 95" stroke="#f472b6" strokeWidth="1.5" strokeDasharray="3 3" />
                {/* Weekly_Logs to Daily_Logs (1 to Many) */}
                <path d="M 450 305 L 550 305" stroke="#34d399" strokeWidth="1.5"/>
              </svg>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-500 leading-relaxed mt-2 font-sans">
              <p>The **Logical ERD Blueprint** represents database tables with complete constraints and relationship keys normalization. All student profile registrations are mapped onto academic and industrial indices in keeping with professional schema rules.</p>
              <p>Our structures store individual Day records pointing directly to Weekly logsheets records (<strong className="text-slate-800">1 to Many link</strong>) to optimize calculations runtime and preserve audit histories during final presentations appraisals.</p>
            </div>
          </div>
        )}

        {activeDiagram === 'arch' && (
          <div className="space-y-5">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3.5">
              <div>
                <h3 className="text-sm font-semibold text-slate-800 font-sans">System Architecture & Communications</h3>
                <p className="text-xs text-slate-400 font-sans">Deployment blueprint charting React-Vite static compilation, offline storage synch, and gateway gateways</p>
              </div>
              <span className="text-xs font-mono text-blue-700 bg-blue-50 border border-blue-100 px-2.5 py-0.5 rounded font-bold">Standard Flow diagram</span>
            </div>

            {/* Custom styled list representation of architectures */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="border border-slate-150 p-5 rounded-2xl space-y-3 bg-slate-50/50">
                <div className="p-2.5 bg-blue-50 text-blue-750 w-10 h-10 rounded-xl flex items-center justify-center">
                  <FileCode className="w-5 h-5" />
                </div>
                <h4 className="text-xs font-bold text-slate-800 font-sans font-bold">1. SPA Core Layer (React)</h4>
                <p className="text-[11px] text-slate-500 leading-relaxed font-sans">Runs completely clientside inside browser environments. Handles view assemblies, dashboards rendering, score computation slides, and report layouts generation.</p>
              </div>

              <div className="border border-slate-150 p-5 rounded-2xl space-y-3 bg-slate-50/50">
                <div className="p-2.5 bg-rose-50 text-rose-700 w-10 h-10 rounded-xl flex items-center justify-center">
                  <Database className="w-5 h-5" />
                </div>
                <h4 className="text-xs font-bold text-slate-800 font-sans font-bold">2. LocalStorage Persistence Bridge</h4>
                <p className="text-[11px] text-slate-500 leading-relaxed font-sans">Emulates structural PostgreSQL relationships locally. Ticking and approving weekly logbooks instantly saves data to ensure complete persistent session continuity.</p>
              </div>

              <div className="border border-slate-150 p-5 rounded-2xl space-y-3 bg-slate-50/50">
                <div className="p-2.5 bg-emerald-50 text-emerald-700 w-10 h-10 rounded-xl flex items-center justify-center">
                  <Network className="w-5 h-5" />
                </div>
                <h4 className="text-xs font-bold text-slate-800 font-sans font-bold">3. Production Server Stack</h4>
                <p className="text-[11px] text-slate-500 leading-relaxed font-sans">Binds server-side operations to host parameters, deploying files and secure logs routes in line with standard container orchestrators protocols.</p>
              </div>
            </div>
          </div>
        )}

        {activeDiagram === 'workflow' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3.5">
              <div>
                <h3 className="text-sm font-semibold text-slate-800">Logbook Weekly Review Workflow Lifecycle</h3>
                <p className="text-xs text-slate-400 font-sans">State transit guidelines tracing log entry creation, supervisor assessments approvals and academic board publication</p>
              </div>
              <span className="text-xs font-mono text-emerald-750 bg-emerald-50 border border-emerald-100 px-2.5 py-0.5 rounded font-bold font-sans">Audit-Ready Stepper</span>
            </div>

            {/* Stepper diagram */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-5 p-5 border border-dashed border-slate-200 rounded-2xl bg-slate-50/50">
              
              <div className="flex items-center space-x-3 w-full md:w-1/4">
                <div className="w-8 h-8 rounded-full bg-slate-200 border border-slate-300 text-slate-700 font-bold flex items-center justify-center text-xs font-mono">01</div>
                <div>
                  <h4 className="text-xs font-bold text-slate-800 font-sans">Draft Mode</h4>
                  <p className="text-[10px] text-slate-400 font-sans">Student logs daily tasks & workload hours</p>
                </div>
                <ChevronRight className="hidden md:block w-4 h-4 text-slate-300 flex-shrink-0" />
              </div>

              <div className="flex items-center space-x-3 w-full md:w-1/4">
                <div className="w-8 h-8 rounded-full bg-blue-100 border border-blue-300 text-blue-750 font-bold flex items-center justify-center text-xs font-mono animate-pulse">02</div>
                <div>
                  <h4 className="text-xs font-bold text-slate-800 text-blue-750 font-sans">Submissions Queue</h4>
                  <p className="text-[10px] text-slate-400 font-sans">Locks log controls, alerts supervisor review</p>
                </div>
                <ChevronRight className="hidden md:block w-4 h-4 text-slate-300 flex-shrink-0" />
              </div>

              <div className="flex items-center space-x-3 w-full md:w-1/4">
                <div className="w-8 h-8 rounded-full bg-amber-100 border border-amber-300 text-amber-700 font-bold flex items-center justify-center text-xs font-mono">03</div>
                <div>
                  <h4 className="text-xs font-bold text-slate-800 font-sans">Industrial Audit</h4>
                  <p className="text-[10px] text-slate-400 font-sans">Supervisor rates stars & submits feedback remarks</p>
                </div>
                <ChevronRight className="hidden md:block w-4 h-4 text-slate-300 flex-shrink-0" />
              </div>

              <div className="flex items-center space-x-3 w-full md:w-1/4">
                <div className="w-8 h-8 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-800 font-bold flex items-center justify-center text-xs font-mono">04</div>
                <div>
                  <h4 className="text-xs font-bold text-slate-800 text-emerald-800 font-sans">Sign-Off & Index</h4>
                  <p className="text-[10px] text-slate-400 font-sans">Compiles academic weighted score final publish</p>
                </div>
              </div>

            </div>
          </div>
        )}
      </div>
    </div>
  );
}
