import React, { useState } from 'react'
import FilterBar from '../../../components/filter/FilterBar'
import PageHeader from '../../../components/shared/PageHeader'
import LoadingState from '../../../components/shared/Loaders/LoadingState'
import NullState from '../../../components/shared/NullState/NullState'
import { Box } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { getTableColumns } from '../application/Applications'
import { useNavigate } from 'react-router-dom'
import swal from 'sweetalert'
import { useLoader } from '../../../context/LoaderContext'
import { base } from '../../../config/appConfig'
import { reload } from '../../../utils'
import NoStudent from '../../../assets/images/student_data.png'
import useAxiosFetch from '../../../hooks/useAxiosFetch'


const AllStudents = () => {
  const navigate = useNavigate()
  const { startLoading, stopLoading } = useLoader()
  const { isLoading, response: data } = useAxiosFetch('/api/all-students')
  const [view, setView] = useState('list')
  const [pageSize, setPageSize] = useState(20);
  const headers = ['Surname', 'Othernames', 'Phone', 'Date Applied', 'Programme', 'Year', 'Status', 'Action']

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


  return (
    <div>
      <PageHeader title={'All Students'} breadcrumbs={[{ label: 'Students', link: '#' }]} />
      <FilterBar
        showYear={false}
        view={view}
        onViewChange={(val) => setView(val)}
        isLoading={isLoading}
        onSearch={() => { }}
      />
      {
        isLoading ? <LoadingState state='students' /> :
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
                  rows={data || []}
                  pageSizeOptions={[20, 50, 100]}
                  rowHeight={60}
                  columns={getTableColumns(
                    headers,
                    (id: string) => navigate(`/staff/applicant/${id}/view`),
                    (id: string) => onDeleteApplicant(id)
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
                title='No Students'
                subtext={`Oops. No students records were found`}
                image={NoStudent}
                btnText={'Add Student'}
                onClick={() => { }}
                opacity={0.5}
              />

            )
      }
    </div>
  )
}

export default AllStudents