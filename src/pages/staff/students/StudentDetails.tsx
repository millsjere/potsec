import React, { useEffect, useReducer, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import PageHeader from '../../../components/shared/PageHeader'
import { Avatar, Box, Chip, Divider, Grid, IconButton, InputAdornment, List, ListItem, ListItemButton, MenuItem, Stack, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'
import { InputField, RoundButton } from '../../../components/shared'
import { Camera01Icon, Cancel01Icon, CancelCircleIcon, CheckmarkCircle02Icon, Delete02Icon, File01Icon, FloppyDiskIcon, MailSend01Icon, PencilEdit01Icon, PrinterIcon } from 'hugeicons-react'
import { getApplicationForm, initState, reload, studentReducerFn } from '../../../utils'
import useAxiosFetch from '../../../hooks/useAxiosFetch'
import { useLoader } from '../../../context/LoaderContext'
import { base } from '../../../config/appConfig'
import swal from 'sweetalert'


export const getFormValue = (obj: any, keys: string[]) => {
    return keys.reduce((acc, key) => (acc && acc[key] ? acc[key] : undefined), obj);
}

export const formatLabel = (val: string) => val?.split(' ')[0]?.toLowerCase()

const StudentDetails = () => {
    const { id } = useParams()
    const ref = useRef()
    const navigate = useNavigate()
    const { startLoading, stopLoading } = useLoader()
    const { isLoading, response, fetchData } = useAxiosFetch(`/api/student/${id}`);
    const [edit, setEdit] = useState<string | undefined>(undefined)
    const [password, setPassword] = useState({ new: '', confirm: '' })
    const menuList = getApplicationForm()?.map(el => el?.title)
    const formData = getApplicationForm();


    const getFormValue = (obj: any, keys: string[]) => {
        return keys.reduce((acc, key) => (acc && acc[key] ? acc[key] : undefined), obj);
    }
    // console.log('DATA ==>', response)

    const [formInput, dispatch] = useReducer(studentReducerFn, initState)

    useEffect(() => {
        if (response) {
            dispatch({ type: 'UPDATE', payload: response })
        }
    }, [response])

    const onFormSubmit = async () => {
        try {
            startLoading('Updating student data. Please wait...')
            const { data: res } = await base.patch(`/api/student/profile/${id}`, formInput)
            if (res?.responseCode === 200) {
                dispatch({ type: 'UPDATE', payload: res?.data })
                swal('Success', 'Student data updated successfully', 'success').then(reload)
            }
        } catch (error: any) {
            console.log(error?.response)
            swal('Error', error?.response?.data?.message, 'error').then(reload)
        } finally {
            stopLoading()
        }
    }

    const onPasswordChange = async () => {
        if (password.new === '') return
        if (password.new?.length < 8) return swal('Invalid', 'Password must be at least 8 characters', 'error')
        if (password.new !== password.confirm) return swal('Invalid', 'Passwords do not match', 'error')
        try {
            await swal({
                title: 'Change Password',
                text: 'This action will create a new password for this account. New password will be shared via SMS',
                icon: 'warning',
                buttons: ['Cancel', 'Proceed'],
                dangerMode: true,
                closeOnClickOutside: false
            }).then(async (wil) => {
                if (wil) {
                    startLoading('Reseting password. Please wait..')
                    const { data: res } = await base.patch(`/api/student/reset-password/${id}`, { password: password.new })
                    if (res?.responseCode === 200) {
                        await swal('Success', 'User password updated successfully', 'success')
                            .then(reload)
                    }
                }
            })
        } catch (error: any) {
            console.log(error?.response)
            swal('Error', error?.response?.data?.message, 'error').then(() => window.location.reload())
        } finally {
            stopLoading()
        }
    }

    const generatePassword = () => {
        const result = Array(8)
            .fill(0)
            .map(() => String.fromCharCode(Math.floor(Math.random() * 62) + 48))
            .join("")
            .replace(/[^a-zA-Z0-9]/g, "x");
        console.log(result)
        setPassword({ new: result, confirm: result })
    }

    const updatePhoto = async (file: File) => {
        try {
            const payload = new FormData()
            payload.append('photo', file!)
            startLoading('Uploading profile photo..')
            const { data: res } = await base.patch(`/api/student/photo/${id}`, payload, {
                headers: { 'content-type': 'multipart/form-data' }
            })
            if (res?.responseCode === 200) {
                await swal('Success', 'Student account created successfully', 'success').then(reload)
            }
        } catch (error: any) {
            swal('Error', error?.response?.data?.message, 'success')
        } finally {
            stopLoading()
        }
    }

    const acceptHandler = () => {
        swal({
            title: 'Accept Application',
            text: 'This action will admit this application. Applicant will be notified via email',
            icon: 'warning',
            buttons: ['Cancel', 'Admit'],
            closeOnClickOutside: false
        }).then(async (acc) => {
            if (acc) {
                try {
                    startLoading('Processing application. Please wait...')
                    const { data: res } = await base.post(`/api/applicant/admit/${response?.id}`)
                    if (res?.responseCode === 200) {
                        swal({
                            title: 'Success',
                            icon: 'success',
                            text: 'New student admitted successfully',
                            closeOnClickOutside: false
                        }).then(() => navigate('/staff/all-students'))
                    }
                } catch (error: any) {
                    console.log(error?.response)
                    swal('Error', error?.response?.data?.message, 'error').then(() => window.location.reload())
                } finally {
                    stopLoading()
                }

            }
        })
    }

    const rejectHandler = () => {

    }

    const sendAdmissionLetter = () => {
        swal({
            title: 'Send Admission Letter',
            text: 'Do you want to send admission letter to applicant?',
            icon: 'warning',
            buttons: ['Cancel', 'Send'],
            closeOnClickOutside: false
        }).then(async (send) => {
            if (send) {
                try {
                    startLoading('Sending admission letter. Please wait...')
                    const { data: res } = await base.get(`/api/student/send-admission-letter/${id}`)
                    if (res.responseCode === 200) {
                        swal({
                            title: 'Success',
                            icon: 'success',
                            text: 'Admission letter sent successfully'
                        }).then(reload)
                    }
                } catch (error: any) {
                    console.log(error?.response)
                    swal({
                        title: 'Error',
                        icon: 'error',
                        text: 'Sorry, could not send email. Please try again'
                    }).then(reload)
                } finally {
                    stopLoading()
                }

            }
        })
    }



    return (
        <div>
            <PageHeader backOption title={'Applicant Details'} breadcrumbs={[{ label: 'All Applicants', link: '/staff/applicants' }, { label: 'Details', link: '#' }]} />
            {
                isLoading ? null :
                    <Grid container columnSpacing={3}>
                        {/* Side Menu */}
                        <Grid item sm={2.5}>
                            <Box position={'sticky'} top={90}>
                                <Box bgcolor={'#fff'} borderRadius={'10px'} p={2} mb={3}>
                                    <List>
                                        {
                                            [...menuList, 'Account Settings']?.map((menu, i) => (
                                                <ListItem sx={{
                                                    my: .5, color: grey[600], borderRadius: '6px',
                                                    overflow: 'hidden',
                                                    ':hover': { bgcolor: '#c2b5ff4a' }
                                                }} key={i} disablePadding>
                                                    <ListItemButton href={`#${formatLabel(menu)}`} disableRipple sx={{}}>
                                                        <Typography noWrap>{menu}</Typography>
                                                    </ListItemButton>
                                                </ListItem>
                                            ))
                                        }
                                    </List>
                                </Box>
                                {
                                    response?.applicationStatus === 'submitted' ?
                                        <Stack direction={'row'} gap={1.5}>
                                            <RoundButton startIcon={<CheckmarkCircle02Icon size={20} />} disableElevation fullWidth variant={'contained'} color={'secondary'} text={'Admit'} onClick={acceptHandler} />
                                            <RoundButton startIcon={<CancelCircleIcon size={20} />} disableElevation fullWidth variant={'contained'} color={'primary'} text={'Decline'} onClick={rejectHandler} />
                                        </Stack>
                                        : response?.applicationStatus === 'pending' ? null
                                            :
                                            <Stack direction={'column'} gap={1}>
                                                <RoundButton startIcon={<MailSend01Icon size={20} />} disableElevation fullWidth variant={'outlined'} color={'secondary'} text={'Admission Letter'} onClick={sendAdmissionLetter} />
                                                <RoundButton startIcon={<File01Icon size={20} />} disableElevation fullWidth variant={'contained'} color={'secondary'} text={'View Transcript'} onClick={() => { }} />
                                                <RoundButton startIcon={<PrinterIcon size={20} />} disableElevation fullWidth variant={'contained'} color={'primary'} text={'Print PDF'} onClick={() => { }} />
                                            </Stack>

                                }
                            </Box>
                        </Grid>

                        {/* User Details */}
                        <Grid item sm={9.5}>
                            <Box bgcolor={'#fff'} borderRadius={'10px'} mb={4}>
                                <Stack direction={'row'} gap={2} p={3} borderRadius={'10px'} border={'1px solid lightgrey'} alignItems={'flex-start'} justifyContent={'flex-start'}>
                                    <Stack direction={'column'} position={'relative'}>
                                        <input type='file' name='photo' ref={ref} accept='image/*' style={{ display: 'none' }} onChange={(e) => {
                                            updatePhoto(e?.target?.files![0])
                                        }} />
                                        <Avatar variant='circular' src={response?.photo} sx={{ width: '8rem', height: '8rem' }} />
                                        <IconButton onClick={() => ref?.current?.click()} sx={{ bgcolor: 'secondary.main', position: 'absolute', bottom: '4%', right: '-1%', ':hover': { bgcolor: 'red' } }}><Camera01Icon size={20} color='#fff' /></IconButton>
                                    </Stack>

                                    <div>
                                        <Typography variant='h6'>{response?.fullname}</Typography>
                                        <Typography color={'GrayText'}>Index No: {response?.enrollment?.index}</Typography>
                                        <Typography color={'GrayText'}>Programme: {response?.enrollment?.programme}</Typography>
                                        <Typography color={'GrayText'}>Applied: {new Date(response?.createdAt).toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' })}</Typography>
                                        <Typography color={'GrayText'} textTransform={'capitalize'}>{response?.applicationStatus}: {new Date(response?.admissionDate).toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' })}</Typography>
                                    </div>
                                    <Chip color={response?.applicationStatus === 'declined' ? 'primary' : response?.applicationStatus === 'pending' ? 'info' : response?.applicationStatus === 'submitted' ? 'info' : 'success'} sx={{ textTransform: 'capitalize', ml: 'auto' }} label={response?.applicationStatus} />

                                </Stack>
                            </Box>
                            <>
                                {
                                    formData?.map((data, i) => {
                                        return (
                                            <Box id={formatLabel(data?.title)} key={i} border={'1px solid lightgrey'} borderRadius={'0 0 10px 10px'} bgcolor={'#fff'} mb={4} sx={{ scrollMarginTop: '5.8rem' }}>
                                                <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} py={2} px={4} bgcolor={'lightblue'}>
                                                    <Typography fontWeight={600}>{data?.title}</Typography>
                                                    {
                                                        (edit === formatLabel(data?.title)) ?
                                                            <Stack direction={'row'} gap={1} alignItems={'center'}>
                                                                <RoundButton
                                                                    variant={'contained'} startIcon={<FloppyDiskIcon size={15} />} color={'secondary'}
                                                                    onClick={onFormSubmit}
                                                                    disableElevation text='Save' size={'small'}
                                                                />
                                                                <RoundButton sx={{ borderColor: grey[400] }}
                                                                    variant={'contained'} startIcon={<Cancel01Icon size={12} />} color={'primary'}
                                                                    onClick={() => {
                                                                        dispatch({ type: 'UPDATE', payload: response })
                                                                        setEdit(undefined)
                                                                    }} disableElevation text='Cancel' size={'small'}
                                                                />
                                                            </Stack>
                                                            :
                                                            <RoundButton sx={{ ml: 'auto', borderColor: grey[700], color: grey[800] }}
                                                                variant={'outlined'} startIcon={<PencilEdit01Icon size={15} />} color={'primary'}
                                                                onClick={() => { setEdit(formatLabel(data?.title)) }} disableElevation text='Edit' size={'small'}
                                                            />
                                                    }
                                                </Stack>
                                                <Divider sx={{ mb: 3 }} />
                                                <Grid container columnSpacing={3} sx={{ px: 4, pb: 3 }}>
                                                    {
                                                        data?.fields?.map((el, i) => {
                                                            const value: string = getFormValue(formInput, el?.keys!)
                                                            if (el?.type === 'select') {
                                                                return (
                                                                    <Grid item sm={6} key={i}>
                                                                        <Typography variant='body2' mb={1} color={'GrayText'}>{el?.label}</Typography>
                                                                        <InputField size={'small'}
                                                                            type={el?.type} fullWidth isSelect
                                                                            variant={'outlined'}
                                                                            isDisabled={edit !== formatLabel(data?.title)}
                                                                            value={value || ''}
                                                                            onChange={(e) => {
                                                                                dispatch({ type: el?.action, payload: e?.target?.value })
                                                                            }}
                                                                        >
                                                                            {
                                                                                el?.options?.map((item, i) => <MenuItem key={i} value={item}>{item}</MenuItem>)
                                                                            }
                                                                        </InputField>
                                                                    </Grid>
                                                                )
                                                            } else {
                                                                return (
                                                                    <Grid sm={6} item key={i}>
                                                                        <Typography variant='body2' mb={1} color={'GrayText'}>{el?.label}</Typography>
                                                                        <InputField size={'small'}
                                                                            type={el?.type} fullWidth isDisabled={edit !== formatLabel(data?.title)}
                                                                            variant={'outlined'} placeholder={el?.placeholder}
                                                                            value={value || ''}
                                                                            onChange={(e) => dispatch({ type: el?.action, payload: e?.target?.value })}
                                                                        />
                                                                    </Grid>
                                                                )
                                                            }
                                                        }
                                                        )
                                                    }
                                                </Grid>
                                            </Box>
                                        )
                                    })
                                }

                                {/* Settings */}
                                <Box id={formatLabel('Account Settings')} border={'1px solid lightgrey'} borderRadius={'0 0 10px 10px'} bgcolor={'#fff'} mb={4} sx={{ scrollMarginTop: '5.8rem' }}>
                                    <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} mb={3} py={2} px={4} bgcolor={'lightblue'}>
                                        <Typography fontWeight={600}>Account Settings</Typography>
                                        <Stack direction={'row'} gap={1} alignItems={'center'}>
                                            <RoundButton sx={{ borderColor: grey[400] }}
                                                variant={'contained'} startIcon={<Delete02Icon size={15} />} color={'primary'}
                                                onClick={() => {
                                                    dispatch({ type: 'UPDATE', payload: response })
                                                    setEdit(undefined)
                                                }}
                                                disableElevation text='Disable Account' size={'small'}
                                            />
                                        </Stack>
                                    </Stack>
                                    <Grid container columnSpacing={3} sx={{ px: 4, pb: 3 }}>
                                        <Grid sm={6} item>
                                            <Typography variant='body2' mb={1} color={'GrayText'}>New Password</Typography>
                                            <InputField size={'small'}
                                                type={'text'} fullWidth
                                                variant={'outlined'}
                                                value={password?.new}
                                                InputProps={{
                                                    endAdornment: <InputAdornment position='end'>
                                                        <RoundButton sx={{ borderRadius: '10px', mr: -1.2 }}
                                                            variant={'contained'} color={'secondary'}
                                                            onClick={generatePassword} size={'small'}
                                                            disableElevation text='Generate'
                                                        />
                                                    </InputAdornment>
                                                }}
                                                onChange={(e) => { setPassword((prev) => ({ ...prev, new: e?.target?.value?.trim() })) }}
                                            />
                                        </Grid>
                                        <Grid sm={6} item>
                                            <Typography variant='body2' mb={1} color={'GrayText'}>Confirm Password</Typography>
                                            <InputField size={'small'}
                                                type={'text'} fullWidth
                                                variant={'outlined'}
                                                value={password?.confirm}
                                                onChange={(e) => { setPassword((prev) => ({ ...prev, confirm: e?.target?.value?.trim() })) }}
                                            />
                                        </Grid>
                                        <Grid sm={6} item>
                                            <RoundButton sx={{ borderRadius: '10px' }}
                                                variant={'contained'} startIcon={<FloppyDiskIcon size={15} />} color={'secondary'}
                                                onClick={onPasswordChange} size={'small'}
                                                disableElevation text='Change Password'
                                            />
                                        </Grid>
                                    </Grid>

                                </Box>
                            </>

                        </Grid>
                    </Grid>
            }
        </div>
    )
}

export default StudentDetails