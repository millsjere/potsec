import React, { useEffect } from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { getData, isAuth, saveData, sessionTimeout } from '../../config/appConfig'
import Loader from '../shared/Loaders/PageLoader'
import Layout from '../layout'
import useAxiosFetch from '../../hooks/useAxiosFetch'


const StudentPrivateRoute = () => {
    const auth = isAuth()
    const currentTime = new Date().getTime()
    const sessionTime = getData('exp')
    const user = getData('uid')
    const {response} = useAxiosFetch('/api/applicant/notify')

    useEffect(()=>{
        if(response){
            saveData('unf', response)
        }
    },[response])

    if (auth && (Number(sessionTime) > Number(currentTime))) {
        if (user?.isLoginVerified) {
            return (
                <>
                    <Layout>
                        <React.Suspense fallback={<Loader />}>
                            <Outlet />
                        </React.Suspense>
                    </Layout>
                </>
            )
        } else {
            return (
                <Navigate to={'/2fa'} replace />
            )
        }
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

export default StudentPrivateRoute