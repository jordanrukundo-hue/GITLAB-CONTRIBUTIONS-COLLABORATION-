import { UserProfile, WeeklyLog, Placement, AcademicEvaluation, GitCommit, GitMergeRequest, AppNotification, StudentReflection } from './types';

// Default Group 12 Students
export const defaultStudents: UserProfile[] = [
  {
    id: 'student-jordan',
    name: 'Jordan Rukundo',
    studentNo: '2500701235',
    regNo: '25/U/01235/PS',
    badgeText: 'Team Leader',
    badgeBg: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    badgeColor: '#10b981',
    role: 'student',
    email: 'jordanrukundo@gmail.com',
    avatarUrl: '/src/assets/images/avatar_jordan_1781696508000.jpg',
    department: 'Software Engineering',
    organization: 'National Software Development Center',
    hoursWorked: 168,
    tasksCompleted: 42,
    status: 'Placed & Active',
  },
  {
    id: 'student-abraham',
    name: 'Abraham Nzabandora',
    studentNo: '2500728553',
    regNo: '25/U/28553/PS',
    badgeText: 'Lead Architect',
    badgeBg: 'bg-indigo-100 text-indigo-800 border-indigo-300',
    badgeColor: '#6366f1',
    role: 'student',
    email: 'nzabandora.abraham@gmail.com',
    avatarUrl: '/src/assets/images/avatar_abraham_1781696522938.jpg',
    department: 'Software Engineering',
    organization: 'National Software Development Center',
    hoursWorked: 160,
    tasksCompleted: 38,
    status: 'Placed & Active',
  },
  {
    id: 'student-godfrey',
    name: 'Kiwuuwa Godfrey',
    studentNo: '2500705798',
    regNo: '25/U/05798/PS',
    badgeText: 'DevOps Engineer',
    badgeBg: 'bg-amber-100 text-amber-800 border-amber-300',
    badgeColor: '#f59e0b',
    role: 'student',
    email: 'kiwuuwa.godfrey@gmail.com',
    avatarUrl: '/src/assets/images/avatar_godfrey_1781696536725.jpg',
    department: 'Software Engineering',
    organization: 'National Software Development Center',
    hoursWorked: 154,
    tasksCompleted: 34,
    status: 'Placed & Active',
  }
];

// Active user profiles for Supervisor and Board Evaluator
export const supervisorUser: UserProfile = {
  id: 'supervisor-1',
  name: 'Dr. Jane Mary Atuhura',
  badgeText: 'Industry Supervisor',
  badgeBg: 'bg-rose-100 text-rose-800 border-rose-300',
  badgeColor: '#f43f5e',
  role: 'supervisor',
  email: 'jane.atuhura@ndc.go.ug',
  avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=250',
  department: 'External Software & Systems Appraisal',
  hoursWorked: 0,
  tasksCompleted: 0,
  status: 'Active',
};

export const evaluatorUser: UserProfile = {
  id: 'evaluator-1',
  name: 'Prof. Sserwadda Fred',
  badgeText: 'Academic Board Head',
  badgeBg: 'bg-cyan-100 text-cyan-800 border-cyan-300',
  badgeColor: '#06b6d4',
  role: 'evaluator',
  email: 'fsserwadda@cis.mak.ac.ug',
  avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=250',
  department: 'College of Computing and Information Sciences',
  hoursWorked: 0,
  tasksCompleted: 0,
  status: 'Active',
};

