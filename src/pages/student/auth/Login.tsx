import { InputAdornment, Typography } from '@mui/material';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { base, saveData } from '../../../config/appConfig';
import { ArrowRight01Icon, SquareLock02Icon, UserCircleIcon } from 'hugeicons-react';
import { AuthWrapper, InputField, RoundButton } from '../../../components/shared'
import BgImage from '../../../assets/images/skill_06.jpeg'
import { useAlert } from '../../../context/AlertContext';


const Login = () => {
    const navigate = useNavigate()
    const { successAlert, errorAlert } = useAlert()
    const [load, setLoad] = React.useState(false)
    const [value, setValue] = React.useState({ email: '', password: '' })

    // console.log(getData('uid'))

    const onFormSubmit = async () => {
        const validateEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (value.email === '' || !value?.email?.match(validateEmail)) return errorAlert('Please provide a valid email address')
        if (value.password === '') return errorAlert('Please enter your password')
        try {
            setLoad(true)
            const url = '/api/u/login'
            const { data: res } = await base.post(url, value)
            if (res?.status === 'success') {
                console.log(res?.data)
                localStorage.setItem('user', res?.data?.user)
                saveData('uac', res?.data?.ac)
                saveData('uid', res?.data?.user)
                saveData('exp', res?.data?.expiry)
                successAlert('User Login successful')
                navigate('/2fa', { replace: true })
            }
        } catch (error: any) {
            errorAlert(error?.response?.data?.message)
        } finally {
            setLoad(false)
        }
    }


    return (
        <>
            <AuthWrapper
                title={<Typography sx={{ fontWeight: 500, mb: .5 }} variant='h5'>Welcome Again</Typography>}
                subtitle={<Typography textAlign={'center'} sx={{ mb: 3 }} paragraph color='textSecondary' >Please provide your credentials to login
                </Typography>}
                image={BgImage}
                order={2}
                imagePosition={'center'}
            >
                <div>
                    <InputField variant='outlined'
                        label='Email' type='email'
                        InputProps={{ endAdornment: <InputAdornment position='start'><UserCircleIcon size={20} color='#acacac' /></InputAdornment> }}
                        value={value?.email} onChange={(e) => setValue(prev => ({ ...prev, email: e.target.value }))} fullWidth
                    />
                    <InputField variant='outlined'
                        label='Password' type='password'
                        InputProps={{ endAdornment: <InputAdornment position='start'><SquareLock02Icon size={20} color='#acacac' /></InputAdornment> }}
                        value={value?.password} onChange={(e) => setValue(prev => ({ ...prev, password: e.target.value }))} fullWidth
                    />
                    <RoundButton
                        endIcon={<ArrowRight01Icon id='end-icon' style={{ transition: 'all .2s ease-in' }} color='#fff' size={20} />}
                        onClick={onFormSubmit}
                        loading={load} sx={{ mb: '1rem' }}
                        text='Login' variant={'contained'}
                        color='secondary' disableElevation fullWidth
                    />
                    <Typography variant='body2' textAlign={'center'} paragraph > <Link to='/forgot-password' style={{ color: '#ee0704' }}>Forgot Password </Link> </Typography>


                </div>
            </AuthWrapper>
        </>

    )
};


export default Login;
