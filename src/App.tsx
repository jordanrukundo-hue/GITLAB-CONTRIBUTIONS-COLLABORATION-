import { useState, useEffect } from 'react';
import { 
  UserProfile, 
  WeeklyLog, 
  Placement, 
  AcademicEvaluation as EvaluationType, 
  AppNotification 
} from './types';
import { 
  defaultStudents, 
  supervisorUser, 
  evaluatorUser, 
  defaultPlacements, 
  defaultWeeklyLogs, 
  defaultEvaluations, 
  defaultNotifications 
} from './mockData';

// Component imports
import Dashboard from './components/Dashboard';
import WeeklyLogbooks from './components/WeeklyLogbooks';
import SupervisorReview from './components/SupervisorReview';
import AcademicEvaluation from './components/AcademicEvaluation';
import Placements from './components/Placements';
import GitEvidence from './components/GitEvidence';
import TechnicalDesign from './components/TechnicalDesign';
import LessonsLearned from './components/LessonsLearned';
import SubmissionReport from './components/SubmissionReport';

// Lucide icon imports
import { 
  LayoutDashboard, 
  BookOpen, 
  ClipboardCheck, 
  GraduationCap, 
  Briefcase, 
  GitBranch, 
  FileCode, 
  HelpCircle, 
  CheckCircle, 
  Bell, 
  User, 
  Users, 
  Hourglass, 
  FolderGit2, 
  CheckSquare 
} from 'lucide-react';

