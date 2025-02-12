import { Box, TextField, Typography } from '@mui/material'
import { styled } from '@mui/styles'
import React from 'react'
import swal from 'sweetalert'

const StyledInputField = styled(TextField)(({ size }) => ({
    marginBottom: '1rem',
    '& *': {
        borderRadius: size === 'medium' ? '10px' : '6px'
    },
    '& label.Mui-focused': {
        color: '#030564'
    },
    "& .MuiOutlinedInput-root": {
        borderRadius: size === 'medium' ? '10px' : '6px',
        "&.Mui-focused fieldset": {
            border: `1px solid #030564`
        }
    }
}))

type InputFieldProps = {
    sx?: object,
    size?: any,
    isSelect?: boolean,
    variant?: any,
    value?: string | number,
    onChange?: (e: any) => void,
    onKeyDown?: (e: any) => void,
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
    isDisabled?: boolean
    multiline?: boolean
    rows?: Number
    defaultValue?: string
}

export const InputField = ({ rows, multiline, showTopLabel = false, size = 'medium', sx, isSelect, variant, value, onChange, isRequired, label, error, children, type, InputProps, inputProps, placeholder, fullWidth, isDisabled, defaultValue }: InputFieldProps) => {
    return (
        <Box>
            {showTopLabel && <Typography variant='body2' textTransform={'capitalize'} fontSize={'.9rem'} mb={.5} color={'GrayText'}>{label}</Typography>}
            <StyledInputField sx={sx}
                type={type} size={size}
                variant={variant}
                value={value}
                onChange={onChange}
                onKeyDown={(e) => {
                    if (type === 'number') {
                        if (e.key === '-' || e?.key === '+') return swal('Invalid', 'You have entered an invalid input', 'warning')
                    }
                }}
                required={isRequired} multiline={multiline} rows={rows}
                label={!showTopLabel ? label : null}
                helperText={error?.text}
                error={error?.isError}
                select={isSelect}
                fullWidth={fullWidth}
                InputProps={InputProps}
                inputProps={inputProps}
                placeholder={placeholder}
                defaultValue={isSelect ? '' : defaultValue}
                disabled={isDisabled}
                
            >
                {children}
            </StyledInputField>
        </Box>
    )
}
