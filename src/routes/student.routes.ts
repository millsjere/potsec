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
const Settings = lazy(() => import("../pages/student/account/Settings"));
const ApplicationForm = lazy(
  () => import("../pages/student/account/ApplicationForm")
);

// Routes
const LoginRoute = {
  path: "/",
  component: Login,
  isAuth: "no",
};

const ForgotPasswordRoute = {
  path: "/forgot-password",
  component: ForgotPassword,
  isAuth: "no",
};

const ResetPasswordRoute = {
  path: "/reset-password",
  component: ResetPassword,
  isAuth: "no",
};

const VerifyAccountRoute = {
  path: "/verify-email",
  component: VerifyAccount,
  isMiddle: true,
};
const VerifyLoginRoute = {
  path: "/2fa",
  component: Verify2FA,
  isMiddle: true,
};

const DashboardRoute = {
  path: "/account/dashboard",
  component: Dashboard,
  isAuth: "yes",
  role: "student" || "applicant",
};

const ApplicationRoute = {
  path: "/account/application",
  component: ApplicationForm,
  isAuth: "yes",
  role: "student" || "applicant",
};

const SettingsRoute = {
  path: "/account/settings",
  component: Settings,
  isAuth: "yes",
  role: "student" || "applicant",
};

// export all routes as array
export const studentRoutes: RouteProps[] = [
  LoginRoute,
  ForgotPasswordRoute,
  ResetPasswordRoute,
  VerifyAccountRoute,
  VerifyLoginRoute,
  DashboardRoute,
  ApplicationRoute,
  SettingsRoute,
];
