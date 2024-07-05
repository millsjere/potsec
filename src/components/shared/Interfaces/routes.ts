import React, { LazyExoticComponent } from "react";

export interface RouteProps {
  path: string;
  component: LazyExoticComponent<() => React.ReactNode>;
  isAuth?: string;
  isMiddle?: boolean;
  role?: string
}
