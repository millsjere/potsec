import { lazy } from "react";
import { RouteProps } from "../components/shared/Interfaces";

// Public Routes
const Login = lazy(() => import("../pages/staff/auth/Login"));
const VerifyLogin = lazy(() => import("../pages/staff/auth/Verify2FA"));

// Private Routes
const Dashboard = lazy(() => import("../pages/staff/account/Dashboard"));


// Routes
const LoginRoute = {
  path: "/staff",
  component: Login,
  isAuth: "no",
};

const VerifyLoginRoute = {
  path: "/staff/2fa",
  component: VerifyLogin,
  isMiddle: true
};

const DashboardRoute = {
  path: "/staff/dashboard",
  component: Dashboard,
  isAuth: "yes",
  role: 'staff'
};

// export all routes as array
export const staffRoutes: RouteProps[] = [
  LoginRoute,
  VerifyLoginRoute,
  DashboardRoute
];
