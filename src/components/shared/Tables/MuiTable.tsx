import { Box, Chip, IconButton, Stack, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { Delete02Icon, PencilEdit01Icon } from 'hugeicons-react'
import React, { EventHandler, useState } from 'react'
import { formatDateTime } from '../../../utils'


interface Props {
  data: any
  headers: string[]
  onEditClick: (val: string, event?: Event, data?: any) => void
  onDeleteClick: (val: string, event?: Event) => void
}

const getTableColumns = (headers: string[], actionClick: (id: string, event?: Event, rowData?: any) => void, onDelete?: (id: string, event?: Event) => void) => {
  return headers?.map((el: string) => (
    {
      field: (
        el?.toLowerCase() === 'status' ? 'applicationStatus' :
          el?.toLowerCase() === 'date applied' ? 'createdAt' :
            el?.toLowerCase() === 'index no.' ? 'applicationStage' : // doing this help the dataTable render field headers as expected but the value rendered under these headers are all from the same object enrollment
              el?.toLowerCase() === 'programme' ? 'enrollment' || 'academics' :
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
              <IconButton onClick={(e: any) => actionClick(params.row.id, e, params?.row)} size='small' disableFocusRipple sx={{ borderRadius: '6px', }}>
                <PencilEdit01Icon size={18} />
                <Typography variant='body2' fontSize={'.8rem'}>Edit</Typography>
              </IconButton>
              <IconButton onClick={(e: any) => onDelete!(params.row.id, e)} size='small' sx={{ borderRadius: '6px', }}>
                <Delete02Icon size={18} />
                <Typography variant='body2' fontSize={'.8rem'}>Delete</Typography>
              </IconButton>
            </Stack>
            :
            <Typography mt={2.2} variant='body2' noWrap>{
              el?.toLowerCase() === 'phone' ? params?.value?.mobile :
                el?.toLowerCase() === 'index no.' ? params?.row?.enrollment?.index :
                  el?.toLowerCase() === 'programme' ? params?.row?.enrollment?.programme || params?.row?.academics?.programme :
                    el?.toLowerCase() === 'campus' ? params?.value || params?.row?.academics?.campus :
                      el?.toLowerCase() === 'year' ? params?.row?.enrollment?.year :
                        el?.toLowerCase() === 'department' ? params?.row?.department?.name :
                          el?.toLowerCase() === 'courses' ? (params?.row?.courses?.length + ' Courses') :
                            el?.toLowerCase() === 'programmes' ? (params?.row?.programmes?.length + ' Programme(s)') :
                              el?.toLowerCase() === 'duration' ? (params?.row?.duration?.number + ' ' + params?.row?.duration?.type) :
                                el?.toLowerCase() === 'date applied' ? formatDateTime(params?.row?.createdAt)
                                  : params?.value
            }</Typography>
      ),
      renderHeader: () => <strong>{el}</strong>,
    }
  ))
}

const MuiTable = ({ data, headers, onDeleteClick, onEditClick }: Props) => {
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
          (id: string, event, rowData) => onEditClick(id, event, rowData),
          (id: string, event) => onDeleteClick(id, event)
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