
import { Menu02Icon, MessageNotification01Icon, TaskAdd02Icon } from 'hugeicons-react'
import { AppBar, Toolbar, IconButton, Badge, Dialog, DialogContent, Slide, SlideProps, Stack, Avatar, Typography } from '@mui/material'
import React, { useState } from 'react'
import { RoundButton } from '../shared'
import { grey } from '@mui/material/colors'
import BulkUpload from '../upload/BulkUpload'
import NotificationBar from '../shared/Notify/NotificationBar'
import { base, getData, saveData } from '../../config/appConfig'
import SearchImg from '../../assets/images/search.gif'
import { useUploader } from '../../context/UploadContext'


const SlideTransition = (props: React.JSX.IntrinsicAttributes & SlideProps) => {
  return <Slide {...props} direction="up" />;
}


const TopNav = ({ drawerWidth, handleDrawerToggle }: { drawerWidth: number, handleDrawerToggle: () => void }) => {
  const [openSearch, setOpenSearch] = useState(false)
  const { upload, closeUpload } = useUploader()
  const [notify, setNotify] = useState(false)
  const [check, setCheck] = useState(false)
  const currentUser = getData('uid')
  const notifications = getData('unf')
  const isStaff = currentUser?.role === 'staff' || currentUser?.role === 'admin'
  const isApplicant = currentUser?.role === 'applicant'
  const getIsRead = notifications?.filter((el: any) => !el?.isRead)?.length

  console.log(currentUser)

  const readNotifications = async () => {
    try {
      const { data: res } = await base.get('/api/applicant/notify/read')
      if (res?.responseCode === 200) {
        saveData('unf', res?.data)
      }
    } catch (error: any) {
      console.log(error?.response)
    }
  }

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
            edge="start" size='small'
            onClick={handleDrawerToggle}
            sx={{ mr: 2, bgcolor: 'secondary.main', ':hover': { bgcolor: 'primary.main' }, display: { sm: 'none' } }}
          >
            <Menu02Icon color='lightgrey' />
          </IconButton>
          <Typography color={'secondary'} sx={{ display: { xs: 'block', sm: 'none', md: "none", lg: 'none', xl: 'none' } }}>Menu</Typography>


          <Stack direction={'row'} alignItems={'center'} gap={1} sx={{ ml: 'auto' }}>
            {
              isStaff &&
              <RoundButton variant={'contained'} startIcon={<TaskAdd02Icon size={18} />}
                text={'Upload'} sx={{ padding: '.3rem .8rem', borderRadius: '8px' }}
                color={'primary'} onClick={() => { setOpenSearch(true) }}
                disableElevation
              />
            }
            {
              isApplicant &&
              <RoundButton variant={'contained'}
                text={'Check Application Status'} sx={{ padding: '.3rem .8rem', borderRadius: '8px' }}
                color={'primary'} onClick={() => { setCheck(true) }}
                disableElevation
              />
            }
            <IconButton disableRipple
              onClick={() => {
                readNotifications();
                setNotify(true)
              }} sx={{ bgcolor: grey[100], ml: 2 }}>
              <Badge variant='standard' showZero color='primary' overlap='circular'
                sx={{ '& > span': { color: '#fff', padding: '3px', fontSize: '11px', minWidth: '16px', height: '16px' } }}
                badgeContent={getIsRead || 0}
              >
                <MessageNotification01Icon />
              </Badge>
            </IconButton>
            <Avatar src={currentUser?.photo || null} sx={{ cursor: 'pointer', width: '2rem', height: '2rem', border: '1px solid #fff' }} alt='user-img' />
          </Stack>
        </Toolbar>
      </AppBar>

      {/* UPLOAD BOX */}
      <Dialog open={openSearch || upload} fullScreen onClose={() => {
        setOpenSearch(false)
        closeUpload()
      }} TransitionComponent={SlideTransition}>
        <DialogContent sx={{ p: 4, position: 'relative' }}>
          <BulkUpload onClose={(val) => { setOpenSearch(val); closeUpload() }} />
        </DialogContent>
      </Dialog>

      {/* Check Application Status */}
      <Dialog open={check} maxWidth={'xs'} fullWidth>
        <DialogContent sx={{ py: 4 }}>
          <img src={SearchImg} style={{ display: 'block', margin: '0 auto' }} width={'18%'} alt='searching' />
          <Typography textAlign={'center'}>Checking Application Status</Typography>
        </DialogContent>
      </Dialog>

      {/* Notification */}
      <NotificationBar open={notify} onClose={() => setNotify(false)} />

    </>
  )
}

export default TopNav