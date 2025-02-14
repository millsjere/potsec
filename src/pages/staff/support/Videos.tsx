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
        { title: 'Admit a Student', link: 'https://res.cloudinary.com/hiveafrika/video/upload/v1739538584/potsec/videos/admit_student_stwj5m.mov' },
        { title: 'Print or Download Admission Letter', link: 'https://res.cloudinary.com/hiveafrika/video/upload/v1739538673/potsec/videos/print_letter_qx7bab.mov' },
        { title: 'Edit Admission Letter Details', link: 'https://res.cloudinary.com/hiveafrika/video/upload/v1739538681/potsec/videos/edit_letter_fquf0i.mov' },
        { title: 'Generate Student Transcript', link: 'https://res.cloudinary.com/hiveafrika/video/upload/v1739538622/potsec/videos/gen_transcript_zstx41.mov' },
        { title: 'Add a Staff', link: 'https://res.cloudinary.com/hiveafrika/video/upload/v1739538644/potsec/videos/new_staff_do9eqh.mov' },
        { title: 'Add a Department', link: 'https://res.cloudinary.com/hiveafrika/video/upload/v1739538466/potsec/videos/add_dept_jpancz.mov' },
        { title: 'Edit a Department', link: 'https://res.cloudinary.com/hiveafrika/video/upload/v1739538510/potsec/videos/edit_dept_ttwnuu.mov' },
        { title: 'Delete a Department', link: 'https://res.cloudinary.com/hiveafrika/video/upload/v1739538513/potsec/videos/delete_dept_rmr5li.mov' },
        { title: 'Add a Programme', link: 'https://res.cloudinary.com/hiveafrika/video/upload/v1739538480/potsec/videos/add_prog_ofhjpi.mov' },
        { title: 'Edit a Programme', link: 'https://res.cloudinary.com/hiveafrika/video/upload/v1739538625/potsec/videos/edit_prog_bdzw03.mov' },
        { title: 'Bulk Upload - Programmes', link: 'https://res.cloudinary.com/hiveafrika/video/upload/v1739538624/potsec/videos/prog_bulk_kiyw97.mov' },
        { title: 'Add a Course', link: 'https://res.cloudinary.com/hiveafrika/video/upload/v1739538457/potsec/videos/add_course_aelv5m.mov' },
        { title: 'Delete a Course', link: 'https://res.cloudinary.com/hiveafrika/video/upload/v1739538513/potsec/videos/del_course_lzzjwv.mov' },
        { title: 'Bulk Upload - Courses', link: 'https://res.cloudinary.com/hiveafrika/video/upload/v1739538557/potsec/videos/bulk_courses_yhyovb.mov' },
        { title: 'Search & Filter', link: 'https://res.cloudinary.com/hiveafrika/video/upload/v1739538621/potsec/videos/search_filter_bkq6mc.mov' },
        { title: 'Reset a New Password', link: 'https://res.cloudinary.com/hiveafrika/video/upload/v1739538611/potsec/videos/update_pass_vf4b3n.mov' },
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