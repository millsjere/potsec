import { Grid, Typography } from '@mui/material'
import React from 'react'
import { getData } from '../../../config/appConfig'
import SummaryCard, { SummaryProps } from '../../../components/shared/Cards/SummaryCard'
import { Building03Icon, LibraryIcon, LicenseThirdPartyIcon, UserGroupIcon } from 'hugeicons-react'

const Dashboard = () => {
    const user = getData('uid')
    const summary: SummaryProps[] = [
        { title: '3000', subtitle: 'STUDENTS', icon: <LicenseThirdPartyIcon color='#fff' size={40} />, path: '/staff/all-students', bgcolor: '#005adf1a' },
        { title: '350', subtitle: 'STAFF', icon: <UserGroupIcon color='#fff' size={40} />, path: '/staff/all-staff', bgcolor: '#005adf1a' },
        { title: '25', subtitle: 'COURSES', icon: <LibraryIcon color='#fff' size={40} />, path: '/staff/courses', bgcolor: '#005adf1a' },
        { title: '12', subtitle: 'DEPARTMENTS', icon: <Building03Icon color='#fff' size={40} />, path: '', bgcolor: '#005adf1a' }

    ]
    return (
        <div>
            <Typography variant='h5' fontWeight={500}>{`Welcome, ${user?.fullname}!`}</Typography>
            <Typography color={'GrayText'}>Here's what's happening today</Typography>

            {/* Summary Cards */}
            <Grid container spacing={3} mt={2}>
                {
                    summary?.map((sum, i) => {
                        return (
                            <Grid key={i} item sm={3}>
                                <SummaryCard
                                    title={sum?.title}
                                    subtitle={sum?.subtitle}
                                    icon={sum?.icon}
                                    path={sum?.path}
                                    bgcolor={sum?.bgcolor}
                                />
                            </Grid>
                        )
                    })
                }
            </Grid>
        </div>
    )
}

export default Dashboard