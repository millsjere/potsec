import { Avatar, Box, Divider, Stack, Typography } from '@mui/material'
import { Calendar03Icon, ProfileIcon } from 'hugeicons-react'
import React from 'react'
import { RoundButton } from '../Inputs/RoundButton'
import UserBg from '../../../assets/images/user_bg.jpg'
import UserPic from '../../../assets/images/user.png'

interface Props {
    variant?: 'grid' | 'list' | string
    role?: 'student' | 'staff'
    onClick?: () => void
    user: any
}

const UserCard = ({ variant, role = 'student', onClick, user }: Props) => {
    // console.log(user)
    return (
        <>
            {
                (variant === 'grid' && role === 'student') &&
                <Box bgcolor={'#fff'} onClick={onClick} sx={{ transition: 'all .2s ease-in-out', cursor: 'pointer', ':hover': { border: theme => `1px solid ${theme.palette.primary.main}` } }} overflow={'hidden'} border={'1px solid lightgrey'} borderRadius={'10px'}>
                    <Box sx={{ backgroundImage: `url(${UserBg})`, backgroundSize: 'cover' }} height={'5rem'} />
                    <Box p={3} textAlign={'left'}>
                        <Avatar src={user?.photo} sx={{ width: '4.5rem', height: '4.5rem', mt: -8, border: '2px solid #fff', boxShadow: '0 2px 8px rgba(0,0,0,15%)' }} />
                        <Typography mt={1} variant='h6' noWrap>{user?.fullname}</Typography>
                        <Typography color={'GrayText'}>{user?.enrollment?.index}</Typography>
                        <Typography variant='body2' color={'GrayText'} >{user?.enrollment?.month} {user?.enrollment?.year}</Typography>
                    </Box>
                </Box>
            }
            {
                (variant === 'grid' && role === 'staff') &&
                <Box bgcolor={'#fff'} px={3} py={4} textAlign={'center'} onClick={onClick}
                    sx={{
                        transition: 'all .2s ease-in-out', cursor: 'pointer',
                        ':hover': { border: theme => `1px solid ${theme.palette.primary.main}` }
                    }}
                    overflow={'hidden'} border={'1px solid white'} borderRadius={'10px'}
                >
                    <Avatar src={UserPic} sx={{ width: '6rem', height: '6rem', mx: 'auto', boxShadow: '0 2px 8px rgba(0,0,0,15%)' }} />
                    <Typography mt={2} noWrap fontWeight={600}>{user?.fullname}</Typography>
                    <Typography variant='body2' color={'GrayText'}>{user?.email}</Typography>
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

export default UserCard