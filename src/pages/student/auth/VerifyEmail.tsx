
import React, { useState } from 'react';
import { InputAdornment, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Slide from '../../../assets/images/skill_01.jpeg'
import { base, getData, saveData } from '../../../config/appConfig';
import { AuthWrapper, InputField, RoundButton } from '../../../components/shared';
import { Mail01Icon } from 'hugeicons-react';
import { useAlert } from '../../../context/AlertContext';


const VerifyEmail = () => {
    const navigate = useNavigate()
    const [load, setLoad] = useState(false)
    const [code, setCode] = useState('')
    const user = getData('uid')
    const { successAlert, errorAlert } = useAlert()

    console.log(user)

    const resendToken = async () => {
        try {
            successAlert('Resending email token...')
            setLoad(true)
            const { data: res } = await base.get('/api/u/resend/email-verification')
            if (res?.success === 'success') {
                successAlert('Verification token has been sent to your email')
            }
        } catch (error) {
            setLoad(false)
        } finally {
            setLoad(false)
        }
    }

    const onFormSubmit = async () => {
        if (code === '') return errorAlert('Please provide token')
        if (code?.length < 6) return errorAlert('Token must be 6 characters')
        try {
            setLoad(true)
            const { data: res } = await base.post('/api/u/verify-account', { code })
            if (res?.status === 'success') {
                saveData('uid', res?.data?.user)
                successAlert('Account verification successful')
                navigate('/dashboard', { replace: true })
            }
        } catch (error) {
            errorAlert(error?.response?.data?.message)
        } finally {
            setLoad(false)

        }
    }



    return (
        <>
            <AuthWrapper
                title={<Typography sx={{ fontWeight: 500, mb: .5 }} variant='h5'>Verify Your Account</Typography>}
                subtitle={<Typography sx={{ mb: 3 }} paragraph color='textSecondary'>To verify your account, we've sent a token to your registered email address ({user?.email})</Typography>}
                image={Slide} imagePosition={'center'}
                order={2}
            >
                <InputField variant='outlined'
                    label='Email Token' type='email' inputProps={{ maxLength: 6 }}
                    InputProps={{ endAdornment: <InputAdornment position='start'><Mail01Icon size={20} color='#acacac' /></InputAdornment> }}
                    value={code} onChange={(e) => setCode(e.target.value)} fullWidth
                />
                <RoundButton onClick={onFormSubmit}
                    loading={load} sx={{ mb: '1rem' }}
                    text='Verify Account' variant={'contained'}
                    color='secondary' disableElevation fullWidth
                />
                <Typography textAlign={'center'} variant='body1' paragraph color={'GrayText'} >Didn't get the token? <span onClick={resendToken} style={{ cursor: 'pointer', color: '#ED8A2F' }}>Resend Token </span> </Typography>
            </AuthWrapper>
        </>
    )
};


export default VerifyEmail;
