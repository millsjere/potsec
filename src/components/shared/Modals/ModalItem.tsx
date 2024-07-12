import { Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material'
import { Cancel01Icon } from 'hugeicons-react'
import React from 'react'


interface Props {
  open: boolean
  onClose: ()=>void
  title: string
  children: React.ReactNode
}

const ModalItem = ({open, onClose, title, children}: Props) => {
  return (
    <Dialog open={open}>
      <DialogTitle title={title} />
        <DialogContent sx={{p: 2, position: 'relative', }}>
          <IconButton onClick={onClose} sx={{position: 'absolute', top:'5%', right: '5%'}}><Cancel01Icon size={20} /></IconButton>
          {children}
        </DialogContent>
    </Dialog>
  )
}

export default ModalItem