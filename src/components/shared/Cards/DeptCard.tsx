import { Avatar, Box, Divider, IconButton, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'
import { AddCircleIcon, Delete02Icon, PencilEdit01Icon } from 'hugeicons-react'
import React from 'react'
import { RoundButton } from '../Inputs/RoundButton'


interface DeptProps {
    title: string
    subText: string
    extraText?: string
    onClick?: (e: any) => void
    onDelete?: (e: any) => void
    showBtn?: boolean
    addCourse?: (e: any) => void
}
const DeptCard = ({ title, subText, extraText, onClick, onDelete, showBtn, addCourse }: DeptProps) => {
    return (
        <Box p={3} overflow={'hidden'} bgcolor={'#fff'} borderRadius={'10px'} position={'relative'} border={'1px solid #fff'}
            sx={{
                transition: 'all .2s ease-in-out',
                ':hover': {
                    border: theme => `1px solid ${theme.palette.primary.main}`,
                    '#actions': {
                        // transform: 'translateX(0px)'
                        opacity: 1
                    }
                }
            }}>
            <Box id={'actions'} display={'flex'} flexDirection={'column'} gap={1} sx={{ position: 'absolute', top: '10%', right: '5%', opacity: 0, transition: 'all .2s ease-in' }}>
                <IconButton onClick={onClick} sx={{ bgcolor: grey[100], borderRadius: '8px' }} size='small'><PencilEdit01Icon size={20} /></IconButton>
                <IconButton onClick={onDelete} sx={{ bgcolor: grey[100], borderRadius: '8px', ':hover': { bgcolor: 'red', color: '#fff' } }} size='small'><Delete02Icon size={20} /></IconButton>
            </Box>
            <Avatar sx={{ bgcolor: '#03A9F4' }} variant='rounded'>{title?.charAt(0)?.toUpperCase()}</Avatar>
            <Typography mt={2} variant='h6' noWrap>{title}</Typography>
            <Typography mt={0} variant='body1' color={'GrayText'} noWrap>{subText}</Typography>
            {extraText && <Typography mb={2} variant='body1' color={'GrayText'} textTransform={'capitalize'}>{extraText}</Typography>}
            {
                showBtn &&
                <>
                    <Divider sx={{ my: 1.5 }} />
                    <RoundButton size={'small'} disableElevation onClick={addCourse!} variant={'outlined'} color={'secondary'} text='Courses' startIcon={<AddCircleIcon size={16} />} />
                </>
            }
        </Box>
    )
}

export default DeptCard