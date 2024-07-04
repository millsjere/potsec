import { staffRoutes } from "./staff.route";
import { studentRoutes } from "./student.routes";

export const appRoutes = [...studentRoutes, ...staffRoutes];
