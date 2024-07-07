import React from 'react'
import { useLoader } from '../../../context/LoaderContext'
import { Dialog, DialogContent, LinearProgress, Typography } from '@mui/material'

const FileLoader = () => {
    const { open, message } = useLoader()
    return (
        <Dialog open={open} maxWidth='xs' fullWidth>
            <DialogContent sx={{ textAlign: 'center', p: 5 }}>
                <Typography mb={1}>{message === '' ? 'Loading...Please wait' : message}</Typography>
                <LinearProgress variant='indeterminate' />
            </DialogContent>
        </Dialog>
    )
}

export default FileLoader