import { Box, Stack, Typography } from '@mui/material'
import { Mail02Icon } from 'hugeicons-react'
import moment from 'moment'
import React from 'react'

interface Props {
  message: string,
  title: string,
  createdAt: string,
}

const NotifyItem = ({title, message, createdAt}: Props) => {
  return (
    <Box p={2} borderBottom={'1px solid lightgrey'}>
      <Stack direction={'row'} gap={1} alignItems={'flex-start'}>
        <Mail02Icon size={22} color={'#acacac'} style={{ marginTop: '2px' }} />
        {/* <Divider flexItem orientation='vertical' /> */}
        <span>
          <Stack direction={'row'} justifyContent={'space-between'}>
            <Typography fontWeight={500}>{title}</Typography>
            <Typography variant='body2' fontSize={'.8rem'} sx={{ color: '#acacac' }}>{moment(createdAt).fromNow()}</Typography>
          </Stack>
          <Typography variant='body2' color={'GrayText'}>{message}</Typography>
        </span>
      </Stack>
    </Box>
  )
}

export default NotifyItem