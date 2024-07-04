import { TextField } from '@mui/material'
import { styled } from '@mui/styles'
import React from 'react'

const StyledInputField = styled(TextField)({
    marginBottom: '1rem',
    '& *': {
        borderRadius: '10px'
    },
    '& label.Mui-focused': {
        color: '#ee0704'
    },
    "& .MuiOutlinedInput-root": {
        borderRadius: '10px',
        "&.Mui-focused fieldset": {
            border: `1px solid #ee0704`
        }
    }
})

type InputFieldProps = {
    sx?: object,
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
    fullWidth?: boolean
}

export const InputField = ({ sx, isSelect, variant, value, onChange, isRequired, label, error, children, type, InputProps, inputProps, placeholder, fullWidth }: InputFieldProps) => {
    return (
        <StyledInputField sx={sx}
            type={type} size='medium'
            variant={variant}
            value={value}
            onChange={onChange}
            required={isRequired}
            label={label}
            helperText={error?.text}
            error={error?.isError}
            select={isSelect}
            fullWidth={fullWidth}
            InputProps={InputProps}
            inputProps={inputProps}
            placeholder={placeholder}
        >
            {children}
        </StyledInputField>
    )
}
