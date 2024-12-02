
import React, { useRef, useState } from 'react';
import { Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Slide from '../../../assets/images/skill_01.jpeg'
import { base, getData, saveData } from '../../../config/appConfig';
import { AuthWrapper, RoundButton } from '../../../components/shared';
import { useAlert } from '../../../context/AlertContext';


const Verify2FA = () => {
    const navigate = useNavigate()
    const [load, setLoad] = useState(false)
    const user = getData('uid')
    const { successAlert, errorAlert } = useAlert()
    const isStaff = (user?.role === 'staff' || user?.role === 'admin')


    console.log(user)

    // Verify Email Refs
    const ref1 = useRef()
    const ref2 = useRef()
    const ref3 = useRef()
    const ref4 = useRef()
    const ref5 = useRef()
    const ref6 = useRef()

    const resendToken = async () => {
        try {
            successAlert('Sending 2FA code...')
            setLoad(true)
            const { data: res } = await base.get(isStaff ? '/api/staff/resend-email-token' : '/api/u/resend-email-token')
            if (res?.status === 'success') {
                successAlert('2FA code sent to your email')
            }
        } catch (error) {
            errorAlert(error?.response.data?.message)
        } finally {
            setLoad(false)
        }
    }

    const onFormSubmit = async () => {
        const url = `/api/${isStaff ? 'staff' : 'u'}/verify-login`
        const code = ref1.current?.value + ref2.current?.value + ref3.current?.value + ref4.current?.value + ref5.current?.value + ref6.current?.value
        if (code === '') return errorAlert('Please provide token')
        if (code?.length < 6) return errorAlert('Token must be 6 characters')
        try {
            setLoad(true)
            const { data: res } = await base.post(url, { code })
            if (res?.status === 'success') {
                saveData('uid', res?.data)
                successAlert('User verification successful')
                navigate(`/${isStaff ? 'staff' : 'account'}/dashboard`)
            }
        } catch (error) {
            errorAlert(error?.response?.data?.message)
        } finally {
            setLoad(false)
        }
    }

    // Auto focus Email token
    const autoFocusHandler = (event: any) => {
        const element = event.target;
        const nextSibling = element.nextElementSibling;
        nextSibling ? nextSibling.focus() : element.blur();
    };

    const pasteHandler = (e: Event) => {
        console.log(typeof e)
        e.stopPropagation();
        e.preventDefault();
        // Get pasted data via clipboard API
        ref1.current
        const clipboardData = e?.clipboardData || new window.clipboardData;
        const pastedData = clipboardData.getData('Text');
        console.log(pastedData)

    }

    const handleKeyUp = (e: React.KeyboardEvent) => {
        const current = e?.currentTarget;
        if (e?.key === 'ArrowLeft' || e?.key === 'Backspace') {
            const prev = current?.previousElementSibling as HTMLInputElement | null
            prev?.focus();
            prev?.setSelectionRange(0, 1);
            return
        }

        if (e?.key === 'ArrowRight') {
            const prev = current?.nextElementSibling as HTMLInputElement | null
            prev?.focus();
            prev?.setSelectionRange(0, 1);
            return
        }
    }


    return (
        <>
            <AuthWrapper
                title={<Typography sx={{ fontWeight: 500, mb: .5 }} variant='h5'>Two-Factor Authentication</Typography>}
                subtitle={<Typography sx={{ mb: 3 }} paragraph color='textSecondary'>Your account is protected with 2FA. We've sent you a token. Please check your email ({user?.email})</Typography>}
                image={Slide} imagePosition={'center'}
                order={2}
            >
                <Stack direction={'row'} gap={'.6rem'} my={3} width={'100%'} mx={'auto'}>
                    {
                        new Array(6).fill(0).map((_el: any, i) => {
                            return (
                                <input key={i} autoFocus={i === 0 ? true : false}
                                    ref={i === 0 ? ref1 : i === 1 ? ref2 : i === 2 ? ref3 : i === 3 ? ref4 : i === 4 ? ref5 : ref6}
                                    type='text' maxLength={1}
                                    onChange={(e) => autoFocusHandler(e)}
                                    onPaste={(e) => pasteHandler(e)}
                                    onKeyUp={handleKeyUp}
                                    style={{ textAlign: 'center', height: '5rem', fontSize: '2rem', fontFamily: "Plus Jakarta Sans", width: '100%', borderRadius: '15px', border: '1px solid lightgrey' }}
                                />
                            )
                        })
                    }
                </Stack>
                <RoundButton onClick={onFormSubmit}
                    loading={load} sx={{ mb: '1rem' }}
                    text='Continue' variant={'contained'}
                    color='secondary' disableElevation fullWidth
                />
                <Typography textAlign={'center'} variant='body2' paragraph color={'GrayText'} >Didn't get the token? <span onClick={resendToken} style={{ cursor: 'pointer', color: '#ED8A2F' }}>Resend Token </span> </Typography>
            </AuthWrapper>
        </>
    )
};


export default Verify2FA;
