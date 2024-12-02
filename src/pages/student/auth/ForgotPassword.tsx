import React, { useState } from 'react'
import { AuthWrapper, InputField, RoundButton } from '../../../components/shared'
import { Box, InputAdornment, Typography } from '@mui/material'
import BgImage from '../../../assets/images/skill_02.jpeg'
import { ArrowLeft01Icon, Mail01Icon, MailOpenIcon, MessageNotification01Icon, SmartPhone01Icon } from 'hugeicons-react'
import { useAlert } from '../../../context/AlertContext'
import { base } from '../../../config/appConfig'
import { useNavigate } from 'react-router-dom'

type PickProps = {
    icon: any,
    title: string,
    copy: string
    onClick: () => void
}

const PickItem = ({ icon, title, copy, onClick }: PickProps) => {
    return (
        <Box onClick={onClick} mb={2} sx={{ cursor: 'pointer', ':hover': { '#icon': { color: '#ee0704' }, border: theme => `1px solid ${theme.palette.primary.main}` } }} p={3} borderRadius={'10px'} border={'1px solid lightgrey'}>
            {icon}
            <Typography mt={1} fontWeight={500}>{title}</Typography>
            <Typography variant='body2' color={'GrayText'}>{copy}</Typography>
        </Box>

    )
}

const ForgotPassword = () => {
    const navigate = useNavigate()
    const [stage, setStage] = useState<number>(0)
    const [pick, setPick] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [phone, setPhone] = useState<string>('')
    const [load, setLoad] = useState(false)
    const { successAlert, errorAlert } = useAlert()



    const handleClick = (val: string) => {
        setPick(val)
        setStage(1)
    }

    const goBack = () => {
        setPick('')
        setEmail('')
        setPhone('')
        setStage(0)
    }

    const onFormSubmit = async () => {
        if (pick === 'email' && email === '') return errorAlert('Invalid email address')
        if (pick === 'sms' && (phone === '' || phone?.length < 10 || /\D/.test(phone))) return errorAlert('Invalid phone number')
        try {
            setLoad(true)
            const { data: res } = await base.post('/api/u/forgot-password', { type: pick, email, sms: phone })
            if (res?.status === 'success') {
                successAlert('Success. Reset token sent to ' + pick)
                localStorage.setItem('rs-tp', pick)
                localStorage.setItem('rs-vl', pick === 'sms' ? phone : email)
                navigate(`/reset-password`, { replace: true })
            }
        } catch (error) {
            errorAlert(error?.response?.data?.message)
        } finally {
            setLoad(false)
        }
    }


    return (
        <div>
            <AuthWrapper
                title={<Typography textAlign={'center'} sx={{ fontWeight: 500, mb: .5 }} variant='h5'>Forgot Password</Typography>}
                subtitle={<Typography textAlign={'center'} sx={{ mb: 3 }} paragraph color='textSecondary'>{`${pick === 'email' ? 'Provide registered email address' : pick === 'sms' ? 'Provide registered phone number' : 'Pick a method to reset your password'} `}</Typography>}
                image={BgImage}
                order={2}
                imagePosition={'center'}
                textAlign={'left'}
            >
                {
                    stage === 0 ? (
                        <>
                            <PickItem
                                icon={<MailOpenIcon id='icon' size={25} color='#acacac' />}
                                title='Reset via Email'
                                copy='You will be provided a unique password reset token sent to your registered email address'
                                onClick={() => handleClick('email')}
                            />
                            <PickItem
                                icon={<MessageNotification01Icon id='icon' size={25} color='#acacac' />}
                                title='Reset via SMS'
                                copy='You will receive a verification code via SMS, enabling you to reset a new password'
                                onClick={() => handleClick('sms')}
                            />
                        </>
                    )
                        :
                        (
                            <>
                                {
                                    pick === 'email' ?
                                        <InputField variant='outlined'
                                            label='Email' type='email'
                                            InputProps={{ endAdornment: <InputAdornment position='start'><Mail01Icon size={20} color='#acacac' /></InputAdornment> }}
                                            value={email} onChange={(e) => setEmail(e.target.value)} fullWidth
                                        />
                                        :
                                        <InputField variant='outlined'
                                            inputProps={{ maxLength: 10 }} label='Phone' type='tel'
                                            InputProps={{ endAdornment: <InputAdornment position='start'><SmartPhone01Icon size={20} color='#acacac' /></InputAdornment> }}
                                            value={phone} onChange={(e) => setPhone(e.target.value)} fullWidth
                                        />
                                }
                                <RoundButton onClick={onFormSubmit}
                                    loading={load} sx={{ mt: '.5rem' }}
                                    text='Reset Password' variant={'contained'} color='secondary'
                                    disableElevation fullWidth
                                />
                                <Typography textAlign={'center'} sx={{ cursor: 'pointer' }}
                                    mt={2} display={'flex'} color={'primary'} onClick={goBack}
                                    alignItems={'center'} gap={.5} justifyContent={'center'} ><ArrowLeft01Icon size={20} /> Go Back </Typography>

                            </>
                        )
                }
                {
                    stage === 0 &&
                    <Typography textAlign={'center'} sx={{ cursor: 'pointer' }}
                        mt={2} display={'flex'} color={'primary'} onClick={() => navigate('/')}
                        alignItems={'center'} gap={.5} justifyContent={'center'} ><ArrowLeft01Icon size={20} />Login</Typography>
                }
            </AuthWrapper>
        </div>
    )
}

export default ForgotPassword