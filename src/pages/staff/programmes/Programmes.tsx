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
import { Avatar, Grid, InputAdornment, MenuItem, Stack, Typography } from '@mui/material'
import LoadingState from '../../../components/shared/Loaders/LoadingState'
import { onDeleteHandler, reload } from '../../../utils'
import { useLoader } from '../../../context/LoaderContext'
import { base } from '../../../config/appConfig'
import DeptCard from '../../../components/shared/Cards/DeptCard'
import { useNavigate } from 'react-router-dom'
import MuiTable from '../../../components/shared/Tables/MuiTable'

const Programmes = () => {
    const navigate = useNavigate()
    const { startLoading, stopLoading } = useLoader()
    const { isLoading, response: data, fetchData, setIsLoading, setResponse } = useAxiosFetch('/api/staff/programmes');
    const { response: depts } = useAxiosFetch('/api/staff/departments');
    const [open, setOpen] = useState(false)
    const [type, setType] = useState({ label: 'edit', value: 2 })
    const [name, setName] = useState('')
    const [department, setDepartment] = useState('')
    const [duration, setDuration] = useState({ type: '', number: 0 })
    const [tuition, setTuition] = useState({ words: '', amount: 0, semester: 0 })
    const [id, setId] = useState<string>()
    const [view, setView] = useState('list')
    const headers = ['Name', 'Department', 'Duration', 'Courses', 'Action']
    const [params, setParams] = useState({ label: '', value: '' })

    const resetForm = () => {
        setOpen(false);
        setName('');
        setDepartment('');
        setType({ label: 'add', value: 1 })
        setDuration({ type: '', number: 0 })
        setTuition({ words: '', amount: 0, semester: 0 })
    }

    const onFormSubmit = async () => {
        if (name === '') return swal('Invalid', 'Please provide a name', 'warning')
        if (department === '') return swal('Invalid', 'Please select a department', 'warning')
        if (tuition?.amount === 0) return swal('Invalid', 'Tuition amount cannot be zero(0)', 'warning')
        if (tuition?.words === '') return swal('Invalid', 'Provide tuition amount in words', 'warning')
        if (tuition?.semester === 0) return swal('Invalid', 'Tuition per semester cannot be zero(0)', 'warning')
        if (duration?.type === '' || duration?.number === 0) return swal('Invalid', 'Please select a duration. Year/Month cannot be zero(0)', 'warning')
        try {
            startLoading('Creating new department. Please wait..')
            const { data: res } = type?.label === 'add' ?
                await base.post('/api/staff/programmes/new', { name, department, duration, tuition }) :
                await base.patch(`/api/staff/programmes/${id}`, { name, department, duration, tuition })
            if (res?.status === 'success') {
                resetForm()
                swal('Success', `Programme ${type?.label === 'edit' ? 'updated' : 'created'} successfully`, 'success').then(fetchData)
            }
        } catch (error: any) {
            console.log(error?.response)
            swal('Error', 'Sorry could not create programme', 'error')
        } finally {
            stopLoading()
        }
    }

    const onSearchHandler = async () => {
        if (params.label === '' || params.value === '') return
        console.log('params ==>', params)
        try {
            setIsLoading(true)
            const { data: res } = await base.get(`/api/search/programmes?${params?.label?.toLowerCase()}=${params?.value}`)
            if (res?.status === 'success') {
                setResponse(res?.data)
            }
        } catch (error) {
            swal({
                title: 'Error',
                text: 'Sorry, could not get data. Please refresh and try again',
                icon: 'error'
            }).then(reload)
        } finally {
            setIsLoading(false)
        }

    }

    const resetFilter = async () => {
        setParams({ label: '', value: '' })
        await fetchData()
    }

    const onEditClick = (e, el: any) => {
        e.stopPropagation()
        setId(el?.id);
        setName(el?.name);
        setDepartment(el?.department?.id);
        setType({ label: 'add', value: 1 })
        setDuration({ type: el?.duration?.type, number: el?.duration?.number })
        setTuition({ words: el?.tuition?.words, amount: el?.tuition?.amount, semester: el?.tuition?.semester })
        setType({ label: 'edit', value: 1 });
        setOpen(true)
    }

    return (
        <div>
            <PageHeader title={'All Programmes'} breadcrumbs={[{ label: 'Programmes', link: '#' }]} />
            <FilterBar
                showView={true}
                onViewChange={() => { setView(view === 'list' ? 'grid' : 'list') }}
                isLoading={isLoading}
                moreBtns={
                    <RoundButton
                        variant={'contained'} sx={{ borderRadius: '10px', py: .8, mt: 1 }}
                        color={'primary'} disableElevation
                        text='Programme' startIcon={<AddCircleIcon size={18} color='#fff' />}
                        onClick={() => { setType({ label: 'add', value: 1 }); setOpen(true) }}
                    />
                }
                filterParams={params}
                onSearch={onSearchHandler}
                onReset={resetFilter}
                onExport={() => { }}
                onFilter={(e: any) => { setParams({ label: e?.target?.value, value: '' }) }}
                onKeywordChange={(e: any) => { setParams(prev => ({ ...prev, value: e?.target?.value })) }}
                filterOptions={['Name', 'Department']}
                selectFieldOptions={depts}
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
                                                        onClick={(e) => onEditClick(e, el)}
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
                                        onEditClick={(_id, _e, data) => onEditClick(_e, data)}
                                        onDeleteClick={(id) => onDeleteHandler(id, 'Programme', 'programmes', startLoading, stopLoading, fetchData)}
                                        viewLabel={'View'}
                                        onViewClick={(id) => navigate(`/staff/programmes/${id}/edit`)}
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
                            value={department}
                        >
                            {depts?.map((el: any, i: number) => <MenuItem key={i} value={el?.id}>{el?.name}</MenuItem>)}
                        </InputField>
                        <InputField
                            showTopLabel
                            label='Tuition Fee' fullWidth
                            size={'small'} type='number' inputProps={{ min: 0 }}
                            value={tuition?.amount}
                            onChange={(e) => setTuition(prev => ({ ...prev, amount: e?.target?.value }))}
                            InputProps={{
                                startAdornment: <InputAdornment position='start'>GHS</InputAdornment>
                            }}
                        />
                        <InputField
                            showTopLabel
                            label='Amount In Words (Tuition Fee)' fullWidth
                            size={'small'} type='text' multiline rows={2}
                            value={tuition?.words}
                            onChange={(e) => setTuition(prev => ({ ...prev, words: e?.target?.value }))}
                        />
                        <InputField
                            showTopLabel
                            label='Tuition Per Semester' fullWidth
                            size={'small'} type='number' inputProps={{ min: 0 }}
                            value={tuition?.semester}
                            onChange={(e) => setTuition(prev => ({ ...prev, semester: e?.target?.value }))}
                            InputProps={{
                                startAdornment: <InputAdornment position='start'>GHS</InputAdornment>
                            }}
                        />
                        <InputField
                            showTopLabel type='select'
                            label='Duration' fullWidth
                            size={'small'}
                            value={duration?.type} isSelect
                            onChange={(e) => setDuration(prev => ({ ...prev, type: e?.target?.value }))}
                        >
                            {['months', 'years']?.map((el, i) => <MenuItem key={i} value={el}>{el}</MenuItem>)}
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
            </ModalItem>

        </div>
    )
}


export default Programmes