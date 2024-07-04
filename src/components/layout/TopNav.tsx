
import { Cancel01Icon, ImageAdd01Icon, Menu02Icon, Notification01Icon, Search01Icon, UserCircleIcon } from 'hugeicons-react'
import { AppBar, Toolbar, IconButton, Typography, Button, Badge, Box, Dialog, DialogContent, Slide, SlideProps, InputAdornment } from '@mui/material'
import React, { useState } from 'react'
import AddProduct from '../shared/Product/AddProduct'
import { InputField } from '../shared'


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

          <Box sx={{ ml: 'auto' }}>
            <Button size='small' startIcon={<ImageAdd01Icon size={18} />} variant='contained' disableElevation onClick={() => { setUpload(true) }}
              sx={{ color: '#fff', textTransform: 'none', borderRadius: '10px', height: '2.3rem', mr: 3 }} color='secondary'>
              Add Product
            </Button>
            <IconButton onClick={() => { setOpenSearch(true) }}><Search01Icon /></IconButton>
            <IconButton><Badge variant='standard' color='primary' overlap='circular' sx={{ '& > span': { color: '#fff' } }} badgeContent={4} > <Notification01Icon /> </Badge></IconButton>
            <IconButton onClick={() => { }}><UserCircleIcon size={25} /></IconButton>
          </Box>
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

      {/* ADD PRODUCT */}
      <AddProduct open={upload} close={() => setUpload(false)} />

    </>
  )
}

export default TopNav