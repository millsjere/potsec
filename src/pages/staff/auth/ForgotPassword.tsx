import React, { useState } from 'react'
import { AuthWrapper, InputField, RoundButton } from '../../../components/shared'
import { InputAdornment, Typography } from '@mui/material'
import { Mail01Icon } from 'hugeicons-react'
import { Link } from 'react-router-dom'

const ForgotPassword = () => {
    const [email, setEmail] = useState('')
    const [load, setLoad] = useState(false)

    const onFormSubmit = () => {

    }
    return (
        <AuthWrapper staff={true}
            title={<Typography sx={{ fontWeight: 500, mb: .5 }} variant='h5'>Forgot Password</Typography>}
            subtitle={<Typography textAlign={'center'} sx={{ mb: 3 }} paragraph color='textSecondary' >Enter email address to reset
            </Typography>}
        >
            <InputField variant='outlined'
                label='Email' type='email'
                InputProps={{ endAdornment: <InputAdornment position='start'><Mail01Icon size={20} color='#acacac' /></InputAdornment> }}
                value={email} onChange={(e) => setEmail(e.target.value)} fullWidth
            />
            <RoundButton onClick={onFormSubmit}
                loading={load} sx={{ mb: '1rem' }}
                text='Reset Password' variant={'contained'} color='secondary'
                disableElevation fullWidth
            />
            <Typography textAlign={'center'} paragraph > <Link to='/staff' style={{ color: '#ee0704' }}>Login </Link> </Typography>

        </AuthWrapper>
    )
}

export default ForgotPassword