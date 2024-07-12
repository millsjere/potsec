import { lazy } from "react";
import { RouteProps } from "../components/shared/Interfaces";

// Public Routes
const Login = lazy(() => import("../pages/staff/auth/Login"));
const VerifyLogin = lazy(() => import("../pages/staff/auth/Verify2FA"));

// Private Routes
const Dashboard = lazy(() => import("../pages/staff/dashboard/Dashboard"));
const AllStudents = lazy(() => import("../pages/staff/students/Students"));
const StudentDetails = lazy(
  () => import("../pages/staff/students/StudentDetails")
);
const AddStudents = lazy(() => import("../pages/staff/students/AddStudent"));
const AllStaffs = lazy(() => import("../pages/staff/staffs/Staffs"));
const Programmes = lazy(() => import("../pages/staff/programmes/Programmes"));
const Departments = lazy(() => import("../pages/staff/department/Departments"));

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

const StudentsRoute = {
  path: "/staff/all-students",
  component: AllStudents,
  isAuth: "yes",
  role: "staff",
};

const StudentsDetailsRoute = {
  path: "/staff/all-students/:id",
  component: StudentDetails,
  isAuth: "yes",
  role: "staff",
};

const AddStudentsRoute = {
  path: "/staff/add-student",
  component: AddStudents,
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

const DepartmentRoute = {
  path: "/staff/departments",
  component: Departments,
  isAuth: "yes",
  role: "staff",
};

// export all routes as array
export const staffRoutes: RouteProps[] = [
  LoginRoute,
  VerifyLoginRoute,
  DashboardRoute,
  StudentsRoute,
  AddStudentsRoute,
  StudentsDetailsRoute,
  StaffsRoute,
  ProgrammeRoute,
  DepartmentRoute,
];
