import { lazy } from "react";
import { RouteProps } from "../components/shared/Interfaces";

// Public Routes
const Login = lazy(() => import("../pages/staff/auth/Login"));
const VerifyLogin = lazy(() => import("../pages/staff/auth/Verify2FA"));

// Private Routes
const Dashboard = lazy(() => import("../pages/staff/dashboard/Dashboard"));
const AllStudents = lazy(() => import("../pages/staff/students/Students"));
const AddStudents = lazy(() => import("../pages/staff/students/AddStudent"));
const AllStaffs = lazy(() => import("../pages/staff/staffs/Staffs"));

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

const AddStudentsRoute = {
  path: "/staff/add-students",
  component: AddStudents,
  isAuth: "yes",
  role: "staff",
};

const StaffsRoute = {
  path: "/staff/all-staffs",
  component: AllStaffs,
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
  StaffsRoute,
];
