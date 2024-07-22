import { Box, Dialog, DialogActions, DialogContent, Divider, IconButton, Typography } from '@mui/material'
import { Cancel01Icon, CheckmarkCircle01Icon } from 'hugeicons-react'
import React from 'react'
import { RoundButton } from '../Inputs/RoundButton'
import UserBg from '../../../assets/images/user_bg.jpg'


interface Props {
  open: boolean
  onClose: () => void
  onSubmit: () => void
  title: string
  maxWidth: 'sm' | 'md' | 'lg' | 'xl'
  children: React.ReactNode
  actionBtn: string
  type?: 1 | 2 | number
}

const ModalItem = ({ type = 1, open, onClose, title, maxWidth, children, actionBtn, onSubmit }: Props) => {
  return (
    <Dialog open={open} maxWidth={maxWidth} fullWidth>
      <Box position='relative' p={type === 2 ? 0 : 2}>
        {
          type === 1 &&
          <>
            <Typography variant='h6' textTransform={'capitalize'}>{title}</Typography>
            <IconButton size='small' onClick={onClose} sx={{ position: 'absolute', top: '25%', right: '3%' }}><Cancel01Icon size={20} /></IconButton>
          </>
        }
        {
          type === 2 &&
          <>
            <Box sx={{ backgroundImage: `url(${UserBg})`, backgroundSize: 'cover' }} height={'5rem'} />
            <IconButton onClick={onClose} sx={{ position: 'absolute', top: '20%', right: '3%' }}><Cancel01Icon size={20} color='#fff' /></IconButton>
          </>
        }
      </Box>
      <Divider />
      <DialogContent sx={{ p: 3, }}>
        {children}
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 3, mt: -1 }}>
        <RoundButton disableElevation size={'small'} onClick={onClose} text='Cancel' color={'primary'} variant={'outlined'} sx={{ borderRadius: '5px' }} />
        <RoundButton disableElevation size={'small'} startIcon={<CheckmarkCircle01Icon size={18} />} onClick={onSubmit} sx={{ borderRadius: '5px' }} text={actionBtn} color={'secondary'} variant={'contained'} />
      </DialogActions>
    </Dialog>
  )
}

export default ModalItem