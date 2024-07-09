import { Box, Divider, Drawer, IconButton, Typography } from '@mui/material'
import { Cancel01Icon } from 'hugeicons-react'
import React from 'react'
import NotifyItem from './NotifyItem'

interface Props {
    open: boolean,
    onClose: () => void
}


const NotificationBar = ({open, onClose}: Props) => {
  return (
    <>
            <Drawer anchor='right' open={open} onClose={onClose}>
                <Box width={400}>
                    <Box display={'flex'} justifyContent='space-between' alignItems={'center'} p={3}>
                        <Typography variant='h6' fontWeight={600}>Notifications</Typography>
                        <IconButton onClick={onClose}><Cancel01Icon size={20} /></IconButton>
                    </Box>
                    <Divider />
                    {
                        Array(4)?.fill(1)?.map((_el, i)=> <NotifyItem key={i} />)
                    }
                </Box>

            </Drawer>
    </>
  )
}

export default NotificationBar