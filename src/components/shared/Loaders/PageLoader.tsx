import { Box, LinearProgress, Typography } from '@mui/material'
import React from 'react'
import Logo from '../../../assets/images/logo.png'

const PageLoader = () => {
    return (
        <Box display={'flex'} flexDirection={'column'} height={'100vh'} justifyContent={'center'} alignItems={'center'}>
            <Box textAlign={'center'} width={'20%'}>
                <img src={Logo} alt='logo' width={'40%'} style={{ margin: '0 auto' }} />
                <Typography color={'GrayText'} variant='h6' mb={2} mt={0}>POTSEC</Typography>
                <LinearProgress />
            </Box>
        </Box>
    )
}

export default PageLoader