import { lazy } from "react";
import { RouteProps } from "../components/shared/Interfaces";

// Public Routes
const Login = lazy(() => import("../pages/student/auth/Login"));
const ForgotPassword = lazy(
  () => import("../pages/student/auth/ForgotPassword")
);
const ResetPassword = lazy(() => import("../pages/student/auth/ResetPassword"));

// Private Routes
const VerifyAccount = lazy(() => import("../pages/student/auth/VerifyEmail"));
const Verify2FA = lazy(() => import("../pages/staff/auth/Verify2FA"));
const Dashboard = lazy(() => import("../pages/student/account/Dashboard"));

// Routes
const LoginRoute = {
  path: "/student",
  component: Login,
  isAuth: "no",
};

const ForgotPasswordRoute = {
  path: "/student/forgot-password",
  component: ForgotPassword,
  isAuth: "no",
};

const ResetPasswordRoute = {
  path: "/student/reset-password",
  component: ResetPassword,
  isAuth: "no",
};

const VerifyAccountRoute = {
  path: "/student/verify-email",
  component: VerifyAccount,
  isMiddle: true,
};
const VerifyLoginRoute = {
  path: "/student/2fa",
  component: Verify2FA,
  isMiddle: true,
};

const DashboardRoute = {
  path: "/student/dashboard",
  component: Dashboard,
  isAuth: "yes",
  role: 'student'
};

// export all routes as array
export const studentRoutes: RouteProps[] = [
  LoginRoute,
  ForgotPasswordRoute,
  ResetPasswordRoute,
  VerifyAccountRoute,
  VerifyLoginRoute,
  DashboardRoute,
];
