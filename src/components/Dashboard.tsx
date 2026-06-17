import { useMemo, useState } from 'react';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell } from 'recharts';
import { UserProfile, WeeklyLog, AcademicEvaluation } from '../types';
import { CheckCircle2, Clock, Award, Briefcase, ChevronRight, TrendingUp, Filter, User } from 'lucide-react';

interface DashboardProps {
  students: UserProfile[];
  weeklyLogs: WeeklyLog[];
  evaluations: AcademicEvaluation[];
  onSelectStudentProfile: (studentId: string) => void;
}

export default function Dashboard({ students, weeklyLogs, evaluations, onSelectStudentProfile }: DashboardProps) {
  const [selectedStudentFilter, setSelectedStudentFilter] = useState<string>('all');

  // Compute aggregate stats
  const stats = useMemo(() => {
    let totalLogsCount = weeklyLogs.length;
    let approvedLogsCount = weeklyLogs.filter(l => l.status === 'approved').length;
    let pendingLogsCount = weeklyLogs.filter(l => l.status === 'pending').length;
    
    // Sum total hours across all approved logs
    const totalHoursWorked = weeklyLogs
      .filter(l => l.status === 'approved' || l.status === 'pending')
      .reduce((sum, log) => sum + log.totalHours, 0);

    const averageRating = weeklyLogs
      .filter(l => l.status === 'approved' && l.supervisorRating > 0)
      .reduce((acc, log) => acc + log.supervisorRating, 0) / 
      (weeklyLogs.filter(l => l.status === 'approved' && l.supervisorRating > 0).length || 1);

    const averageScore = evaluations.reduce((acc, el) => acc + el.totalWeightedScore, 0) / (evaluations.length || 1);

    return {
      totalLogsCount,
      approvedLogsCount,
      pendingLogsCount,
      totalHoursWorked,
      averageRating: parseFloat(averageRating.toFixed(1)),
      averageScore: Math.round(averageScore)
    };
  }, [weeklyLogs, evaluations]);

  // Transform logs data for Weekly hours trend graph
  const hoursChartData = useMemo(() => {
    // Collect all weeks
    const weeks = Array.from(new Set(weeklyLogs.map(l => l.weekNumber))).sort();
    
    return weeks.map(weekNum => {
      const weekLogs = weeklyLogs.filter(l => l.weekNumber === weekNum);
      const dataPoint: any = { name: `Week ${weekNum}` };
      
      students.forEach(student => {
        const studentLog = weekLogs.find(l => l.studentId === student.id);
        dataPoint[student.name.split(' ')[0]] = studentLog ? studentLog.totalHours : 0;
      });
      
      return dataPoint;
    });
  }, [weeklyLogs, students]);

  // Aggregate stats by student
  const studentMetrics = useMemo(() => {
    return students.map(student => {
      const studentLogs = weeklyLogs.filter(l => l.studentId === student.id);
      const approvedLogs = studentLogs.filter(l => l.status === 'approved');
      const hours = studentLogs.reduce((sum, l) => sum + l.totalHours, 0);
      const evaluation = evaluations.find(e => e.studentId === student.id);
      
      const completedTasks = studentLogs.reduce((sum, l) => {
        return sum + l.dailyLogs.filter(d => d.tasksCompleted.length > 5).length;
      }, 0);

      return {
        ...student,
        currentLoggedHours: hours,
        tasksDone: completedTasks,
        score: evaluation ? evaluation.totalWeightedScore : null,
        grade: evaluation ? (evaluation.totalWeightedScore >= 80 ? 'A' : evaluation.totalWeightedScore >= 70 ? 'B+' : evaluation.totalWeightedScore >= 60 ? 'B' : 'C') : 'Ungraded'
      };
    });
  }, [students, weeklyLogs, evaluations]);

  // Recharts color palette
  const COLORS = ['#10b981', '#6366f1', '#f59e0b', '#ec4899', '#8b5cf6'];

  return (
    <div className="space-y-6">
      {/* Overview Metric Banner */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex items-center space-x-4">
          <div className="p-3 bg-blue-50 rounded-xl text-blue-600">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[10px] text-slate-400 font-mono uppercase tracking-wider">Total Accumulated Hours</p>
            <h3 className="text-2xl font-black text-slate-800 font-sans tracking-tight">{stats.totalHoursWorked} hrs</h3>
            <p className="text-[11px] text-emerald-600 flex items-center mt-1">
              <TrendingUp className="w-3.5 h-3.5 mr-1" />
              Across Group 12 members
            </p>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex items-center space-x-4">
          <div className="p-3 bg-blue-50 rounded-xl text-blue-600">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[10px] text-slate-400 font-mono uppercase tracking-wider">Logbooks Approved</p>
            <h3 className="text-2xl font-black text-slate-800 font-sans tracking-tight">
              {stats.approvedLogsCount} <span className="text-xs font-normal text-slate-400">/ {stats.totalLogsCount} submitted</span>
            </h3>
            <p className="text-[11px] text-slate-500 mt-1">
              {stats.pendingLogsCount} pending review
            </p>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex items-center space-x-4">
          <div className="p-3 bg-amber-50 rounded-xl text-amber-500">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[10px] text-slate-400 font-mono uppercase tracking-wider">Supervisor Appraisal Avg</p>
            <h3 className="text-2xl font-black text-slate-800 font-sans tracking-tight">{stats.averageRating} / 5.0</h3>
            <div className="flex items-center space-x-1 mt-1 text-amber-500">
              {'★'.repeat(Math.round(stats.averageRating))}
              {'☆'.repeat(5 - Math.round(stats.averageRating))}
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex items-center space-x-4">
          <div className="p-3 bg-rose-50 rounded-xl text-rose-500">
            <Briefcase className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[10px] text-slate-400 font-mono uppercase tracking-wider">Academic Grade Avg</p>
            <h3 className="text-2xl font-black text-slate-800 font-sans tracking-tight">{stats.averageScore}%</h3>
            <p className="text-[11px] text-rose-600 font-bold mt-1">
              Class Grade Avg: A (Excellent)
            </p>
          </div>
        </div>
      </div>

      {/* Main Core Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Trend Area Chart (Recharts) */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-semibold text-slate-800 font-sans">Accumulated Logging Trends</h3>
              <p className="text-xs text-slate-400 font-sans">Weekly breakdown of logging hours worked for Group 12 Students</p>
            </div>
            <div className="flex items-center space-x-1 text-xs text-slate-500 bg-slate-50 px-2 py-1 rounded border border-slate-100 font-mono">
              <TrendingUp className="w-3.5 h-3.5 text-blue-600" />
              <span>LOGBOOK HOURS</span>
            </div>
          </div>

          <div className="h-64 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={hoursChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorJordan" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorAbraham" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorGodfrey" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.05)', fontSize: '11px', fontFamily: 'monospace' }} />
                <Legend iconSize={8} iconType="circle" wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                <Area type="monotone" dataKey="Jordan" stroke="#2563eb" strokeWidth={2.5} fillOpacity={1} fill="url(#colorJordan)" name="Jordan R." />
                <Area type="monotone" dataKey="Abraham" stroke="#8b5cf6" strokeWidth={2.5} fillOpacity={1} fill="url(#colorAbraham)" name="Abraham N." />
                <Area type="monotone" dataKey="Kiwuuwa" stroke="#10b981" strokeWidth={2.5} fillOpacity={1} fill="url(#colorGodfrey)" name="Godfrey K." />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Dynamic Evaluations Overview */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-semibold text-slate-800 font-sans">Weighted Scores Distribution</h3>
            <p className="text-xs text-slate-400 mb-4">Core University Marks (Max 100). Logbook (30) + Appraisal (30) + Report (40)</p>

            <div className="h-44 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={evaluations} layout="vertical" margin={{ top: 10, right: 10, left: 10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                  <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 10, fill: '#64748b' }} axisLine={false} tickLine={false} />
                  <YAxis type="category" dataKey="studentName" tickFormatter={(v) => v.split(' ')[0]} tick={{ fontSize: 10, fill: '#334155', fontWeight: 600 }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ fontSize: '11px', fontFamily: 'monospace', borderRadius: '8px' }} />
                  <Bar dataKey="totalWeightedScore" fill="#2563eb" radius={[0, 4, 4, 0]} name="Score" barSize={12}>
                    {evaluations.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-3 mt-4 space-y-2">
            <h4 className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">Class Rank Index</h4>
            {evaluations.map((e, idx) => (
              <div key={e.id} className="flex justify-between items-center text-xs">
                <span className="text-slate-600 font-medium font-sans">{e.studentName}</span>
                <span className="font-mono bg-slate-50 border border-slate-100 px-1.5 py-0.5 rounded font-bold text-slate-800">
                  {e.totalWeightedScore}% (A)
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Participatory Members & Unique Badge Identifiers */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-semibold text-slate-800 font-sans">CSC 1202 Group 12 Members Profile</h3>
            <p className="text-xs text-slate-400 font-sans">Enforcing authentic identifier badges & logging workflow benchmarks</p>
          </div>
          <div className="text-xs font-mono text-blue-800 bg-blue-50 px-2 py-1 rounded border border-blue-100 font-semibold">
            Active Placements Statuses
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {studentMetrics.map((student) => (
            <div 
              key={student.id} 
              id={`student-card-${student.id}`}
              onClick={() => onSelectStudentProfile(student.id)}
              className="group border border-slate-100 hover:border-blue-200 bg-slate-50/50 hover:bg-white rounded-2xl p-5 transition-all duration-300 shadow-2xs cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center space-x-3 mb-3">
                  <div className="relative">
                    <div className="w-11 h-11 rounded-full border border-slate-200 bg-slate-100 flex items-center justify-center text-slate-400 select-none group-hover:scale-105 transition-transform duration-300">
                      <User className="w-5 h-5 stroke-[1.5]" />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-4.5 h-4.5 rounded-full border border-white bg-emerald-500 flex items-center justify-center text-[8px] text-white font-bold shadow-sm" title="Active placement approved">
                      ✓
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-800 font-sans flex items-center group-hover:text-blue-600 transition-colors">
                      {student.name}
                    </h4>
                    <span className="text-[10px] text-slate-400 font-mono tracking-wide">{student.studentNo} • {student.regNo}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {/* Custom role badge */}
                  <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full border shadow-3xs font-mono ${student.badgeBg}`}>
                    {student.badgeText}
                  </span>
                  
                  {/* Custom Student ID badge identifier */}
                  <span className="text-[9px] font-medium px-2 py-0.5 rounded-full border border-rose-100 bg-rose-50 text-rose-700 font-mono" style={{ borderColor: `${student.badgeColor}33`, color: student.badgeColor }}>
                    ID: CSCG12-{(student.studentNo || '000').slice(-3)}
                  </span>
                </div>
              </div>

              <div className="space-y-2 border-t border-slate-100 pt-3">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-slate-400">Total Hours:</span>
                  <span className="text-slate-700 font-bold">{student.currentLoggedHours} / 120 hrs</span>
                </div>
                
                {/* Progress bar to visual logs */}
                <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-500"
                    style={{ 
                      width: `${Math.min(100, (student.currentLoggedHours / 120) * 100)}%`,
                      backgroundColor: student.badgeColor 
                    }}
                  />
                </div>

                <div className="flex justify-between items-center text-[10px] font-mono text-slate-400 pt-1">
                  <span>Tasks Completed: <strong className="text-slate-600">{student.tasksDone}</strong></span>
                  <span className="text-blue-600 font-medium flex items-center group-hover:translate-x-1 transition-transform">
                    Logs & Info <ChevronRight className="w-3" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