// Default placements mapping
export const defaultPlacements: Placement[] = [
  {
    id: 'place-1',
    studentId: 'student-jordan',
    studentName: 'Jordan Rukundo',
    studentNo: '2500701235',
    companyName: 'National Software Development Center',
    location: 'Plot 12, Kampala Road',
    position: 'Full-Stack Developer Intern',
    startDate: '2026-06-01',
    endDate: '2026-08-31',
    status: 'approved',
    supervisorName: 'Dr. Jane Mary Atuhura',
    supervisorEmail: 'jane.atuhura@ndc.go.ug',
    fieldOfficerName: 'Katamba Ronald',
  },
  {
    id: 'place-2',
    studentId: 'student-abraham',
    studentName: 'Abraham Nzabandora',
    studentNo: '2500728553',
    companyName: 'National Software Development Center',
    location: 'Plot 12, Kampala Road',
    position: 'Backend Systems Intern',
    startDate: '2026-06-01',
    endDate: '2026-08-31',
    status: 'approved',
    supervisorName: 'Dr. Jane Mary Atuhura',
    supervisorEmail: 'jane.atuhura@ndc.go.ug',
    fieldOfficerName: 'Katamba Ronald',
  },
  {
    id: 'place-3',
    studentId: 'student-godfrey',
    studentName: 'Kiwuuwa Godfrey',
    studentNo: '2500705798',
    companyName: 'National Software Development Center',
    location: 'Plot 12, Kampala Road',
    position: 'Cloud & Systems Intern',
    startDate: '2026-06-01',
    endDate: '2026-08-31',
    status: 'approved',
    supervisorName: 'Dr. Jane Mary Atuhura',
    supervisorEmail: 'jane.atuhura@ndc.go.ug',
    fieldOfficerName: 'Katamba Ronald',
  }
];

