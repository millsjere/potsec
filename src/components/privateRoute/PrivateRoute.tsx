import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { getData, isAuth, sessionTimeout } from '../../config/appConfig'
import Loader from '../shared/Loaders/PageLoader'
import Layout from '../layout'


const PrivateRoute = () => {
    const auth = isAuth()
    const currentTime = new Date().getTime()
    const sessionTime = getData('exp')
    const user = getData('uid')

    console.log(user)


    if (auth && (Number(sessionTime) > Number(currentTime)) && user?.isEmailVerified && user?.isLoginVerified) {
        return (
            <>
                <Layout>
                    <React.Suspense fallback={<Loader />}>
                        <Outlet />
                    </React.Suspense>
                </Layout>
            </>
        )
    }
    if (auth && (Number(sessionTime) > Number(currentTime)) && user?.isEmailVerified && !user?.isLoginVerified) {
        return (
            <Navigate to={'/auth-2fa'} replace />
        )
    }
    if (auth && (Number(sessionTime) > Number(currentTime)) && !user?.isEmailVerified) {
        return (
            <Navigate to={'/verify-email'} replace />
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

export default PrivateRoute