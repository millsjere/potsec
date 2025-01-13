import React, { useState } from 'react'
import PageHeader from '../../../components/shared/PageHeader'
import { Chip, IconButton, Stack, Typography } from '@mui/material'
import { RoundButton } from '../../../components/shared'
import NoStudent from '../../../assets/images/student_data.png'
import { useNavigate } from 'react-router-dom'
import { AddCircleIcon, Delete02Icon, PencilEdit01Icon } from 'hugeicons-react'
import { base } from '../../../config/appConfig'
import swal from 'sweetalert'
import FilterBar from '../../../components/filter/FilterBar'
import LoadingState from '../../../components/shared/Loaders/LoadingState'
import NullState from '../../../components/shared/NullState/NullState'
import { formatDateTime, reload } from '../../../utils'
import { useLoader } from '../../../context/LoaderContext'
import useAxiosFetch from '../../../hooks/useAxiosFetch'
import MuiTable from '../../../components/shared/Tables/MuiTable'


export const getTableColumns = (headers: string[], actionClick: (id: string) => void, onDelete?: (id: string) => void) => {
    return headers?.map((el: string) => (
        {
            field: (
                el?.toLowerCase() === 'status' ? 'applicationStatus' :
                    el?.toLowerCase() === 'date applied' ? 'createdAt' :
                        el?.toLowerCase() === 'index no.' ? 'applicationStage' : // doing this help the dataTable render field headers as expected but the value rendered under these headers are all from the same object enrollment
                            el?.toLowerCase() === 'programme' ? 'enrollment' || 'academics' :
                                el?.toLowerCase() === 'department' ? 'academics' :
                                    el?.toLowerCase() === 'year' ? 'role' :
                                        el?.toLowerCase()
            ),
            flex: el?.toLowerCase() === 'date applied' ? 1.5 : el?.toLowerCase() === 'programme' ? 2 : 1,
            minWidth: 150,
            renderCell: (params: any) => (
                el?.toLowerCase() === 'status' ?
                    <Chip size='small' sx={{ textTransform: 'capitalize', my: 'auto' }} label={params.row?.applicationStatus} />
                    :
                    el?.toLowerCase() === 'action' ?
                        <Stack direction={'row'} justifyContent={'center'} alignItems={'center'}>
                            <IconButton onClick={() => actionClick(params.row.id)} size='small' disableFocusRipple sx={{ borderRadius: '6px', }}>
                                <PencilEdit01Icon size={18} />
                                <Typography variant='body2' fontSize={'.8rem'}>Edit</Typography>
                            </IconButton>
                            <IconButton onClick={() => onDelete!(params.row.id)} size='small'>
                                <Delete02Icon size={18} />
                            </IconButton>
                        </Stack>
                        :
                        <Typography mt={2.2} variant='body2' noWrap>{
                            el?.toLowerCase() === 'phone' ? params?.value?.mobile || params?.value :
                                el?.toLowerCase() === 'index no.' ? params?.row?.enrollment?.index :
                                    el?.toLowerCase() === 'programme' ? params?.row?.enrollment?.programme || params?.row?.academics?.programme :
                                        el?.toLowerCase() === 'campus' ? params?.value || params?.row?.academics?.campus :
                                            el?.toLowerCase() === 'year' ? params?.row?.enrollment?.year :
                                                el?.toLowerCase() === 'department' ? params?.row?.department?.name || params?.row?.academics?.department?.name :
                                                    el?.toLowerCase() === 'courses' ? (params?.row?.courses?.length + ' Courses') :
                                                        el?.toLowerCase() === 'duration' ? (params?.row?.duration?.number + ' ' + params?.row?.duration?.type) :
                                                            el?.toLowerCase() === 'date applied' ? formatDateTime(params?.row?.createdAt)
                                                                : params?.value
                        }</Typography>
            ),
            renderHeader: () => <strong>{el}</strong>,
        }
    ))
}

const Applications = () => {
    const navigate = useNavigate()
    const { startLoading, stopLoading } = useLoader()
    const { isLoading, response: data, setIsLoading, setResponse, fetchData } = useAxiosFetch('/api/all-applicants')
    const headers = ['Surname', 'Othernames', 'Phone', 'Date Applied', 'Year', 'Campus', 'Status', 'Action']
    const [params, setParams] = useState({ label: '', value: '' })


    const onDeleteApplicant = (id: string) => {
        swal({
            icon: 'warning',
            title: 'Are You Sure?',
            text: 'This action will delete this applicant.',
            buttons: ['Cancel', 'Delete'],
            dangerMode: true,
            closeOnClickOutside: false
        }).then(async (del) => {
            if (del) {
                startLoading('Deleting account. Please wait')
                await base.delete(`/api/applicant/${id}`)
                stopLoading()
                reload()
            }
        })
    }

    const onSearchHandler = async () => {
        if (params.label === '' || params.value === '') return
        console.log('params ==>', params)
        try {
            setIsLoading(true)
            const { data: res } = await base.get(`/api/search/students?${params?.label?.toLowerCase()}=${params?.value}`)
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
            <PageHeader title={'All Applicants'} breadcrumbs={[{ label: 'Applicants', link: '#' }]} />
            <FilterBar
                showView={false}
                showExport={true}
                isLoading={isLoading}
                moreBtns={
                    <RoundButton
                        variant={'contained'} sx={{ borderRadius: '10px', py: .8, mt: 1 }}
                        color={'primary'} disableElevation
                        text='New Application' startIcon={<AddCircleIcon size={18} color='#fff' />}
                        onClick={() => { navigate('/staff/application') }}
                        loading={isLoading}
                    />
                }
                filterParams={params}
                onSearch={onSearchHandler}
                onReset={resetFilter}
                onExport={() => { }}
                onFilter={(e: any) => { setParams({ label: e?.target?.value, value: '' }) }}
                onKeywordChange={(e: any) => { setParams(prev => ({ ...prev, value: e?.target?.value })) }}
                filterOptions={['Name', 'Status']}
                selectFieldOptions={['Pending', 'Submitted']}
            />

            {
                isLoading ? <LoadingState state='students' /> :
                    (!isLoading && data?.length > 0) ? (
                        <>
                            <MuiTable
                                data={data}
                                headers={headers}
                                onEditClick={(id: string) => navigate(`/staff/applicant/${id}/view`)}
                                onDeleteClick={(id: string) => onDeleteApplicant(id)}
                            />
                        </>

                    ) :
                        (
                            <NullState
                                title='No Applications'
                                subtext={`Oops. No applicant records were found`}
                                image={NoStudent}
                                btnText={'Add Applicant'}
                                onClick={() => { }}
                                opacity={0.5}
                            />

                        )

            }

        </div>
    )
}

export default Applications