// Rich default logs matching project ILES creation
export const defaultWeeklyLogs: WeeklyLog[] = [
  // --- Jordan Weekly Logs ---
  {
    id: 'log-jordan-w1',
    studentId: 'student-jordan',
    studentName: 'Jordan Rukundo',
    weekNumber: 1,
    startDate: '2026-06-01',
    endDate: '2026-06-05',
    totalHours: 40,
    status: 'approved',
    supervisorRating: 5,
    supervisorComments: 'Outstanding start to the internship, Jordan. The user authentication flow is built securely according to specifications.',
    feedbackDate: '2026-06-06',
    submittedDate: '2026-06-05',
    dailyLogs: [
      { id: 'j-w1-d1', day: 'Monday', date: '2026-06-01', tasksCompleted: 'Setup ILES project structure, created tsconfig, configured path aliases and Vite environments.', skillsAcquired: 'Vite config customization, TS options tuning', hoursWorked: 8 },
      { id: 'j-w1-d2', day: 'Tuesday', date: '2026-06-02', tasksCompleted: 'Designed type architectures inside src/types.ts. Documented DB models & multi-scoped profiles.', skillsAcquired: 'Data Modeling, Type Declarations', hoursWorked: 8 },
      { id: 'j-w1-d3', day: 'Wednesday', date: '2026-06-03', tasksCompleted: 'Created login pages and user-switching utilities for multi-role workflows.', skillsAcquired: 'State management, React custom state hooks', hoursWorked: 8 },
      { id: 'j-w1-d4', day: 'Thursday', date: '2026-06-04', tasksCompleted: 'Structured initial mock data stores to satisfy initial reporting templates.', skillsAcquired: 'Mock database design, relational simulation', hoursWorked: 8 },
      { id: 'j-w1-d5', day: 'Friday', date: '2026-06-05', tasksCompleted: 'Integrated local storage synchronizers for active browser persistence.', skillsAcquired: 'Browser API integrations, JSON serialize/deserialize', hoursWorked: 8 }
    ]
  },
  {
    id: 'log-jordan-w2',
    studentId: 'student-jordan',
    studentName: 'Jordan Rukundo',
    weekNumber: 2,
    startDate: '2026-06-08',
    endDate: '2026-06-12',
    totalHours: 40,
    status: 'approved',
    supervisorRating: 5,
    supervisorComments: 'The logbook module has highly interactive structures and complies with the design philosophy. Exceeds expectation.',
    feedbackDate: '2026-06-13',
    submittedDate: '2026-06-12',
    dailyLogs: [
      { id: 'j-w2-d1', day: 'Monday', date: '2026-06-08', tasksCompleted: 'Built modular dashboard interfaces featuring summaries of hours worked and active statuses.', skillsAcquired: 'Tailwind layouts, visual spacing ergonomics', hoursWorked: 8 },
      { id: 'j-w2-d2', day: 'Tuesday', date: '2026-06-09', tasksCompleted: 'Wrote interactive WeeklyLogbook forms with auto-calculating total weekly hours totals.', skillsAcquired: 'Form controls validation, reactive state computing', hoursWorked: 8 },
      { id: 'j-w2-d3', day: 'Wednesday', date: '2026-06-10', tasksCompleted: 'Drafted Recharts integrations to plot cumulative weekly logging trends.', skillsAcquired: 'Data visualization, Recharts API customization', hoursWorked: 8 },
      { id: 'j-w2-d4', day: 'Thursday', date: '2026-06-11', tasksCompleted: 'Developed supervisor-approval transitions including feedback alerts and star-rating structures.', skillsAcquired: 'Workflow State Machine implementation', hoursWorked: 8 },
      { id: 'j-w2-d5', day: 'Friday', date: '2026-06-12', tasksCompleted: 'Integrated interactive notifications drawer for real-time validation tracking.', skillsAcquired: 'User experience polish, list animations', hoursWorked: 8 }
    ]
  },
  {
    id: 'log-jordan-w3',
    studentId: 'student-jordan',
    studentName: 'Jordan Rukundo',
    weekNumber: 3,
    startDate: '2026-06-15',
    endDate: '2026-06-19',
    totalHours: 32,
    status: 'pending',
    supervisorRating: 0,
    supervisorComments: '',
    submittedDate: '2026-06-16',
    dailyLogs: [
      { id: 'j-w3-d1', day: 'Monday', date: '2026-06-15', tasksCompleted: 'Designed technical workspace report generators featuring PDF-friendly print styles.', skillsAcquired: 'CSS typography media queries, print styling optimization', hoursWorked: 8 },
      { id: 'j-w3-d2', day: 'Tuesday', date: '2026-06-16', tasksCompleted: 'Added interactive GitLab commit history feeds, detailing structural contribution indexes by team members.', skillsAcquired: 'API design, nested array state computing', hoursWorked: 8 },
      { id: 'j-w3-d3', day: 'Wednesday', date: '2026-06-17', tasksCompleted: 'Running test suites for weighted score compute functions and linting workspace packages.', skillsAcquired: 'Unit testing frameworks, compiler diagnostic sweeps', hoursWorked: 8 },
      { id: 'j-w3-d4', day: 'Thursday', date: '2026-06-18', tasksCompleted: 'In progress: refining ERDs and architecture models inside core dashboard panels.', skillsAcquired: 'SVG rendering optimizations', hoursWorked: 8 },
      { id: 'j-w3-d5', day: 'Friday', date: '2026-06-19', tasksCompleted: 'Planned task: deploy final revisions and aggregate student reflections.', skillsAcquired: 'None', hoursWorked: 0 }
    ]
  },

  // --- Abraham Weekly Logs ---
  {
    id: 'log-abraham-w1',
    studentId: 'student-abraham',
    studentName: 'Abraham Nzabandora',
    weekNumber: 1,
    startDate: '2026-06-01',
    endDate: '2026-06-05',
    totalHours: 40,
    status: 'approved',
    supervisorRating: 4,
    supervisorComments: 'Very solid backend route declarations. Make sure custom filters return 400 on negative hour values.',
    feedbackDate: '2026-06-06',
    submittedDate: '2026-06-05',
    dailyLogs: [
      { id: 'a-w1-d1', day: 'Monday', date: '2026-06-01', tasksCompleted: 'Scoped API route configurations under Mock Server endpoints, mapping basic HTTP methods.', skillsAcquired: 'Express routing rules, request body parsers', hoursWorked: 8 },
      { id: 'a-w1-d2', day: 'Tuesday', date: '2026-06-02', tasksCompleted: 'Structured evaluation tables database representations in JSON and implemented validator schemas.', skillsAcquired: 'SQL relations emulation, fields safety check', hoursWorked: 8 },
      { id: 'a-w1-d3', day: 'Wednesday', date: '2026-06-03', tasksCompleted: 'Implemented calculation modules for weighted scores based on multi-criteria university rules.', skillsAcquired: 'Algorithm design, weight proportions formulas', hoursWorked: 8 },
      { id: 'a-w1-d4', day: 'Thursday', date: '2026-06-04', tasksCompleted: 'Integrated placement submission modals and added database validation logic.', skillsAcquired: 'Form schemas verification, safety guards', hoursWorked: 8 },
      { id: 'a-w1-d5', day: 'Friday', date: '2026-06-05', tasksCompleted: 'Prepared and simulated custom Postman JSON payload structures matching ILES api routes.', skillsAcquired: 'API layout design, JSON payloads documentation', hoursWorked: 8 }
    ]
  },
  {
    id: 'log-abraham-w2',
    studentId: 'student-abraham',
    studentName: 'Abraham Nzabandora',
    weekNumber: 2,
    startDate: '2026-06-08',
    endDate: '2026-06-12',
    totalHours: 40,
    status: 'approved',
    supervisorRating: 5,
    supervisorComments: 'Superb execution of database mock interfaces. Relational integrity guidelines are adhered to correctly.',
    feedbackDate: '2026-06-13',
    submittedDate: '2026-06-12',
    dailyLogs: [
      { id: 'a-w2-d1', day: 'Monday', date: '2026-06-08', tasksCompleted: 'Developed data loaders and storage bridges linking local react state transitions to browser memory.', skillsAcquired: 'Reactive binding synchronizations', hoursWorked: 8 },
      { id: 'a-w2-d2', day: 'Tuesday', date: '2026-06-09', tasksCompleted: 'Created the Academic Board evaluation score sliders enabling seamless updates to weight configurations.', skillsAcquired: 'Form slider constraints, unified calculation bindings', hoursWorked: 8 },
      { id: 'a-w2-d3', day: 'Wednesday', date: '2026-06-10', tasksCompleted: 'Plotted aggregate grades distribution templates using custom CSS multi-bar components.', skillsAcquired: 'Custom UI development, math rounding operations', hoursWorked: 8 },
      { id: 'a-w2-d4', day: 'Thursday', date: '2026-06-11', tasksCompleted: 'Integrated mock validator unit test routines, and created the bugfix log table trackers.', skillsAcquired: 'Test assertions designing, testing loops tracking', hoursWorked: 8 },
      { id: 'a-w2-d5', day: 'Friday', date: '2026-06-12', tasksCompleted: 'Collaborated with Godfrey to setup Docker assets and write the simple infrastructure architecture descriptions.', skillsAcquired: 'DevOps cooperation, technical diagrams compiling', hoursWorked: 8 }
    ]
  },

  // --- Godfrey Weekly Logs ---
  {
    id: 'log-godfrey-w1',
    studentId: 'student-godfrey',
    studentName: 'Kiwuuwa Godfrey',
    weekNumber: 1,
    startDate: '2026-06-01',
    endDate: '2026-06-05',
    totalHours: 40,
    status: 'approved',
    supervisorRating: 4,
    supervisorComments: 'Excellent deployment routines setup, Godfrey. Let us make sure static assets compression is enabled in production builds.',
    feedbackDate: '2026-06-06',
    submittedDate: '2026-06-05',
    dailyLogs: [
      { id: 'g-w1-d1', day: 'Monday', date: '2026-06-01', tasksCompleted: 'Setup git repository configurations and established strict branch merging protocols across the team.', skillsAcquired: 'Git team policies configuration, branching strategies', hoursWorked: 8 },
      { id: 'g-w1-d2', day: 'Tuesday', date: '2026-06-02', tasksCompleted: 'Created build workflows in .gitlab-ci.yml for compile checks on pushed components.', skillsAcquired: 'CI/CD pipeline scripting, environment variables', hoursWorked: 8 },
      { id: 'g-w1-d3', day: 'Wednesday', date: '2026-06-03', tasksCompleted: 'Managed Tailwind setup. Solved post-css warnings in high-level CSS nested statements.', skillsAcquired: 'PostCSS configurations debugging, compiler diagnostics', hoursWorked: 8 },
      { id: 'g-w1-d4', day: 'Thursday', date: '2026-06-04', tasksCompleted: 'Setup dev server configurations to bind reliably on 0.0.0.0 and port 3000 to comply with Cloud Run requirements.', skillsAcquired: 'Vite dev-server bindings, container network bridges', hoursWorked: 8 },
      { id: 'g-w1-d5', day: 'Friday', date: '2026-06-05', tasksCompleted: 'Constructed responsive navigation shells and side drawers with smooth transition effects.', skillsAcquired: 'Motion React hooks, CSS visual viewport rules', hoursWorked: 8 }
    ]
  },
  {
    id: 'log-godfrey-w2',
    studentId: 'student-godfrey',
    studentName: 'Kiwuuwa Godfrey',
    weekNumber: 2,
    startDate: '2026-06-08',
    endDate: '2026-06-12',
    totalHours: 40,
    status: 'approved',
    supervisorRating: 5,
    supervisorComments: 'Very responsive layouts. High-fidelity rendering across mobile dimensions is working beautifully.',
    feedbackDate: '2026-06-13',
    submittedDate: '2026-06-12',
    dailyLogs: [
      { id: 'g-w2-d1', day: 'Monday', date: '2026-06-08', tasksCompleted: 'Polished placement view cards and added dynamic field-officer assignments updates.', skillsAcquired: 'CSS grid flow structures, interactive components', hoursWorked: 8 },
      { id: 'g-w2-d2', day: 'Tuesday', date: '2026-06-09', tasksCompleted: 'Created customizable error fallbacks to capture failed api models and report user alerts.', skillsAcquired: 'React bounds debugging, error handling widgets', hoursWorked: 8 },
      { id: 'g-w2-d3', day: 'Wednesday', date: '2026-06-10', tasksCompleted: 'Rendered interactive Vector SVGs illustrating ILES logical entity-relation linkages.', skillsAcquired: 'SVG coordinates math, technical drawing styling', hoursWorked: 8 },
      { id: 'g-w2-d4', day: 'Thursday', date: '2026-06-11', tasksCompleted: 'Assisted Jordan in compiling lessons-learned reflections and formatting the print view layout tables.', skillsAcquired: 'Cooperative writing, spreadsheet table formatting', hoursWorked: 8 },
      { id: 'g-w2-d5', day: 'Friday', date: '2026-06-12', tasksCompleted: 'Successfully tested Vite bundle execution with NODE_ENV set to production, achieving 100% load scores.', skillsAcquired: 'Build compiler bundles auditing, compression profiling', hoursWorked: 8 }
    ]
  }
];

