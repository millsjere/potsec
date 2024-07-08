import { Avatar, Box, Divider, Stack, Typography } from '@mui/material'
import { Calendar03Icon, ProfileIcon, UserCircleIcon } from 'hugeicons-react'
import React from 'react'
import { RoundButton } from '../Inputs/RoundButton'

interface Props {
    variant?: 'grid' | 'list' | string
}

const StudentCard = ({variant}: Props) => {
  return (
    <>
        {
            variant === 'grid' && 
            <Box bgcolor={'#fff'} border={'1px solid lightgrey'} borderRadius={'10px'}>
                <Box height={'5rem'} bgcolor={'#ededed'} />
                <Box p={3}>
                    <Avatar sx={{width: '4.5rem', height: '4.5rem'}} />
                    <Typography>Jeremiah Mills</Typography>
                    <Typography color={'GrayText'}>POTSEC24010000</Typography>
                    <Typography variant='body2' color={'GrayText'}>Jan. 2024</Typography>
                </Box>
            </Box>
        }
        {
            variant === 'list' && 
            <Box p={3} mb={2} bgcolor={'#fff'} sx={{transition: 'all .2s ease-in', ':hover': { border: theme =>`1px solid ${theme.palette.primary.main}`}}} border={'1px solid lightgrey'} borderRadius={'20px'}>
                <Stack direction={'row'} gap={2} alignItems={'center'}>
                    <Avatar sx={{width: '4.5rem', height: '4.5rem'}} />
                    <div>
                        <Typography fontWeight={500} textTransform={'uppercase'}>Jeremiah Mills</Typography>
                        <Typography variant='body2' color={'GrayText'}>COMPUTER SCIENCE ENG.</Typography>
                        <Stack direction={'row'} gap={2} mt={.5}>
                            <Typography variant='body2' color={'GrayText'} display={'flex'} alignItems={'center'} gap={.5}><ProfileIcon size={16} color='#acacac' /> POTSEC24010000</Typography>
                            <Divider flexItem orientation='vertical' />
                            <Typography variant='body2' color={'GrayText'} display={'flex'} alignItems={'center'} gap={.5}><Calendar03Icon size={16} color='#acacac'/> JANUARY 2024</Typography>
                        </Stack>
                    </div>
                    <RoundButton variant={'outlined'}
                        text={'Details'} sx={{ padding: '.3rem .8rem', borderRadius: '8px', ml: 'auto' }}
                        color={'primary'} onClick={() => { }}
                        disableElevation
                    />
                </Stack>
            </Box>
        }
    </>
  )
}

export default StudentCard