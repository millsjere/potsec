import React, { useEffect, useState } from 'react'
import PageHeader from '../../../components/shared/PageHeader'
import { Box, Grid, Typography } from '@mui/material'
import { RoundButton } from '../../../components/shared'
import NoStudent from '../../../assets/images/student_data.png'
import { useNavigate } from 'react-router-dom'
import { AddTeamIcon } from 'hugeicons-react'
import { base } from '../../../config/appConfig'
import swal from 'sweetalert'
import FilterBar from '../../../components/filter/FilterBar'
import StudentCard from '../../../components/shared/Cards/StudentCard'
import LoadingState from '../../../components/shared/Loaders/LoadingState'

const Students = () => {
    const navigate = useNavigate()
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [view, setView] = useState('grid')

    const fetchAllStudents = async () => {
        try {
            setIsLoading(true)
            const url = '/api/student/all'
            const { data: res } = await base.get(url)
            if (res?.responseCode === 200) {
                setData(res?.data)
            }
        } catch (error) {
            console.log(error?.response)
            swal({ title: 'Error', text: 'Sorry, could not fetch all students. Please refresh the page', icon: 'error' })
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchAllStudents()
    }, [])

    return (
        <div>
            <PageHeader title={'All Students'} breadcrumbs={[{ label: 'Students', link: '#' }]} />

            {
                isLoading ? <LoadingState /> :
                    (!isLoading && data?.length > 0) ? (
                        <>
                            <Box px={3} pb={1} pt={2} mb={4} bgcolor='#fff' borderRadius={'15px'}>
                                <FilterBar view={view} onViewChange={(val) => setView(val)} />
                            </Box>
                            {
                                view === 'list' &&
                                Array(8).fill(0)?.map((_el, i) => {
                                    return <StudentCard key={i} variant={view} />
                                })
                            }
                            {
                                view === 'grid' && (
                                    <Grid container spacing={3}>
                                        {
                                            Array(8).fill(0)?.map((_el, i) => {
                                                return <Grid item sm={3} key={i}><StudentCard variant={view} /></Grid>
                                            })
                                        }
                                    </Grid>
                                )
                            }
                        </>

                    ) :
                        (
                            <Box height={'80vh'} display={'flex'} flexDirection={'column'} alignItems={'center'} justifyContent={'center'}>
                                <img src={NoStudent} width={'15%'} alt='no_students' />
                                <Typography mt={3} fontWeight={500}>No Students</Typography>
                                <Typography mb={2} color={'GrayText'} variant='body2'>There is no student data available</Typography>
                                <RoundButton
                                    text={'Add Student'} sx={{ padding: '.5rem .8rem' }}
                                    onClick={() => navigate('/staff/add-students')} variant={'contained'}
                                    disableElevation size={'small'} startIcon={<AddTeamIcon size={18} />}
                                />
                            </Box>

                        )

            }

        </div>
    )
}

export default Students