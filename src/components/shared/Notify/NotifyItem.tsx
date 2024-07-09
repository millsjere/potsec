import { Box, Divider, Stack, Typography } from '@mui/material'
import { Mail02Icon } from 'hugeicons-react'
import React from 'react'

const NotifyItem = () => {
  return (
    <Box p={2} borderBottom={'1px solid lightgrey'}>
        <Stack direction={'row'} gap={2} alignItems={'center'}>
            <Mail02Icon size={20} color={'#acacac'} />
            <Divider flexItem orientation='vertical' />
            <span>
                <Typography fontWeight={500}>Upload</Typography>
                <Typography variant='body2' color={'GrayText'}>Student data uploaded successfully</Typography>
                <Typography variant='body2' fontSize={'.7rem'} color={'GrayText'}>- 5 minutes ago</Typography>
            </span>
        </Stack>
    </Box>
  )
}

export default NotifyItem