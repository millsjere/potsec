import { Box, Divider, Stack, Typography } from '@mui/material'
import { Mail02Icon } from 'hugeicons-react'
import React from 'react'

const NotifyItem = () => {
  return (
    <Box p={2} borderBottom={'1px solid lightgrey'}>
      <Stack direction={'row'} gap={1} alignItems={'flex-start'}>
        <Mail02Icon size={22} color={'#acacac'} style={{ marginTop: '2px' }} />
        {/* <Divider flexItem orientation='vertical' /> */}
        <span>
          <Stack direction={'row'} justifyContent={'space-between'}>
            <Typography fontWeight={500}>Bulk Upload</Typography>
            <Typography variant='body2' fontSize={'.8rem'} sx={{ color: '#acacac' }}>5 min ago</Typography>
          </Stack>
          <Typography variant='body2' color={'GrayText'}>Student data uploaded successfully. This is a sample notification</Typography>
        </span>
      </Stack>
    </Box>
  )
}

export default NotifyItem