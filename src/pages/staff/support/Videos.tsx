import { Box, Card, CardContent, Dialog, DialogContent, Grid, IconButton, Stack, Typography } from '@mui/material'
import { Cancel01Icon, PauseIcon, PlayIcon, } from 'hugeicons-react'
import React, { useRef, useState } from 'react'
import PageHeader from '../../../components/shared/PageHeader'

const Videos = () => {
    const [preview, setPreview] = useState(false)
    const [url, setUrl] = useState({ title: '', link: '' })
    const [play, setPlay] = useState(false);

    const vid = useRef()
    const vidList = [
        { title: 'Admit a Student', link: '/vids/admit_student.mov' },
        { title: 'Print or Download Admission Letter', link: '/vids/print_letter.mov' },
        { title: 'Edit Admission Letter Details', link: '/vids/edit_letter.mov' },
        { title: 'Generate Student Transcript', link: '/vids/gen_transcript.mov' },
        { title: 'Add a Staff', link: '/vids/new_staff.mov' },
        { title: 'Add a Department', link: '/vids/add_dept.mov' },
        { title: 'Edit a Department', link: '/vids/edit_dept.mov' },
        { title: 'Delete a Department', link: '/vids/delete_dept.mov' },
        { title: 'Add a Programme', link: '/vids/add_prog.mov' },
        { title: 'Edit a Programme', link: '/vids/edit_prog.mov' },
        { title: 'Bulk Upload - Programmes', link: '/vids/prog_bulk.mov' },
        { title: 'Add a Course', link: '/vids/add_course.mov' },
        { title: 'Delete a Course', link: '/vids/del_course.mov' },
        { title: 'Bulk Upload - Courses', link: '/vids/bulk_courses.mov' },
        { title: 'Search & Filter', link: '/vids/search_filter.mov' },
        { title: 'Reset a New Password', link: '/vids/update_pass.mov' },
    ]
    const playToggle = () => {
        if (play) {
            vid.current.pause();
            setPlay(false);
        } else {
            setPlay(true);
            vid.current.play();
        }
    };
    return (
        <div>
            <PageHeader title={'How To Videos'} breadcrumbs={[{ label: 'Videos', link: '#' }]} />
            {/* Video Cards */}
            <Grid container spacing={3} mt={2}>
                {
                    vidList?.map((vid, i) => {
                        return (
                            <Grid key={i} item sm={3}>
                                <Card>
                                    <Box p={4} height={'10rem'} bgcolor={'lightblue'} display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
                                        <IconButton sx={{ bgcolor: '#fff' }} onClick={() => { setUrl(vid); setPreview(true) }}>
                                            <PlayIcon size={60} />
                                        </IconButton>
                                    </Box>
                                    <CardContent>
                                        <Typography textAlign={'center'}>
                                            {vid?.title}
                                        </Typography>

                                    </CardContent>
                                </Card>
                            </Grid>
                        )
                    })
                }
            </Grid>

            {/* Video Preview */}
            <Dialog open={preview} maxWidth={'lg'} fullWidth>
                <Stack py={2} px={3} mb={-2} direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
                    <Typography variant='h6'>{url?.title}</Typography>
                    <IconButton onClick={() => { setUrl({ title: '', link: '' }); setPreview(false); setPlay(false) }}><Cancel01Icon /></IconButton>
                </Stack>
                <DialogContent sx={{ position: 'relative' }}>
                    <IconButton onClick={playToggle} sx={{ bgcolor: 'darkblue', position: 'absolute', bottom: '10%', right: '5%', zIndex: 99 }}>
                        {play ? <PauseIcon size={28} color='#fff' /> : <PlayIcon size={28} color='#fff' />}
                    </IconButton>
                    <video
                        ref={vid}
                        height={"auto"}
                        width={"100%"}
                        style={{ objectFit: "contain", borderRadius: '8px' }}
                    >
                        <source
                            src={url?.link}
                        />
                    </video>
                </DialogContent>
            </Dialog>

        </div>
    )
}

export default Videos