import { Box, Divider, Drawer, IconButton, Typography } from '@mui/material'
import { Cancel01Icon } from 'hugeicons-react'
import React from 'react'
import { getData } from '../../../config/appConfig'
import NotifyItem from './NotifyItem'

interface Props {
    open: boolean,
    onClose: () => void
}


const NotificationBar = ({open, onClose}: Props) => {
    const notifications = getData('unf')
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
                        notifications?.map((el: any, i: number)=> (
                            <NotifyItem 
                                title={el?.title} 
                                message={el?.message} 
                                createdAt={el?.createdAt}
                                key={i} 
                            />
                        ))
                    }
                </Box>

            </Drawer>
    </>
  )
}

export default NotificationBar