import { Box, TextField, Typography } from '@mui/material'
import { styled } from '@mui/styles'
import React from 'react'

const StyledInputField = styled(TextField)(({ size }) => ({
    marginBottom: '1rem',
    '& *': {
        borderRadius: size === 'medium' ? '10px' : '6px'
    },
    '& label.Mui-focused': {
        color: '#ee0704'
    },
    "& .MuiOutlinedInput-root": {
        borderRadius: size === 'medium' ? '10px' : '6px',
        "&.Mui-focused fieldset": {
            border: `1px solid #ee0704`
        }
    }
}))

type InputFieldProps = {
    sx?: object,
    size?: any,
    isSelect?: boolean,
    variant?: any,
    value?: string,
    onChange?: (e: any) => void,
    isRequired?: boolean,
    label?: string,
    error?: any,
    children?: any,
    type?: string,
    InputProps?: object,
    inputProps?: object,
    placeholder?: string
    fullWidth?: boolean,
    showTopLabel?: boolean
}

export const InputField = ({showTopLabel = false, size = 'medium', sx, isSelect, variant, value, onChange, isRequired, label, error, children, type, InputProps, inputProps, placeholder, fullWidth }: InputFieldProps) => {
    return (
        <Box>
            { showTopLabel &&  <Typography variant='body2' fontSize={'.8rem'} mb={.5} color={'GrayText'}>{label}</Typography>}
            <StyledInputField sx={sx}
                type={type} size={size}
                variant={variant}
                value={value}
                onChange={onChange}
                required={isRequired}
                label={!showTopLabel ? label : null}
                helperText={error?.text}
                error={error?.isError}
                select={isSelect}
                fullWidth={fullWidth}
                InputProps={InputProps}
                inputProps={inputProps}
                placeholder={placeholder}
                defaultValue={isSelect && ''}
            >
                {children}
            </StyledInputField>
        </Box>
    )
}
