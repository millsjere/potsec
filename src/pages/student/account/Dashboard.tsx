import React from 'react'
import { getData } from '../../../config/appConfig'
import { Box, Card, CardContent, Grid, Typography } from '@mui/material'
import { CheckmarkCircle02Icon, CreditCardValidationIcon, DocumentValidationIcon, File01Icon, UserSwitchIcon } from 'hugeicons-react'
import { useNavigate } from 'react-router-dom'
import { RoundButton } from '../../../components/shared'

const Dashboard = () => {
    const currentUser = getData('uid')
    const navigate = useNavigate()
    const stage = currentUser?.applicationStage || 1
    const steps = [
        { icon: stage > 0 ? <CheckmarkCircle02Icon size={40} color='red' /> : <CreditCardValidationIcon size={40} color='lightgrey' />, title: 'Purchase Form', copy: 'Start your journey with us by securing your admission form today! Your future begins with a single step.' },
        { icon: stage > 1 ? <CheckmarkCircle02Icon size={40} color='red' /> : <File01Icon size={40} color='lightgrey' />, title: 'Fill & Submit Application', copy: 'Complete the application form providing all required details to join our vibrant learning community.' },
        { icon: stage > 2 ? <CheckmarkCircle02Icon size={40} color='red' /> : <UserSwitchIcon size={40} color='lightgrey' />, title: 'Processing', copy: 'Our team is carefully reviewing your application to ensure all your efforts shine. Stay tuned for updates' },
        { icon: stage > 3 ? <CheckmarkCircle02Icon size={40} color='red' /> : <DocumentValidationIcon size={40} color='lightgrey' />, title: 'Get Selected', copy: 'Congratulations! You’re one step closer to greatness. Welcome to the POTSEC family where success is nurtured!' },
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
                                <Card elevation={0} sx={{ borderRadius: '15px', height: '100%' }}>
                                    <CardContent sx={{ p: '2rem' }}>
                                        {el?.icon}
                                        <Typography mt={3} variant='h6'>{el?.title}</Typography>
                                        <Typography variant='body1' fontWeight={400}>{el?.copy}</Typography>
                                        <RoundButton onClick={() => navigate('/account/application')} text='Application Form' size={'small'} color={'primary'} variant={'contained'} disableElevation />

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