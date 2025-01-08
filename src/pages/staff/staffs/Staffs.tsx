import React, { useState } from 'react'
import PageHeader from '../../../components/shared/PageHeader'
import LoadingState from '../../../components/shared/Loaders/LoadingState'
import { Box } from '@mui/material'
import FilterBar from '../../../components/filter/FilterBar'
import { RoundButton } from '../../../components/shared'
import NoStaff from '../../../assets/images/team.png'
import { AddCircleIcon } from 'hugeicons-react'
import AddStaff from './AddStaff'
import NullState from '../../../components/shared/NullState/NullState'
import useAxiosFetch from '../../../hooks/useAxiosFetch'
import { DataGrid } from '@mui/x-data-grid'
import { getTableColumns } from '../application/Applications'
import swal from 'sweetalert'
import { useLoader } from '../../../context/LoaderContext'
import { base } from '../../../config/appConfig'
import { reload } from '../../../utils'


const Staffs = () => {
    const { isLoading, response: data, fetchData } = useAxiosFetch('/api/staff/all')
    const { startLoading, stopLoading } = useLoader()
    const [open, setOpen] = useState(false)
    const [view, setView] = useState('grid')
    const [type, setType] = useState('')
    const [staffDetails, setStaffDetails] = useState()
    const [pageSize, setPageSize] = useState(20);
    const headers = ['Surname', 'Othernames', 'Phone', 'Email', 'Programme', 'Campus', 'Action']

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

    return (
        <div>
            <PageHeader title={'All Staff'} breadcrumbs={[{ label: 'Staff', link: '#' }]} />
            <FilterBar
                showYear={false} view={view}
                onViewChange={(val) => setView(val)}
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
                onSearch={() => { }}
            />
            {
                isLoading ? <LoadingState state='staff' /> :
                    (!isLoading && data?.length > 0) ? (
                        <>
                            <Box sx={{ height: 400, width: '100%' }}>
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
                            </Box>
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
                            />

                        )

            }

            {/* ADD STAFF */}
            <AddStaff open={open} onClose={() => { setOpen(false); setType(''); setStaffDetails(undefined) }} data={staffDetails} type={type} callBack={fetchData} />
        </div>
    )
}

export default Staffs