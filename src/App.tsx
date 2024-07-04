import React from 'react'
import './index.scss'
import { ThemeProvider } from '@mui/material/styles'
import { theme } from './theme'
import { Navigate, Route, Routes } from 'react-router-dom'
import PublicRoute from './components/publicRoute/PublicRoute'
import MiddleRoute from './components/midRoute/MiddleRoute'
import PrivateRoute from './components/privateRoute/PrivateRoute'
import { appRoutes } from './routes'
import { MuiAlert } from './components/shared'
import { AlertContextProvider } from './context/AlertContext'

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
            <Route path="*" element={<Navigate replace to="/students" />} />
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

          {/* Private Routes */}
          <Route element={<PrivateRoute />}>
            {
              appRoutes?.filter(el => el?.isAuth === 'yes').map((route, index) => {
                return (
                  <Route key={index} path={route?.path} element={<route.component />} />
                )
              })
            }
            <Route
              path="*"
              element={<Navigate replace to="/dashboard" />}
            />
          </Route>
        </Routes>
      </ThemeProvider>
    </AlertContextProvider>
  )
}
