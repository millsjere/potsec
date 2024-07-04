import { Box, LinearProgress } from '@mui/material'
import React from 'react'
import Logo from '../../../assets/images/logo.png'

const PageLoader = () => {
    return (
        <Box display={'flex'} flexDirection={'column'} height={'100vh'} justifyContent={'center'} alignItems={'center'}>
            <Box textAlign={'center'} width={'20%'}>
                <img src={Logo} alt='logo' width={'10%'} />
                <LinearProgress />
            </Box>
        </Box>
    )
}

export default PageLoader