import React, { useState } from 'react'
import PageHeader from '../../../components/shared/PageHeader'
import NullState from '../../../components/shared/NullState/NullState'
import Empty from '../../../assets/images/folders.png'
import FilterBar from '../../../components/filter/FilterBar'
import { InputField, RoundButton } from '../../../components/shared'
import { AddCircleIcon, Alert01Icon } from 'hugeicons-react'
import useAxiosFetch from '../../../hooks/useAxiosFetch'
import ModalItem from '../../../components/shared/Modals/ModalItem'
import swal from 'sweetalert'
import { Avatar, Box, Chip, Divider, Grid, MenuItem, Stack, Tab, Typography } from '@mui/material'
import LoadingState from '../../../components/shared/Loaders/LoadingState'
import { onDeleteHandler } from '../../../utils'
import { useLoader } from '../../../context/LoaderContext'
import { base } from '../../../config/appConfig'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import DeptCard from '../../../components/shared/Cards/DeptCard'
import CourseItem from '../../../components/shared/Cards/CourseItem'
import { useNavigate } from 'react-router-dom'
import MuiTable from '../../../components/shared/Tables/MuiTable'

interface CourseProps {
    name: string,
    code: string
}

interface EditProps {
    id?: string,
    name: string,
    department: string,
    duration: { number: number, type: string },
    courses?: any[],
    addNewCourseFn?: (val: object) => void
    newCourses?: CourseProps[]
}

