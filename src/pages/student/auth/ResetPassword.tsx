import React, { useReducer, useState } from 'react'
import { AuthWrapper, InputField, RoundButton } from '../../../components/shared'
import { InputAdornment, Typography } from '@mui/material'
import { LockIcon, ViewIcon, ViewOffIcon } from 'hugeicons-react'
import BgImage from '../../../assets/images/skill_01.jpeg'
import { useAlert } from '../../../context/AlertContext'
import { base, saveData } from '../../../config/appConfig'
import { useNavigate } from 'react-router-dom'

type StateProps = {
    password: string
    confirmPassword: string
    token: string
}

const ResetPassword = () => {
    const navigate = useNavigate()
    const [confirm, setConfirm] = useState(false)
    const [load, setLoad] = useState(false)
    const [show, setShow] = useState(false)
    const { successAlert, errorAlert } = useAlert()
    const type = localStorage.getItem('rs-tp')
    const value = localStorage.getItem('rs-vl')


    const reducerFn = (state: StateProps, action: { type: any; payload: any }) => {
        switch (action.type) {
            case "TOKEN":
                return { ...state, token: action.payload }
            case "PASSWORD":
                return { ...state, password: action.payload }
            case "CONFIRM_PASSWORD":
                return { ...state, confirmPassword: action.payload }
            case "RESET":
                return { password: '', confirmPassword: '', token: '' }
            default:
                return state
        }
    }
    const [formInput, dispatch] = useReducer(reducerFn, { password: '', confirmPassword: '', token: '' })

    const onFormSubmit = async () => {
        // validate fields
        if (!type || !value) {
            errorAlert('Access Denied. Go to Forgot Password to start process')
            setTimeout(() => {
                navigate('/students/forgot-password', { replace: true })
            }, 2000);
            return
        }
        if (formInput.token === '' || formInput.token.length < 6) return errorAlert('Provide reset token');
        if (formInput.password.length < 8 || formInput.confirmPassword.length < 8) return errorAlert('Password must more than 8 characters');
        if (formInput.password !== formInput.confirmPassword) return errorAlert('Passwords do not match');
        // api call
        try {
            const payload = {
                token: formInput.token,
                password: formInput.password,
                type,
                value
            }
            setLoad(true)
            const { data: res } = await base.post('/api/u/reset-password', payload)
            if (res?.status === 'success') {
                saveData('uac', res?.data?.ac)
                saveData('uid', res?.data?.user)
                saveData('exp', res?.data?.expiry)
                successAlert('User account reset successful')
                localStorage.removeItem('rs-tp');
                localStorage.removeItem('rs-vl');
                navigate('/account/dashboard', { replace: true })
            }
        } catch (error: any) {
            console.log(error)
            errorAlert(error?.response?.data?.message)
        } finally {
            setLoad(false)
        }
    }

    const resendToken = async () => {
        if (!type || !value) {
            errorAlert('Access Denied. Go to Forgot Password to start process')
            setTimeout(() => {
                navigate('/forgot-password', { replace: true })
            }, 2000);
            return
        }
        const payload = { type };
        if (type === 'email') {
            Object.defineProperty(payload, 'email', { value, writable: true, enumerable: true })
        } else {
            Object.defineProperty(payload, 'sms', { value, writable: true, enumerable: true })
        }
        try {
            setLoad(true)
            successAlert('Resending reset token...')
            const { data: res } = await base.post('/api/u/forgot-password', payload)
            if (res?.status === 'success') {
                successAlert('Success. Reset token sent to ' + type)
            }
        } catch (error) {
            errorAlert(error?.response?.data?.message)
        } finally {
            setLoad(false)
        }
    }


    return (
        <AuthWrapper
            title={<Typography sx={{ fontWeight: 500, mb: .5 }} variant='h5'>Reset Password</Typography>}
            subtitle={<Typography sx={{ mb: 3 }} paragraph color='textSecondary'>Password must be more than 8 characters</Typography>}
            image={BgImage} imagePosition={'right'}
            order={2}
        >
            <form>
                <InputField
                    inputProps={{ maxLength: 6 }}
                    type={'text'}
                    variant='outlined'
                    value={formInput?.token}
                    onChange={(e) => dispatch({ type: "TOKEN", payload: e.target.value })}
                    label={'Reset Token'}
                    fullWidth
                    InputProps={{ endAdornment: <InputAdornment position='start'><LockIcon size={20} color='#ED8A2F' /></InputAdornment> }}
                />
                <InputField variant='outlined' type={show ? 'text' : 'password'}
                    label='New Password'
                    InputProps={{
                        endAdornment: <InputAdornment sx={{ cursor: 'pointer' }} position='start'>{
                            show ? <ViewIcon onClick={() => setShow(!show)} size={20} color='#ED8A2F' />
                                : <ViewOffIcon onClick={() => setShow(!show)} size={20} color='#ED8A2F' />}
                        </InputAdornment>
                    }}
                    value={formInput.password}
                    onChange={(e) => dispatch({ type: "PASSWORD", payload: e.target.value })}
                    fullWidth
                />
                <InputField variant='outlined' type={confirm ? 'text' : 'password'}
                    label='Confirm Password'
                    InputProps={{
                        endAdornment: <InputAdornment sx={{ cursor: 'pointer' }} position='start'>{
                            confirm ? <ViewIcon onClick={() => setConfirm(!confirm)} size={20} color='#ED8A2F' />
                                : <ViewOffIcon onClick={() => setConfirm(!confirm)} size={20} color='#ED8A2F' />}
                        </InputAdornment>
                    }}
                    value={formInput.confirmPassword}
                    onChange={(e) => dispatch({ type: "CONFIRM_PASSWORD", payload: e.target.value })}
                    fullWidth
                />
                <RoundButton onClick={onFormSubmit}
                    loading={load} sx={{ mb: '1rem' }}
                    text='Reset' variant={'contained'}
                    color='secondary' disableElevation fullWidth
                />
                <Typography textAlign={'center'} variant='body2' color={'GrayText'} >Didn't get the token? <span onClick={resendToken} style={{ cursor: 'pointer', color: '#ED8A2F' }}>Resend Token </span> </Typography>

            </form>
        </AuthWrapper>
    )
}

export default ResetPassword