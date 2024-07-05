import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { getData, isAuth, sessionTimeout } from '../../config/appConfig'
import Loader from '../shared/Loaders/PageLoader'
import Layout from '../layout'


const StudentPrivateRoute = () => {
    const auth = isAuth()
    const currentTime = new Date().getTime()
    const sessionTime = getData('exp')
    const user = getData('uid')
    const { role } = user

    console.log(user)

    if(auth && (Number(sessionTime) > Number(currentTime)) && (role === 'staff' || role === 'admin')){
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
                <Navigate to={'/student/2fa'} replace />
            )
        }
    }
    else {
        sessionTimeout()
        return (
            <>
                <Navigate to={'/student'} replace />
            </>
        )
    }
    
}

export default StudentPrivateRoute