import { Box, IconButton, Stack, Typography } from '@mui/material';
import { AddTeamIcon, Building03Icon, Cancel01Icon, LibraryIcon, LicenseThirdPartyIcon, UserIdVerificationIcon } from 'hugeicons-react';
import React, { useState } from 'react'
import UploadComp from './UploadComp';

interface Props {
    onClose: (val: boolean) => void
}

const UploadCard = ({ icon, title, onClick }: { icon: React.ReactNode, title: string, onClick: (val: string) => void }) => {
    return (
        <Box bgcolor={'#fff'} width={'15rem'} height={'15rem'} onClick={() => onClick(title?.toLowerCase())} sx={{
            transition: 'all .2s ease-in', cursor: 'pointer', ':hover': {
                border: theme => `1px solid ${theme.palette.primary.main}`,
                '#icon, #title': {
                    color: theme => theme.palette.primary.main
                }
            }
        }}
            borderRadius={'15px'} border={'1px solid lightgrey'}
            flexDirection={'column'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
            {icon}
            <Typography id='title' mt={2} sx={{ transition: 'all .2s ease-in' }} fontWeight={500} color={'#acacac'}>{title}</Typography>
        </Box>
    )
}


const BulkUpload = ({ onClose }: Props) => {
    const [selected, setSelected] = useState(null)
    const [uploadStage, setUploadStage] = useState(0)
    const [type, setType] = useState<string>('excel')

    const onUploadTypeSelect = (val: string, type: string) => {
        setSelected(val);
        setUploadStage(1)
        setType(type)
    }

    const onFileUpload = (file: any) => {

    }



    return (
        <>
            <IconButton
                sx={{ position: 'absolute', top: '3%', right: '5%' }} onClick={() => {
                    setUploadStage(0);
                    onClose(false)
                    setSelected(null)
                }}><Cancel01Icon size={18} /></IconButton>
            <Box mb={3} textAlign={'center'}>
                {selected ? <Typography variant='h6' textTransform={'capitalize'}>{selected} Upload</Typography> : <Typography variant='h6'>Upload Bulk Data</Typography>}
                <Typography color={'GrayText'}>Choose the kind of data to upload</Typography>
            </Box>
            {
                uploadStage === 0 &&
                <Box m={'0 auto'} width={'70%'} height={'100%'} display={'flex'} flexDirection={'column'} justifyContent={'flex-start'} alignItems={'center'}>
                    <Stack direction={'row'} gap={4} flexWrap={'wrap'} justifyContent={'center'}>
                        <UploadCard onClick={(val) => onUploadTypeSelect(val, 'excel')}
                            icon={<LicenseThirdPartyIcon id='icon' style={{ transition: 'all .2s ease-in' }} color='#acacac' size={70} />}
                            title='STUDENTS'
                        />

                        <UploadCard onClick={(val) => onUploadTypeSelect(val, 'excel')}
                            icon={<AddTeamIcon id='icon' style={{ transition: 'all .2s ease-in' }} color='#acacac' size={70} />}
                            title='STAFF'
                        />
                        <UploadCard onClick={(val) => onUploadTypeSelect(val, 'excel')}
                            icon={<LibraryIcon id='icon' style={{ transition: 'all .2s ease-in' }} color='#acacac' size={70} />}
                            title='PROGRAMMES'
                        />
                        <UploadCard onClick={(val) => onUploadTypeSelect(val, 'excel')}
                            icon={<Building03Icon id='icon' style={{ transition: 'all .2s ease-in' }} color='#acacac' size={70} />}
                            title='DEPARTMENTS'
                        />
                        <UploadCard onClick={(val) => onUploadTypeSelect(val, 'image')}
                            icon={<UserIdVerificationIcon id='icon' style={{ transition: 'all .2s ease-in' }} color='#acacac' size={70} />}
                            title='STUDENTS PHOTO'
                        />
                        <UploadCard onClick={(val) => onUploadTypeSelect(val, 'image')}
                            icon={<UserIdVerificationIcon id='icon' style={{ transition: 'all .2s ease-in' }} color='#acacac' size={70} />}
                            title='STAFF PHOTO'
                        />

                    </Stack>
                </Box>
            }

            {
                uploadStage === 1 &&
                <Box p={3} width={'80%'} m={'0 auto'}>
                    <UploadComp
                        type={type}
                        onCancel={() => { setUploadStage(0); setSelected(null) }}
                        onUpload={(file: any) => onFileUpload(file)}
                    />
                </Box>
            }
        </>
    )
}

export default BulkUpload