// Pre-populated Evaluations
export const defaultEvaluations: AcademicEvaluation[] = [
  {
    id: 'eval-1',
    studentId: 'student-jordan',
    studentName: 'Jordan Rukundo',
    studentNo: '2500701235',
    fieldSupervisorScore: 28, // Out of 30
    weeklyLogbookScore: 29,     // Out of 30
    academicReportScore: 37,    // Out of 40
    totalWeightedScore: 94,     // Out of 100
    examinerName: 'Prof. Sserwadda Fred',
    comments: 'Excellent work throughout the semester. The implementation of the Internship Logging System shows exemplary craft and complete functional logic. Perfect logbook fidelity.',
    status: 'final',
    gradedDate: '2026-06-16',
  },
  {
    id: 'eval-2',
    studentId: 'student-abraham',
    studentName: 'Abraham Nzabandora',
    studentNo: '2500728553',
    fieldSupervisorScore: 27,
    weeklyLogbookScore: 28,
    academicReportScore: 36,
    totalWeightedScore: 91,
    examinerName: 'Prof. Sserwadda Fred',
    comments: 'Superb effort. Backend routers and type architectures were modeled properly. Outstanding contribution to team cohesion.',
    status: 'final',
    gradedDate: '2026-06-16',
  },
  {
    id: 'eval-3',
    studentId: 'student-godfrey',
    studentName: 'Kiwuuwa Godfrey',
    studentNo: '2500705798',
    fieldSupervisorScore: 26,
    weeklyLogbookScore: 28,
    academicReportScore: 35,
    totalWeightedScore: 89,
    examinerName: 'Prof. Sserwadda Fred',
    comments: 'Highly commendable technical execution. DevOps automation and CI/CD parameters configurations are neat. Solid presentation.',
    status: 'final',
    gradedDate: '2026-06-16',
  }
];