const Programmes = () => {
    const navigate = useNavigate()
    const { startLoading, stopLoading } = useLoader()
    const { isLoading, response: data, fetchData } = useAxiosFetch('/api/staff/programmes');
    const { response: depts } = useAxiosFetch('/api/staff/department');
    const [open, setOpen] = useState(false)
    const [type, setType] = useState({ label: 'add', value: 1 })
    const [name, setName] = useState('')
    const [department, setDepartment] = useState('')
    const [duration, setDuration] = useState({ type: '', number: 0 })
    const [value, setValue] = useState<EditProps>({ id: '', name: '', department: '', duration: { number: 0, type: '' }, courses: [] })
    const [newCourses, setNewCourses] = useState<CourseProps[]>([])
    const [view, setView] = useState('list')
    const headers = ['Name', 'Department', 'Duration', 'Courses', 'Action']


    const resetForm = () => {
        setOpen(false);
        setName('');
        setDepartment('');
        setType({ label: 'add', value: 1 })
        setDuration({ type: '', number: 0 })
    }

    const onFormSubmit = async () => {
        if (name === '') return swal('Invalid', 'Please provide a name', 'warning')
        if (department === '') return swal('Invalid', 'Please select a department', 'warning')
        if (duration?.type === '' || duration?.number === 0) return swal('Invalid', 'Please provide a duration', 'warning')
        try {
            startLoading('Creating new department. Please wait..')
            const { data: res } = await base.post('/api/staff/programmes/new', { name, department, duration })
            if (res?.status === 'success') {
                resetForm()
                swal('Success', 'Programme created successfully', 'success').then(fetchData)
            }
        } catch (error: any) {
            console.log(error?.response)
            swal('Error', 'Sorry could not create programme', 'error')
        } finally {
            stopLoading()
        }
    }

    return (
        <div>
            <PageHeader title={'All Programmes'} breadcrumbs={[{ label: 'Programmes', link: '#' }]} />
            <FilterBar
                showYear={false}
                showProgramme={false}
                showView={true}
                onViewChange={() => { setView(view === 'list' ? 'grid' : 'list') }}
                onSearch={() => { }}
                isLoading={isLoading}
                moreBtns={
                    <RoundButton
                        variant={'contained'} sx={{ borderRadius: '10px', py: .8, mt: 1 }}
                        color={'primary'} disableElevation
                        text='Programme' startIcon={<AddCircleIcon size={18} color='#fff' />}
                        onClick={() => { setType({ label: 'add', value: 1 }); setOpen(true) }}
                    />
                }
            />
            {
                isLoading ?
                    <LoadingState state='students' />
                    :
                    (!isLoading && data?.length > 0) ? (
                        <>
                            {
                                view === 'grid' ?
                                    <Grid container spacing={3}>
                                        {
                                            data?.map((el: any, i: number) => {
                                                return <Grid key={i} item sm={3}>
                                                    <DeptCard
                                                        title={el?.name} showBtn
                                                        subText={`Dept - ${el?.department?.name}`}
                                                        extraText={`${el?.duration?.number} ${el?.duration?.type}`}
                                                        onDelete={() => onDeleteHandler(el?.id, 'Programme', 'programmes', startLoading, stopLoading, fetchData)}
                                                        onClick={(e) => {
                                                            e.stopPropagation()
                                                            setValue({
                                                                id: el?.id, name: el?.name,
                                                                department: el?.department?.name,
                                                                duration: el?.duration,
                                                                courses: el?.courses
                                                            });
                                                            setType({ label: 'edit', value: 1 });
                                                            setOpen(true)
                                                        }}
                                                        addCourse={() => navigate(`/staff/programmes/${el?.id}/edit`)}
                                                    />
                                                </Grid>
                                            })

                                        }
                                    </Grid>
                                    :
                                    <MuiTable
                                        data={data}
                                        headers={headers}
                                        onEditClick={(id) => navigate(`/staff/programmes/${id}/edit`)}
                                        onDeleteClick={(id) => onDeleteHandler(id, 'Programme', 'programmes', startLoading, stopLoading, fetchData)}
                                    />
                            }
                        </>
                    )
                        :
                        <NullState
                            title='Programmes'
                            subtext={`Oops. No programme records were found`}
                            image={Empty}
                            btnText={'Add Programme'}
                            onClick={() => { setOpen(true) }}
                            opacity={0.2}
                        />
            }

            <ModalItem
                onSubmit={onFormSubmit}
                actionBtn={type?.label === 'edit' ? 'Update' : 'Create'}
                maxWidth={(type?.label === 'edit' && type?.value === 2) ? 'md' : 'sm'}
                open={open} type={type?.value}
                onClose={resetForm}
                title={`${type?.label} Programme`}
            >
                {
                    depts?.length === 0 &&
                    <Stack mb={1} direction={'row'} gap={1} bgcolor={'red'} color={'#fff'} alignItems={'center'}>
                        <Avatar variant='rounded'><Alert01Icon /></Avatar>
                        <Typography>Sorry, you cannot create a programme without a department</Typography>
                    </Stack>
                }
                {
                    ((type?.label === 'add' && type?.value === 1) || (type?.label === 'edit' && type?.value === 1)) &&
                    <>
                        <InputField
                            showTopLabel
                            label='Name' fullWidth
                            size={'small'}
                            value={name}
                            onChange={(e) => setName(e?.target?.value)}
                        />
                        <InputField
                            showTopLabel isSelect
                            label='Department' fullWidth
                            size={'small'} type='select'
                            onChange={(e) => setDepartment(e?.target?.value)}
                        >
                            {depts?.map((el: any, i: number) => <MenuItem key={i} value={el?.id}>{el?.name}</MenuItem>)}
                        </InputField>
                        <InputField
                            showTopLabel type='select'
                            label='Duration' fullWidth
                            size={'small'}
                            value={duration?.type} isSelect
                            onChange={(e) => setDuration(prev => ({ ...prev, type: e?.target?.value }))}
                        >
                            {['Months', 'Years']?.map((el, i) => <MenuItem key={i} value={el}>{el}</MenuItem>)}
                        </InputField>
                        {
                            duration?.type !== '' &&
                            <InputField
                                showTopLabel type='number' inputProps={{ min: 0 }}
                                label={duration?.type} fullWidth
                                size={'small'}
                                value={duration?.number}
                                onChange={(e) => setDuration(prev => ({ ...prev, number: e?.target?.value }))}
                            />

                        }
                    </>
                }
                {
                    (type?.label === 'edit' && type?.value === 2) &&
                    <EditBox
                        newCourses={newCourses}
                        addNewCourseFn={(val: object) => setNewCourses((prev: any) => [...prev, val])}
                        name={value?.name!}
                        department={value?.department!}
                        duration={value?.duration!}
                    />
                }

            </ModalItem>

        </div>
    )
}

