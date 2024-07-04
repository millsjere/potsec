import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { getData, isAuth } from '../../config/appConfig'
import Loader from '../shared/Loaders/PageLoader'

const PublicRoute = () => {
    const auth = isAuth()
    const user = getData('uid')

    if (auth && user?.isEmailVerified && user?.isLoginVerified) {
        return (
            <React.Suspense fallback={<Loader />}>
                <Navigate to={'/dashboard'} replace />
            </React.Suspense>
        )
    }
    if (auth && user?.isEmailVerified && !user?.isLoginVerified) {
        return (
            <React.Suspense fallback={<Loader />}>
                <Navigate to={'/auth-2fa'} replace />
            </React.Suspense>
        )
    }
    if (auth && !user?.isEmailVerified) {
        return (
            <React.Suspense fallback={<Loader />}>
                <Navigate to={'/verify-email'} replace />
            </React.Suspense>
        )
    }
    else {
        return (
            <React.Suspense fallback={<Loader />}>
                <Outlet />
            </React.Suspense>
        )
    }
}

export default PublicRoute