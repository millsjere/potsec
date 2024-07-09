import { Avatar, Box, Divider, Stack, Typography } from '@mui/material'
import { Calendar03Icon, ProfileIcon } from 'hugeicons-react'
import React from 'react'
import { RoundButton } from '../Inputs/RoundButton'
import UserBg from '../../../assets/images/user_bg.jpg'

interface Props {
    variant?: 'grid' | 'list' | string
}

const StudentCard = ({ variant }: Props) => {
    return (
        <>
            {
                variant === 'grid' &&
                <Box bgcolor={'#fff'} sx={{ transition: 'all .2s ease-in-out', cursor: 'pointer', ':hover': { border: theme => `1px solid ${theme.palette.primary.main}` } }} overflow={'hidden'} border={'1px solid lightgrey'} borderRadius={'10px'}>
                    <Box sx={{ backgroundImage: `url(${UserBg})`, backgroundSize: 'cover' }} height={'5rem'} />
                    <Box p={3} textAlign={'left'}>
                        <Avatar sx={{ width: '4.5rem', height: '4.5rem', mt: -8, border: '2px solid #fff' }} />
                        <Typography mt={1} variant='h6' noWrap>Jeremiah Mills</Typography>
                        <Typography color={'GrayText'}>POTSEC24010000</Typography>
                        <Typography variant='body2' color={'GrayText'}>JANUARY 2024</Typography>
                    </Box>
                </Box>
            }
            {
                variant === 'list' &&
                <Box p={3} mb={2} bgcolor={'#fff'} sx={{
                    transition: 'all .2s ease-in',
                    ':hover': {
                        border: `1px solid lightblue`,
                        borderLeft: '5px solid lightblue',
                        boxShadow: '0 2px 5px rgba(0,0,0,9%)',
                        '#actions': { opacity: 1 }
                    }
                }}
                    border={'1px solid white'} borderLeft={'5px solid #fff'} borderRadius={'10px'}
                >
                    <Stack direction={'row'} gap={2} alignItems={'center'}>
                        <Avatar sx={{ width: '4rem', height: '4rem', bgcolor: '#acacac80' }} />
                        <div>
                            <Typography fontWeight={500} variant='h6'>Jeremiah Mills</Typography>
                            <Typography variant='body2' color={'GrayText'} >Computer Science Eng..</Typography>
                            <Stack direction={'row'} gap={2} mt={.5}>
                                <Typography variant='body2' color={'GrayText'} display={'flex'} alignItems={'center'} gap={.5}><ProfileIcon size={16} color='red' /> POTSEC24010000</Typography>
                                <Divider flexItem orientation='vertical' />
                                <Typography variant='body2' color={'GrayText'} display={'flex'} alignItems={'center'} gap={.5}><Calendar03Icon size={16} color='red' /> JANUARY 2024</Typography>
                            </Stack>
                        </div>
                        <Stack id='actions' sx={{ opacity: 0, transition: 'all .2s ease-in' }} ml={'auto'} direction={'row'} gap={1}>
                            <RoundButton variant={'outlined'}
                                text={'View'} sx={{ padding: '.3rem .8rem', borderRadius: '8px' }}
                                color={'secondary'} onClick={() => { }} size={'small'}
                                disableElevation
                            />
                            <RoundButton variant={'contained'}
                                text={'Delete'} sx={{ padding: '.3rem .8rem', borderRadius: '8px' }}
                                color={'primary'} onClick={() => { }} size={'small'}
                                disableElevation
                            />

                        </Stack>
                    </Stack>
                </Box>
            }
        </>
    )
}

export default StudentCard