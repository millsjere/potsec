import { Box, Typography } from '@mui/material'
import React from 'react'
import { RoundButton } from '../Inputs/RoundButton'
import { AddCircleIcon } from 'hugeicons-react'


interface Props {
    title: string
    subtext: string
    image: any
    btnText: string
    btnSize?: string
    onClick: () => void
    opacity: number
    height?: string
    showBtn?: boolean,
    imageSize?: string
}

const NullState = ({ title, subtext, image, imageSize, btnText, btnSize = 'medium', onClick, opacity, height, showBtn = true }: Props) => {
    return (
        <Box display={'flex'} flexDirection={'column'} height={height || '35rem'} borderRadius={'10px'} bgcolor={'#fff'} justifyContent={'center'} alignItems={'center'}>
            <img src={image} alt='null-state' width={imageSize || '12%'} style={{ opacity: opacity }} />
            <Typography mt={3} variant='h6'>{title}</Typography>
            <Typography variant='body1' mb={2} color={'GrayText'}>{subtext}</Typography>
            {showBtn && <RoundButton variant={'contained'}
                disableElevation
                onClick={onClick}
                text={btnText} size={btnSize}
                color={'secondary'}
                sx={{ borderRadius: '50px' }}
                startIcon={<AddCircleIcon size={18} color='#fff' />}
            />}
        </Box>
    )
}

export default NullState