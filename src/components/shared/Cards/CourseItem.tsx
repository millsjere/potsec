import { Avatar, IconButton, Stack, Typography } from '@mui/material'
import { Delete01Icon } from 'hugeicons-react'
import React from 'react'

interface Props {
    course: {
        name: string,
        code: string
    },
    onRemove: ()=>void
}
const CourseItem = ({ course, onRemove }: Props) => {

    return (
        <Stack direction={'row'} p={1} px={1.5} mb={2} gap={1.5} alignItems={'center'} sx={{ border: 1, borderColor: 'divider', borderRadius: '8px' }}>
            <Avatar variant='rounded'>T</Avatar>
            <span>
                <Typography>{course?.name}</Typography>
                <Typography variant='body2' color={'GrayText'} textTransform={'uppercase'}>{course?.code}</Typography>
            </span>
            <IconButton onClick={onRemove} sx={{ bgcolor: '#f7f7f7', ml: 'auto', ':hover': {bgcolor: 'red', color: '#fff'} }}><Delete01Icon size={18} /></IconButton>
        </Stack>
    )
}

export default CourseItem