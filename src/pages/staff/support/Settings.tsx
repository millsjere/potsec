import React, { useEffect, useState } from 'react'
import PageHeader from '../../../components/shared/PageHeader'
import { Box, Grid, InputAdornment, MenuItem, Typography } from '@mui/material'
import { InputField, RoundButton } from '../../../components/shared'
import { base } from '../../../config/appConfig'
import swal from 'sweetalert'
import { useLoader } from '../../../context/LoaderContext'
import { allMonths, getYearRange, reload } from '../../../utils'
import useAxiosFetch from '../../../hooks/useAxiosFetch'

const Settings = () => {
    const { isLoading, response: allStaff } = useAxiosFetch('/api/staff/all')
    const { response: formPrice } = useAxiosFetch('/api/admission/form')
    const { response: admissionLetter } = useAxiosFetch('/api/admission/letter')
    const { startLoading, stopLoading } = useLoader()
    const [value, setValue] = useState({ old: '', password: '', confirmPassword: '' })
    const [staffPass, setStaffPass] = useState({ id: '', password: '', confirmPassword: '' })
    const [price, setPrice] = useState({ amount: 0, year: '', month: '' })
    const [letter, setLetter] = useState({ startDate: '', endDate: '', bank: '', accountNo: '', accountName: '', utilities: '' })
    const [load, setLoad] = useState(false)

    useEffect(() => {
        if (formPrice) {
            setPrice({ amount: formPrice?.amount, month: formPrice?.month, year: formPrice?.year })
        }
    }, [formPrice])
    useEffect(() => {
        if (admissionLetter) {
            setLetter({ startDate: admissionLetter?.startDate, endDate: admissionLetter?.endDate, bank: admissionLetter?.bank, accountNo: admissionLetter?.accountNo, accountName: admissionLetter?.accountName, utilities: admissionLetter?.utilities })
        }
    }, [admissionLetter])

    const changePasswordFn = async () => {
        console.log(value)
        //validate //
        if (value?.old === '') return swal('Error', 'Please provide the current password', 'error')
        if ((value?.password === '' || value?.confirmPassword === '')) return swal('Error', 'Passwords cannot be empty', 'error')
        if ((value?.password !== value?.confirmPassword)) return swal('Error', 'Passwords (confirm and new) do not match. Please check and try again', 'error')
        try {

            setLoad(true)
            startLoading('Updating password. Please wait...')
            await base.patch('/api/staff/reset-password', { password: value?.password, oldPassword: value?.old })
            swal('Success', 'Password updated successfully', 'success').then(reload)
        } catch (error: any) {
            console.log(error)
            swal('Error', error?.response?.data?.message || 'Sorry, could not update password', 'error')
        } finally {
            stopLoading()
            setLoad(false)
        }
    }

    const updateAdmissionDetails = async () => {
        if (price?.amount === 0) return swal('Error', 'Please provide an amount for admission forms ', 'error')
        if ((price?.month === '')) return swal('Error', 'Sorry, admission month cannot be empty', 'error')
        if ((price?.year === '')) return swal('Error', 'Sorry, admission year cannot be empty', 'error')
        try {
            startLoading('Updating admission form details. Please wait...')
            await base.patch('/api/admission/details', { amount: price?.amount, month: price?.month, year: price?.year })
            swal('Success', 'Admission forms details updated successfully', 'success').then(reload)
        } catch (error: any) {
            swal('Error', error?.response?.data?.message || 'Sorry, could not update admission forms details', 'error').then(reload)
        } finally {
            stopLoading()
        }
    }

    const onStaffPasswordReset = async () => {
        if (staffPass?.id === '') return swal('Error', 'Please select a staff', 'error')
        if ((staffPass?.password === '' || staffPass?.confirmPassword === '')) return swal('Error', 'Passwords cannot be empty', 'error')
        if ((staffPass?.password !== staffPass?.confirmPassword)) return swal('Error', 'Passwords (confirm and new) do not match. Please check and try again', 'error')
        try {
            console.log(staffPass)

            startLoading('Resetting staff password. Please wait...')
            await base.post(`/api/staff/reset-staff-password/${staffPass?.id}`, { newPassword: staffPass?.password })
            swal('Success', 'Password updated successfully', 'success').then(reload)
        } catch (error: any) {
            swal('Error', error?.response?.data?.message || 'Sorry, could not update password', 'error').then(reload)
        } finally {
            stopLoading()
        }

    }

    const admissionLetterUpdate = async () => {
        if (letter?.startDate === '' || letter?.endDate === '') return swal('Error', 'Please provide start and end dates', 'error')
        if ((letter?.bank === '' || letter?.accountName === '' || letter?.accountNo === '')) return swal('Error', 'Please provide bank details', 'error')
        if ((letter?.utilities === '')) return swal('Error', 'Please provide utilities', 'error')
        try {
            startLoading('Updating admission letter details. Please wait...')
            await base.patch('/api/admission/letter', letter)
            swal('Success', 'Admission letter updated successfully', 'success').then(reload)
        } catch (error: any) {
            swal('Error', error?.response?.data?.message || 'Sorry, could not update admission letter', 'error').then(reload)
        } finally {
            stopLoading()
        }

    }

    return (
        <div>
            <PageHeader title={'Settings'} breadcrumbs={[{ label: 'Settings', link: '#' }]} />
            <Grid container spacing={3}>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                    <Box bgcolor={'#fff'} borderRadius={'10px'} >
                        <Typography mt={2} variant='h6' px={3} py={2} mb={2} fontWeight={600} bgcolor={'lightblue'} fontSize={'1.1rem'}>Admin Password</Typography>
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
                                onClick={changePasswordFn} sx={{ mb: 2 }}
                                text='Change Password' color={'secondary'}
                                variant={'contained'} disableElevation

                            />
                        </Box>
                    </Box>
                </Grid>

                {/* Admission Form Details */}
                <Grid item xs={12} sm={12} md={6} lg={6}>
                    <Box bgcolor={'#fff'} borderRadius={'10px'} >
                        <Typography mt={2} variant='h6' px={3} py={2} mb={2} fontWeight={600} bgcolor={'lightblue'} fontSize={'1.1rem'}>Application Form</Typography>
                        <Box sx={{ py: '1rem', mx: 4 }}>
                            <InputField size={'small'} showTopLabel isRequired
                                type={'number'} fullWidth label='Amount'
                                variant={'outlined'} placeholder={formPrice?.amount}
                                onChange={(e) => { setPrice(prev => ({ ...prev, amount: e?.target?.value })) }}
                                value={price?.amount}
                                InputProps={{
                                    startAdornment: <InputAdornment position='start'>GHS</InputAdornment>
                                }}
                            />
                            <InputField size={'small'} showTopLabel isRequired
                                type={'text'} fullWidth label='Admission Month'
                                variant={'outlined'}
                                onChange={(e) => { setPrice(prev => ({ ...prev, month: e?.target?.value })) }}
                                value={price?.month} isSelect
                            >
                                {allMonths?.map((el, i) => <MenuItem key={i} value={el}>{el}</MenuItem>)}
                            </InputField>
                            <InputField size={'small'} showTopLabel isRequired
                                type={'text'} fullWidth label='Admission Year'
                                variant={'outlined'} value={price?.year} isSelect
                                onChange={(e) => { setPrice(prev => ({ ...prev, year: e?.target?.value })) }}
                            >
                                {getYearRange(2023)?.map((el, i) => <MenuItem key={i} value={el}>{el}</MenuItem>)}
                            </InputField>
                            <RoundButton loading={load}
                                onClick={updateAdmissionDetails} sx={{ mb: 2 }}
                                text='Update Details' color={'secondary'}
                                variant={'contained'} disableElevation

                            />
                        </Box>
                    </Box>
                </Grid>

                {/* Admission Letter */}
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Box bgcolor={'#fff'} borderRadius={'10px'} >
                        <Typography mt={2} variant='h6' px={3} py={2} mb={2} fontWeight={600} bgcolor={'lightblue'} fontSize={'1.1rem'}>Admission Letter</Typography>
                        <Box sx={{ py: '1rem', mx: 4 }}>
                            <InputField size={'small'} showTopLabel isRequired
                                type={'date'} fullWidth label='Admission Start Date'
                                variant={'outlined'} placeholder={''}
                                onChange={(e) => { setLetter(prev => ({ ...prev, startDate: e?.target?.value })) }}
                                value={letter?.startDate}
                            />
                            <InputField size={'small'} showTopLabel isRequired
                                type={'date'} fullWidth label='Tuition Payment - End Date'
                                variant={'outlined'} placeholder={''}
                                onChange={(e) => { setLetter(prev => ({ ...prev, endDate: e?.target?.value })) }}
                                value={letter?.endDate}
                            />
                            <InputField size={'small'} showTopLabel isRequired
                                type={'text'} fullWidth label='Bank Name'
                                variant={'outlined'} placeholder={''}
                                value={letter?.bank}
                                onChange={(e) => { setLetter(prev => ({ ...prev, bank: e?.target?.value })) }}
                            />
                            <InputField size={'small'} showTopLabel isRequired
                                type={'text'} fullWidth label='Bank Account No.'
                                variant={'outlined'} placeholder={''}
                                value={letter?.accountNo}
                                onChange={(e) => { setLetter(prev => ({ ...prev, accountNo: e?.target?.value })) }}
                            />
                            <InputField size={'small'} showTopLabel isRequired
                                type={'text'} fullWidth label='Bank Account Name'
                                variant={'outlined'} placeholder={''}
                                value={letter?.accountName}
                                onChange={(e) => { setLetter(prev => ({ ...prev, accountName: e?.target?.value })) }}
                            />
                            <InputField size={'small'} showTopLabel isRequired
                                type={'text'} fullWidth label='Utilities'
                                variant={'outlined'} placeholder={''} multiline rows={4}
                                value={letter?.utilities}
                                onChange={(e) => { setLetter(prev => ({ ...prev, utilities: e?.target?.value })) }}
                            />
                            <RoundButton loading={load}
                                onClick={admissionLetterUpdate} sx={{ mb: 2 }}
                                text='Update Letter' color={'secondary'}
                                variant={'contained'} disableElevation

                            />
                        </Box>
                    </Box>
                </Grid>

                {/* Staff Password Reset */}
                <Grid item xs={12} sm={12} md={6} lg={6}>
                    <Box bgcolor={'#fff'} borderRadius={'10px'} >
                        <Typography mt={2} variant='h6' px={3} py={2} mb={2} fontWeight={600} bgcolor={'lightblue'} fontSize={'1.1rem'}>Staff Password Reset</Typography>
                        <Box sx={{ py: '1rem', mx: 4 }}>
                            <InputField size={'small'} showTopLabel isRequired
                                type={'text'} fullWidth label='Select Staff'
                                variant={'outlined'} placeholder={''} isSelect
                                onChange={(e) => { setStaffPass(prev => ({ ...prev, id: e?.target?.value })) }}
                                value={staffPass?.id}
                            >
                                {
                                    (!isLoading && allStaff) &&
                                    allStaff?.filter((el: any) => el?.role !== 'admin')?.map((staff: any, i: number) => <MenuItem key={i} value={staff?.id}>{staff?.fullname}</MenuItem>)
                                }
                            </InputField>
                            <InputField size={'small'} showTopLabel isRequired
                                type={'password'} fullWidth label='New Password'
                                variant={'outlined'} placeholder={''}
                                onChange={(e) => { setStaffPass(prev => ({ ...prev, password: e?.target?.value })) }}
                                value={staffPass?.password}
                            />
                            <InputField size={'small'} showTopLabel isRequired
                                type={'password'} fullWidth label='Confirm Password'
                                variant={'outlined'} placeholder={''}
                                value={staffPass?.confirmPassword}
                                onChange={(e) => { setStaffPass(prev => ({ ...prev, confirmPassword: e?.target?.value })) }}
                            />
                            <RoundButton loading={load}
                                onClick={onStaffPasswordReset} sx={{ mb: 2 }}
                                text='Reset Password' color={'secondary'}
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