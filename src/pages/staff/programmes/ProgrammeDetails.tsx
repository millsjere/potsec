import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Avatar, Box, Chip, Divider, MenuItem, Stack, Tab, Typography } from '@mui/material'
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


interface DetailsProps {
    courses: any[],
    department: object,
    duration: { number: number, type: string },
    name: string,
    id: string
}

const ProgrammeDetails = () => {
    const { startLoading, stopLoading } = useLoader()
    const [value, setValue] = useState('1')
    const params = useParams()
    const { isLoading, response, fetchData } = useAxiosFetch(`/api/staff/programmes/${params?.id}`);
    const [data, setData] = useState<DetailsProps>()
    const [open, setOpen] = useState(false)
    const [input, setInput] = useState({ name: '', code: '', level: 'month_six', })

    useEffect(() => {
        if (!isLoading && response) {
            setData(response)
        }
    }, [isLoading])

    const onFormSubmit = async () => {
        if (input?.name === '') return swal('Invalid', 'Please provide a course name', 'warning')
        if (input?.code === '') return swal('Invalid', 'Please select a course code', 'warning')
        try {
            startLoading('Creating new course. Please wait..')
            const { data: res } = await base.post('/api/staff/programmes/new', { name, department, duration })
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
        setInput({ name: '', code: '' })
    }

    return (
        <Box>
            <PageHeader title={'Programme Details'} breadcrumbs={[{ label: 'Programmes', link: '/staff/programmes' }, { label: 'Details', link: '#' }]} />

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
                            </span>
                            <span style={{ marginLeft: 'auto' }} >
                                <Chip size='medium' label={<Typography variant='body2'>{data?.duration?.number + ' ' + data?.duration?.type}</Typography>} />
                            </span>

                        </Stack>

                        <Box bgcolor={'#fff'} p={3} borderRadius={'10px'}>
                            <Stack mb={2} direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
                                <Typography variant='h6'>All Courses</Typography>
                                <RoundButton text='Course'
                                    variant={'contained'} size={'small'}
                                    color={'secondary'} disableElevation sx={{ borderRadius: '6px' }}
                                    onClick={() => { setOpen(true) }} startIcon={<AddCircleIcon size={18} />}
                                />
                            </Stack>
                            <TabContext value={value}>
                                <Box sx={{ border: 1, borderColor: 'divider', borderRadius: '10px 10px 0 0' }}>
                                    <TabList onChange={(_e, val) => setValue(val)}>
                                        {data?.duration?.type?.toLowerCase() === 'months' && <Tab label={`${data?.duration?.number} ${data?.duration?.type}`} value="1" />}
                                        {data?.duration?.type?.toLowerCase() === 'years' &&
                                            Array(data?.duration?.number).fill(1)?.map((_el, i) => {
                                                return (
                                                    <Tab key={i} label={`YEAR ${(i + 1)}`} value={String(i + 1)} />
                                                )
                                            })
                                        }
                                    </TabList>
                                </Box>
                                <TabPanel value='1' sx={{ border: 1, borderTopWidth: 0, borderColor: 'divider', minHeight: '20rem' }}>
                                    {
                                        data?.courses!?.length > 0 ?
                                            data?.courses?.map((course: any, i: number) => (
                                                <Stack key={i}>
                                                    <CourseItem course={course} />
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
                                </TabPanel>
                                <TabPanel value='2' sx={{ border: 1, borderTopWidth: 0, borderColor: 'divider', minHeight: '20rem' }}>

                                </TabPanel>
                                <TabPanel value='3' sx={{ border: 1, borderTopWidth: 0, borderColor: 'divider', minHeight: '20rem' }}>Panel 3</TabPanel>
                                <TabPanel value='4' sx={{ border: 1, borderTopWidth: 0, borderColor: 'divider', minHeight: '20rem' }}>Panel 4</TabPanel>
                            </TabContext>
                        </Box>

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
                                label='Level' fullWidth
                                size={'small'}
                                value={input?.level} isSelect
                                onChange={(e) => setInput(prev => ({ ...prev, level: e?.target?.value }))}
                            >
                                {
                                    data?.duration?.type?.toLowerCase() === 'years' ?
                                        Array(data?.duration?.number).fill(1)?.map((_el, i) => `Year ${i + 1}`)?.map((el, i) => <MenuItem key={i} value={el}>{el}</MenuItem>)
                                        :
                                        <MenuItem value={data?.duration?.type}>{`${data?.duration?.number} ${data?.duration?.type}`}</MenuItem>
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

                        </ModalItem>

                    </>
            }

        </Box>
    )
}

export default ProgrammeDetails