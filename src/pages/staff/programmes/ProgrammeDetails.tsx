import { Avatar, Box, Chip, MenuItem, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import CourseItem from '../../../components/shared/Cards/CourseItem'
import NullState from '../../../components/shared/NullState/NullState'
import useAxiosFetch from '../../../hooks/useAxiosFetch'
import LoadingState from '../../../components/shared/Loaders/LoadingState'
import { useParams } from 'react-router-dom'
import Empty from '../../../assets/images/folders.png'
import PageHeader from '../../../components/shared/PageHeader'
import { InputField, RoundButton } from '../../../components/shared'
import { AddCircleIcon } from 'hugeicons-react'
import ModalItem from '../../../components/shared/Modals/ModalItem'
import swal from 'sweetalert'
import { useLoader } from '../../../context/LoaderContext'
import { base } from '../../../config/appConfig'


export interface DetailsProps {
    courses: any[],
    department: object,
    duration: { number: number, type: string },
    tuition: { amount: number, words: string },
    name: string,
    id: string
}
export const trimesters = ['Trimester 1', 'Trimester 2', 'Trimester 3']

export const getCourseYear = (data: DetailsProps, n: number) => {
    switch (n) {
        case 1:
            return data?.courses!?.length > 0 ? data?.courses?.filter((el => el?.year === 1)) : []
        case 2:
            return data?.courses!?.length > 0 ? data?.courses?.filter((el => el?.year === 2)) : []
        case 3:
            return data?.courses!?.length > 0 ? data?.courses?.filter((el => el?.year === 3)) : []
        default:
            break;
    }
}

const ProgrammeDetails = () => {
    const { startLoading, stopLoading } = useLoader()
    const params = useParams()
    const { isLoading, response, fetchData } = useAxiosFetch(`/api/staff/programmes/${params?.id}`);
    const [data, setData] = useState<DetailsProps>()
    const [open, setOpen] = useState(false)
    const [input, setInput] = useState({ name: '', code: '', trimester: '', credit: 0, year: 0 })

    const months = data?.courses!?.length > 0 ? data?.courses?.filter((el => el?.level?.includes('Months'))) : []



    useEffect(() => {
        if (!isLoading && response) {
            setData(response)
        }
    }, [isLoading])

    const onFormSubmit = async () => {
        if (input?.trimester === '') return swal('Invalid', 'Please select a trimester', 'warning')
        if (input?.name === '') return swal('Invalid', 'Please provide a course name', 'warning')
        if (input?.code === '') return swal('Invalid', 'Please select a course code', 'warning')
        if (input?.credit === 0) return swal('Invalid', 'Course credit cannot be zero', 'warning')
        try {
            startLoading('Creating new course. Please wait..')
            const { data: res } = await base.patch('/api/staff/course/add', { id: params?.id, course: input })
            if (res?.status === 'success') {
                resetForm()
                swal('Success', 'Course created successfully', 'success').then(fetchData)
            }
        } catch (error: any) {
            console.log(error?.response)
            swal('Error', 'Sorry could not create course', 'error')
        } finally {
            stopLoading()
        }
    }

    const resetForm = () => {
        setOpen(false)
        setInput({ name: '', code: '', trimester: '', credit: 0, year: 0 })
    }

    const removeCourse = (course: any) => {
        swal('Are You Sure!', 'This action will delete this course', 'warning', { buttons: ['Cancel', 'Delete'], dangerMode: true })
            .then(async (del) => {
                if (del) {
                    try {
                        startLoading('Creating new course. Please wait..')
                        await base.patch('/api/staff/course/delete', { id: params?.id, course })
                        swal('Success', 'Course deleted successfully', 'success').then(fetchData)

                    } catch (error: any) {
                        console.log(error?.response)
                        swal('Error', 'Sorry could not delete course', 'error')
                    } finally {
                        stopLoading()
                    }
                }
            })
    }

    return (
        <Box>
            <PageHeader title={'Programme Details'} backOption
                breadcrumbs={[{ label: 'Programmes', link: '/staff/programmes' }, { label: 'Details', link: '#' }]} />

            {
                isLoading ?
                    <LoadingState state='staff' />
                    :
                    <>
                        <Stack direction={'row'} gap={1.5} alignItems={'flex-start'} mb={3} bgcolor={'#fff'} p={2.5} borderRadius={'10px'}>
                            <Avatar sx={{ bgcolor: '#03A9F4', width: '3rem', height: '3rem' }} variant='rounded'>{data?.name?.charAt(0)?.toUpperCase()}</Avatar>
                            <span>
                                <Typography mt={-.5} mb={-.5} variant='h6' noWrap>{data?.name}</Typography>
                                <Typography mb={0} color={'GrayText'}>Department: {data?.department?.name}</Typography>
                                <Typography mb={0} color={'GrayText'}>Tuition: GHS {data?.tuition?.amount || 0}</Typography>
                            </span>
                            <span style={{ marginLeft: 'auto' }} >
                                <Chip size='medium' label={<Typography variant='body2'>{data?.duration?.number + ' ' + data?.duration?.type}</Typography>} />
                            </span>

                        </Stack>

                        {
                            Array(data?.duration?.number).fill(0)?.map((_el: any, i: number) => (
                                <Box key={i} bgcolor={'#fff'} p={3} borderRadius={'10px'} mb={2}>
                                    <Stack mb={2} direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
                                        <Typography variant='h6'>{`All Courses (Year ${i + 1})`}</Typography>
                                        <RoundButton text='Course'
                                            variant={'contained'} size={'small'}
                                            color={'secondary'} disableElevation sx={{ borderRadius: '6px' }}
                                            onClick={() => { setOpen(true); setInput(prev => ({ ...prev, year: i + 1 })) }} startIcon={<AddCircleIcon size={18} />}
                                        />

                                    </Stack>
                                    {
                                        trimesters?.map((trm, index) => (
                                            <Box key={index} sx={{ minHeight: '20rem', mb: 2, border: '1px solid lightgrey', borderRadius: '0 0 8px 8px' }}>
                                                <Box bgcolor={'#ededed'} p={1.5}>
                                                    <Typography variant='h6' fontSize={'1.1rem'}>{trm}</Typography>
                                                </Box>
                                                <Box sx={{ p: 2 }}>
                                                    {
                                                        data?.duration?.type?.toLowerCase() === 'years' ?
                                                            <>
                                                                {
                                                                    getCourseYear(data, i + 1)!.filter(el => el?.trimester === trm)?.length > 0 ?
                                                                        getCourseYear(data, i + 1)?.filter(el => el?.trimester === trm)?.map((course: any, i: number) => (
                                                                            <Stack key={i}>
                                                                                <CourseItem course={course} onRemove={() => removeCourse(course)} />
                                                                            </Stack>
                                                                        ))
                                                                        :
                                                                        <NullState
                                                                            title='All Courses'
                                                                            subtext={`No course records added yet`}
                                                                            image={Empty}
                                                                            imageSize='10%'
                                                                            btnText={'Add Course'}
                                                                            onClick={() => { }}
                                                                            opacity={0.2}
                                                                            height='20rem'
                                                                            btnSize='small'
                                                                            showBtn={false}
                                                                        />
                                                                }
                                                            </>
                                                            :
                                                            <>
                                                                {
                                                                    months!?.length > 0 ?
                                                                        months?.map((course: any, i: number) => (
                                                                            <Stack key={i}>
                                                                                <CourseItem course={course} onRemove={() => removeCourse(course)} />
                                                                            </Stack>
                                                                        ))
                                                                        :
                                                                        <NullState
                                                                            title='All Courses'
                                                                            subtext={`No course records added yet`}
                                                                            image={Empty}
                                                                            btnText={'Add Course'}
                                                                            onClick={() => { }}
                                                                            opacity={0.2}
                                                                            height='25rem'
                                                                            btnSize='small'
                                                                            showBtn={false}
                                                                        />
                                                                }
                                                            </>
                                                    }
                                                </Box>
                                            </Box>
                                        ))
                                    }
                                </Box>
                            ))
                        }


                        {/* ADD COURSE MODAL */}
                        <ModalItem
                            onSubmit={onFormSubmit}
                            actionBtn={'Create'}
                            maxWidth={'sm'}
                            open={open}
                            onClose={resetForm}
                            title={'Add Course'}
                        >
                            <InputField
                                showTopLabel type='select'
                                label='Trimester' fullWidth
                                size={'small'}
                                value={input?.trimester} isSelect
                                onChange={(e) => setInput(prev => ({ ...prev, trimester: e?.target?.value }))}
                            >
                                {
                                    data?.duration?.type?.toLowerCase() === 'years' ?
                                        Array(3).fill(1)?.map((_el, i) => `Trimester ${i + 1}`)?.map((el, i) => <MenuItem key={i} value={el}>{el}</MenuItem>)
                                        :
                                        <MenuItem value={data?.duration?.type + ' ' + data?.duration?.number}>{`${data?.duration?.number} ${data?.duration?.type}`}</MenuItem>
                                }
                            </InputField>
                            <InputField
                                showTopLabel
                                label='Course Name' fullWidth
                                size={'small'}
                                value={input?.name} type='text'
                                onChange={(e) => setInput(prev => ({ ...prev, name: e?.target?.value }))}
                            />
                            <InputField
                                showTopLabel
                                label='Course Code' fullWidth
                                size={'small'} type='text'
                                value={input?.code}
                                onChange={(e) => setInput(prev => ({ ...prev, code: e?.target?.value }))}
                            />
                            <InputField
                                showTopLabel
                                label='Credit' fullWidth
                                size={'small'} type='number'
                                value={input?.credit} inputProps={{ min: 0 }}
                                onChange={(e) => setInput(prev => ({ ...prev, credit: e?.target?.value }))}
                            />

                        </ModalItem>

                    </>
            }

        </Box>
    )
}

export default ProgrammeDetails