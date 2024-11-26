import React, { useEffect, useState } from 'react'
import PageHeader from '../../../components/shared/PageHeader'
import { Box, Chip, Grid, IconButton, Typography } from '@mui/material'
import { RoundButton } from '../../../components/shared'
import NoStudent from '../../../assets/images/student_data.png'
import { useNavigate } from 'react-router-dom'
import { AddCircleIcon, PencilEdit01Icon } from 'hugeicons-react'
import { base } from '../../../config/appConfig'
import swal from 'sweetalert'
import FilterBar from '../../../components/filter/FilterBar'
import UserCard from '../../../components/shared/Cards/UserCard'
import LoadingState from '../../../components/shared/Loaders/LoadingState'
import NullState from '../../../components/shared/NullState/NullState'
import { DataGrid } from '@mui/x-data-grid'
import { formatDateTime } from '../../../utils'


export const getTableColumns = (headers: string[], actionClick: (id: string)=>void)=> {
    return headers?.map((el: string)=> (
        {
            field: (
                el?.toLowerCase() === 'status' ? 'applicationStatus' : 
                el?.toLowerCase() === 'date applied' ? 'createdAt' : 
                (el?.toLowerCase() === 'year' || el?.toLowerCase() === 'index no.') ? 'enrollment' :
                el?.toLowerCase()
            ),
            flex: el?.toLowerCase() === 'date applied' ? 2 : 1,
            minWidth: 150,
            renderCell: (params: any) => (
                el?.toLowerCase() === 'status' ? 
                    <Chip size='small' sx={{textTransform: 'capitalize'}} label={params.row?.applicationStatus} />
                    :
                    el?.toLowerCase() === 'action' ? 
                    <IconButton onClick={()=>actionClick(params.row.id)} size='small' disableFocusRipple sx={{borderRadius: '6px',}}>
                        <PencilEdit01Icon size={18} />
                        <Typography variant='body2' fontSize={'.8rem'}>Edit</Typography>
                    </IconButton>
                    :
                    <Typography mt={2.2} variant='body2'>{ 
                        el?.toLowerCase() === 'phone' ? params?.value?.mobile : 
                        el?.toLowerCase() === 'year' ? params?.value?.year : 
                        el?.toLowerCase() === 'index no.' ? params?.value?.index :
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
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [view, setView] = useState('list')
    const [pageSize, setPageSize] = useState(20);
    const headers = ['Index No.', 'Surname','Othernames','Year','Phone','Date Applied','Campus','Status', 'Action']

    const fetchAllStudents = async () => {
        try {
            setIsLoading(true)
            const url = '/api/all-students'
            const { data: res } = await base.get(url)
            if (res?.responseCode === 200) {
                setData(res?.data)
            }
        } catch (error) {
            console.log(error?.response)
            swal({ title: 'Error', text: 'Sorry, could not fetch all students. Please refresh the page', icon: 'error' })
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchAllStudents()
    }, [])

    return (
        <div>
            <PageHeader title={'All Applicants'} breadcrumbs={[{ label: 'Applicants', link: '#' }]} />
            <FilterBar
                isLoading={isLoading}
                view={view}
                onViewChange={(val) => setView(val)}
                onSearch={() => { }}
                moreBtns={
                    <RoundButton
                        variant={'contained'} sx={{ borderRadius: '10px', py: .8, mt: 1 }}
                        color={'primary'} disableElevation
                        text='New Application' startIcon={<AddCircleIcon size={18} color='#fff' />}
                        onClick={() => navigate('/staff/application')}
                    />
                }
            />

            {
                isLoading ? <LoadingState state='students' /> :
                    (!isLoading && data?.length > 0) ? (
                        <>
                            {
                                view === 'list' && 
                                <Box sx={{ height: 400, width: '100%' }}>
                                    <DataGrid
                                        sx={{ bgcolor: "#fff", '& .MuiDataGrid-cell': { 
                                            verticalAlign: 'middle' } 
                                        }}
                                        autoHeight={true}
                                        isRowSelectable={() => true}
                                        disableColumnFilter ={true}
                                        disableColumnMenu={true}
                                        checkboxSelection={true}
                                        pagination
                                        rows={data || []}
                                        pageSizeOptions={[20, 50, 100]}
                                        rowHeight={60}
                                        columns={getTableColumns(headers, (id: string)=>navigate(`/staff/applicant/${id}/view`)) || []}
                                        getRowId={(row: any)=>row?.id}
                                        columnHeaderHeight={80}
                                        initialState={{
                                            pagination: {
                                            paginationModel: { page: 0, pageSize: pageSize },
                                            },
                                        }}
                                        onPaginationMetaChange={(newSize: any) => setPageSize(newSize)}
                                    />
                                </Box>
                            }
                            {
                                view === 'grid' && (
                                    <Grid container spacing={3}>
                                        {
                                            data?.map((el: any, i: number) => {
                                                return <Grid item sm={3} key={i}>
                                                    <UserCard variant={view} user={el} onClick={
                                                        ()=>navigate(`/staff/applicant/${el?.id}/view`)
                                                    } />
                                                </Grid>
                                            })
                                        }
                                    </Grid>
                                )
                            }
                        </>

                    ) :
                        (
                            <NullState
                                title='No Programmes'
                                subtext={`Oops. No student records were found`}
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