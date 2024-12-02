import React from 'react'
import { getData, isAuth, sessionTimeout } from '../../config/appConfig'
import { Navigate, Outlet } from 'react-router-dom'
import Loader from '../shared/Loaders/PageLoader'

const MiddleRoute = () => {
    const auth = isAuth()
    const currentTime = new Date().getTime()
    const sessionTime = getData('exp')
    const user = getData('uid')
    const role = user?.role

    if (auth) {
        if (auth && (Number(sessionTime) > Number(currentTime)) && (role === 'staff' || role === 'admin')) {
            if (user?.isLoginVerified) {
                return (
                    <Navigate to={'/staff/dashboard'} replace />
                )
            } else {
                return (
                    <React.Suspense fallback={<Loader />}>
                        <Outlet />
                    </React.Suspense>
                )
            }
        }
        if (auth && (Number(sessionTime) > Number(currentTime)) && (role === 'student' || role === 'applicant')) {
            if (user?.isLoginVerified) {
                return (
                    <Navigate to={'/account/dashboard'} replace />
                )
            } else {
                return (
                    <React.Suspense fallback={<Loader />}>
                        <Outlet />
                    </React.Suspense>
                )
            }
        }
    }
    sessionTimeout()
    return (
        <>
            <Navigate to={'/'} replace />
        </>
    )
}

export default MiddleRoute