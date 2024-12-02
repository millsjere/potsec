import React from 'react'
import { getData } from '../../../config/appConfig'
import { Box, Card, CardContent, Grid, Typography } from '@mui/material'
import { CheckmarkCircle02Icon, CreditCardValidationIcon, DocumentValidationIcon, File01Icon, UserSwitchIcon } from 'hugeicons-react'

const Dashboard = () => {
    const currentUser = getData('uid')
    const stage = currentUser?.applicationStage || 1
    const steps = [
        { icon: stage > 0 ? <CheckmarkCircle02Icon size={40} color='red' /> : <CreditCardValidationIcon size={40} color='lightgrey' />, title: 'Purchase Form' },
        { icon: stage > 1 ? <CheckmarkCircle02Icon size={40} color='red' /> : <File01Icon size={40} color='lightgrey' />, title: 'Fill & Submit Application' },
        { icon: stage > 2 ? <CheckmarkCircle02Icon size={40} color='red' /> : <UserSwitchIcon size={40} color='lightgrey' />, title: 'Processing' },
        { icon: stage > 3 ? <CheckmarkCircle02Icon size={40} color='red' /> : <DocumentValidationIcon size={40} color='lightgrey' />, title: 'Get Selected' },
    ]

    return (
        <div>
            <Typography variant='h5'>{`Hello, ${currentUser?.fullname}`} 👋</Typography>
            <Typography fontWeight={400}>Update and track your application progress here.</Typography>

            <Box mt={3}>
                <Grid container spacing={3}>
                    {
                        steps?.map((el: any, i: number) => (
                            <Grid item sm={3} key={i}>
                                <Card elevation={0} sx={{ borderRadius: '15px' }}>
                                    <CardContent sx={{ p: '2rem' }}>
                                        {el?.icon}
                                        <Typography mt={3} variant='h6'>{el?.title}</Typography>
                                        <Typography variant='body2' fontWeight={400}>Tell us a little about yourself and we’ll help with the rest. Our convenient online application tool only takes 10 minutes to complete.</Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))
                    }
                </Grid>
            </Box>
        </div>
    )
}

export default Dashboard