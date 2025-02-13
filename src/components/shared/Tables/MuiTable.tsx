import { Box, Chip, IconButton, Stack, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { Delete02Icon, PencilEdit01Icon } from 'hugeicons-react'
import React, { EventHandler, useState } from 'react'
import { formatDateTime } from '../../../utils'


interface Props {
  data: any
  headers: string[]
  onEditClick?: (val: string, event?: Event, data?: any) => void
  onDeleteClick?: (val: string, event?: Event) => void,
  editLabel?: string
  viewLabel?: string
  onViewClick?: (val: string, event?: Event, data?: any) => void
}

const getTableColumns = (headers: string[], editLabel?: string, actionClick: (id: string, event?: Event, rowData?: any) => void, onDelete?: (id: string, event?: Event) => void, viewLabel?: string, onViewClick: (id: string, event?: Event, rowData?: any) => void) => {
  return headers?.map((el: string) => (
    {
      field: (
        el?.toLowerCase() === 'status' ? 'applicationStatus' :
          el?.toLowerCase() === 'date applied' || el?.toLowerCase() === 'date uploaded' ? 'createdAt' :
            el?.toLowerCase() === 'index no.' ? 'applicationStage' : // doing this help the dataTable render field headers as expected but the value rendered under these headers are all from the same object enrollment
              el?.toLowerCase() === 'programme' ? 'enrollment' || 'academics' || 'course' :
                el?.toLowerCase() === 'year' ? 'role' :
                  el?.toLowerCase() === 'head of dept' ? 'head' :
                    el?.toLowerCase() === 'staff id' ? 'academics' :
                      el?.toLowerCase() === 'file name' ? 'fileName' :
                        el?.toLowerCase() === 'upload by' ? 'uploadBy' :
                          el?.toLowerCase() === 'course' ? 'course' :
                            el?.toLowerCase()
      ),
      flex: el?.toLowerCase() === 'date applied' ? 1.5 : el?.toLowerCase() === 'programme' ? 2 : 1,
      minWidth: 150,
      renderCell: (params: any) => (
        el?.toLowerCase() === 'status' ?
          <Chip size='small' sx={{ textTransform: 'capitalize', my: 'auto' }} label={params.row?.applicationStatus} />
          :
          el?.toLowerCase() === 'action' ?
            <Stack direction={'row'} justifyContent={'center'} alignItems={'center'} gap={1}>
              {
                viewLabel && (
                <IconButton onClick={(e: any) => onViewClick(params.row.id, e, params?.row)} size='small' disableFocusRipple sx={{ borderRadius: '6px', gap: 0.5 }}>
                  <Typography variant='body2' fontSize={'.8rem'}>{viewLabel || 'View'}</Typography>
                </IconButton>
                )
              }
              <IconButton onClick={(e: any) => actionClick(params.row.id, e, params?.row)} size='small' disableFocusRipple sx={{ borderRadius: '6px', gap: 0.5 }}>
                <PencilEdit01Icon size={18} />
                <Typography variant='body2' fontSize={'.8rem'}>{editLabel || 'Edit'}</Typography>
              </IconButton>
              <IconButton onClick={(e: any) => onDelete!(params.row.id, e)} size='small' sx={{ borderRadius: '6px', gap: 0.5 }}>
                <Delete02Icon size={18} />
                <Typography variant='body2' fontSize={'.8rem'}>Delete</Typography>
              </IconButton>
            </Stack>
            :
            <Typography mt={2.2} variant='body2' noWrap>{
              el?.toLowerCase() === 'phone' ? params?.value?.mobile || params?.value || '--' :
                el?.toLowerCase() === 'index no.' ? params?.row?.enrollment?.index || '--' :
                  el?.toLowerCase() === 'programme' ? params?.row?.enrollment?.programme?.name || params?.row?.enrollment?.programme || params?.row?.academics?.programme || params?.row?.course?.program?.name || '--' :
                    el?.toLowerCase() === 'campus' ? params?.value || params?.row?.academics?.campus :
                      el?.toLowerCase() === 'year' ? params?.row?.enrollment?.year || `Year ${params?.row?.course?.year}` || '--' :
                        el?.toLowerCase() === 'department' ? params?.row?.department?.name || params?.row?.academics?.department?.name || '--' :
                          el?.toLowerCase() === 'head of dept' ? params?.row?.head || '--' :
                            el?.toLowerCase() === 'staff id' ? params?.row?.academics?.staffID || '--' :
                              el?.toLowerCase() === 'courses' ? (params?.row?.courses?.length + ' Courses') || '--' :
                                el?.toLowerCase() === 'programmes' ? (params?.row?.programmes?.length + ' Programme(s)') :
                                  el?.toLowerCase() === 'duration' ? (params?.row?.duration?.number + ' ' + params?.row?.duration?.type) || '--' :
                                    (el?.toLowerCase() === 'date applied' || el?.toLowerCase() === 'date uploaded' || el?.toLowerCase() === 'date') ? formatDateTime(params?.row?.createdAt) || '--' :
                                      el?.toLowerCase() === 'file name' ? params?.value || '--' :
                                        el?.toLowerCase() === 'upload by' ? params?.row?.uploadBy?.fullname || '--' :
                                          el?.toLowerCase() === 'course' ? params?.row?.course?.name || '--'
                                            : params?.value || '--'
            }</Typography>
      ),
      renderHeader: () => <strong>{el}</strong>,
    }
  ))
}

const MuiTable = ({ data, headers, onDeleteClick, editLabel, onEditClick, viewLabel, onViewClick }: Props) => {
  const [pageSize, setPageSize] = useState(20);

  return (
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
          editLabel,
          (id: string, event, rowData) => onEditClick!(id, event, rowData),
          (id: string, event) => onDeleteClick!(id, event),
          viewLabel,
          (id: string, event, rowData) => onViewClick!(id, event, rowData),
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
  )
}

export default MuiTable