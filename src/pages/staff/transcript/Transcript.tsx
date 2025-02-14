import React, { useState } from 'react'
import PageHeader from '../../../components/shared/PageHeader'
import { PDFViewer } from '@react-pdf/renderer'
import ResultTranscript from './TranscriptTemplate'
import NoStudent from '../../../assets/images/student_data.png'
import { Box, Dialog, DialogContent, Grid, Slide, SlideProps, Stack, TextField, Typography } from '@mui/material';
import { InputField, RoundButton } from '../../../components/shared';
import { AddCircleIcon, Search01Icon } from 'hugeicons-react';
import { base } from '../../../config/appConfig';
import { useLoader } from '../../../context/LoaderContext';
import swal from 'sweetalert'

const SlideTransition = (props: React.JSX.IntrinsicAttributes & SlideProps) => {
    return <Slide {...props} direction="up" />;
}

const Transcript = () => {
    const { startLoading, stopLoading } = useLoader()
    const [value, setValue] = useState('')
    const [data, setData] = useState<any>()
    const [preview, setPreview] = useState(false)
    const [sems, setSems] = useState()
    const [student, setStudent] = useState<any>()


    const onFormSearch = async () => {
        if (value === '') return
        try {
            startLoading('Searching for record. Please wait...')
            const { data: res } = await base.get(`/api/search/students?index=${value}`)
            setData(res?.data)
            setStudent(() => ({
                name: res?.data[0]?.fullname,
                indexNumber: res?.data[0]?.enrollment?.index,
                programme: res?.data[0]?.enrollment?.programme?.name,
                year: res?.data[0]?.enrollment?.year
            }))
        } catch (error: any) {
            console.log(error?.response)
        } finally {
            stopLoading()
        }
    }

    const getResults = async () => {
        try {
            startLoading('Genereating report. Please wait...')
            const { data: res } = await base.get(`/api/staff/results/transcript/${data[0]?.id}`)
            if (res?.status === 'no-results') {
                swal('No Grades', `${res?.message}`, 'info')
            } else {
                setSems(res?.data)
                setPreview(true)
            }
            // console.log(res)
        } catch (error) {
            console.log(error?.response)
        } finally {
            stopLoading()
        }
    }

    return (
        <div>
            <PageHeader title={'Transcript'} breadcrumbs={[{ label: 'Documents', link: '#' }]} />
            <Box display={'flex'} flexDirection={'column'} height={'35rem'} borderRadius={'10px'} bgcolor={'#fff'} justifyContent={'center'} alignItems={'center'}>
                <>
                    <img src={NoStudent} alt='null-state' width={'12%'} style={{ opacity: 0.9 }} />
                    <Typography mt={3} variant='h6'>{'Students Transcript'}</Typography>
                    <Typography variant='body1' mb={2} color={'GrayText'}>{'Search for a student to generate transcript'}</Typography>
                    <TextField size='small'
                        onChange={(e) => { setValue(e?.target?.value) }}
                        sx={{ width: '30rem', mb: 2 }} value={value}
                        placeholder='Enter student index no.'
                    />
                    <RoundButton variant={'contained'}
                        disableElevation
                        onClick={onFormSearch}
                        text={'Search Student'} size={'large'}
                        color={'secondary'}
                        sx={{ borderRadius: '5px', }}
                        startIcon={<Search01Icon size={18} color='#fff' />}
                    />
                </>
            </Box>
            {
                (data && data?.length > 0) && (
                    <Box bgcolor={'#fff'} borderRadius={'10px'} my={3}>
                        <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} bgcolor={'lightblue'}>
                            <Typography mt={2} variant='h6' px={3} py={2} mb={2} fontWeight={600} fontSize={'1.1rem'}>Student Details</Typography>
                            <Stack direction={'row'} gap={2}>
                                <RoundButton variant={'contained'}
                                    disableElevation
                                    onClick={() => { getResults() }}
                                    text={'Generate Transcript'} size={'large'}
                                    color={'secondary'}
                                    sx={{ borderRadius: '5px' }}

                                />
                                <RoundButton variant={'contained'}
                                    disableElevation
                                    onClick={() => { setData(undefined); setValue('') }}
                                    text={'Close'} size={'large'}
                                    color={'primary'}
                                    sx={{ borderRadius: '5px', mr: 3 }}
                                />
                            </Stack>
                        </Stack>
                        <Grid container columnSpacing={2}>
                            <Grid item sm={2}>
                                <Box component={'img'} src={data[0]?.photo} sx={{ backgroundPosition: 'cover', }} width={'100%'} height={'auto'} />
                            </Grid>
                            <Grid item sm={5}>
                                <Box sx={{ py: '1rem' }}>
                                    <InputField size={'small'} showTopLabel isRequired
                                        type={'text'} fullWidth label='Current Password'
                                        variant={'outlined'} placeholder={''}
                                        value={data[0]?.surname}
                                    />
                                    <InputField size={'small'} showTopLabel isRequired
                                        type={'text'} fullWidth label='Othernames'
                                        variant={'outlined'} placeholder={''}
                                        value={data[0]?.othernames}
                                    />
                                    <InputField size={'small'} showTopLabel isRequired
                                        type={'text'} fullWidth label='Email'
                                        variant={'outlined'} placeholder={''}
                                        value={data[0]?.email}
                                    />
                                </Box>
                            </Grid>
                            <Grid item sm={4.8}>
                                <Box sx={{ py: '1rem' }}>
                                    <InputField size={'small'} showTopLabel isRequired
                                        type={'text'} fullWidth label='Index No.'
                                        variant={'outlined'} placeholder={''}
                                        value={data[0]?.enrollment?.index}
                                    />
                                    <InputField size={'small'} showTopLabel isRequired
                                        type={'text'} fullWidth label='Programme'
                                        variant={'outlined'} placeholder={''}
                                        value={data[0]?.enrollment?.programme?.name}
                                    />
                                    <InputField size={'small'} showTopLabel isRequired
                                        type={'text'} fullWidth label='Enroll Year'
                                        variant={'outlined'} placeholder={''}
                                        value={data[0]?.enrollment?.year}
                                    />
                                </Box>
                            </Grid>

                        </Grid>
                    </Box>
                )

            }
            {
                (data && data?.length === 0) && (
                    <Box p={4} textAlign={'center'} height={'10rem'}>
                        <Typography variant='h5'>No Record</Typography>
                        <Typography>No student record was found for this index no.</Typography>
                    </Box>
                )
            }

            <Dialog open={preview} fullScreen onClose={() => { setPreview(false) }} TransitionComponent={SlideTransition}>
                <DialogContent sx={{ p: 4, position: 'relative' }}>
                    <Stack direction={'row'} justifyContent={'space-between'} mb={2}>
                        <Typography>Preview Student Transcript</Typography>
                        <Stack direction={'row'} gap={1}>
                            <RoundButton
                                sx={{ borderRadius: '6px' }}
                                variant={'contained'} color={'primary'}
                                onClick={() => setPreview(false)}
                                disableElevation
                                text='Close'
                                size={'small'}
                            />
                        </Stack>
                    </Stack>
                    <PDFViewer style={{ width: "100%", height: "1000px" }}>
                        <ResultTranscript student={student} semesters={sems!} />
                    </PDFViewer>
                </DialogContent>
            </Dialog>

        </div>
    )
}

export default Transcript