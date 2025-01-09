import { Avatar, Box, Dialog, DialogContent, Divider, Grid, IconButton, MenuItem, Stack, Typography } from '@mui/material'
import React, { useEffect, useReducer, useRef, useState } from 'react'
import UserBg from '../../../assets/images/user_bg.jpg'
import { emailValidation, getStaffForm, reload, staffData, staffReducerFn, validateFile } from '../../../utils'
import { InputField, RoundButton } from '../../../components/shared'
import { Camera01Icon, Cancel01Icon, FloppyDiskIcon, PencilEdit01Icon } from 'hugeicons-react'
import { grey } from '@mui/material/colors'
import swal from 'sweetalert'
import { useLoader } from '../../../context/LoaderContext'
import { base } from '../../../config/appConfig'
import { formatLabel, getFormValue } from '../students/StudentDetails'


interface Props {
    data?: any
    open: boolean
    onClose: () => void
    type: 'add' | 'edit' | string
    callBack: () => void
}
const AddStaff = ({ open, onClose, type, callBack, data }: Props) => {
    const { startLoading, stopLoading } = useLoader()
    const formData = getStaffForm()
    const ref = useRef()
    const [formInput, dispatch] = useReducer(staffReducerFn, staffData)
    const [edit, setEdit] = useState<string | undefined>(undefined)
    const [preview, setPreview] = useState<any>(null)
    const [photo, setPhoto] = useState<File>()

    useEffect(() => {
        if (type === 'edit' && data) {
            console.log(data)
            dispatch({ type: 'UPDATE', payload: data })
        }
    }, [type])

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
        if (formInput?.academics?.department === ''
            || formInput?.academics?.programme === ''
            || formInput?.academics?.staffEmail === ''
            || formInput?.academics?.campus === ''
        ) return swal('Invalid', 'Provide all required fields under Academics', 'error').then(() => false)
        if (formInput?.surname === ''
            || formInput?.othernames === ''
            || formInput?.phone === ''
            || formInput?.gender === ''
            || formInput?.nationalID?.type === '' 
            || formInput?.nationalID?.number === ''
            || formInput?.address === ''
        ) return swal('Invalid', 'Provide all required fields under Personal Details', 'error').then(() => false)
        // if (
        //     formInput?.email === '' || !emailValidation(formInput?.email)
        // ) return swal('Invalid', 'Please provide a valid email address', 'error').then(() => false)
        if (!photo) return swal('Invalid', 'Provide profile photo', 'error').then(() => false)

        return true
    }

    const resetForm = () => {
        setPhoto(undefined)
        setPreview(undefined)
        onClose()
    }

    const onFormSubmit = async () => {
        // console.log(formInput)
        const isValid = await validateFormData()
        if (isValid) {
            await swal({
                title: 'Create Account',
                text: 'This action will create a new staff account. Staff will also be notified via email with the account details',
                icon: 'warning',
                buttons: ['Cancel', 'Proceed'],
                dangerMode: true,
                closeOnClickOutside: false
            }).then(async (del) => {
                if (del) {
                    startLoading('Creating student account. Please wait')
                    try {
                        const { data: res } = await base.post('/api/staff/create', formInput)
                        if (res?.responseCode === 200) {
                            const payload = new FormData()
                            payload.append('photo', photo!)
                            startLoading('Uploading profile photo..')
                            await base.patch(`/api/staff/photo/${res?.data?.academics?.staffID}`, payload, {
                                headers: { 'content-type': 'multipart/form-data' }
                            })
                            resetForm();
                            await swal('Success', 'Staff account created successfully', 'success').then(() => { callBack() })
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

    const updateStaffDetails = async () => {
        try {
            startLoading('Updating staff data. Please wait...')
            const { data: res } = await base.patch(`/api/staff/profile/${data?.id}`, formInput)
            if (res?.responseCode === 200) {
                swal('Success', 'Staff data updated successfully', 'success').then(reload)
            }
        } catch (error: any) {
            console.log(error?.response)
            swal('Error', error?.response?.data?.message, 'error').then(reload)
        } finally {
            stopLoading()
        }
    }


    return (
        <Dialog open={open} maxWidth={'md'} fullWidth>
            <DialogContent sx={{ p: 0, position: 'relative' }}>
                <Box sx={{ backgroundImage: `url(${UserBg})`, backgroundSize: 'cover' }} height={'5rem'} />
                <IconButton onClick={() => {
                    dispatch({ type: 'RESET' })
                    onClose()
                }} sx={{ position: 'absolute', top: '3%', right: '3%' }}><Cancel01Icon size={18} color='#fff' /></IconButton>
                <Box p={4}>
                    <Box width={'fit-content'} position={'relative'}>
                        <input type='file' name='photo' ref={ref} accept='image/*' style={{ display: 'none' }} onChange={(e) => uploadPhoto(e?.target?.files![0])} />
                        <Avatar src={preview!} sx={{ mt: '-4rem', width: '7rem', height: '7rem', boxShadow: '0 2px 8px rgba(0,0,0,15%)', bgcolor: grey[300], border: '1px solid lightgrey' }} />
                        <IconButton onClick={() => ref?.current?.click()} sx={{ bgcolor: 'red', position: 'absolute', bottom: '4%', right: '-1%', ':hover': { bgcolor: 'red' } }}><Camera01Icon size={20} color='#fff' /></IconButton>
                    </Box>

                    <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
                        <span>
                            <Typography mt={2} noWrap fontWeight={600}>Staff Photo</Typography>
                            <Typography variant='body2' mb={4} color={'GrayText'}>Click the icon to upload a picture</Typography>
                        </span>
                        {type === 'add' &&
                            <RoundButton
                                variant={'contained'} startIcon={<FloppyDiskIcon size={15} />} color={'secondary'}
                                onClick={onFormSubmit} disableElevation text='Create Staff' sx={{ py: 1 }}
                            />
                        }
                    </Stack>
                    {/* <Divider sx={{ my: 2 }} /> */}
                    {
                        formData?.map((data, i) => {
                            return (
                                <Box id={data?.title} key={i} border={'1px solid lightgrey'} borderRadius={'10px'} bgcolor={'#fff'} mb={4} sx={{ scrollMarginTop: '5.8rem' }}>
                                    <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} py={2} px={4}>
                                        <Typography fontWeight={600}>{data?.title}</Typography>
                                        {
                                            type === 'edit' && (
                                                <>
                                                    {

                                                        (edit === formatLabel(data?.title)) ?
                                                            <Stack direction={'row'} gap={1} alignItems={'center'}>
                                                                <RoundButton
                                                                    variant={'contained'} startIcon={<FloppyDiskIcon size={15} />} color={'secondary'}
                                                                    onClick={() => {
                                                                        updateStaffDetails()
                                                                    }}
                                                                    disableElevation text='Save' size={'small'}
                                                                />
                                                                <RoundButton sx={{ borderColor: grey[400], color: grey[600] }}
                                                                    variant={'outlined'} startIcon={<Cancel01Icon size={12} />} color={'primary'}
                                                                    onClick={() => {
                                                                        dispatch({ type: 'UPDATE', payload: data })
                                                                        setEdit(undefined)
                                                                    }} disableElevation text='Cancel' size={'small'}
                                                                />
                                                            </Stack>
                                                            :
                                                            <RoundButton sx={{ ml: 'auto', borderColor: grey[400], color: grey[600] }}
                                                                variant={'outlined'} startIcon={<PencilEdit01Icon size={15} />} color={'primary'}
                                                                onClick={() => { setEdit(formatLabel(data?.title)) }}
                                                                disableElevation text='Edit' size={'small'}
                                                            />
                                                    }
                                                </>
                                            )
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
                                                                variant={'outlined'} placeholder={el?.placeholder || ''}
                                                                value={value || ''}
                                                                isDisabled={type === 'add' ? false : edit !== formatLabel(data?.title)}
                                                                onChange={(e) => { dispatch({ type: el?.action, payload: e?.target?.value }) }}
                                                            >
                                                                {
                                                                    el?.options?.map((item, i) => <MenuItem key={i} value={item?.toLowerCase()}>{item}</MenuItem>)
                                                                }
                                                            </InputField>
                                                        </Grid>
                                                    )
                                                }
                                                return (
                                                    <Grid sm={6} item key={i}>
                                                        <Typography variant='body2' mb={1} color={'GrayText'}>{el?.label}</Typography>
                                                        <InputField size={'small'}
                                                            type={el?.type} fullWidth
                                                            variant={'outlined'} placeholder={el?.placeholder}
                                                            value={value || ''}
                                                            isDisabled={type === 'add' ? false : edit !== formatLabel(data?.title)}
                                                            onChange={(e) => { dispatch({ type: el?.action, payload: e?.target?.value }) }}
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
                </Box>
            </DialogContent>
        </Dialog>
    )
}

export default AddStaff