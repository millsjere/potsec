import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { getData, isAuth } from '../../config/appConfig'
import Loader from '../shared/Loaders/PageLoader'

const PublicRoute = () => {
    const auth = isAuth()
    const user = getData('uid')
    const role = user?.role
    // console.log(auth)

    if(auth){
        if((role === 'staff' || role === 'admin')){
            if(user?.isLoginVerified){
                console.log('staff is verified')
                return (
                    <React.Suspense fallback={<Loader />}>
                        <Navigate to={'/staff/dashboard'} replace />
                    </React.Suspense>
                )
            }else{
                console.log('staff is not yet verified')
                return (
                        <React.Suspense fallback={<Loader />}>
                            <Navigate to={'/staff/2fa'} replace />
                        </React.Suspense>
                )
            }
        }
        if((role === 'student')){
            if(user?.isLoginVerified){
                console.log('student is verified')
                return (
                    <React.Suspense fallback={<Loader />}>
                        <Navigate to={'/student/dashboard'} replace />
                    </React.Suspense>
                )
            }else{
                console.log('student is not yet verified')
                return (
                    <React.Suspense fallback={<Loader />}>
                        <Navigate to={'/student/2fa'} replace />
                    </React.Suspense>
                )
            }
        }
    }
        return (
            <React.Suspense fallback={<Loader />}>
                <Outlet />
            </React.Suspense>
        )
}

export default PublicRoute