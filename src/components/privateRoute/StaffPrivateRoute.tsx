import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { getData, isAuth, sessionTimeout } from '../../config/appConfig'
import Loader from '../shared/Loaders/PageLoader'
import Layout from '../layout'


const StaffPrivateRoute = () => {
    const auth = isAuth()
    const currentTime = new Date().getTime()
    const sessionTime = getData('exp')
    const user = getData('uid')
    const role = user?.role

    console.log(user)
    if(auth){
        if((Number(sessionTime) > Number(currentTime)) && (role === 'staff' || role === 'admin')){
            if(user?.isLoginVerified){
                return (
                    <>
                        <Layout>
                            <React.Suspense fallback={<Loader />}>
                                <Outlet />
                            </React.Suspense>
                        </Layout>
                    </>
                )
            }else{
                return (
                    <Navigate to={'/staff/2fa'} replace />
                )
            }
        }

    }
    else {
        sessionTimeout()
        return (
            <>
                <Navigate to={'/staff'} replace />
            </>
        )
    }
    
}

export default StaffPrivateRoute