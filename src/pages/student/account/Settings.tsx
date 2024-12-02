import React, { useState } from 'react'
import PageHeader from '../../../components/shared/PageHeader'
import { Box, Grid, Typography } from '@mui/material'
import { InputField, RoundButton } from '../../../components/shared'
import { base } from '../../../config/appConfig'
import swal from 'sweetalert'
import { useLoader } from '../../../context/LoaderContext'
import { reload } from '../../../utils'

const Settings = () => {
    const { startLoading, stopLoading } = useLoader()
    const [value, setValue] = useState({ old: '', password: '', confirmPassword: '' })
    const [load, setLoad] = useState(false)


    const onFormSubmit = async () => {
        console.log(value)
        //validate //
        if (value?.old === '') return swal('Error', 'Please provide the current password', 'error')
        if ((value?.password === '' || value?.confirmPassword === '')) return swal('Error', 'Passwords cannot be empty', 'error')
        if ((value?.password !== value?.confirmPassword)) return swal('Error', 'Passwords (confirm and new) do not match. Please check and try again', 'error')
        try {

            setLoad(true)
            startLoading('Updating password. Please wait...')
            await base.patch('/api/u/update-password', { password: value?.password, oldPassword: value?.old })
            swal('Success', 'Password updated successfully', 'success').then(reload)
        } catch (error: any) {
            console.log(error)
            swal('Error', error?.response?.data?.message || 'Sorry, could not update password', 'error')
        } finally {
            stopLoading()
            setLoad(false)
        }
    }

    return (
        <div>
            <PageHeader title={'Settings'} breadcrumbs={[{ label: 'Settings', link: '#' }]} />
            <Grid container>
                <Grid item xs={12} sm={12} md={12} lg={6}>
                    <Box bgcolor={'#fff'} borderRadius={'10px'} >
                        <Typography mt={2} variant='h6' px={3} py={2} mb={2} fontWeight={600} bgcolor={'lightblue'} fontSize={'1.1rem'}>Password & Security</Typography>
                        <Box sx={{ py: '1rem', mx: 4 }}>
                            <InputField size={'small'} showTopLabel isRequired
                                type={'password'} fullWidth label='Current Password'
                                variant={'outlined'} placeholder={''}
                                onChange={(e) => { setValue(prev => ({ ...prev, old: e?.target?.value })) }}
                                value={value?.old}
                            />
                            <InputField size={'small'} showTopLabel isRequired
                                type={'password'} fullWidth label='New Password'
                                variant={'outlined'} placeholder={''}
                                onChange={(e) => { setValue(prev => ({ ...prev, password: e?.target?.value })) }}
                                value={value?.password}
                            />
                            <InputField size={'small'} showTopLabel isRequired
                                type={'password'} fullWidth label='Confirm Password'
                                variant={'outlined'} placeholder={''}
                                onChange={(e) => { setValue(prev => ({ ...prev, confirmPassword: e?.target?.value })) }}
                            />
                            <RoundButton loading={load}
                                onClick={onFormSubmit} sx={{ mb: 2 }}
                                text='Change Password' color={'secondary'}
                                variant={'contained'} disableElevation

                            />
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </div>
    )
}

export default Settings