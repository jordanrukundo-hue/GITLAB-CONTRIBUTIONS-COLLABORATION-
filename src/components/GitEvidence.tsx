import { useState, useMemo } from 'react';
import { GitCommit, GitMergeRequest } from '../types';
import { mockGitCommits, mockMergeRequests, mockTestResults, mockBugfixLogs, TestSuiteResult, BugfixLog } from '../mockData';
import { GitCommit as CommitIcon, GitPullRequest, ShieldCheck, Terminal, Play, CheckCircle2, RotateCw, AlertCircle, FileCode, Network, Server } from 'lucide-react';

interface GitEvidenceProps {
  onAddNotification: (title: string, message: string, type: 'info' | 'success' | 'warning' | 'error') => void;
}

export default function GitEvidence({ onAddNotification }: GitEvidenceProps) {
  const [activeTab, setActiveTab] = useState<'git' | 'testing' | 'devops'>('git');
  
  // States of Test suite runner Simulator
  const [isRunningTests, setIsRunningTests] = useState<boolean>(false);
  const [testSuiteProgress, setTestSuiteProgress] = useState<number>(0);
  const [testResults, setTestResults] = useState<TestSuiteResult[]>(
    mockTestResults.map(suite => ({
      ...suite,
      tests: suite.tests.map(t => ({ ...t, status: 'pass' })) // initialized passed
    }))
  );
  const [completedTestsCount, setCompletedTestsCount] = useState<number>(9);
  const [failedTestsCount, setFailedTestsCount] = useState<number>(0);

  // Run mock test runner simulation
  const handlePerformTestRun = () => {
    setIsRunningTests(true);
    setTestSuiteProgress(0);
    setCompletedTestsCount(0);
    setFailedTestsCount(0);
    
    // Create incremental ticks
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setTestSuiteProgress(progress);
      
      if (progress === 30) {
        setCompletedTestsCount(3);
        onAddNotification('Suite 1 Completed', 'Successfully validated student profile parameters.', 'info');
      } else if (progress === 60) {
        setCompletedTestsCount(6);
        onAddNotification('Suite 2 Completed', 'Weekly logging math verified perfectly.', 'info');
      } else if (progress === 100) {
        setCompletedTestsCount(9);
        setIsRunningTests(false);
        clearInterval(interval);
        onAddNotification('All unit tests passed!', '9 test scenarios completed successfully.', 'success');
      }
    }, 450);
  };

  return (
    <div className="space-y-6">
      {/* Evidence Navigation Header */}
      <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3">
          <div>
            <span className="text-[10px] font-mono font-bold text-blue-700 bg-blue-50 border border-blue-100 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              Verification & Compliance Hub
            </span>
            <h2 className="text-lg font-bold text-slate-800 font-sans mt-2">Syllabus Evidence Portfolio & Testing</h2>
            <p className="text-xs text-slate-400">Verifying GitLab commits, testing assertions, and container deployment topology architectures</p>
          </div>
          
          <span className="text-[10px] font-mono text-slate-400 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl font-bold uppercase select-none">
            Group 12 Score Index: Active
          </span>
        </div>

        {/* Tab Switcher */}
        <div className="flex flex-wrap border-b border-slate-150 pt-2 gap-2">
          <button
            id="tab-git-evidence"
            onClick={() => setActiveTab('git')}
            className={`pb-3 text-xs font-bold px-4 transition-all border-b-2 font-sans cursor-pointer ${
              activeTab === 'git'
                ? 'border-blue-600 text-blue-650'
                : 'border-transparent text-slate-400 hover:text-slate-655'
            }`}
          >
            GitLab Evidence (20 Mks)
          </button>
          
          <button
            id="tab-testing-evidence"
            onClick={() => setActiveTab('testing')}
            className={`pb-3 text-xs font-bold px-4 transition-all border-b-2 font-sans cursor-pointer ${
              activeTab === 'testing'
                ? 'border-blue-600 text-blue-655'
                : 'border-transparent text-slate-400 hover:text-slate-655'
            }`}
          >
            Testing & Debugging (10 Mks)
          </button>
          
          <button
            id="tab-devops-evidence"
            onClick={() => setActiveTab('devops')}
            className={`pb-3 text-xs font-bold px-4 transition-all border-b-2 font-sans cursor-pointer ${
              activeTab === 'devops'
                ? 'border-blue-600 text-blue-655'
                : 'border-transparent text-slate-400 hover:text-slate-655'
            }`}
          >
            Deployment & DevOps (5 Mks)
          </button>
        </div>
      </div>

      {/* Tabs panels */}
      {activeTab === 'git' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Git repo meta indicators */}
          <div className="lg:col-span-1 space-y-4">
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs space-y-4">
              <h3 className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">GitLab Repository Metadata</h3>
              
              <div className="space-y-3.5 text-xs">
                <div>
                  <label className="block text-[9px] text-slate-400 font-mono font-bold uppercase">REPOSITORY URL Evidence</label>
                  <a 
                    href="https://github.com/jordanrukundo-hue" 
                    target="_blank" 
                    rel="noreferrer"
                    className="text-blue-600 font-mono text-[10.5px] font-bold hover:underline break-all block mt-1"
                  >
                    https://github.com/jordanrukundo-hue
                  </a>
                </div>

                <div>
                  <label className="block text-[9px] text-slate-400 font-mono font-bold uppercase">Branch tracking coverage</label>
                  <p className="text-slate-700 font-mono mt-1 text-[11px]">main, feat/academic, devops/docker, testing/units</p>
                </div>

                <div className="border-t border-slate-100 pt-3.5 space-y-2">
                  <h4 className="text-[10px] font-mono text-slate-400 uppercase tracking-wider font-bold">Group 12 Contributors</h4>
                  
                  <div className="flex items-center justify-between text-xs font-mono mt-1 bg-slate-50 border border-slate-150 p-2.5 rounded-xl">
                    <span className="text-slate-700 font-bold">Jordan Rukundo</span>
                    <span className="text-[9px] bg-blue-50 border border-blue-105 text-blue-700 px-1.5 rounded">@jordanrukundo-hue</span>
                  </div>

                  <div className="flex items-center justify-between text-xs font-mono bg-slate-50 border border-slate-150 p-2.5 rounded-xl animate-pulse">
                    <span className="text-slate-700 font-bold">Abraham Nzabandora</span>
                    <span className="text-[9px] bg-emerald-50 border border-emerald-105 text-emerald-700 px-1.5 rounded">@abrahamnz-hue</span>
                  </div>

                  <div className="flex items-center justify-between text-xs font-mono bg-slate-50 border border-slate-150 p-2.5 rounded-xl">
                    <span className="text-slate-700 font-bold">Kiwuuwa Godfrey</span>
                    <span className="text-[9px] bg-purple-50 border border-purple-105 text-purple-700 px-1.5 rounded">@kiwuuwagodfrey-hue</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Merge requests evidence listing */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs space-y-3.5">
              <h3 className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">Collaboration Merge Requests</h3>
              
              <div className="space-y-2">
                {mockMergeRequests.map(mr => (
                  <div key={mr.id} className="border border-slate-150 p-3 rounded-xl bg-slate-50/50 space-y-1.5 hover:border-slate-300 transition-all">
                    <div className="flex justify-between text-xs">
                      <span className="font-bold text-slate-800 line-clamp-1 font-sans">{mr.title}</span>
                      <span className="flex-shrink-0 text-[8.5px] bg-emerald-50 border border-emerald-100 text-emerald-800 font-mono ml-2 font-bold px-1.5 py-0.5 rounded-full">
                        ✓ {mr.status.toUpperCase()}
                      </span>
                    </div>

                    <div className="flex justify-between items-center text-[9.5px] font-mono text-slate-400">
                      <span>By: @{mr.gitlabUsername}</span>
                      <span>Source: {mr.sourceBranch}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* GitLab Core Commit Feed */}
          <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-800 font-sans">GitLab Commit History Stream</h3>
              <span className="text-xs font-mono text-slate-400">Ref: main</span>
            </div>

            <div className="space-y-3 overflow-y-auto max-h-[440px] pr-2">
              {mockGitCommits.map(commit => (
                <div key={commit.hash} className="border border-slate-150 p-3.5 rounded-xl bg-slate-50/30 hover:bg-white hover:border-slate-300 transition-all duration-300 flex space-x-3.5">
                  <div className="p-2.5 bg-slate-100 border border-slate-200 rounded-lg text-slate-500 self-start">
                    <CommitIcon className="w-4 h-4" />
                  </div>
                  
                  <div className="min-w-0 flex-1 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10.5px] font-bold text-blue-700 font-mono">
                        {commit.hash.slice(0, 8)}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">{commit.date}</span>
                    </div>

                    <p className="text-xs text-slate-700 font-sans font-medium line-clamp-2 leading-relaxed">
                      {commit.message}
                    </p>

                    <div className="flex items-center justify-between text-[9.5px] font-mono text-slate-400 mt-1">
                      <span>Author: <strong className="text-slate-600">@{commit.gitlabUsername}</strong></span>
                      <div className="space-x-1.5 flex items-center">
                        <span className="text-emerald-600 font-bold">+{commit.insertions}</span>
                        <span className="text-rose-600 font-bold">-{commit.deletions}</span>
                        <span className="bg-slate-100/80 border border-slate-200 px-1.5 py-0.5 rounded text-[8.5px] font-bold text-slate-500">{commit.branch}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'testing' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Interactive test execution terminal */}
          <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs space-y-5">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 pb-3 border-b border-slate-150">
              <div>
                <h3 className="text-sm font-bold text-slate-800 font-sans">Unit Verification Test Harness</h3>
                <p className="text-xs text-slate-400 mt-0.5">Run standard tests assertions checking evaluation bounds & logs models</p>
              </div>

              <button
                id="btn-trigger-tests-runner"
                onClick={handlePerformTestRun}
                disabled={isRunningTests}
                className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-xl px-4 py-2.5 text-xs font-bold flex items-center space-x-1.5 self-start border border-blue-700 shadow-2xs cursor-pointer"
              >
                {isRunningTests ? <RotateCw className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3.5 h-3.5 fill-white text-white" />}
                <span>{isRunningTests ? 'Executing Assertion Scripts...' : 'Compile Rules & Run Test Suite'}</span>
              </button>
            </div>

            {/* Progress bar */}
            {isRunningTests && (
              <div className="space-y-1.5">
                <div className="flex justify-between text-[10px] font-mono text-blue-750 font-bold uppercase">
                  <span>Executing test suites logic bounds...</span>
                  <span>{testSuiteProgress}%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                  <div className="h-full bg-blue-600 transition-all duration-300 animate-pulse" style={{ width: `${testSuiteProgress}%` }} />
                </div>
              </div>
            )}

            {/* Test Case display blocks */}
            <div className="space-y-4">
              {testResults.map((suite, sIdx) => {
                const isActive = isRunningTests && testSuiteProgress < (sIdx + 1) * 33;
                return (
                  <div key={sIdx} className="border border-slate-200 rounded-2xl overflow-hidden shadow-3xs">
                    <div className="bg-slate-50 border-b border-slate-150 px-4 py-2.5 text-xs font-bold font-mono text-slate-700">
                      {suite.suiteName}
                    </div>
                    
                    <div className="divide-y divide-slate-100 bg-white">
                      {suite.tests.map((test, tIdx) => (
                        <div key={tIdx} className="p-3.5 text-xs flex justify-between items-center hover:bg-slate-50/50">
                          <div className="flex items-center space-x-2.5">
                            <span className={`w-2 h-2 rounded-full ${isActive ? 'bg-amber-400 animate-pulse' : 'bg-emerald-500'}`} />
                            <span className="font-mono text-slate-700">{test.name}()</span>
                          </div>
                          
                          <div className="flex items-center space-x-2.5 font-mono text-[10px]">
                            <span className="text-slate-400">{test.duration}</span>
                            <span className={`font-bold uppercase ${isActive ? 'text-amber-600 bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded text-[9px]' : 'text-emerald-700 bg-emerald-50 border border-emerald-100 px-1.5 py-0.5 rounded text-[9px]'}`}>
                              {isActive ? 'WAITING' : 'PASSED'}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bugfix log tracker tracking */}
          <div className="space-y-4 lg:col-span-1">
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs space-y-3.5">
              <h3 className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">Issues & Debugging Logs</h3>
              
              <div className="space-y-4">
                {mockBugfixLogs.map(bug => (
                  <div key={bug.id} className="border border-slate-150 p-4 rounded-xl bg-slate-50/50 space-y-2.5 hover:border-slate-350 transition-colors">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="font-bold text-rose-700">{bug.id}: {bug.developer}</span>
                      <span className="bg-emerald-55 border border-emerald-100 text-emerald-800 text-[9px] font-bold px-2 py-0.5 rounded-full">
                        {bug.status}
                      </span>
                    </div>

                    <div className="space-y-1.5 text-xs">
                      <h4 className="font-bold text-slate-800 font-sans">{bug.issue}</h4>
                      <p className="text-[11px] text-slate-505 line-clamp-3 font-serif italic">"{bug.symptom}"</p>
                      
                      <div className="bg-white border border-slate-200 rounded-xl p-3 text-[10px] font-mono text-slate-600 mt-2 space-y-1.5">
                        <p><strong className="text-slate-800">Root Cause:</strong> {bug.rootCause}</p>
                        <p className="border-t border-slate-100/60 pt-1.5 mt-1.5 text-emerald-700"><strong className="text-emerald-800 font-bold">Applied Fix:</strong> {bug.fixApplied}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'devops' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Deployment Architecture Canvas */}
          <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs space-y-5">
            <div>
              <h3 className="text-sm font-bold text-slate-800 font-sans">Containerized Cloud Deployment Topology</h3>
              <p className="text-xs text-slate-400 mt-0.5">Architecture showing compile paths and reversed network proxy routing protocols</p>
            </div>

            {/* Interactive Flow Diagram */}
            <div className="border border-slate-200 rounded-2xl p-6 bg-slate-50 flex flex-col sm:flex-row items-center justify-around gap-4 shadow-3xs">
              
              {/* React SPA Client box */}
              <div className="border border-slate-200 bg-white rounded-xl p-4.5 w-full sm:w-44 text-center space-y-2 flex flex-col items-center shadow-2xs hover:border-blue-300 transition-colors">
                <div className="p-3 bg-blue-50 border border-blue-100 rounded-xl text-blue-600">
                  <FileCode className="w-6 h-6" />
                </div>
                <h4 className="text-xs font-bold text-slate-800 font-sans">React Client (Vite)</h4>
                <p className="text-[10px] text-slate-400 font-mono leading-relaxed">Bridges LocalStorage persistence for instant client states</p>
                <span className="text-[8.5px] uppercase font-mono bg-blue-50 border border-blue-150 text-blue-800 px-2 py-0.5 rounded-full font-bold">Compiling</span>
              </div>

              {/* Arrow Connector */}
              <div className="hidden sm:block text-2xl text-slate-300 font-mono select-none">➡</div>

              {/* Express Server box */}
              <div className="border border-slate-200 bg-white rounded-xl p-4.5 w-full sm:w-44 text-center space-y-2 flex flex-col items-center shadow-2xs hover:border-purple-350 transition-colors">
                <div className="p-3 bg-purple-50 border border-purple-100 rounded-xl text-purple-600">
                  <Server className="w-6 h-6" />
                </div>
                <h4 className="text-xs font-bold text-slate-800 font-sans">Express Host (Node)</h4>
                <p className="text-[10px] text-slate-400 font-mono leading-relaxed">Static Assets Server & API Proxy Middleware</p>
                <span className="text-[8.5px] uppercase font-mono bg-purple-50 border border-purple-150 text-purple-800 px-2 py-0.5 rounded-full font-bold">PORT 3000</span>
              </div>

              {/* Arrow Connector */}
              <div className="hidden sm:block text-2xl text-slate-300 font-mono select-none">➡</div>

              {/* Cloud Run box */}
              <div className="border border-slate-200 bg-white rounded-xl p-4.5 w-full sm:w-44 text-center space-y-2 flex flex-col items-center shadow-2xs hover:border-emerald-350 transition-colors">
                <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-xl text-emerald-600">
                  <Network className="w-6 h-6" />
                </div>
                <h4 className="text-xs font-bold text-slate-800 font-sans">Cloud Run Server</h4>
                <p className="text-[10px] text-slate-400 font-mono leading-relaxed">Secure Cloud Container with absolute ingress SSL</p>
                <span className="text-[8.5px] uppercase font-mono bg-emerald-50 border border-emerald-150 text-emerald-850 px-2 py-0.5 rounded-full font-bold">HTTPS Ingress</span>
              </div>
            </div>

            <div className="space-y-3.5 text-xs text-slate-600">
              <h4 className="font-bold text-slate-800 font-sans">DevOps Compliance Explanatory Index</h4>
              <p className="leading-relaxed">To satisfy container requirements of standard Google Cloud Run host environments, Godfrey Kiwuuwa updated the server network settings inside the dev environments. The code listens to standard host <code className="bg-slate-100 border border-slate-200 px-1.5 py-0.5 rounded text-slate-800 font-mono text-[10px]">0.0.0.0</code> and port <code className="bg-slate-100 border border-slate-200 px-1.5 py-0.5 rounded text-slate-800 font-mono text-[10px]">3000</code>. All incoming external traffic is handled by the reverse proxy ingress channel.</p>
            </div>
          </div>

          {/* CI/CD config preview */}
          <div className="space-y-4 lg:col-span-1">
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs space-y-3.5">
              <h3 className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold flex items-center">
                <Terminal className="w-4 h-4 mr-1.5 text-slate-400" />
                .gitlab-ci.yml Pipeline Config
              </h3>

              <div className="bg-slate-950 border border-slate-800 text-slate-100 rounded-xl p-3.5 font-mono text-[10px] space-y-1.5 shadow-inner h-[280px] overflow-y-auto">
                <p className="text-blue-400">stages:</p>
                <p className="pl-4">- test</p>
                <p className="pl-4">- build</p>
                <p className="pl-4">- deploy</p>
                <p className="text-blue-400 mt-2">verify_lint:</p>
                <p className="pl-4">stage: test</p>
                <p className="pl-4">image: node:18-alpine</p>
                <p className="pl-4">script:</p>
                <p className="pl-8">- npm ci</p>
                <p className="pl-8">- npm run lint</p>
                <p className="text-blue-400 mt-2">build_artifacts:</p>
                <p className="pl-4">stage: build</p>
                <p className="pl-4">script:</p>
                <p className="pl-8">- npm run build</p>
                <p className="pl-4">artifacts:</p>
                <p className="pl-8">paths:</p>
                <p className="pl-12">- dist/</p>
                <p className="text-blue-400 mt-2">cloud_run_deploy:</p>
                <p className="pl-4">stage: deploy</p>
                <p className="pl-4">only:</p>
                <p className="pl-8">- main</p>
                <p className="pl-4">script:</p>
                <p className="pl-8">- gcloud run deploy iles</p>
              </div>
              <p className="text-[10px] text-slate-400 font-mono">Automated rules verify code compilations successfully on git branch merges.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
