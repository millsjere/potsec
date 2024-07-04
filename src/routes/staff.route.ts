import { lazy } from "react";
import { RouteProps } from "../components/shared/Interfaces";

// Public Routes
const Login = lazy(() => import("../pages/staff/auth/Login"));
const ForgotPassword = lazy(() => import("../pages/staff/auth/ForgotPassword"));
const ResetPassword = lazy(() => import("../pages/staff/auth/ResetPassword"));

// Routes
const LoginRoute = {
  path: "/staff",
  component: Login,
  isAuth: "no",
};

const ForgotPasswordRoute = {
  path: "/staff/forgot-password",
  component: ForgotPassword,
  isAuth: "no",
};

const ResetPasswordRoute = {
  path: "/staff/reset-password",
  component: ResetPassword,
  isAuth: "no",
};

// export all routes as array
export const staffRoutes: RouteProps[] = [
  LoginRoute,
  ForgotPasswordRoute,
  ResetPasswordRoute,
];
