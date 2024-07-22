import { Box, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

export interface SummaryProps {
    icon: React.ReactNode
    title: string
    subtitle: string
    bgcolor: string
    path?: string
}

const SummaryCard = ({ title, icon, subtitle, bgcolor, path }: SummaryProps) => {
    const navigate = useNavigate()

    return (
        <Box onClick={() => navigate(path)} p={3} borderRadius={'15px'} bgcolor={bgcolor} sx={{ cursor: 'pointer' }}>
            <Box p={2} borderRadius={'15px'} width={'fit-content'} bgcolor={'#03A9F4'}>{icon}</Box>
            <Typography mt={2} variant='h4' fontWeight={800}>{title}</Typography>
            <Typography>{subtitle}</Typography>
        </Box>
    )
}

export default SummaryCard