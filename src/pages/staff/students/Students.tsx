import React, { useEffect, useState } from 'react'
import PageHeader from '../../../components/shared/PageHeader'
import { Box, Typography } from '@mui/material'
import { RoundButton } from '../../../components/shared'
import NoStudent from '../../../assets/images/student_data.png'
import { useNavigate } from 'react-router-dom'
import { AddTeamIcon } from 'hugeicons-react'
import { base } from '../../../config/appConfig'
import swal from 'sweetalert'

const Students = () => {
    const navigate = useNavigate()
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false)

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
        </div>
    )
}

export default Students