export default function App() {
  // --- Persistent State Hooks ---
  const [students, setStudents] = useState<UserProfile[]>(() => {
    const local = localStorage.getItem('iles_students');
    return local ? JSON.parse(local) : defaultStudents;
  });

  const [weeklyLogs, setWeeklyLogs] = useState<WeeklyLog[]>(() => {
    const local = localStorage.getItem('iles_weekly_logs');
    return local ? JSON.parse(local) : defaultWeeklyLogs;
  });

  const [placements, setPlacements] = useState<Placement[]>(() => {
    const local = localStorage.getItem('iles_placements');
    return local ? JSON.parse(local) : defaultPlacements;
  });

  const [evaluations, setEvaluations] = useState<EvaluationType[]>(() => {
    const local = localStorage.getItem('iles_evaluations');
    return local ? JSON.parse(local) : defaultEvaluations;
  });

  const [notifications, setNotifications] = useState<AppNotification[]>(() => {
    const local = localStorage.getItem('iles_notifications');
    return local ? JSON.parse(local) : defaultNotifications;
  });

  // Active Multi-tenant Roles switcher simulator
  const [activeRole, setActiveRole] = useState<'student' | 'supervisor' | 'evaluator'>('student');
  // Current logged in student context pointer (defaults to Jordan Rukundo, Group Leader)
  const [currentStudentId, setCurrentStudentId] = useState<string>('student-jordan');

  // Active Sidebar Nav Section pointer
  const [activeSection, setActiveSection] = useState<string>('dashboard');

  const [showNotifications, setShowNotifications] = useState<boolean>(false);

  // Sync state to local storage on modifications
  useEffect(() => {
    localStorage.setItem('iles_students', JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    localStorage.setItem('iles_weekly_logs', JSON.stringify(weeklyLogs));
  }, [weeklyLogs]);

  useEffect(() => {
    localStorage.setItem('iles_placements', JSON.stringify(placements));
  }, [placements]);

  useEffect(() => {
    localStorage.setItem('iles_evaluations', JSON.stringify(evaluations));
  }, [evaluations]);

  useEffect(() => {
    localStorage.setItem('iles_notifications', JSON.stringify(notifications));
  }, [notifications]);

  // Convenience state helpers
  const unreadNotifCount = notifications.filter(n => !n.read).length;

  const currentActiveUser = (): UserProfile => {
    if (activeRole === 'supervisor') return supervisorUser;
    if (activeRole === 'evaluator') return evaluatorUser;
    // defaults to active student selection
    const st = students.find(s => s.id === currentStudentId);
    return st || students[0];
  };

  const activeUser = currentActiveUser();

  // Helper trigger to dynamically add notifications
  const handleAddNewNotification = (title: string, message: string, type: 'info' | 'success' | 'warning' | 'error') => {
    const newNotif: AppNotification = {
      id: `notif-${Date.now()}`,
      title,
      message,
      date: new Date().toISOString().replace('T', ' ').slice(0, 19),
      read: false,
      type
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const handleClearNotifications = () => {
    setNotifications([]);
  };

  const handleMarkNotificationsRead = () => {
    const readAll = notifications.map(n => ({ ...n, read: true }));
    setNotifications(readAll);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans relative">

      {/* Sliding ambient background flow */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-[0.07] print:hidden select-none">
        <div className="w-full h-full sliding-bg" />
      </div>

      {/* Primary Application Header */}
      <header className="bg-white/90 backdrop-blur-md border-b border-slate-200/80 sticky top-0 z-10 px-8 py-3.5 flex items-center justify-between shadow-xs print:hidden">
        <div className="flex items-center space-x-4">
          <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-extrabold rounded-full tracking-wider">ACTIVE INTERNSHIP</span>
          <div className="h-5 w-px bg-slate-200 hidden sm:block"></div>
          <div>
            <h1 className="text-slate-800 text-sm font-semibold tracking-tight font-sans">
              Project: Unified Student Resource Portal
            </h1>
            <p className="text-[10.5px] text-slate-400 font-medium">
              CSC 1202 Software Project Assessment Dashboard • MAK CoCIS
            </p>
          </div>
        </div>

        {/* Avatar, stats and notifications dropdown trigger */}
        <div className="flex items-center space-x-4">
          <div className="relative">
            <button
              id="btn-toggle-notifications"
              onClick={() => {
                setShowNotifications(!showNotifications);
                if (!showNotifications) handleMarkNotificationsRead();
              }}
              className="p-2 text-gray-400 hover:text-gray-650 hover:bg-gray-50 border rounded-xl transition-colors relative"
            >
              <Bell className="w-5 h-5" />
              {unreadNotifCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4.5 h-4.5 rounded-full bg-rose-600 border border-white text-white text-[9px] font-bold flex items-center justify-center">
                  {unreadNotifCount}
                </span>
              )}
            </button>

            {/* Notifications Dropdown Drawer */}
            {showNotifications && (
              <div 
                id="notifications-drawer-panel"
                className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-2xl shadow-xl z-50 p-4 space-y-3"
              >
                <div className="flex justify-between items-center pb-2 border-b">
                  <h4 className="text-xs font-bold text-gray-800">Notifications Desk</h4>
                  <button 
                    onClick={handleAddNewNotification && handleClearNotifications}
                    className="text-[10px] text-rose-650 hover:underline"
                  >
                    Clear All
                  </button>
                </div>

                <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                  {notifications.length === 0 ? (
                    <p className="text-xs text-gray-400 italic text-center py-4">No notifications yet.</p>
                  ) : (
                    notifications.map(notif => (
                      <div key={notif.id} className="p-2 border border-gray-50 rounded-xl bg-gray-50/50 space-y-1">
                        <div className="flex justify-between items-center text-[11.5px] font-bold text-gray-800">
                          <span>{notif.title}</span>
                          <span className="text-[8.5px] text-gray-400 font-mono font-normal">{notif.date.slice(11, 16)}</span>
                        </div>
                        <p className="text-[10.5px] text-gray-500 font-sans leading-relaxed">{notif.message}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="border-l border-slate-200 pl-4 flex items-center space-x-3">
            <div className="text-right">
              <span className="text-xs font-bold text-slate-750 block leading-tight">{activeUser.name}</span>
              <span className="text-[9px] font-bold font-mono text-blue-600 block uppercase tracking-wide">
                Role: {activeUser.role.toUpperCase()}
              </span>
            </div>
            
            {activeUser.role === 'student' || activeUser.role === 'supervisor' ? (
              <div className="w-8 h-8 rounded-full border border-slate-200 bg-slate-100 flex items-center justify-center text-slate-400 select-none">
                <User className="w-4.5 h-4.5 stroke-[1.5]" />
              </div>
            ) : (
              <img 
                src={activeUser.avatarUrl} 
                className="w-8 h-8 rounded-full object-cover border border-slate-200 shadow-3xs" 
                alt={activeUser.name}
                referrerPolicy="no-referrer"
              />
            )}
          </div>
        </div>
      </header>

      {/* Main Container Body */}
      <div className="flex-1 flex flex-col md:flex-row print:bg-white print:p-0 relative z-10">
        
        {/* Sidebar Nav Shell */}
        <aside className="w-full md:w-64 bg-white border-r border-slate-200 px-4 py-6 flex flex-col justify-between shadow-xs gap-6 print:hidden">
          <div className="space-y-6">
            
            {/* System Metrics Banner Widget */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3">
              <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest font-extrabold block">Group 12 Progress</span>
              
              <div className="grid grid-cols-2 gap-2 text-center">
                <div className="bg-white border border-slate-100 rounded-xl p-2 shadow-2xs">
                  <span className="text-xl font-mono font-extrabold text-slate-800">482</span>
                  <span className="block text-[8.5px] text-slate-400 uppercase font-black tracking-wider mt-0.5">Hours Work</span>
                </div>

                <div className="bg-white border border-slate-100 rounded-xl p-2 shadow-2xs">
                  <span className="text-xl font-mono font-extrabold text-slate-800">114</span>
                  <span className="block text-[8.5px] text-slate-400 uppercase font-black tracking-wider mt-0.5">Tasks Done</span>
                </div>
              </div>
            </div>

            {/* Navigation links */}
            <div className="space-y-1">
              <span className="block text-[9px] font-mono font-extrabold uppercase tracking-widest text-slate-400 px-3 pb-1">Modules Desk</span>
              
              <button
                id="nav-btn-dashboard"
                onClick={() => {
                  setActiveSection('dashboard');
                  setActiveRole('student');
                }}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  activeSection === 'dashboard'
                    ? 'bg-blue-50 text-blue-700 font-bold border-l-2 border-blue-600 rounded-l-none'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <LayoutDashboard className="w-4 h-4 text-blue-600" />
                <span>Dashboard & Data</span>
              </button>

              <button
                id="nav-btn-logbooks"
                onClick={() => {
                  setActiveSection('logbook');
                  setActiveRole('student');
                }}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  activeSection === 'logbook'
                    ? 'bg-blue-50 text-blue-700 font-bold border-l-2 border-blue-600 rounded-l-none'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <BookOpen className="w-4 h-4 text-blue-600" />
                <span>Logs Progress (Mod 3)</span>
              </button>

              <button
                id="nav-btn-reviews"
                onClick={() => {
                  setActiveSection('reviews');
                  setActiveRole('supervisor');
                }}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  activeSection === 'reviews'
                    ? 'bg-blue-50 text-blue-700 font-bold border-l-2 border-blue-600 rounded-l-none'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <ClipboardCheck className="w-4 h-4 text-blue-600" />
                <span>Supervisor Reviews (Mod 4)</span>
              </button>

              <button
                id="nav-btn-academic"
                onClick={() => {
                  setActiveSection('academic');
                  setActiveRole('evaluator');
                }}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  activeSection === 'academic'
                    ? 'bg-blue-50 text-blue-700 font-bold border-l-2 border-blue-600 rounded-l-none'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <GraduationCap className="w-4 h-4 text-blue-600" />
                <span>Mark Room (Mod 5 & 6)</span>
              </button>

              <button
                id="nav-btn-placements"
                onClick={() => {
                  setActiveSection('placements');
                  setActiveRole('student');
                }}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  activeSection === 'placements'
                    ? 'bg-blue-50 text-blue-700 font-bold border-l-2 border-blue-600 rounded-l-none'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <Briefcase className="w-4 h-4 text-blue-600" />
                <span>Host Placements (Mod 2)</span>
              </button>
            </div>

            {/* Evidence items */}
            <div className="space-y-1 pt-4 border-t border-slate-100">
              <span className="block text-[9px] font-mono font-extrabold uppercase tracking-widest text-slate-400 px-3 pb-1">Evidence Pack</span>
              
              <button
                id="nav-btn-git"
                onClick={() => {
                  setActiveSection('git');
                  setActiveRole('student');
                }}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  activeSection === 'git'
                    ? 'bg-blue-50 text-blue-700 font-bold border-l-2 border-blue-600 rounded-l-none'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <GitBranch className="w-4 h-4 text-blue-600" />
                <span>GitLab & Testing</span>
              </button>

              <button
                id="nav-btn-design"
                onClick={() => {
                  setActiveSection('design');
                  setActiveRole('student');
                }}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  activeSection === 'design'
                    ? 'bg-blue-50 text-blue-700 font-bold border-l-2 border-blue-600 rounded-l-none'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <FileCode className="w-4 h-4 text-blue-600" />
                <span>Logical Schemas & ERD</span>
              </button>

              <button
                id="nav-btn-reflections"
                onClick={() => {
                  setActiveSection('reflections');
                  setActiveRole('student');
                }}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  activeSection === 'reflections'
                    ? 'bg-blue-50 text-blue-700 font-bold border-l-2 border-blue-600 rounded-l-none'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <HelpCircle className="w-4 h-4 text-blue-600" />
                <span>Reflections & Lessons</span>
              </button>

              <button
                id="nav-btn-checklist"
                onClick={() => {
                  setActiveSection('report');
                  setActiveRole('student');
                }}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  activeSection === 'report'
                    ? 'bg-blue-50 text-blue-700 font-bold border-l-2 border-blue-600 rounded-l-none'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <CheckSquare className="w-4 h-4 text-blue-600" />
                <span>Syllabus Final Review</span>
              </button>
            </div>

          </div>

          <div className="pt-4 border-t border-slate-100 flex flex-col items-center">
            <div className="bg-slate-900 text-white rounded-xl p-4 w-full text-left">
              <p className="text-[8.5px] text-slate-400 mb-1 uppercase tracking-wider font-extrabold">Academic Team</p>
              <p className="text-[11px] font-bold">Group 12 • SoftDev Portfolio</p>
              <div className="mt-2.5 flex -space-x-1.5">
                <span className="w-5.5 h-5.5 rounded-full border border-slate-900 bg-blue-500 text-[8px] text-white font-extrabold flex items-center justify-center shadow-xs" title="Jordan Rukundo">JR</span>
                <span className="w-5.5 h-5.5 rounded-full border border-slate-900 bg-purple-500 text-[8px] text-white font-extrabold flex items-center justify-center shadow-xs" title="Abraham Nzabandora">AN</span>
                <span className="w-5.5 h-5.5 rounded-full border border-slate-900 bg-emerald-500 text-[8px] text-white font-extrabold flex items-center justify-center shadow-xs" title="Kiwuuwa Godfrey">KG</span>
              </div>
            </div>
            
            <div className="text-center font-mono text-[9px] text-slate-400 mt-4 space-y-0.5">
              <p>MAK CoCIS 2026</p>
            </div>
          </div>
        </aside>

        {/* Dynamic Display Panel */}
        <main className="flex-1 px-4 py-6 md:p-8 overflow-y-auto print:p-0">
          
          {activeSection === 'dashboard' && (
            <Dashboard 
              students={students} 
              weeklyLogs={weeklyLogs} 
              evaluations={evaluations}
              onSelectStudentProfile={(studentId) => {
                setCurrentStudentId(studentId);
                setActiveSection('logbook');
              }}
            />
          )}

          {activeSection === 'logbook' && (
            <WeeklyLogbooks
              students={students}
              currentStudentId={currentStudentId}
              weeklyLogs={weeklyLogs}
              onUpdateWeeklyLogs={(updatedLogs) => setWeeklyLogs(updatedLogs)}
              onAddNotification={handleAddNewNotification}
            />
          )}

          {activeSection === 'reviews' && (
            <SupervisorReview
              supervisorProfile={supervisorUser}
              weeklyLogs={weeklyLogs}
              students={students}
              onUpdateWeeklyLogs={(updatedLogs) => setWeeklyLogs(updatedLogs)}
              onUpdateStudents={(updatedStudents) => setStudents(updatedStudents)}
              onAddNotification={handleAddNewNotification}
            />
          )}

          {activeSection === 'academic' && (
            <AcademicEvaluation
              evaluations={evaluations}
              students={students}
              weeklyLogs={weeklyLogs}
              onUpdateEvaluations={(updatedEvals) => setEvaluations(updatedEvals)}
              onAddNotification={handleAddNewNotification}
            />
          )}

          {activeSection === 'placements' && (
            <Placements
              placements={placements}
              students={students}
              onUpdatePlacements={(updated) => setPlacements(updated)}
              onAddNotification={handleAddNewNotification}
            />
          )}

          {activeSection === 'git' && (
            <GitEvidence onAddNotification={handleAddNewNotification} />
          )}

          {activeSection === 'design' && (
            <TechnicalDesign />
          )}

          {activeSection === 'reflections' && (
            <LessonsLearned />
          )}

          {activeSection === 'report' && (
            <SubmissionReport students={students} weeklyLogs={weeklyLogs} evaluations={evaluations} />
          )}

        </main>
      </div>
    </div>
  );
}
