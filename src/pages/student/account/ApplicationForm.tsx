import React, { useEffect, useReducer, useRef, useState } from 'react'
import PageHeader from '../../../components/shared/PageHeader'
import { Avatar, Box, Grid, MenuItem, Stack, Typography } from '@mui/material'
import { InputField, RoundButton } from '../../../components/shared'
import UploadComp from '../../../components/upload/UploadComp'
import { useNavigate } from 'react-router-dom'
import { useLoader } from '../../../context/LoaderContext'
import { certifications, getApplicationForm, initState, reload, studentReducerFn, uploadPhoto, validateFormData } from '../../../utils'
import swal from 'sweetalert'
import { base, getData, saveData } from '../../../config/appConfig'
import useAxiosFetch from '../../../hooks/useAxiosFetch'
import SubmitForm from '../../../assets/images/submit-file.png'

const ApplicationForm = () => {
    const ref = useRef()
    const currentUser = getData('uid')
    const navigate = useNavigate()
    const { startLoading, stopLoading } = useLoader()
    const [selectProgrammes, setSelectProgrammes] = useState<string[]>([])
    const [preview, setPreview] = useState<any>(null)
    const [photo, setPhoto] = useState<File>()
    const { response: formData } = useAxiosFetch('/api/admission/form')
    const [formInput, dispatch] = useReducer(studentReducerFn, initState)

    useEffect(() => {
        if (formData) {
            dispatch({ type: 'ENROLL_MONTH', payload: formData?.month });
            dispatch({ type: 'ENROLL_YEAR', payload: formData?.year })
            dispatch({ type: 'ENROLL_TYPE', payload: formData?.type })
            dispatch({ type: 'EMAIL', payload: currentUser?.email })
            dispatch({ type: 'SURNAME', payload: currentUser?.surname })
            dispatch({ type: 'OTHERNAMES', payload: currentUser?.othernames })
            dispatch({ type: 'PHONE_MOBILE', payload: currentUser?.phone?.mobile })
        }
    }, [formData])


    const onFormSubmit = async () => {
        // console.log(formInput)
        const isValid = await validateFormData(formInput, photo!)
        if (isValid) {
            await swal({
                title: 'Submit Application',
                text: 'This action will submit your application. Please make sure you have reviewed all information',
                icon: 'warning',
                buttons: ['Cancel', 'Proceed'],
                dangerMode: true,
                closeOnClickOutside: false
            }).then(async (del) => {
                if (del) {
                    startLoading('Submitting application. Please wait')
                    try {
                        const { data: res } = await base.patch(`/api/applicant/update/${currentUser?.id}`, formInput)
                        if (res?.responseCode === 200) {
                            const payload = new FormData()
                            payload.append('photo', photo!)
                            startLoading('Uploading profile photo..')
                            await base.patch(`/api/applicant/photo/${res?.data?.id}`, payload, {
                                headers: { 'content-type': 'multipart/form-data' }
                            })
                            saveData('uid', res?.data)
                            await swal({
                                title: 'Success',
                                text: 'Your application has been submitted successfully',
                                icon: 'success',
                                closeOnClickOutside: false
                            }).then(reload)
                        }
                    } catch (error: any) {
                        console.log(error?.response)
                        swal('Error', 'Sorry, could not submit your application. Please try again', 'error')
                    } finally {
                        stopLoading()
                    }
                }
            })
        }
    }

    return (
        <div>
            <PageHeader title={'Application Form'} breadcrumbs={[{ label: 'Application', link: '#' }]} />

            {/* Submitted State */}
            {
                currentUser?.applicationStage === 1 ?
                    <Box>
                        <Grid container columnSpacing={4}>
                            <Grid item sm={8.5}>
                                {
                                    getApplicationForm(selectProgrammes)?.map((data, i) => {
                                        if (data?.title === 'Application') return
                                        return (
                                            <Box key={i} bgcolor={'#fff'} borderRadius={'10px'} mb={4}>
                                                <Typography mt={2} variant='h6' px={3} py={2} mb={2} fontWeight={600} bgcolor={'lightblue'} fontSize={'1.1rem'}>{data?.title}</Typography>
                                                <Grid container columnSpacing={3} sx={{ px: 4, pb: 3 }}>
                                                    {
                                                        data?.fields?.map((el, i) => {
                                                            if (el?.type === 'select') {
                                                                return (
                                                                    <Grid item sm={6} key={i}>
                                                                        <Typography variant='body2' mb={1} color={'GrayText'}>{el?.label}{el?.isRequired && <span style={{ color: 'red' }}>*</span>}</Typography>
                                                                        <InputField size={'small'} isDisabled={el?.keys![1] === 'month' || el?.keys![1] === 'year'}
                                                                            type={el?.type} fullWidth isSelect
                                                                            variant={'outlined'} placeholder={el?.placeholder || ''}
                                                                            onChange={(e) => {
                                                                                if (el?.label === 'Certification') {
                                                                                    setSelectProgrammes([])
                                                                                    const val = e?.target?.value?.startsWith('HND') ? e?.target?.value?.split('/')[0] : e?.target?.value?.split(' ')[0]
                                                                                    // console.log(certifications[val])
                                                                                    dispatch({ type: el?.action, payload: e?.target?.value })
                                                                                    setSelectProgrammes(certifications[val])
                                                                                } else {
                                                                                    dispatch({ type: el?.action, payload: e?.target?.value })
                                                                                }
                                                                            }}
                                                                        >
                                                                            {
                                                                                el?.options?.map((item, i) => <MenuItem key={i} value={item}>{item}</MenuItem>)
                                                                            }
                                                                        </InputField>
                                                                    </Grid>
                                                                )
                                                            }
                                                            return (
                                                                <Grid sm={6} item key={i}>
                                                                    <Typography variant='body2' mb={1} color={'GrayText'}>{el?.label}{el?.isRequired && <span style={{ color: 'red' }}>*</span>}</Typography>
                                                                    <InputField size={'small'}
                                                                        type={el?.type} fullWidth
                                                                        variant={'outlined'} placeholder={el?.placeholder}
                                                                        onChange={(e) => dispatch({ type: el?.action, payload: e?.target?.value })}
                                                                        isDisabled={el?.label === 'Email'}
                                                                        value={
                                                                            el?.label === 'Email' ? formInput?.email :
                                                                                el?.label === 'Surname' ? formInput?.surname :
                                                                                    el?.label === 'Othernames' ? formInput?.othernames :
                                                                                        el?.label === 'Phone' ? formInput?.phone?.mobile :
                                                                                            null
                                                                        }
                                                                    />
                                                                </Grid>
                                                            )

                                                        })
                                                    }
                                                </Grid>
                                            </Box>
                                        )
                                    })
                                }
                            </Grid>
                            <Grid item sm={3.5}>
                                <Box bgcolor={'#fff'} borderRadius={'10px'} mb={3}>
                                    <Typography mt={2} variant='h6' px={3} py={2} mb={2} fontWeight={600} bgcolor={'lightblue'} fontSize={'1.1rem'}>Profile Photo</Typography>
                                    <Box textAlign={'center'} pt={2} pb={4}>
                                        <input type='file' name='photo' ref={ref} accept='image/*' style={{ display: 'none' }}
                                            onChange={(e) => uploadPhoto(e?.target?.files![0], (val) => setPreview(val), (val) => setPhoto(val))}
                                        />
                                        <Avatar src={preview!} variant='rounded' sx={{ bgcolor: '#acacac80', borderRadius: '15px', width: '7rem', height: '7rem', m: '0 auto', border: '1px solid lightgrey' }} />
                                        <Typography mt={2} variant='body1'>Student Photo<span style={{ color: 'red' }}>*</span></Typography>
                                        <Typography mb={1} variant='body2' color={'GrayText'}>Upload passport size photo</Typography>
                                        <RoundButton onClick={() => ref?.current?.click()} text='Choose Photo' size={'small'} color={'primary'} variant={'contained'} disableElevation />
                                    </Box>
                                </Box>

                                <Box bgcolor={'#fff'} borderRadius={'10px'} mb={4}>
                                    <Typography mt={2} variant='h6' px={3} py={2} mb={2} fontWeight={600} bgcolor={'lightblue'} fontSize={'1.1rem'}>Documents</Typography>
                                    <Box p={3}>
                                        <UploadComp
                                            type='image'
                                            iconSize={60}
                                            showTitle={false}
                                            showCancelBtn={false}
                                            onCancel={() => { }}
                                            onUpload={(_file: any) => { }}
                                        />
                                    </Box>
                                </Box>

                                <Stack direction={'row'} gap={2}>
                                    {/* <RoundButton onClick={onFormReset} fullWidth text='Reset Form' color={'secondary'} variant={'outlined'} disableElevation /> */}
                                    <RoundButton onClick={onFormSubmit} fullWidth text='Submit Application' color={'secondary'} variant={'contained'} disableElevation />
                                </Stack>

                            </Grid>
                        </Grid>
                    </Box>
                    :
                    <Box width={'100%'} alignItems={'center'} justifyContent={'center'} display={'flex'} flexDirection={'column'}>
                        <Box bgcolor={'#fff'} py={4} px={6} textAlign={'center'} sx={{
                            width: { lg: '60%', md: '100%', sm: '100%', xs: '100%' },
                        }}>
                            <img src={SubmitForm} alt='submit-form' width={'12%'} style={{ margin: '20px auto' }} />
                            <Typography variant='h6' mt={2} fontWeight={500}>Application Submitted</Typography>
                            <Typography variant='body1' mb={3} color={'GrayText'}>
                                Thank you for submitting your application to POTSEC.
                                We have successfully received your application and are currently reviewing it.
                                Our admissions team will review your application thoroughly, and we will notify you of the next steps via email at [{currentUser?.email}] or through our application portal. If additional information or documents are required, we will contact you directly.
                            </Typography>
                            {/* <Stack direction={'row'} gap={2} justifyContent={'center'}>
                                <RoundButton onClick={() => { }} text='Print Application' color={'secondary'} variant={'outlined'} disableElevation />
                                <RoundButton onClick={() => { }} text='Check Application Status' color={'secondary'} variant={'contained'} disableElevation />
                            </Stack> */}
                        </Box>
                    </Box>
            }

        </div>
    )
}

export default ApplicationForm