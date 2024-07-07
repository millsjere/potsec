import React, { useReducer, useRef, useState } from 'react'
import PageHeader from '../../../components/shared/PageHeader'
import { Avatar, Box, Grid, MenuItem, Stack, Typography } from '@mui/material'
import { InputField, RoundButton } from '../../../components/shared'
import { allMonths, certifications, getYearRange, initState, programmeSessions, programmeTrainings, programmes, studentReducerFn, validateFile } from '../../../utils'
import UploadComp from '../../../components/upload/UploadComp'
import swal from 'sweetalert'
import { useLoader } from '../../../context/LoaderContext'
import { base } from '../../../config/appConfig'
import { useNavigate } from 'react-router-dom'

interface FieldProps {
    type: string
    label: string,
    action: string,
    options?: Array<any>
    placeholder?: string
    isRequired?: boolean | undefined
}

interface FormDataProps {
    title: string,
    check?: string,
    fields: Array<FieldProps>

}

const AddStudent = () => {
    const ref = useRef()
    const navigate = useNavigate()
    const { startLoading, stopLoading } = useLoader()
    const [selectProgrammes, setSelectProgrammes] = useState<string[]>([])
    const [preview, setPreview] = useState<any>(null)
    const [photo, setPhoto] = useState<File>()

    const formData: FormDataProps[] = [
        {
            title: 'Application', fields: [
                { type: 'select', label: 'Application Type', action: 'ENROLL_TYPE', options: ['Local (Ghana)', 'Foreign'], isRequired: true },
                { type: 'select', label: 'Month of Enrollment', action: 'ENROLL_MONTH', options: allMonths, isRequired: true },
                { type: 'select', label: 'Year of Enrollment', action: 'ENROLL_YEAR', options: getYearRange(2019 - 19), isRequired: true },
                { type: 'text', label: 'Index No.', action: 'ENROLL_INDEX', isRequired: true },
            ]
        },
        {
            title: 'Personal Details', fields: [
                { type: 'text', label: 'Surname', action: 'SURNAME', isRequired: true },
                { type: 'text', label: 'Othernames', action: 'OTHERNAMES', isRequired: true },
                { type: 'email', label: 'Email', action: 'EMAIL', isRequired: true },
                { type: 'tel', label: 'Phone', action: 'PHONE_MOBILE', isRequired: true },
                { type: 'tel', label: 'WhatsApp', action: 'PHONE_WHATSAPP', isRequired: true },
                { type: 'select', label: 'Gender', action: 'GENDER', options: ['Male', 'Female'], isRequired: true },
                { type: 'date', label: 'Date of Birth', action: 'DOB', isRequired: true },
                { type: 'number', label: 'Age', action: 'AGE', isRequired: true },
                { type: 'select', label: 'Educational Level', action: 'EDU_LEVEL', options: ['Graduate', 'SHS Leaver', 'JHS Leaver', 'Mature Applicant', 'Others'], isRequired: true },
                { type: 'text', label: 'Language Spoken', action: 'LANGUAGE_SPOKEN', placeholder: 'English, Fante, Ewe', isRequired: true },
                { type: 'text', label: 'Language Written', action: 'LANGUAGE_WRITTEN', placeholder: 'English, Fante, Ewe', isRequired: true },
                { type: 'select', label: 'National ID', action: 'NATIONAL_ID', options: ['Ghana Card', 'Drivers License', 'Passport'], isRequired: true },
                { type: 'text', label: 'ID Number', action: 'NATIONAL_ID_NUMBER', isRequired: true },
                { type: 'text', label: 'Residence Address', action: 'RESIDENCE', isRequired: true },
                { type: 'text', label: 'Town', action: 'RESIDENCE_TOWN', isRequired: true },
                { type: 'text', label: 'District', action: 'RESIDENCE_DISTRICT', isRequired: true },
                { type: 'select', label: 'Region', action: 'RESIDENCE_REGION', options: ['Ashanti', 'Brong Ahafo', 'Central', 'Eastern', 'Greater Accra', 'Volta', 'Western', 'Northern', 'Upper East', 'Upper West', 'Oti', 'Savannah', 'Bono East', 'Ahafo', 'North East'], isRequired: true },

            ]
        },
        {
            title: 'Payment Method', fields: [
                { type: 'select', label: 'Payment', action: 'PAYMENT', options: ['Mobile Money'], isRequired: true },
                { type: 'text', label: 'Reference', action: 'PAYMENT_REF', isRequired: true },
                { type: 'text', label: 'Transaction ID', action: 'PAYMENT_TRANSACTION_ID', isRequired: true },
            ]
        },
        {
            title: 'Employment', fields: [
                { type: 'select', label: 'Are you currently employed?', action: 'EMPLOYMENT', options: ['Yes', 'No'], isRequired: true },
                { type: 'text', label: 'What is your current job', action: 'CURRENT_EMPLOYMENT', isRequired: true },
                { type: 'select', label: 'Do you need employment after completion', action: 'EMPLOYMENT_NEEDED', options: ['Yes', 'No'], isRequired: true },
            ]
        },
        {
            title: 'Health', fields: [
                { type: 'select', label: 'Do you have any health conditions?', action: 'HEALTH_CONDITION', options: ['Yes', 'No'], isRequired: true },
                { type: 'textarea', label: 'If yes, please provide details of the condition', action: 'HEALTH_DETAILS', isRequired: false },
            ]
        },
        {
            title: 'Guardian', fields: [
                { type: 'text', label: 'Name', action: 'GUARDIAN_NAME', isRequired: true },
                { type: 'text', label: 'Phone Number', action: 'GUARDIAN_PHONE', isRequired: true },
                { type: 'text', label: 'Relationship', action: 'GUARDIAN_RELATIONSHIP', isRequired: false },
            ]
        },
        {
            title: 'Sponsor', check: 'Same as Guardian', fields: [
                { type: 'text', label: 'Name', action: 'SPONSOR_NAME', isRequired: false },
                { type: 'text', label: 'Phone Number', action: 'SPONSOR_PHONE', isRequired: false },
                { type: 'text', label: 'Relationship', action: 'SPONSOR_RELATIONSHIP', isRequired: false },
            ]
        },
        {
            title: 'Emergency', check: 'Same as Guardian', fields: [
                { type: 'text', label: 'Name', action: 'EMERGENCY_NAME', isRequired: false },
                { type: 'text', label: 'Phone Number', action: 'EMERGENCY_PHONE', isRequired: false },
                // { type: 'text', label: 'Location', action: 'EMERGENCY_LOCATION', isRequired: false },
            ]
        },
        {
            title: 'Programme & Certification', fields: [
                { type: 'select', label: 'Certification', action: 'ENROLL_CERTIFICATION', options: ['HND/DIPLOMA', 'ADVANCED CERTIFICATE', 'CERTIFICATE'], isRequired: true },
                { type: 'select', label: 'Certification Level', action: 'ENROLL_CERTIFICATION_LEVEL', options: ['BEGINNER - (has no Foundation)', 'INTER-MEDIATE - (has the Basic knowledge)', 'ADVANCED - (has at least 50% knowledge)'], isRequired: true },
                { type: 'select', label: 'Select Programme', action: 'ENROLL_PROGRAMME', options: selectProgrammes, isRequired: true },
                { type: 'select', label: 'Mode of Education', action: 'ENROLL_TUITION_MODE', options: programmeTrainings, isRequired: true },
                { type: 'select', label: 'Select Session', action: 'ENROLL_SESSION', options: programmeSessions, isRequired: true },
                { type: 'select', label: 'Campus', action: 'CAMPUS', options: ['Accra', 'Kumasi'], isRequired: true },
            ]
        },

    ]
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

    const validateFormData = () => {
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
            || formInput?.address?.residence === '' || formInput?.address?.town === '' || formInput?.address?.district === '' || formInput?.address?.region === ''
        ) return swal('Invalid', 'Provide all required fields under Personal Details', 'error').then(() => false)
        if (formInput?.payment?.type === ''
            || formInput?.payment?.reference === ''
            || formInput?.payment?.transaction_id === ''
        ) return swal('Invalid', 'Provide all required fields under Payment', 'error').then(() => false)
        if (formInput?.employment?.isEmployed === ''
            || formInput?.employment?.currentJob === ''
            || formInput?.employment?.afterCompletion === ''
        ) return swal('Invalid', 'Provide all required fields under Employment', 'error').then(() => false)
        if (
            formInput?.health?.anyCondition === ''
            || formInput?.employment?.currentJob === ''
        ) return swal('Invalid', 'Provide all required fields under Health', 'error').then(() => false)
        if (formInput?.guardian?.name === ''
            || formInput?.guardian?.phone === ''
            || formInput?.guardian?.relationship === ''
        ) return swal('Invalid', 'Provide all required fields under Guardian', 'error').then(() => false)
        if (formInput?.emergency?.name === ''
            || formInput?.emergency?.phone === ''
        ) return swal('Invalid', 'Provide all required fields under Emergency', 'error').then(() => false)
        if (formInput?.enrollment?.certification === '' || formInput?.campus === ''
            || formInput?.enrollment?.certificationLevel === '' || formInput?.enrollment?.programme === ''
            || formInput?.enrollment?.session === '' || formInput?.enrollment?.modeofTuition === ''
        ) return swal('Invalid', 'Provide all required fields under Programme & Certification', 'error').then(() => false)
        if (!photo) return swal('Invalid', 'Provide profile photo', 'error').then(() => false)

        return true
    }

    const onFormSubmit = async () => {
        // console.log(formInput)
        const isValid = await validateFormData()
        if (isValid) {
            await swal({
                title: 'Create Account',
                text: 'This action will create a new student account. Student will also be notified via email with the account details',
                icon: 'warning',
                buttons: ['Cancel', 'Proceed'],
                dangerMode: true,
                closeOnClickOutside: false
            }).then(async (del) => {
                if (del) {
                    startLoading('Creating student account. Please wait')
                    try {
                        const { data: res } = await base.post('/api/student/create', formInput)
                        if (res?.responseCode === 200) {
                            const payload = new FormData()
                            payload.append('photo', photo!)
                            startLoading('Uploading profile photo..')
                            await base.patch(`/api/student/photo/${res?.data?.enrollment?.index}`, payload, {
                                headers: { 'content-type': 'multipart/form-data' }
                            })
                            await swal('Success', 'Student account created successfully', 'success').then(() => navigate('/staff/all-students'))
                        }
                    } catch (error) {
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
            <PageHeader title={'Add Students'} breadcrumbs={[{ label: 'Add Students', link: '#' }]} />
            <Box>
                <Grid container columnSpacing={4}>
                    <Grid item sm={8.5}>
                        {
                            formData?.map((data, i) => {
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
                            <RoundButton onClick={onFormSubmit} fullWidth text='Save & Create' color={'secondary'} variant={'contained'} disableElevation />
                        </Stack>

                    </Grid>
                </Grid>
            </Box>
        </div>
    )
}

export default AddStudent