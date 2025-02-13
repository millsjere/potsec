import { Box, Divider, Drawer, IconButton, Stack, Typography } from '@mui/material'
import { Cancel01Icon } from 'hugeicons-react'
import React, { } from 'react'
import { semesters } from '../programmes/ProgrammeDetails'
import CourseItem from '../../../components/shared/Cards/CourseItem'
import NullState from '../../../components/shared/NullState/NullState'
import Empty from '../../../assets/images/folders.png'


interface Props {
    open: boolean
    onClose: () => void
    programme: any
}

const ViewStudentProgrammes = ({ open, onClose, programme }: Props) => {

    const getCourseYear = (n: number) => {
        switch (n) {
            case 1:
                return programme?.courses!?.length > 0 ? programme?.courses?.filter(((el: { year: number }) => el?.year === 1)) : []
            case 2:
                return programme?.courses!?.length > 0 ? programme?.courses?.filter(((el: { year: number }) => el?.year === 2)) : []
            case 3:
                return programme?.courses!?.length > 0 ? programme?.courses?.filter(((el: { year: number }) => el?.year === 3)) : []
            default:
                break;
        }
    }



    return (
        <div>
            <Drawer anchor='right' open={open} onClose={onClose}>
                <Box width={'40vw'}>
                    <Box display={'flex'} justifyContent='space-between' alignItems={'center'} p={3}>
                        <Stack>
                            <Typography variant='h6' fontWeight={600}>Student Programme</Typography>
                            <Typography variant='h6' fontSize={'1rem'} color={'GrayText'}>{programme?.name}</Typography>
                            <Typography variant='h6' fontSize={'1rem'} color={'GrayText'}>
                                Duration: {`${programme?.duration?.number} ${programme?.duration?.type}`} |
                                Tuition: {`${programme?.tuition?.currency} ${programme?.tuition?.amount}`}
                            </Typography>
                        </Stack>
                        <IconButton onClick={onClose}><Cancel01Icon size={20} /></IconButton>
                    </Box>
                    <Divider />

                    {
                        programme?.duration?.type?.toLowerCase() === 'years' ? (
                            Array(programme?.duration?.number).fill(0)?.map((_el: any, i: number) => (
                                <Box key={i} bgcolor={'#fff'} p={3} borderRadius={'10px'} mb={2}>
                                    <Stack mb={2} direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
                                        <Typography variant='h6'>{`All Courses (Year ${i + 1})`}</Typography>

                                    </Stack>
                                    {
                                        semesters?.map((trm, index) => (
                                            <Box key={index} sx={{ minHeight: '20rem', mb: 2, border: '1px solid lightgrey', borderRadius: '0 0 8px 8px' }}>
                                                <Box bgcolor={'#ededed'} p={1.5}>
                                                    <Typography variant='h6' fontSize={'1.1rem'}>{trm}</Typography>
                                                </Box>
                                                <Box sx={{ p: 2 }}>
                                                    {
                                                        getCourseYear(i + 1)!.filter((el: { semester: string }) => el?.semester === trm)?.length > 0 ?
                                                            getCourseYear(i + 1)?.filter((el: { semester: string }) => el?.semester === trm)?.map((course: any, i: number) => (
                                                                <Stack key={i}>
                                                                    <CourseItem course={course} showAction={false} />
                                                                </Stack>
                                                            ))
                                                            :
                                                            <NullState
                                                                title='All Courses'
                                                                subtext={`No course records added yet`}
                                                                image={Empty}
                                                                imageSize='10%'
                                                                btnText={'Add Course'}
                                                                onClick={() => { }}
                                                                opacity={0.2}
                                                                height='20rem'
                                                                btnSize='small'
                                                                showBtn={false}
                                                            />
                                                    }
                                                </Box>
                                            </Box>
                                        ))
                                    }
                                </Box>
                            ))
                        )
                            :
                            <Box sx={{ minHeight: '20rem', mb: 0, border: '1px solid lightgrey', borderRadius: '0 0 8px 8px' }}>
                                <Box bgcolor={'#ededed'} p={1.5}>
                                    <Typography variant='h6' fontSize={'1.1rem'}>All Courses</Typography>
                                </Box>
                                <Box sx={{ p: 2 }}>
                                    {
                                        programme?.courses?.length > 0 ?
                                            programme?.courses?.map((course: any, i: number) => (
                                                <Stack key={i}>
                                                    <CourseItem course={course} showAction={false} />
                                                </Stack>
                                            ))
                                            :
                                            <NullState
                                                title='All Courses'
                                                subtext={`No course records added yet`}
                                                image={Empty}
                                                imageSize='10%'
                                                btnText={'Add Course'}
                                                onClick={() => { }}
                                                opacity={0.2}
                                                height='20rem'
                                                btnSize='small'
                                                showBtn={false}
                                            />
                                    }
                                </Box>
                            </Box>
                    }
                </Box>
            </Drawer>
        </div>
    )
}

export default ViewStudentProgrammes