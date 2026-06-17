import React, { useState, useMemo } from 'react';
import { Placement, UserProfile } from '../types';
import { MapPin, Briefcase, Calendar, User, Mail, ShieldCheck, Plus, CheckCircle2 } from 'lucide-react';

interface PlacementsProps {
  placements: Placement[];
  students: UserProfile[];
  onUpdatePlacements: (updated: Placement[]) => void;
  onAddNotification: (title: string, message: string, type: 'info' | 'success' | 'warning' | 'error') => void;
}

export default function Placements({
  placements,
  students,
  onUpdatePlacements,
  onAddNotification
}: PlacementsProps) {
  // Placement form variables for additions
  const [showForm, setShowForm] = useState<boolean>(false);
  const [targetStudentId, setTargetStudentId] = useState<string>(students[0]?.id || '');
  const [companyName, setCompanyName] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [position, setPosition] = useState<string>('');
  const [supervisorName, setSupervisorName] = useState<string>('');
  const [supervisorEmail, setSupervisorEmail] = useState<string>('');

  const activeStudentProfile = useMemo(() => {
    return students.find(s => s.id === targetStudentId);
  }, [students, targetStudentId]);

  const handleCreatePlacementRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName.trim() || !position.trim() || !location.trim() || !supervisorName.trim()) {
      alert('Please fill out all placement parameters required.');
      return;
    }

    const newPlacement: Placement = {
      id: `place-${targetStudentId}-${Date.now().toString().slice(-4)}`,
      studentId: targetStudentId,
      studentName: activeStudentProfile?.name || '',
      studentNo: activeStudentProfile?.studentNo || '',
      companyName,
      location,
      position,
      startDate: '2026-06-01',
      endDate: '2026-08-31',
      status: 'approved', // auto approved for presentation purposes
      supervisorName,
      supervisorEmail,
      fieldOfficerName: 'Katamba Ronald'
    };

    onUpdatePlacements([...placements, newPlacement]);
    
    // update student organization
    onAddNotification(
      'Placement Confirmed ✓',
      `Placed ${newPlacement.studentName} at ${companyName} as ${position}.`,
      'success'
    );

    // reset fields
    setShowForm(false);
    setCompanyName('');
    setLocation('');
    setPosition('');
    setSupervisorName('');
    setSupervisorEmail('');
  };

  return (
    <div className="space-y-6">
      {/* Placements header actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white border border-slate-200 p-6 rounded-2xl gap-3 shadow-xs">
        <div>
          <span className="text-[10px] font-mono font-bold text-blue-700 bg-blue-50 border border-blue-100 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
            Module 2: Internship Placement Module
          </span>
          <h2 className="text-lg font-bold text-slate-800 font-sans mt-2">Industrial Placement Records</h2>
          <p className="text-xs text-slate-400">Manage hosting organizations, structural supervisor details and locations mappings</p>
        </div>

        <button
          id="btn-trigger-placement-form"
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-4 py-2.5 text-xs font-bold flex items-center space-x-1.5 border border-blue-700 shadow-2xs cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>{showForm ? 'View Active Placements' : 'Register New Placement'}</span>
        </button>
      </div>

      {showForm ? (
        /* Create Placement Request Form layout */
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-slate-800 font-sans">Assign Student Host Establishment</h3>
          
          <form onSubmit={handleCreatePlacementRequest} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold mb-1">Target Intern Student</label>
                <select
                  id="select-placement-student"
                  value={targetStudentId}
                  onChange={(e) => setTargetStudentId(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl p-2.5 text-xs focus:ring-1 focus:ring-blue-500 focus:outline-hidden bg-white"
                >
                  {students.map(s => (
                    <option key={s.id} value={s.id}>{s.name} ({s.studentNo})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold mb-1">Establishment Host Company Name</label>
                <input
                  id="input-company-name"
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="e.g. National Software Development Center"
                  className="w-full border border-slate-300 rounded-xl p-2.5 text-xs focus:ring-1 focus:ring-blue-500 focus:outline-hidden"
                />
              </div>
              
              <div>
                <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold mb-1">Position / Technical Role</label>
                <input
                  id="input-position-role"
                  type="text"
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                  placeholder="e.g. Lead Network Intern, Cloud Architect"
                  className="w-full border border-slate-300 rounded-xl p-2.5 text-xs focus:ring-1 focus:ring-blue-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold mb-1">Location of Placement</label>
                <input
                  id="input-location-address"
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Plot 12, Kampala Road"
                  className="w-full border border-slate-300 rounded-xl p-2.5 text-xs focus:ring-1 focus:ring-blue-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold mb-1">Industry Supervisor Name</label>
                <input
                  id="input-supervisor-name"
                  type="text"
                  value={supervisorName}
                  onChange={(e) => setSupervisorName(e.target.value)}
                  placeholder="Dr. Atuhura Mary Jane"
                  className="w-full border border-slate-300 rounded-xl p-2.5 text-xs focus:ring-1 focus:ring-blue-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold mb-1">Supervisor Email</label>
                <input
                  id="input-supervisor-email"
                  type="text"
                  value={supervisorEmail}
                  onChange={(e) => setSupervisorEmail(e.target.value)}
                  placeholder="jane.atuhura@ndc.go.ug"
                  className="w-full border border-slate-300 rounded-xl p-2.5 text-xs focus:ring-1 focus:ring-blue-500 focus:outline-hidden"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-2 pt-2 border-t border-slate-100">
              <button
                id="btn-cancel-placement"
                type="button"
                onClick={() => setShowForm(false)}
                className="border border-slate-300 hover:bg-slate-50 rounded-xl px-4 py-2 text-xs text-slate-650 cursor-pointer"
              >
                Cancel
              </button>
              <button
                id="btn-submit-placement"
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl px-4 py-2.5 text-xs cursor-pointer shadow-3xs"
              >
                Approve & Register Internship
              </button>
            </div>
          </form>
        </div>
      ) : (
        /* View Active Placements Cards Layout */
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {placements.map((placement) => {
            const student = students.find(s => s.id === placement.studentId);
            
            return (
              <div 
                key={placement.id} 
                id={`placement-card-item-${placement.id}`}
                className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs space-y-4 hover:border-blue-300 transition-all duration-300"
              >
                {/* Placement Header */}
                <div className="flex justify-between items-start border-b border-slate-100 pb-3">
                  <div>
                    <h3 className="text-xs font-bold text-slate-800 font-sans leading-tight">{placement.companyName}</h3>
                    <p className="text-[10px] text-slate-400 font-mono flex items-center mt-1">
                      <MapPin className="w-3.5 h-3.5 mr-0.5 text-slate-300" />
                      {placement.location}
                    </p>
                  </div>
                  
                  <span className="text-[9px] bg-emerald-50 border border-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full font-mono uppercase">
                    ACTIVE
                  </span>
                </div>

                {/* Placement Intern Profile details */}
                <div className="space-y-2.5">
                  <div className="flex items-center space-x-2.5">
                    <div className="w-8 h-8 rounded-full border border-slate-200 bg-slate-100 flex items-center justify-center text-slate-400 select-none">
                      <User className="w-4 h-4 stroke-[1.5]" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-800 font-sans leading-none">{placement.studentName}</h4>
                      <p className="text-[9px] text-slate-400 font-mono mt-1">{placement.studentNo}</p>
                    </div>
                  </div>

                  <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 space-y-2 text-xs">
                    <div className="flex items-center space-x-1.5 text-slate-500">
                      <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                      <span>Role: <strong className="text-slate-800 font-sans">{placement.position}</strong></span>
                    </div>

                    <div className="flex items-center space-x-1.5 text-slate-500">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>Period: <strong className="text-slate-850 font-mono">{placement.startDate}</strong> to <strong className="text-slate-850 font-mono">{placement.endDate}</strong></span>
                    </div>
                  </div>
                </div>

                {/* Supervisor details */}
                <div className="border-t border-slate-100 pt-3 space-y-1.5 text-[11px]">
                  <h5 className="text-[9px] font-mono text-slate-400 uppercase tracking-wider font-bold">Assigned Appraisers</h5>
                  
                  <div className="flex items-center space-x-1.5 text-slate-600">
                    <User className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                    <span className="truncate">Industry Supervisor: <strong className="text-slate-800">{placement.supervisorName}</strong></span>
                  </div>

                  <div className="flex items-center space-x-1.5 text-slate-600">
                    <Mail className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                    <span className="truncate">Contact: <strong className="text-slate-800 font-light font-mono text-[9px]">{placement.supervisorEmail}</strong></span>
                  </div>

                  <div className="flex items-center space-x-1.5 text-slate-600">
                    <ShieldCheck className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" />
                    <span>Academic Officer: <strong className="text-slate-800">{placement.fieldOfficerName}</strong></span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
