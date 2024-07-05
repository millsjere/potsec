import React from 'react'
import './index.scss'
import { ThemeProvider } from '@mui/material/styles'
import { theme } from './theme'
import { Navigate, Route, Routes } from 'react-router-dom'
import PublicRoute from './components/publicRoute/PublicRoute'
import MiddleRoute from './components/midRoute/MiddleRoute'
import { appRoutes } from './routes'
import { MuiAlert } from './components/shared'
import { AlertContextProvider } from './context/AlertContext'
import StudentPrivateRoute from './components/privateRoute/StudentPrivateRoute'
import StaffPrivateRoute from './components/privateRoute/StaffPrivateRoute'

export const App = () => {

  return (
    <AlertContextProvider>
      <ThemeProvider theme={theme}>
        <MuiAlert />
        <Routes>
          {/* Public Routes */}
          <Route element={<PublicRoute />}>
            {
              appRoutes?.filter(el => el?.isAuth === 'no').map((route, index) => {
                return (
                  <Route key={index} path={route?.path} element={<route.component />} />
                )
              })
            }
            <Route path="*" element={<Navigate replace to="/student" />} />
          </Route>

          {/* Middle Route */}
          <Route element={<MiddleRoute />}>
            {
              appRoutes?.filter(el => el?.isMiddle).map((route, index) => {
                return (
                  <Route key={index} path={route?.path} element={<route.component />} />
                )
              })
            }
            <Route path="*" element={<Navigate replace to="/verify" />} />
          </Route>

          {/* Student Private Routes */}
          <Route element={<StudentPrivateRoute />}>
            {
              appRoutes?.filter(el => (el?.isAuth === 'yes' && el?.role === 'student')).map((route, index) => {
                return (
                  <Route key={index} path={route?.path} element={<route.component />} />
                )
              })
            }
            <Route
              path="*"
              element={<Navigate replace to="/student/dashboard" />}
            />
          </Route>

          {/* Staff Private Routes */}
          <Route element={<StaffPrivateRoute />}>
            {
              appRoutes?.filter(el => (el?.isAuth === 'yes' && el?.role === 'staff')).map((route, index) => {
                return (
                  <Route key={index} path={route?.path} element={<route.component />} />
                )
              })
            }
            <Route
              path="*"
              element={<Navigate replace to="/staff/dashboard" />}
            />
          </Route>
        </Routes>
      </ThemeProvider>
    </AlertContextProvider>
  )
}
