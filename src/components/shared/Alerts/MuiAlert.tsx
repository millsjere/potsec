import React, { useEffect } from 'react';
import { Snackbar, Alert } from '@mui/material'
import Slide, { SlideProps } from '@mui/material/Slide';
import { useAlert } from '../../../context/AlertContext';


function SlideTransition(props: React.JSX.IntrinsicAttributes & SlideProps) {
  return <Slide {...props} direction="left" />;
}

export const MuiAlert = () => {
  const { open, message, status, resetAlert } = useAlert()

  const handleClose = (_event: any, reason: string) => {
    if (reason === 'clickaway') {
      return;
    }
    resetAlert()
  };

  return (
    <Snackbar open={open} autoHideDuration={3000} TransitionComponent={SlideTransition} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'right', }}>
      <Alert variant='filled' elevation={1} severity={status} onClose={handleClose}> {message} </Alert>
    </Snackbar>
  )
};

