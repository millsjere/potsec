import { InputAdornment, Typography } from '@mui/material';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { base, saveData } from '../../../config/appConfig';
import { ArrowRight01Icon, SquareLock02Icon, UserCircleIcon } from 'hugeicons-react';
import { AuthWrapper, InputField, RoundButton } from '../../../components/shared'
import { useAlert } from '../../../context/AlertContext';


const Login = () => {
    const navigate = useNavigate()
    const { successAlert, errorAlert } = useAlert()
    const [load, setLoad] = React.useState(false)
    const [value, setValue] = React.useState({ id: '', password: '' })

    // console.log(getData('uid'))

    const onFormSubmit = async () => {
        if (value.id === '') return errorAlert('Invalid Student ID')
        if (value.password === '') return errorAlert('Invalid password')
        try {
            setLoad(true)
            const url = '/api/u/login'
            const { data: res } = await base.post(url, value)
            if (res?.status === 'success') {
                // console.log(res?.data)
                saveData('uac', res?.data?.ac)
                saveData('uid', res?.data?.user)
                saveData('exp', res?.data?.expiry)
                successAlert('User Login successful')
                navigate('/auth-2fa', { replace: true })
            }
        } catch (error) {
            errorAlert(error?.response?.data?.message)
        } finally {
            setLoad(false)
        }
    }


    return (
        <>
            <AuthWrapper staff={true}
                title={<Typography sx={{ fontWeight: 500, mb: .5 }} variant='h5'>Staff Portal</Typography>}
                subtitle={<Typography textAlign={'center'} sx={{ mb: 3 }} paragraph color='textSecondary' >Please provide your credentials to login
                </Typography>}
            >
                <div>
                    <InputField variant='outlined'
                        label='Staff ID' type='text'
                        InputProps={{ endAdornment: <InputAdornment position='start'><UserCircleIcon size={20} color='#acacac' /></InputAdornment> }}
                        value={value?.id} onChange={(e) => setValue(prev => ({ ...prev, id: e.target.value }))} fullWidth
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
                    <Typography textAlign={'center'} paragraph > <Link to='/staff/forgot-password' style={{ color: '#ee0704' }}>Forgot Password </Link> </Typography>


                </div>
            </AuthWrapper>
        </>

    )
};


export default Login;
