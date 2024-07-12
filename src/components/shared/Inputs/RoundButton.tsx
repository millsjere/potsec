import React from 'react'
import { styled } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton';

const StyledButton = styled(LoadingButton)(({ size }) => ({
    padding: size === 'medium' ? '.65rem 1rem' : '.3rem .8rem',
    borderRadius: size === 'medium' ? '10px' : '50px',
    textTransform: 'none',
    ':hover': {
        '#end-icon': {
            transform: 'translateX(10px)'
        }
    }
}))

type RoundButtonProps = {
    text: string,
    onClick: (e?: any) => void,
    variant: any,
    disableElevation: boolean,
    fullWidth?: boolean,
    size?: any,
    sx?: object,
    color?: any,
    loading?: boolean, disable?: boolean
    startIcon?: any, endIcon?: any
}

export const RoundButton = ({ text, onClick, startIcon, endIcon, variant = 'contained', disableElevation, fullWidth, size = 'medium', sx, color = 'secondary', loading, disable }: RoundButtonProps) => {
    return (
        <StyledButton disableRipple
            loading={loading}
            sx={sx} color={color}
            onClick={onClick} variant={variant}
            disableElevation={disableElevation}
            fullWidth={fullWidth}
            size={size}
            disabled={disable}
            startIcon={loading ? null : startIcon}
            endIcon={loading ? null : endIcon}
        >
            {text}
        </StyledButton>
    )
}
