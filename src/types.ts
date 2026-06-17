export type RoleType = 'student' | 'supervisor' | 'evaluator' | 'admin';

export interface UserProfile {
  id: string;
  name: string;
  studentNo?: string;
  regNo?: string;
  badgeText: string;
  badgeBg: string; // for unique identifier badge styling
  badgeColor: string;
  role: RoleType;
  email: string;
  avatarUrl: string;
  department: string;
  organization?: string;
  hoursWorked: number;
  tasksCompleted: number;
  status: string;
}

export interface DayLog {
  id: string;
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday';
  date: string;
  tasksCompleted: string;
  skillsAcquired: string;
  hoursWorked: number;
}

export interface WeeklyLog {
  id: string;
  studentId: string;
  studentName: string;
  weekNumber: number;
  startDate: string;
  endDate: string;
  dailyLogs: DayLog[];
  totalHours: number;
  status: 'draft' | 'pending' | 'approved' | 'rejected';
  supervisorRating: number; // 1-5 stars
  supervisorComments: string;
  feedbackDate?: string;
  submittedDate?: string;
}

export interface Placement {
  id: string;
  studentId: string;
  studentName: string;
  studentNo: string;
  companyName: string;
  location: string;
  position: string;
  startDate: string;
  endDate: string;
  status: 'draft' | 'submitted' | 'approved' | 'completed';
  supervisorName: string;
  supervisorEmail: string;
  fieldOfficerName: string;
}

export interface EvaluationRubric {
  logbookProgress: number; // Max 30: Student's weekly logging execution and learning reflections
  supervisorAppraisal: number; // Max 30: Industry supervisor's evaluation of performance
  academicPresentation: number; // Max 40: Board presentation, final defense, and technical report
}

export interface AcademicEvaluation {
  id: string;
  studentId: string;
  studentName: string;
  studentNo: string;
  fieldSupervisorScore: number; // max 30
  weeklyLogbookScore: number;     // max 30
  academicReportScore: number;    // max 40
  totalWeightedScore: number;     // max 100
  examinerName: string;
  comments: string;
  status: 'draft' | 'final';
  gradedDate?: string;
}

export interface GitCommit {
  hash: string;
  authorName: string;
  gitlabUsername: string;
  date: string;
  message: string;
  branch: string;
  deletions: number;
  insertions: number;
}

export interface GitMergeRequest {
  id: string;
  title: string;
  authorName: string;
  gitlabUsername: string;
  sourceBranch: string;
  targetBranch: string;
  status: 'merged' | 'open' | 'closed';
  date: string;
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  date: string;
  read: boolean;
  type: 'info' | 'success' | 'warning' | 'error';
}

export interface StudentReflection {
  studentId: string;
  name: string;
  lessons: string[];
  challenges: string[];
  strategies: string[];
  improvement: string;
}