// Realistic GitLab Commits showing Group 12 activity on this repository
export const mockGitCommits: GitCommit[] = [
  {
    hash: '8f7d9a1b2c3d4e5f',
    authorName: 'Jordan Rukundo',
    gitlabUsername: 'jordanrukundo-hue',
    date: '2026-06-16 17:45:10',
    message: 'release: finalize ILES release build v1.0.0 and complete print layout reports',
    branch: 'main',
    insertions: 345,
    deletions: 12
  },
  {
    hash: 'a2b3c4d5e6f7g8h9',
    authorName: 'Kiwuuwa Godfrey',
    gitlabUsername: 'kiwuuwagodfrey-hue',
    date: '2026-06-15 14:12:00',
    message: 'test: configure mock compiler diagnostics and pass all weighted score computation test assertions',
    branch: 'testing/units',
    insertions: 110,
    deletions: 5
  },
  {
    hash: 'f5d6c7b8a9e0f1d2',
    authorName: 'Abraham Nzabandora',
    gitlabUsername: 'abrahamnz-hue',
    date: '2026-06-14 11:30:45',
    message: 'feat: refine academic board evaluation rubric sliders and integrate live math aggregations',
    branch: 'feat/academic',
    insertions: 180,
    deletions: 22
  },
  {
    hash: 'k3j4h5g6f7e8d9c0',
    authorName: 'Jordan Rukundo',
    gitlabUsername: 'jordanrukundo-hue',
    date: '2026-06-13 09:15:20',
    message: 'fix: resolve infinite state re-rendering in responsive charts dependency arrays',
    branch: 'main',
    insertions: 45,
    deletions: 32
  },
  {
    hash: 'p5o6n7m8l9k0j1i2',
    authorName: 'Kiwuuwa Godfrey',
    gitlabUsername: 'kiwuuwagodfrey-hue',
    date: '2026-06-11 16:50:11',
    message: 'devops: update server.ts endpoints routing and standard express port binding on 3000',
    branch: 'devops/docker',
    insertions: 72,
    deletions: 4
  },
  {
    hash: 'q1w2e3r4t5y6u7i8',
    authorName: 'Abraham Nzabandora',
    gitlabUsername: 'abrahamnz-hue',
    date: '2026-06-10 12:05:54',
    message: 'feat: develop database emulations inside src/mockData.ts modeling placement variables',
    branch: 'feat/database',
    insertions: 420,
    deletions: 15
  },
  {
    hash: 'z1x2c3v4b5n6m7k8',
    authorName: 'Jordan Rukundo',
    gitlabUsername: 'jordanrukundo-hue',
    date: '2026-06-08 14:22:30',
    message: 'style: design slate-colored high contrast cards with responsive padding rules',
    branch: 'main',
    insertions: 610,
    deletions: 18
  },
  {
    hash: 'u9i8o7p6l5k4j3h2',
    authorName: 'Kiwuuwa Godfrey',
    gitlabUsername: 'kiwuuwagodfrey-hue',
    date: '2026-06-03 10:40:02',
    message: 'init: scaffold project files, configure package.json dependencies and index.css imports',
    branch: 'main',
    insertions: 89,
    deletions: 0
  }
];

