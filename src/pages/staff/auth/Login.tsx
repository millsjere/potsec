import { InputAdornment, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { base, saveData } from '../../../config/appConfig';
import { ArrowRight01Icon, SquareLock02Icon, UserCircleIcon } from 'hugeicons-react';
import { AuthWrapper, InputField, RoundButton } from '../../../components/shared'
import { useAlert } from '../../../context/AlertContext';


const Login = () => {
    const navigate = useNavigate()
    const { successAlert, errorAlert } = useAlert()
    const [load, setLoad] = React.useState(false)
    const [value, setValue] = React.useState({ email: '', password: '' })

    // console.log(getData('uid'))
    // const newStaff = async() => {
    //     try {
    //         const { data: res } = await base.post('/api/staff/create', value)
    //         console.log(res)
    //         alert('Staff created')
    //     } catch (error) {
    //         console.log(error?.response)
    //     }

    // }
    // useEffect(()=>{
    //     newStaff()
    // },[])

    const onFormSubmit = async () => {
        if (value.email === '' || !value?.email?.includes('@') ) return errorAlert('Invalid staff email')
        if (value.password === '') return errorAlert('Invalid password')
        try {
            setLoad(true)
            const url = '/api/staff/login'
            const { data: res } = await base.post(url, value)
            if (res?.status === 'success') {
                // console.log(res?.data)
                saveData('uac', res?.data?.ac)
                saveData('uid', res?.data?.user)
                saveData('exp', res?.data?.expiry)
                successAlert('User Login successful')
                navigate('/staff/2fa', { replace: true })
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
                        label='Staff Email' type='email'
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
                    {/* <Typography textAlign={'center'} paragraph > <Link to='/staff/forgot-password' style={{ color: '#ee0704' }}>Forgot Password </Link> </Typography> */}


                </div>
            </AuthWrapper>
        </>

    )
};


export default Login;
