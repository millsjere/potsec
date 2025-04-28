import React, { useState } from 'react'
import NullState from '../../../components/shared/NullState/NullState'
import PageHeader from '../../../components/shared/PageHeader'
import Empty from '../../../assets/images/department.png'
import FilterBar from '../../../components/filter/FilterBar'
import { InputField, RoundButton } from '../../../components/shared'
import { AddCircleIcon } from 'hugeicons-react'
import ModalItem from '../../../components/shared/Modals/ModalItem'
import useAxiosFetch from '../../../hooks/useAxiosFetch'
import { Grid } from '@mui/material'
import swal from 'sweetalert'
import LoadingState from '../../../components/shared/Loaders/LoadingState'
import { base } from '../../../config/appConfig'
import { useLoader } from '../../../context/LoaderContext'
import { onDeleteHandler, reload } from '../../../utils'
import DeptCard from '../../../components/shared/Cards/DeptCard'
import MuiTable from '../../../components/shared/Tables/MuiTable'



const Departments = () => {
    const { startLoading, stopLoading } = useLoader()
    const { isLoading, response: data, fetchData, setIsLoading, setResponse } = useAxiosFetch('/api/staff/departments');
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState({ id: '', name: '', head: '' })
    const [type, setType] = useState('add')
    const [view, setView] = useState('list')
    const headers = ['Name', 'Head of Dept', 'Programmes', 'Action']
    const [params, setParams] = useState({ label: '', value: '' })


    const onFormSubmit = async () => {
        if (value?.name === '') return swal('Invalid', 'Please provide a name', 'warning')
        try {
            startLoading(type === 'add' ? 'Creating new department. Please wait..' : 'Updating department. Please wait...')
            const { data: res } = type === 'add' ? await base.post('/api/staff/department/new', { name: value?.name, head: value?.head }) : await base.patch(`/api/staff/department/${value?.id}`, { name: value?.name, head: value?.head })
            if (res?.status === 'success') {
                setOpen(false);
                setValue({ id: '', name: '', head: '' })
                swal('Success', `Department ${type === 'add' ? 'created' : 'updated'} successfully`, 'success').then(fetchData)
            }
        } catch (error: any) {
            console.log(error?.response)
            swal('Error', `Sorry could not ${type === 'add' ? 'create' : 'update'} department`, 'error')
        } finally {
            stopLoading()
        }
    }

    const onSearchHandler = async () => {
        if (params.label === '' || params.value === '') return
        console.log('params ==>', params)
        try {
            setIsLoading(true)
            const { data: res } = await base.get(`/api/search/departments?${params?.label?.toLowerCase()}=${params?.value}`)
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

    return (
        <div>
            <PageHeader title={'All Departments'} breadcrumbs={[{ label: 'Departments', link: '#' }]} />
            <FilterBar
                showView={false}
                showExport={false}
                isLoading={isLoading}
                moreBtns={
                    <RoundButton
                        variant={'contained'} sx={{ borderRadius: '10px', py: .8, mt: 1 }}
                        color={'primary'} disableElevation
                        text='New Department' startIcon={<AddCircleIcon size={18} color='#fff' />}
                        onClick={() => { setOpen(true); setType('add') }}
                        loading={isLoading}
                    />
                }
                filterParams={params}
                onSearch={onSearchHandler}
                onReset={resetFilter}
                onExport={() => { }}
                onFilter={(e: any) => { setParams({ label: e?.target?.value, value: '' }) }}
                onKeywordChange={(e: any) => { setParams(prev => ({ ...prev, value: e?.target?.value })) }}
                filterOptions={['Name']}
            />
            {
                isLoading ?
                    <LoadingState state='staff' />
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
                                                        title={el?.name}
                                                        subText={`${el?.programmes?.length} Programme(s)`}
                                                        onDelete={(e: any) => { e.stopPropagation(); onDeleteHandler(el?.id, 'Department', 'department', startLoading, stopLoading, fetchData) }}
                                                        onClick={(e: any) => { e.stopPropagation(); setType('edit'); setValue({ id: el?.id, name: el?.name, head: '' }); setOpen(true) }}
                                                    />
                                                </Grid>
                                            })

                                        }
                                    </Grid>
                                    :
                                    <MuiTable
                                        data={data}
                                        headers={headers}
                                        onEditClick={(id, e, row) => {
                                            e?.stopPropagation(); setType('edit'); setValue({ id, name: row?.name, head: '' }); setOpen(true)
                                        }}
                                        onDeleteClick={(id, e) => {
                                            e?.stopPropagation(); onDeleteHandler(id, 'Department', 'department', startLoading, stopLoading, fetchData)
                                        }}
                                    />

                            }
                        </>
                    )
                        :
                        <NullState
                            title='Departments'
                            subtext={`Oops. No department records were found`}
                            image={Empty}
                            btnText={'Add Department'}
                            onClick={() => { setOpen(true) }}
                            opacity={0.4}
                        />

            }

            <ModalItem
                actionBtn={type === 'add' ? 'Create' : 'Update'} maxWidth='sm' open={open}
                onSubmit={onFormSubmit} onClose={() => { setValue({ id: '', name: '', head: '' }); setOpen(false) }}
                title={`${type} Department`}>
                <InputField
                    showTopLabel
                    label='Name' fullWidth
                    size={'small'} value={value?.name}
                    onChange={(e) => setValue(prev => ({ ...prev, name: e?.target?.value?.toUpperCase() }))}
                />
                <InputField
                    showTopLabel
                    label='Head of Department' fullWidth
                    size={'small'} value={value?.head || ''}
                    onChange={(e) => setValue(prev => ({ ...prev, head: e?.target?.value?.toUpperCase() }))}
                />
            </ModalItem>

        </div>
    )
}

export default Departments