// Merge requests workflow evidence
export const mockMergeRequests: GitMergeRequest[] = [
  {
    id: 'mr-12',
    title: 'Resolve reactive layout anomalies in Recharts components',
    authorName: 'Jordan Rukundo',
    gitlabUsername: 'jordanrukundo-hue',
    sourceBranch: 'hotfix/charts',
    targetBranch: 'main',
    status: 'merged',
    date: '2026-06-13 10:40:00'
  },
  {
    id: 'mr-11',
    title: 'Model university mark computation engine and build score constraints and sliders',
    authorName: 'Abraham Nzabandora',
    gitlabUsername: 'abrahamnz-hue',
    sourceBranch: 'feat/academic',
    targetBranch: 'main',
    status: 'merged',
    date: '2026-06-14 18:20:00'
  },
  {
    id: 'mr-10',
    title: 'Configure Node process runtime triggers and port mapping on 3000',
    authorName: 'Kiwuuwa Godfrey',
    gitlabUsername: 'kiwuuwagodfrey-hue',
    sourceBranch: 'devops/docker',
    targetBranch: 'main',
    status: 'merged',
    date: '2026-06-11 17:35:00'
  }
];

// Initial notifications
export const defaultNotifications: AppNotification[] = [
  {
    id: 'notif-1',
    title: 'Logbook Approved',
    message: 'Dr. Jane Mary Mary approved your Week 2 logbook with a rating of 5.0/5.0.',
    date: '2026-06-13 09:30:45',
    read: false,
    type: 'success',
  },
  {
    id: 'notif-2',
    title: 'Evaluation Published',
    message: 'Prof. Sserwadda Fred released group 12 final course weighted score feedback.',
    date: '2026-06-16 11:20:00',
    read: false,
    type: 'info',
  },
  {
    id: 'notif-3',
    title: 'Logbook Submitted',
    message: 'Your Week 3 daily logs were compiled and submitted for industrial review.',
    date: '2026-06-16 09:12:15',
    read: true,
    type: 'info',
  }
];