const NewCourse = ({ addCourse }: { addCourse: (val: object) => void }) => {
    const [value, setValue] = useState<CourseProps>({ name: '', code: '' })
    const onClickHandler = () => {
        if (value?.name === '' || value?.code === '') return swal('Invalid', 'Please provide course name and course code', 'warning')
        addCourse(value)
        setValue({ name: '', code: '' })
    }
    return (
        <div>
            <Grid container spacing={2} alignItems={'center'}>
                <Grid item sm={5}>
                    <InputField
                        showTopLabel
                        label='Course Name' fullWidth
                        size={'small'}
                        onChange={(e) => { setValue((prev) => ({ ...prev, name: e?.target?.value })) }}
                    />
                </Grid>
                <Grid item sm={5}>
                    <InputField
                        showTopLabel
                        label='Course Code' fullWidth
                        size={'small'}
                        onChange={(e) => { setValue((prev) => ({ ...prev, code: e?.target?.value })) }}
                    />
                </Grid>
                <Grid item sm={2}>
                    <RoundButton
                        variant={'contained'} sx={{ borderRadius: '10px', py: .8, mt: 1 }}
                        color={'primary'} disableElevation
                        text='Add' startIcon={<AddCircleIcon size={18} color='#fff' />}
                        onClick={onClickHandler}
                    />
                </Grid>
            </Grid>
        </div>
    )
}

const EditBox = ({ name, department, duration, addNewCourseFn, newCourses }: EditProps) => {
    const [value, setValue] = useState('1')
    return (
        <Box>
            <Stack direction={'row'} gap={1.5} alignItems={'flex-start'} mb={3}>
                <Avatar sx={{ bgcolor: '#03A9F4', width: '3rem', height: '3rem' }} variant='rounded'>{name?.charAt(0)?.toUpperCase()}</Avatar>
                <span>
                    <Typography mt={-.5} mb={-.5} variant='h6' noWrap>{name}</Typography>
                    <Typography mb={0} color={'GrayText'}>Dept: {department}</Typography>
                </span>
                <span style={{ marginLeft: 'auto' }} >
                    <Chip size='medium' label={<Typography variant='body2'>{duration?.number + ' ' + duration?.type}</Typography>} />
                </span>

            </Stack>
            <TabContext value={value}>
                <Box sx={{ border: 1, borderColor: 'divider', borderRadius: '10px 10px 0 0' }}>
                    <TabList onChange={(_e, val) => setValue(val)}>
                        {duration?.type?.toLowerCase() === 'months' && <Tab label={`${duration?.number} ${duration?.type}`} value="1" />}
                        {duration?.type?.toLowerCase() === 'years' &&
                            Array(duration?.number).fill(1)?.map((_el, i) => {
                                return (
                                    <Tab key={i} label={`YEAR ${(i + 1)}`} value={String(i + 1)} />
                                )
                            })
                        }
                    </TabList>
                </Box>
                <TabPanel value='1' sx={{ border: 1, borderTopWidth: 0, borderColor: 'divider', minHeight: '20rem' }}>
                    <NewCourse addCourse={addNewCourseFn!} />
                    <Typography>All Courses</Typography>
                    <Divider sx={{ my: 1 }} />
                    {
                        newCourses!?.length > 0 ?
                            newCourses?.map((course, i) => (
                                <Stack key={i}>
                                    <CourseItem course={course} />
                                </Stack>
                            ))
                            :
                            <NullState
                                title='Courses'
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
                <TabPanel value='2'>
                    <Typography>All Courses</Typography>
                    <Divider sx={{ my: 1 }} />
                </TabPanel>
                <TabPanel value='3'>Panel 3</TabPanel>
                <TabPanel value='4'>Panel 4</TabPanel>
            </TabContext>

        </Box>
    )
}


export default Programmes