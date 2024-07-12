import { Box, Typography } from '@mui/material'
import React from 'react'
import { RoundButton } from '../Inputs/RoundButton'
import { AddCircleIcon } from 'hugeicons-react'


interface Props {
    title: string
    subtext: string
    image: any
    btnText: string
    onClick: () => void
    opacity: number
}

const NullState = ({ title, subtext, image, btnText, onClick, opacity }: Props) => {
    return (
        <Box display={'flex'} flexDirection={'column'} height={'35rem'} borderRadius={'10px'} bgcolor={'#fff'} justifyContent={'center'} alignItems={'center'}>
            <img src={image} alt='null-state' width={'12%'} style={{ opacity: opacity }} />
            <Typography mt={3} variant='h6'>{title}</Typography>
            <Typography variant='body1' mb={2} color={'GrayText'}>{subtext}</Typography>
            <RoundButton variant={'contained'}
                disableElevation
                onClick={onClick}
                text={btnText}
                color={'secondary'}
                sx={{ borderRadius: '50px' }}
                startIcon={<AddCircleIcon size={18} color='#fff' />}
            />
        </Box>
    )
}

export default NullState