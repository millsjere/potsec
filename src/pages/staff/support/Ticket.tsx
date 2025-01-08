import { Grid } from '@mui/material'
import { Ticket02Icon } from 'hugeicons-react'
import React from 'react'
import SummaryCard, { SummaryProps } from '../../../components/shared/Cards/SummaryCard'
import PageHeader from '../../../components/shared/PageHeader'

const Ticket = () => {
    const summary: SummaryProps[] = [
        { title: '3000', subtitle: 'TOTAL TICKETS', icon: <Ticket02Icon color='#fff' size={40} />, path: '', bgcolor: '#005adf1a' },
        { title: '350', subtitle: 'NEW TICKETS', icon: <Ticket02Icon color='#fff' size={40} />, path: '', bgcolor: '#005adf1a' },
        { title: '25', subtitle: 'PROCESSING', icon: <Ticket02Icon color='#fff' size={40} />, path: '', bgcolor: '#005adf1a' },
        { title: '12', subtitle: 'RESOLVED', icon: <Ticket02Icon color='#fff' size={40} />, path: '', bgcolor: '#005adf1a' }
    ]
    return (
        <div>
            <PageHeader title={'Ticketing'} breadcrumbs={[{ label: 'Tickets', link: '#' }]} />
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

export default Ticket