import { StudentReflection } from '../types';
import { defaultReflections } from '../mockData';
import { BookOpen, AlertTriangle, Lightbulb, TrendingUp } from 'lucide-react';

export default function LessonsLearned() {
  return (
    <div className="space-y-6">
      {/* Reflection Header */}
      <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-xs">
        <span className="text-[10px] font-mono font-bold text-blue-700 bg-blue-50 border border-blue-100 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
          Module 10: Reflections & Personal Assessments
        </span>
        <h2 className="text-lg font-bold text-slate-800 font-sans mt-2">Syllabus Reflections (5 Marks Inter-individual)</h2>
        <p className="text-xs text-slate-400 font-sans mt-1">Comprehensive documentation of technical lessons, problem solving approaches and improvements by each Group 12 member</p>
      </div>

      {/* Reflections display boards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {defaultReflections.map((ref) => (
          <div key={ref.studentId} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs space-y-4.5 flex flex-col justify-between hover:border-blue-400 transition-colors">
            <div className="space-y-4">
              {/* Member identification */}
              <div className="border-b border-slate-100 pb-3 flex items-center space-x-2.5">
                <div className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                <h3 className="text-sm font-bold text-slate-800 font-sans">{ref.name}</h3>
              </div>

              {/* Section 1: Lessons learned */}
              <div className="space-y-2">
                <h4 className="text-[10px] font-mono uppercase tracking-wider text-blue-700 font-bold flex items-center">
                  <BookOpen className="w-3.5 h-3.5 mr-1.5" />
                  Lessons Acquired
                </h4>
                <ul className="list-disc pl-4 text-xs text-slate-600 space-y-1.5">
                  {ref.lessons.map((item, id) => (
                    <li key={id}>{item}</li>
                  ))}
                </ul>
              </div>

              {/* Section 2: Challenges */}
              <div className="space-y-2">
                <h4 className="text-[10px] font-mono uppercase tracking-wider text-rose-700 font-bold flex items-center">
                  <AlertTriangle className="w-3.5 h-3.5 mr-1.5" />
                  Challenges Faced
                </h4>
                <ul className="list-disc pl-4 text-xs text-slate-600 space-y-1.5">
                  {ref.challenges.map((item, id) => (
                    <li key={id} className="text-slate-600">{item}</li>
                  ))}
                </ul>
              </div>

              {/* Section 3: Strategic Solutions */}
              <div className="space-y-2">
                <h4 className="text-[10px] font-mono uppercase tracking-wider text-emerald-700 font-bold flex items-center">
                  <Lightbulb className="w-3.5 h-3.5 mr-1.5" />
                  Problem Solving
                </h4>
                <ul className="list-disc pl-4 text-xs text-slate-600 space-y-1.5">
                  {ref.strategies.map((item, id) => (
                    <li key={id} className="text-slate-600">{item}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Section 4: Future Improvements */}
            <div className="bg-slate-50 border border-slate-150 rounded-xl p-3.5 mt-4 text-xs">
              <h5 className="font-mono text-[9px] uppercase tracking-wider text-slate-400 font-bold flex items-center mb-1.5">
                <TrendingUp className="w-3.5 h-3.5 mr-1.5 text-slate-400" />
                Target Personal Improvement
              </h5>
              <p className="text-slate-600 leading-relaxed font-sans italic text-[11px]">
                "{ref.improvement}"
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
