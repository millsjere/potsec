import React, { useReducer, useRef, useState } from 'react'
import PageHeader from '../../../components/shared/PageHeader'
import { Avatar, Box, Grid, MenuItem, Stack, Typography } from '@mui/material'
import { InputField, RoundButton } from '../../../components/shared'
import { certifications, getApplicationForm, initState, studentReducerFn, validateFile } from '../../../utils'
// import UploadComp from '../../../components/upload/UploadComp'
import swal from 'sweetalert'
import { useLoader } from '../../../context/LoaderContext'
import { base } from '../../../config/appConfig'
import { useNavigate } from 'react-router-dom'
import useAxiosFetch from '../../../hooks/useAxiosFetch'


export const validateFormData = (formInput: any) => {
    if (formInput?.enrollment?.type === ''
        || formInput?.enrollment?.month === ''
        || formInput?.enrollment?.year === ''
        || formInput?.enrollment?.index === ''
    ) return swal('Invalid', 'Provide all required fields under Application', 'error').then(() => false)
    if (formInput?.surname === ''
        || formInput?.othernames === ''
        || (formInput?.email === '' || !formInput?.email?.includes('@'))
        || formInput?.phone?.mobile === '' || formInput?.phone?.whatsapp === ''
        || formInput?.gender === '' || formInput?.dob === '' || formInput?.age === '' || formInput?.educationalLevel === ''
        || formInput?.language?.spoken === '' || formInput?.language?.written === ''
        || formInput?.nationalID?.type === '' || formInput?.nationalID?.number === ''
    ) return swal('Invalid', 'Provide all required fields under Personal Details', 'error').then(() => false)
    // if (formInput?.payment?.type === ''
    //     || formInput?.payment?.reference === ''
    //     || formInput?.payment?.transaction_id === ''
    // ) return swal('Invalid', 'Provide all required fields under Payment', 'error').then(() => false)
    if (formInput?.employment?.isEmployed === ''
        || formInput?.employment?.currentJob === ''
        || formInput?.employment?.afterCompletion === ''
    ) return swal('Invalid', 'Provide all required fields under Employment', 'error').then(() => false)
    if (
        formInput?.health?.anyCondition === ''
        || formInput?.employment?.currentJob === ''
    ) return swal('Invalid', 'Provide all required fields under Health', 'error').then(() => false)
    // if (formInput?.guardian?.name === ''
    //     || formInput?.guardian?.phone === ''
    //     || formInput?.guardian?.relationship === ''
    // ) return swal('Invalid', 'Provide all required fields under Guardian', 'error').then(() => false)
    // if (formInput?.emergency?.name === ''
    //     || formInput?.emergency?.phone === ''
    // ) return swal('Invalid', 'Provide all required fields under Emergency', 'error').then(() => false)
    if (formInput?.enrollment?.certification === '' || formInput?.campus === ''
        || formInput?.enrollment?.certificationLevel === '' || formInput?.enrollment?.programme === ''
        || formInput?.enrollment?.session === '' || formInput?.enrollment?.modeofTuition === ''
    ) return swal('Invalid', 'Provide all required fields under Programme & Certification', 'error').then(() => false)
    // if (!photo) return swal('Invalid', 'Provide profile photo', 'error').then(() => false)

    return true
}

const NewApplication = () => {
    const { response: allProgrammes } = useAxiosFetch('/api/staff/programmes')
    const ref = useRef()
    const navigate = useNavigate()
    const { startLoading, stopLoading } = useLoader()
    const [selectProgrammes, setSelectProgrammes] = useState<string[]>([])
    const [preview, setPreview] = useState<any>(null)
    const [photo, setPhoto] = useState<File>()

    const [formInput, dispatch] = useReducer(studentReducerFn, initState)

    const uploadPhoto = async (file: File) => {
        // console.log(file)
        const res = await validateFile(file, 'image')
        if (res) {
            var reader = new FileReader();
            reader.onload = function () {
                const dataURL = reader.result;
                setPreview(dataURL)
            };
            reader.readAsDataURL(file);
            setPhoto(file)
        }
    }

    const onFormSubmit = async () => {
        // console.log(formInput)
        const isValid = await validateFormData(formInput)
        if (isValid) {
            await swal({
                title: 'Create Account',
                text: 'This action will create a new student application. Applicant will also be notified via email with the account details',
                icon: 'warning',
                buttons: ['Cancel', 'Proceed'],
                dangerMode: true,
                closeOnClickOutside: false
            }).then(async (del) => {
                if (del) {
                    startLoading('Creating new account. Please wait')
                    try {
                        const { data: res } = await base.post('/api/student/create', formInput)
                        if (res?.responseCode === 200 && photo) {
                            const payload = new FormData()
                            payload.append('photo', photo!)
                            startLoading('Uploading profile photo..')
                            await base.patch(`/api/student/photo/${res?.data?.surname}`, payload, {
                                headers: { 'content-type': 'multipart/form-data' }
                            })
                            await swal('Success', 'Applicant account created successfully', 'success').then(() => navigate('/staff/applicants'))
                        } else {
                            await swal('Success', 'Applicant account created successfully', 'success').then(() => navigate('/staff/applicants'))
                        }
                    } catch (error: any) {
                        console.log(error?.response)
                        swal('Error', error?.response?.data?.message, 'error')
                    } finally {
                        stopLoading()
                    }
                }
            })
        }
    }

    return (
        <div>
            <PageHeader title={'New Application'} breadcrumbs={[{ label: 'Application', link: '#' }]} />
            <Box>
                <Grid container columnSpacing={4}>
                    <Grid item sm={8.5}>
                        {
                            getApplicationForm(selectProgrammes)?.map((data, i) => {
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
                                                                <InputField size={'small'}
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
                                                                        (el?.label === 'Select Programme') ?
                                                                            allProgrammes?.map((item: any, i: number) => <MenuItem key={i} value={item?.id}>{item?.name}</MenuItem>)
                                                                            :
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
                                                            />
                                                        </Grid>
                                                    )

                                                }
                                                )
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
                                <input type='file' name='photo' ref={ref} accept='image/*' style={{ display: 'none' }} onChange={(e) => uploadPhoto(e?.target?.files![0])} />
                                <Avatar src={preview!} variant='rounded' sx={{ bgcolor: '#acacac80', borderRadius: '15px', width: '7rem', height: '7rem', m: '0 auto', border: '1px solid lightgrey' }} />
                                <Typography mt={2} variant='body1'>Student Photo<span style={{ color: 'red' }}>*</span></Typography>
                                <Typography mb={1} variant='body2' color={'GrayText'}>Upload passport size photo</Typography>
                                <RoundButton onClick={() => ref?.current?.click()} text='Choose Photo' size={'small'} color={'primary'} variant={'contained'} disableElevation />
                            </Box>
                        </Box>

                        {/* <Box bgcolor={'#fff'} borderRadius={'10px'} mb={4}>
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
                        </Box> */}

                        <Stack direction={'row'} gap={2}>
                            {/* <RoundButton onClick={onFormReset} fullWidth text='Reset Form' color={'secondary'} variant={'outlined'} disableElevation /> */}
                            <RoundButton onClick={onFormSubmit} fullWidth text='Save & Create' color={'secondary'} variant={'contained'} disableElevation />
                        </Stack>

                    </Grid>
                </Grid>
            </Box>
        </div>
    )
}

export default NewApplication