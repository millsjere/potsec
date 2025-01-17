import { lazy } from "react";
import { RouteProps } from "../components/shared/Interfaces";

// Public Routes
const Login = lazy(() => import("../pages/staff/auth/Login"));
const VerifyLogin = lazy(() => import("../pages/staff/auth/Verify2FA"));

// Private Routes
const Dashboard = lazy(() => import("../pages/staff/dashboard/Dashboard"));
const AllApplications = lazy(
  () => import("../pages/staff/application/Applications")
);
const StudentDetails = lazy(
  () => import("../pages/staff/students/StudentDetails")
);
const NewApplication = lazy(
  () => import("../pages/staff/application/NewApplication")
);
const AllStaffs = lazy(() => import("../pages/staff/staffs/Staffs"));
const AllStudents = lazy(() => import("../pages/staff/students/AllStudents"));
const Programmes = lazy(() => import("../pages/staff/programmes/Programmes"));
const ProgrammeDetail = lazy(
  () => import("../pages/staff/programmes/ProgrammeDetails")
);
const Departments = lazy(() => import("../pages/staff/department/Departments"));
const Transcripts = lazy(() => import("../pages/staff/transcript/Transcript"));
const Ticketing = lazy(() => import("../pages/staff/support/Ticket"));
const Settings = lazy(() => import("../pages/staff/support/Settings"));
const Grading = lazy(() => import("../pages/staff/grading/AcademicResult"));

// Routes
const LoginRoute = {
  path: "/staff",
  component: Login,
  isAuth: "no",
};

const VerifyLoginRoute = {
  path: "/staff/2fa",
  component: VerifyLogin,
  isMiddle: true,
};

const DashboardRoute = {
  path: "/staff/dashboard",
  component: Dashboard,
  isAuth: "yes",
  role: "staff",
};

const ApplicationRoute = {
  path: "/staff/applicants",
  component: AllApplications,
  isAuth: "yes",
  role: "staff",
};

const StudentsDetailsRoute = {
  path: "/staff/applicant/:id/view",
  component: StudentDetails,
  isAuth: "yes",
  role: "staff",
};

const NewApplicationRoute = {
  path: "/staff/application",
  component: NewApplication,
  isAuth: "yes",
  role: "staff",
};

const StudentsRoute = {
  path: "/staff/all-students",
  component: AllStudents,
  isAuth: "yes",
  role: "staff",
};

const StaffsRoute = {
  path: "/staff/all-staff",
  component: AllStaffs,
  isAuth: "yes",
  role: "staff",
};

const ProgrammeRoute = {
  path: "/staff/programmes",
  component: Programmes,
  isAuth: "yes",
  role: "staff",
};

const ProgrammeDetailRoute = {
  path: "/staff/programmes/:id/edit",
  component: ProgrammeDetail,
  isAuth: "yes",
  role: "staff",
};

const DepartmentRoute = {
  path: "/staff/departments",
  component: Departments,
  isAuth: "yes",
  role: "staff",
};

const DocumentRoute = {
  path: "/staff/documents",
  component: Transcripts,
  isAuth: "yes",
  role: "staff",
};

const TicketRoute = {
  path: "/staff/ticketing",
  component: Ticketing,
  isAuth: "yes",
  role: "staff",
};

const SettingsRoute = {
  path: "/staff/settings",
  component: Settings,
  isAuth: "yes",
  role: "staff",
};

const GradingRoute = {
  path: "/staff/grading",
  component: Grading,
  isAuth: "yes",
  role: "staff",
};

// export all routes as array
export const staffRoutes: RouteProps[] = [
  LoginRoute,
  VerifyLoginRoute,
  DashboardRoute,
  ApplicationRoute,
  NewApplicationRoute,
  StudentsDetailsRoute,
  StudentsRoute,
  StaffsRoute,
  ProgrammeRoute,
  ProgrammeDetailRoute,
  DepartmentRoute,
  TicketRoute,
  SettingsRoute,
  DocumentRoute,
  GradingRoute
];
