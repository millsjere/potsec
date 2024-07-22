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
import { onDeleteHandler } from '../../../utils'
import DeptCard from '../../../components/shared/Cards/DeptCard'



const Departments = () => {
    const { startLoading, stopLoading } = useLoader()
    const { isLoading, response: data, fetchData } = useAxiosFetch('/api/staff/department');
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState({ id: '', name: '' })
    const [type, setType] = useState('add')

    const onFormSubmit = async () => {
        if (value?.name === '') return swal('Invalid', 'Please provide a name', 'warning')
        try {
            startLoading(type === 'add' ? 'Creating new department. Please wait..' : 'Updating department. Please wait...')
            const { data: res } = type === 'add' ? await base.post('/api/staff/department/new', { name: value?.name }) : await base.patch(`/api/staff/department/${value?.id}`, { name: value?.name })
            if (res?.status === 'success') {
                setOpen(false);
                setValue({ id: '', name: '' })
                swal('Success', `Department ${type === 'add' ? 'created' : 'updated'} successfully`, 'success').then(fetchData)
            }
        } catch (error: any) {
            console.log(error?.response)
            swal('Error', `Sorry could not ${type === 'add' ? 'create' : 'update'} department`, 'error')
        } finally {
            stopLoading()
        }
    }

    return (
        <div>
            <PageHeader title={'All Departments'} breadcrumbs={[{ label: 'Departments', link: '#' }]} />
            <FilterBar
                showYear={false}
                showProgramme={false}
                showView={false}
                onSearch={() => { }}
                moreBtns={
                    <RoundButton
                        variant={'contained'} sx={{ borderRadius: '10px', py: .8, mt: 1 }}
                        color={'primary'} disableElevation
                        text='Department' startIcon={<AddCircleIcon size={18} color='#fff' />}
                        onClick={() => { setOpen(true) }} loading={isLoading}
                    />
                }
            />
            {
                isLoading ?
                    <LoadingState state='staff' />
                    :
                    (!isLoading && data?.length > 0) ?
                        <Grid container spacing={3}>
                            {
                                data?.map((el: any, i: number) => {
                                    return <Grid key={i} item sm={3}>
                                        <DeptCard
                                            title={el?.name}
                                            subText={`${el?.programmes?.length} Programme(s)`}
                                            onDelete={(e: any) => { e.stopPropagation(); onDeleteHandler(el?.id, 'Department', 'department', startLoading, stopLoading, fetchData) }}
                                            onClick={(e: any) => { e.stopPropagation(); setType('edit'); setValue({ id: el?.id, name: el?.name }); setOpen(true) }}
                                        />
                                    </Grid>
                                })

                            }
                        </Grid>
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
                onSubmit={onFormSubmit} onClose={() => { setValue({ id: '', name: '' }); setOpen(false) }}
                title={`${type} Department`}>
                <InputField
                    showTopLabel
                    label='Name' fullWidth
                    size={'small'} value={value?.name}
                    onChange={(e) => setValue(prev => ({ ...prev, name: e?.target?.value }))}
                />
            </ModalItem>

        </div>
    )
}

export default Departments