// Customized individual reflections by each student
export const defaultReflections: StudentReflection[] = [
  {
    studentId: 'student-jordan',
    name: 'Jordan Rukundo (Team Leader / Dev)',
    lessons: [
      'Mastered modular TypeScript react workflows: By architecting the models ahead of the design, we avoided semantic overlap and compile-time warnings.',
      'Optimized CSS typography layouts: Developed printable report panels using advanced `@media print` directives that clean visual controls during compilation.',
      'Enhanced custom state tracking loops: Implemented a robust multi-role browser engine storing updates under standard Web Storage APIs.'
    ],
    challenges: [
      'Managing state re-renders across charts: Realtime dashboards utilizing nested dependency metrics threw canvas warnings inside the viewport loops.',
      'Fitting multi-role workflows inside single screen contexts: To respect simplified visual bounds, we built togglable user panels that immediately adjust user clearance levels.'
    ],
    strategies: [
      'Employed React strict state decoupling: Leveraged dynamic primitives (rather than nested objects) as useEffect targets to clean re-renders.',
      'Developed detailed viewport wrappers: Used responsive grid constraints to auto-adjust from mobile layout cards to large grid screens.'
    ],
    improvement: 'I plan to study automated end-to-end integration tools like Playwright and integrate strict GraphQL resolvers on the backend to further stabilize API contracts.'
  },
  {
    studentId: 'student-abraham',
    name: 'Abraham Nzabandora (Lead Architect)',
    lessons: [
      'Modeled granular SQL schemas: Mapped placement, logbooks, evaluations, and Git timelines with absolute relational bounds.',
      'Designed calculation matrix layouts: Formulated weighted-score calculators that enforce university bounds (30% logbook, 30% appraisal, 40% final report).',
      'Created realistic API schemas: Designed high-fidelity JSON request contracts mirroring Postman endpoints.'
    ],
    challenges: [
      'Enforcing strict validation ranges in forms: Capturing outlier values (e.g., negative test inputs or score variables > 40) required custom input filters.',
      'Interpreting nested database arrays: Slicing days out of logs and aggregating their total hours was prone to index discrepancies.'
    ],
    strategies: [
      'Wrote centralized state validators: Created reusable validation guards that sweep numbers prior to saving to the memory.',
      'Simplified arrays mapping: Leveraged reduce functions to safely parse nested logging parameters.'
    ],
    improvement: 'I intend to focus heavily on PostgreSQL indexes optimization, database partitioning, and query caching algorithms to handle massive scale logging datasets.'
  },
  {
    studentId: 'student-godfrey',
    name: 'Kiwuuwa Godfrey (DevOps Engineer)',
    lessons: [
      'Architected continuous git checking pipelines: Configured GitLab CI directives that audit building processes automatically.',
      'Configured sandboxed container bindings: Adapted dev configurations to port 3000 mapping, strictly in line with ingress routing expectations.',
      'Designed interactive relational diagrams: Hand-crafted clean responsive vector components to represent system entities.'
    ],
    challenges: [
      'Troubleshooting local asset bundling: Vite compression was rejecting absolute imports during product compilation phases.',
      'Polishing interactive layouts: Handling drag-and-drop feedback states across mobile viewport touchpoints required specialized touch handling.'
    ],
    strategies: [
      'Configured alias paths: Refined tsconfig path parameters to align clean modular references.',
      'Built hover state guards: Programmed responsive togglers that swap actions depending on click-vs-touch signals.'
    ],
    improvement: 'I look forward to studying Kubernetes orchestration clusters, helm charting configurations, and automatic horizontal pod autoscaling under active load.'
  }
];

