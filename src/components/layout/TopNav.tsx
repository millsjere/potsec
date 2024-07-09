
import { Menu02Icon, MessageNotification01Icon, TaskAdd02Icon } from 'hugeicons-react'
import { AppBar, Toolbar, IconButton, Badge, Dialog, DialogContent, Slide, SlideProps, Stack, Avatar } from '@mui/material'
import React, { useState } from 'react'
import { RoundButton } from '../shared'
import { grey } from '@mui/material/colors'
import BulkUpload from '../upload/BulkUpload'
import NotificationBar from '../shared/Notify/NotificationBar'


const SlideTransition = (props: React.JSX.IntrinsicAttributes & SlideProps) => {
  return <Slide {...props} direction="up" />;
}


const TopNav = ({ drawerWidth, handleDrawerToggle }: { drawerWidth: number, handleDrawerToggle: () => void }) => {
  const [openSearch, setOpenSearch] = useState(false)
  const [notify, setNotify] = useState(false)

  return (
    <>
      <AppBar
        elevation={0}
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar sx={{ bgcolor: '#fff', borderBottom: '1px solid #ededed' }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <Menu02Icon />
          </IconButton>

          <Stack direction={'row'} alignItems={'center'} gap={1} sx={{ ml: 'auto' }}>
            <RoundButton variant={'contained'} startIcon={<TaskAdd02Icon size={18} />}
              text={'Upload'} sx={{ padding: '.3rem .8rem', borderRadius: '8px' }}
              color={'primary'} onClick={() => { setOpenSearch(true) }}
              disableElevation
            />
            <IconButton disableRipple onClick={()=>setNotify(true)} sx={{ bgcolor: grey[100], ml: 2 }}>
              <Badge variant='standard' color='primary' overlap='circular' sx={{ '& > span': { color: '#fff', padding: '3px', fontSize: '11px', minWidth: '16px', height: '16px' } }} badgeContent={4} >
                <MessageNotification01Icon />
              </Badge>
            </IconButton>
            <Avatar sx={{ cursor: 'pointer', width: '2rem', height: '2rem', border: '1px solid #fff' }} alt='user-img' />
          </Stack>
        </Toolbar>
      </AppBar>

      {/* UPLOAD BOX */}
      <Dialog open={openSearch} fullScreen onClose={() => setOpenSearch(false)} TransitionComponent={SlideTransition}>
        <DialogContent sx={{ p: 4, position: 'relative' }}>
          <BulkUpload onClose={(val) => setOpenSearch(val)} />
        </DialogContent>
      </Dialog>

        {/* Notification */}
        <NotificationBar open={notify} onClose={()=>setNotify(false)} />

    </>
  )
}

export default TopNav