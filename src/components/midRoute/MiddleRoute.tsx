import React from 'react'
import { getData, isAuth, sessionTimeout } from '../../config/appConfig'
import { Navigate, Outlet } from 'react-router-dom'
import Loader from '../shared/Loaders/PageLoader'

const MiddleRoute = () => {
    const auth = isAuth()
    const currentTime = new Date().getTime()
    const sessionTime = getData('exp')
    const user = getData('uid')

    if (auth && (Number(sessionTime) > Number(currentTime)) && user?.isEmailVerified && user?.isLoginVerified) {
        return (
            <Navigate to={'/dashboard'} replace />
        )
    }
    if ((auth && (Number(sessionTime) > Number(currentTime)) && user?.isEmailVerified && !user?.isLoginVerified)
        || (auth && (Number(sessionTime) > Number(currentTime)) && !user?.isEmailVerified)) {
        return (
            <React.Suspense fallback={<Loader />}>
                <Outlet />
            </React.Suspense>
        )
    }
    else {
        sessionTimeout()
        return (
            <>
                <Navigate to={'/'} replace />
            </>
        )
    }
}

export default MiddleRoute