// Rich mock test results for local test suite simulator
export interface TestSuiteResult {
  suiteName: string;
  tests: {
    name: string;
    status: 'pass' | 'fail';
    duration: string;
    msg?: string;
  }[];
}

export const mockTestResults: TestSuiteResult[] = [
  {
    suiteName: '1. User & Role Management Tests',
    tests: [
      { name: 'verifyStudentProfilesLoadWithRegistrationNumbers', status: 'pass', duration: '12ms' },
      { name: 'validateRoleSwitchingAdjustsClearanceLevelsAndViews', status: 'pass', duration: '9ms' },
      { name: 'assertIdentifierBadgeStylingMatchesMemberProfile', status: 'pass', duration: '5ms' }
    ]
  },
  {
    suiteName: '2. Weekly Logbook & Placement Module Tests',
    tests: [
      { name: 'verifyStudentCanLogHoursAndAppendDailyLearnings', status: 'pass', duration: '18ms' },
      { name: 'validateWeeklyLogsAggregateDailyHoursCorrectly', status: 'pass', duration: '11ms' },
      { name: 'preventCreationOfWeeklyLogbooksExceeding40HourBounds', status: 'pass', duration: '15ms' }
    ]
  },
  {
    suiteName: '3. Supervisor & Weighted Score Tests',
    tests: [
      { name: 'verifySupervisorCanApproveWeeklyLogsAndSubmitRatingStars', status: 'pass', duration: '20ms' },
      { name: 'validateAcademicBoardWeightedAppraisalMathIsCorrect', status: 'pass', duration: '8ms' },
      { name: 'assertFinalScoreUpdatesDynamicallyOnChangingSliderScores', status: 'pass', duration: '10ms' }
    ]
  }
];

// Simulated Bugfix tracker to prove testing & debugging workflow evidence
export interface BugfixLog {
  id: string;
  issue: string;
  symptom: string;
  rootCause: string;
  fixApplied: string;
  status: 'Fixed' | 'Investigating';
  developer: string;
}

export const mockBugfixLogs: BugfixLog[] = [
  {
    id: 'BUG-109',
    issue: 'State loop freeze in Recharts rendering',
    symptom: 'Browser memory spikes and index.html crashes on opening the cumulative logging trend line.',
    rootCause: 'Placing raw cumulative dynamic lists inside Recharts components without dependency stabilization triggers rapid state-renders.',
    fixApplied: 'Memoized the cumulative calculations array via useMemo, decoupling it from the viewport width variable hooks.',
    status: 'Fixed',
    developer: 'Jordan Rukundo'
  },
  {
    id: 'BUG-110',
    issue: 'Negative evaluations input bypass',
    symptom: 'Academic evaluation slider allowed typing negative marks (-5) inside raw number input boxes.',
    rootCause: 'Form controls did not bind hard absolute lower bounds or validate values on change events.',
    fixApplied: 'Added Math.max(0, Math.min(maxVal, inputVal)) filters to sanitise the inputs dynamically.',
    status: 'Fixed',
    developer: 'Abraham Nzabandora'
  },
  {
    id: 'BUG-111',
    issue: 'Ingress routing failure (Connection Refused)',
    symptom: 'Production deployment shows 502 bad gateway error on accessing server.',
    rootCause: 'Express server default startup configuration was listening strictly to 127.0.0.1 instead of binder standard 0.0.0.0.',
    fixApplied: 'Refactored app.listen statements to declare 0.0.0.0 explicitly with the designated PORT 3000.',
    status: 'Fixed',
    developer: 'Kiwuuwa Godfrey'
  }
];
