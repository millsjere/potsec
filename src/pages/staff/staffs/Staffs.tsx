import React, { useState } from 'react'
import PageHeader from '../../../components/shared/PageHeader'
import LoadingState from '../../../components/shared/Loaders/LoadingState'
import FilterBar from '../../../components/filter/FilterBar'
import { RoundButton } from '../../../components/shared'
import NoStaff from '../../../assets/images/team.png'
import { AddCircleIcon } from 'hugeicons-react'
import AddStaff from './AddStaff'
import NullState from '../../../components/shared/NullState/NullState'
import useAxiosFetch from '../../../hooks/useAxiosFetch'
import swal from 'sweetalert'
import { useLoader } from '../../../context/LoaderContext'
import { base } from '../../../config/appConfig'
import { reload } from '../../../utils'
import MuiTable from '../../../components/shared/Tables/MuiTable'


const Staffs = () => {
    const { isLoading, response: data, fetchData, setResponse, setIsLoading } = useAxiosFetch('/api/staff/all')
    const { startLoading, stopLoading } = useLoader()
    const [open, setOpen] = useState(false)
    const [params, setParams] = useState({ label: '', value: '' })
    const [type, setType] = useState('')
    const [staffDetails, setStaffDetails] = useState()
    const headers = ['Staff ID', 'Fullname', 'Phone', 'Email', 'Department', 'Campus', 'Action']

    const editStaffDetails = (id: string) => {
        console.log(id)
        setType('edit')
        setOpen(true)
        const staff = data?.find((el: any) => el?.id === id)
        setStaffDetails(staff)
    }

    const onStaffDelete = (id: string) => {
        swal({
            icon: 'warning',
            title: 'Are You Sure?',
            text: 'This action will delete this staff.',
            buttons: ['Cancel', 'Delete'],
            dangerMode: true,
            closeOnClickOutside: false
        }).then(async (del) => {
            if (del) {
                startLoading('Deleting account. Please wait')
                await base.delete(`/api/staff/remove/${id}`)
                stopLoading()
                swal({
                    text: 'Staff account removed successfully',
                    title: 'Success',
                    icon: 'success',
                    closeOnClickOutside: false,
                }).then(() => reload())
            }
        })
    }

    const onSearchHandler = async () => {
        if (params.label === '' || params.value === '') return
        console.log('params ==>', params)
        try {
            setIsLoading(true)
            const { data: res } = await base.get(`/api/search/staff?${params?.label?.toLowerCase()}=${params?.value}`)
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
            <PageHeader title={'All Staff'} breadcrumbs={[{ label: 'Staff', link: '#' }]} />
            <FilterBar
                showView={false}
                showExport={true}
                isLoading={isLoading}
                moreBtns={
                    <RoundButton
                        variant={'contained'} sx={{ borderRadius: '10px', py: .8, mt: 1 }}
                        color={'primary'} disableElevation
                        text='New Staff' startIcon={<AddCircleIcon size={18} color='#fff' />}
                        onClick={() => { setOpen(true); setType('add') }}
                        loading={isLoading}
                    />
                }
                filterParams={params}
                onSearch={onSearchHandler}
                onReset={resetFilter}
                onExport={() => { }}
                onFilter={(e: any) => { setParams(prev => ({ ...prev, label: e?.target?.value })) }}
                onKeywordChange={(e: any) => { setParams(prev => ({ ...prev, value: e?.target?.value })) }}
                filterOptions={['Name', 'Staff ID', 'Email']}
            />
            {
                isLoading ? <LoadingState state='staff' /> :
                    (!isLoading && data?.length > 0) ? (
                        <>
                            <MuiTable
                                data={data || []}
                                headers={headers}
                                onEditClick={(id) => editStaffDetails(id)}
                                onDeleteClick={(id) => onStaffDelete(id)}
                            />
                            {/* <Box sx={{ height: 400, width: '100%' }}>
                                <DataGrid
                                    sx={{
                                        bgcolor: "#fff", '& .MuiDataGrid-cell': {
                                            verticalAlign: 'middle',
                                            display: 'flex',
                                            // alignItems: 'center'
                                        }
                                    }}
                                    autoHeight={true}
                                    isRowSelectable={() => true}
                                    disableColumnFilter={true}
                                    disableColumnMenu={true}
                                    checkboxSelection={true}
                                    pagination
                                    rowSelection={false}
                                    rows={data || []}
                                    pageSizeOptions={[20, 50, 100]}
                                    rowHeight={60}
                                    columns={getTableColumns(
                                        headers,
                                        (id: string) => { editStaffDetails(id) },
                                        (id: string) => onStaffDelete(id)
                                    ) || []
                                    }
                                    getRowId={(row: any) => row?.id}
                                    columnHeaderHeight={80}
                                    initialState={{
                                        pagination: {
                                            paginationModel: { page: 0, pageSize: pageSize },
                                        },
                                    }}
                                    onPaginationMetaChange={(newSize: any) => setPageSize(newSize)}
                                />
                            </Box> */}
                        </>

                    ) :
                        (
                            <NullState
                                title='Staff'
                                subtext={`Oops. No staff records were found`}
                                image={NoStaff}
                                btnText={'Add Staff'}
                                onClick={() => { setOpen(true); setType('add') }}
                                opacity={0.5}
                                showBtn={false}
                            />

                        )

            }

            {/* ADD STAFF */}
            <AddStaff open={open} onClose={() => { setOpen(false); setType(''); setStaffDetails(undefined) }} data={staffDetails} type={type} callBack={fetchData} />
        </div>
    )
}

export default Staffs