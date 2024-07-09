import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import PageHeader from '../../../components/shared/PageHeader'
import { Avatar, Box, Divider, Grid, List, ListItem, ListItemButton, ListItemText, MenuItem, Stack, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'
import { InputField, RoundButton } from '../../../components/shared'
import { Cancel01Icon, FloppyDiskIcon, PencilEdit01Icon } from 'hugeicons-react'
import { getApplicationForm } from '../../../utils'

const StudentDetails = () => {
    const params = useParams()
    console.log(params)
    const [edit, setEdit] = useState<string | undefined>(undefined)
    const menuList = getApplicationForm()?.map(el => el?.title)
    const formData = getApplicationForm();


    return (
        <div>
            <PageHeader title={'Student Details'} breadcrumbs={[{ label: 'All Students', link: '#' }, { label: 'Details', link: '#' }]} />
            <Grid container columnSpacing={3}>
                <Grid item sm={2.5}>
                    <Box bgcolor={'#fff'} borderRadius={'10px'} p={2} position={'sticky'} top={90}>
                        <List>
                            {
                                menuList?.map((menu, i) => (
                                    <ListItem sx={{ my: .5, color: grey[600], borderRadius: '10px', overflow: 'hidden', ':hover': { bgcolor: '#c2b5ff4a' } }} key={i} disablePadding>
                                        <ListItemButton href={`#${menu}`} disableRipple sx={{}}>
                                            <Typography noWrap>{menu}</Typography>
                                        </ListItemButton>
                                    </ListItem>
                                ))
                            }
                        </List>
                    </Box>
                </Grid>
                <Grid item sm={9.5}>
                    <Box bgcolor={'#fff'} borderRadius={'10px'} mb={4}>
                        <Stack direction={'row'} gap={2} p={3} borderRadius={'10px'} border={'1px solid lightgrey'} alignItems={'flex-start'} justifyContent={'flex-start'}>
                            <Avatar variant='rounded' sx={{ width: '7rem', height: '7rem', borderRadius: '15px' }} />
                            <div>
                                <Typography variant='h6'>Jeremiah Mills</Typography>
                                <Typography color={'GrayText'}>POTSEC24010000</Typography>
                                <Typography color={'GrayText'}>Computer Science Eng.</Typography>
                                <Typography color={'GrayText'}>2024</Typography>
                            </div>
                            <RoundButton sx={{ ml: 'auto', borderColor: grey[400], color: grey[600] }}
                                variant={'outlined'} startIcon={<PencilEdit01Icon size={15} />}
                                onClick={() => { }} disableElevation
                                text='Edit' size={'small'}

                            />
                        </Stack>
                    </Box>
                    <>
                        {
                            formData?.map((data, i) => {
                                return (
                                    <Box id={data?.title} key={i} border={'1px solid lightgrey'} borderRadius={'10px'} bgcolor={'#fff'} mb={4} sx={{ scrollMarginTop: '5.8rem' }}>
                                        <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} py={2} px={4}>
                                            <Typography fontWeight={600}>{data?.title}</Typography>
                                            {
                                                (edit === data?.title) ?
                                                    <Stack direction={'row'} gap={1} alignItems={'center'}>
                                                        <RoundButton
                                                            variant={'contained'} startIcon={<FloppyDiskIcon size={15} />} color={'secondary'}
                                                            onClick={() => { }} disableElevation text='Save' size={'small'}
                                                        />
                                                        <RoundButton sx={{ borderColor: grey[400], color: grey[600] }}
                                                            variant={'outlined'} startIcon={<Cancel01Icon size={12} />} color={'primary'}
                                                            onClick={() => { setEdit(undefined) }} disableElevation text='Cancel' size={'small'}
                                                        />
                                                    </Stack>
                                                    :
                                                    <RoundButton sx={{ ml: 'auto', borderColor: grey[400], color: grey[600] }}
                                                        variant={'outlined'} startIcon={<PencilEdit01Icon size={15} />} color={'primary'}
                                                        onClick={() => { setEdit(data?.title) }} disableElevation text='Edit' size={'small'}
                                                    />
                                            }
                                        </Stack>
                                        <Divider sx={{ mb: 3 }} />
                                        <Grid container columnSpacing={3} sx={{ px: 4, pb: 3 }}>
                                            {
                                                data?.fields?.map((el, i) => {
                                                    if (el?.type === 'select') {
                                                        return (
                                                            <Grid item sm={6} key={i}>
                                                                <Typography variant='body2' mb={1} color={'GrayText'}>{el?.label}</Typography>
                                                                <InputField size={'small'}
                                                                    type={el?.type} fullWidth isSelect
                                                                    variant={'outlined'} placeholder={el?.placeholder || ''}
                                                                    onChange={() => { }}
                                                                >
                                                                    {
                                                                        el?.options?.map((item, i) => <MenuItem key={i} value={item}>{item}</MenuItem>)
                                                                    }
                                                                </InputField>
                                                            </Grid>
                                                        )
                                                    }
                                                    return (
                                                        <Grid sm={6} item key={i}>
                                                            <Typography variant='body2' mb={1} color={'GrayText'}>{el?.label}</Typography>
                                                            <InputField size={'small'}
                                                                type={el?.type} fullWidth
                                                                variant={'outlined'} placeholder={el?.placeholder}
                                                                onChange={() => { }}
                                                            />
                                                        </Grid>
                                                    )
                                                }
                                                )
                                            }
                                        </Grid>
                                    </Box>
                                )
                            })
                        }
                    </>

                </Grid>
            </Grid>
        </div>
    )
}

export default StudentDetails