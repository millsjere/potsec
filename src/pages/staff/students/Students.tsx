import React, { useEffect, useState } from 'react'
import PageHeader from '../../../components/shared/PageHeader'
import { Box, Grid, Typography } from '@mui/material'
import { RoundButton } from '../../../components/shared'
import NoStudent from '../../../assets/images/student_data.png'
import { useNavigate } from 'react-router-dom'
import { AddCircleIcon, AddTeamIcon } from 'hugeicons-react'
import { base } from '../../../config/appConfig'
import swal from 'sweetalert'
import FilterBar from '../../../components/filter/FilterBar'
import UserCard from '../../../components/shared/Cards/UserCard'
import LoadingState from '../../../components/shared/Loaders/LoadingState'
import NullState from '../../../components/shared/NullState/NullState'

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
            <FilterBar
                isLoading={isLoading}
                view={view}
                onViewChange={(val) => setView(val)}
                onSearch={() => { }}
                moreBtns={
                    <RoundButton
                        variant={'contained'} sx={{ borderRadius: '10px', py: .8, mt: 1 }}
                        color={'primary'} disableElevation
                        text='Student' startIcon={<AddCircleIcon size={18} color='#fff' />}
                        onClick={() => navigate('/staff/add-student')}
                    />
                }
            />

            {
                isLoading ? <LoadingState state='students' /> :
                    (!isLoading && data?.length > 0) ? (
                        <>
                            {
                                view === 'list' &&
                                data?.map((el, i) => {
                                    return <UserCard key={i} user={el} variant={view} />
                                })
                            }
                            {
                                view === 'grid' && (
                                    <Grid container spacing={3}>
                                        {
                                            data?.map((el, i) => {
                                                return <Grid item sm={3} key={i}><UserCard variant={view} user={el} /></Grid>
                                            })
                                        }
                                    </Grid>
                                )
                            }
                        </>

                    ) :
                        (
                            <NullState
                                title='No Programmes'
                                subtext={`Oops. No student records were found`}
                                image={NoStudent}
                                btnText={'Add Student'}
                                onClick={() => { }}
                                opacity={0.5}
                            />

                        )

            }

        </div>
    )
}

export default Students