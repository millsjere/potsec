import React from 'react'
import { styled } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton';

const StyledButton = styled(LoadingButton)({
    padding: '.65rem 1rem',
    borderRadius: '10px',
    textTransform: 'none',
    ':hover': {
        '#end-icon': {
            transform: 'translateX(10px)'
        }
    }
})

type RoundButtonProps = {
    text: string,
    onClick: () => void,
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
        <StyledButton
            loading={loading}
            sx={sx} color={color}
            onClick={onClick} variant={variant}
            disableElevation={disableElevation}
            fullWidth={fullWidth}
            size={size}
            disabled={disable}
            startIcon={startIcon}
            endIcon={loading ? null : endIcon}
        >
            {text}
        </StyledButton>
    )
}
