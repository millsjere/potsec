import { Grid, Typography } from '@mui/material'
import React from 'react'
import { getData } from '../../../config/appConfig'
import SummaryCard from '../../../components/shared/Cards/SummaryCard'
import { Building03Icon, LibraryIcon, LicenseThirdPartyIcon, UserGroupIcon } from 'hugeicons-react'
import useAxiosFetch from '../../../hooks/useAxiosFetch'

const Dashboard = () => {
    const { isLoading, response: data } = useAxiosFetch('/api/dashboard/count')
    const user = getData('uid')
    const summary: any[] = [
        { icon: <LicenseThirdPartyIcon color='#fff' size={40} />, path: '/staff/all-students', bgcolor: '#005adf1a' },
        { icon: <UserGroupIcon color='#fff' size={40} />, path: '/staff/all-staff', bgcolor: '#005adf1a' },
        { icon: <LibraryIcon color='#fff' size={40} />, path: '/staff/programmes', bgcolor: '#005adf1a' },
        { icon: <Building03Icon color='#fff' size={40} />, path: '/staff/departments', bgcolor: '#005adf1a' }

    ]
    console.log(data)
    return (
        <div>
            <Typography variant='h5' fontWeight={500}>{`Welcome, ${user?.fullname}!`}</Typography>
            <Typography color={'GrayText'}>Here's what's happening today</Typography>

            {/* Summary Cards */}
            <Grid container spacing={3} mt={2}>
                {
                    (!isLoading && data) ?
                        Object.keys(data!)?.map((sum, i) => {
                            return (
                                <Grid key={i} item sm={3}>
                                    <SummaryCard
                                        title={data![sum]}
                                        subtitle={sum?.toUpperCase()}
                                        icon={summary[i]?.icon}
                                        path={summary[i]?.path}
                                        bgcolor={summary[i]?.bgcolor}
                                    />
                                </Grid>
                            )
                        }) : null
                }
            </Grid>
        </div>
    )
}

export default Dashboard