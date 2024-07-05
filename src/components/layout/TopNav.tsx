
import { Cancel01Icon, ImageAdd01Icon, Menu02Icon, MessageNotification01Icon, Notification01Icon, Notification02Icon, Search01Icon, UserCircleIcon } from 'hugeicons-react'
import { AppBar, Toolbar, IconButton, Typography, Button, Badge, Box, Dialog, DialogContent, Slide, SlideProps, InputAdornment, Stack, Avatar } from '@mui/material'
import React, { useState } from 'react'
import { InputField } from '../shared'
import { grey } from '@mui/material/colors'


const SlideTransition = (props: React.JSX.IntrinsicAttributes & SlideProps) => {
  return <Slide {...props} direction="up" />;
}

const TopNav = ({ drawerWidth, handleDrawerToggle }: { drawerWidth: number, handleDrawerToggle: () => void }) => {
  const [openSearch, setOpenSearch] = useState(false)
  const [upload, setUpload] = useState(false)


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
            <IconButton sx={{bgcolor: grey[100]}}>
              <Badge variant='standard' color='primary' overlap='circular' sx={{ '& > span': { color: '#fff', padding: '3px', fontSize: '11px', minWidth: '16px', height: '16px' } }} badgeContent={4} > 
                <MessageNotification01Icon /> 
              </Badge>
            </IconButton>
            <Avatar sx={{cursor: 'pointer', width: '2rem', height: '2rem', border: '1px solid #fff'}} alt='user-img' />
          </Stack>
        </Toolbar>
      </AppBar>

      {/* SEARCH BAR */}
      <Dialog open={openSearch} fullScreen onClose={() => setOpenSearch(false)} TransitionComponent={SlideTransition}>
        <DialogContent>
          <InputField variant='outlined'
            placeholder='Search for something' type='email'
            InputProps={{
              startAdornment: <InputAdornment position='start'><Search01Icon /></InputAdornment>,
              endAdornment: <InputAdornment position='end'> <IconButton onClick={() => setOpenSearch(false)}><Cancel01Icon size={18} /></IconButton></InputAdornment>
            }}
            value={''} onChange={() => { }} fullWidth
          />

          <Typography sx={{ textAlign: 'center', marginTop: '1rem' }} variant='body2' color='textSecondary'>Start typing to see products you are looking for</Typography>

          {/* SEARCH RESULTS */}
          <Box>

          </Box>
        </DialogContent>
      </Dialog>

    </>
  )
}

export default TopNav