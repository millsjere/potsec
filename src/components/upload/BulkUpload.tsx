import { Box, IconButton, MenuItem, Stack, Typography } from '@mui/material';
import { AddTeamIcon, Building03Icon, Cancel01Icon, LibraryIcon, LicenseThirdPartyIcon, UserIdVerificationIcon } from 'hugeicons-react';
import React, { useState } from 'react'
import { base } from '../../config/appConfig';
import { InputField } from '../shared';
import UploadComp from './UploadComp';
import * as XLSX from 'xlsx';
import swal from 'sweetalert';
import { useLoader } from '../../context/LoaderContext';
import { reload } from '../../utils';

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
    const { startLoading, stopLoading} = useLoader()
    const [selected, setSelected] = useState(null)
    const [uploadStage, setUploadStage] = useState(0)
    const [type, setType] = useState<string>('excel')
    const [allProgrammes, setAllProgrammes] = useState([])
    const [data, setData] = useState<any[]>()
    const [progSelect, setProgSelect] = useState('')
    const [file, setFile] = useState<File>()


    const fetchProgrammes = async() => {
        const {data: res} = await base.get('/api/staff/programmes')
        setAllProgrammes(res?.data)
    }

    const onUploadTypeSelect = (val: string, type: string) => {
        if(val === 'courses') fetchProgrammes()
        setSelected(val);
        setUploadStage(1)
        setType(type)
    }

    const resetFile = () => {
        setFile(undefined)
    }

    const readDataFn = (file: File): Promise<any[]> => {
        return new Promise((resolve, reject) => {
            let xdata: any[] = [];
            const reader = new FileReader();
    
            reader.onload = function (e) {
                try {
                    const data = e?.target?.result;
                    if (!data) throw new Error("Failed to read file data.");
    
                    const readData = XLSX.read(data, { type: 'binary' });
                    const wsname = readData.SheetNames[0];
                    const ws = readData.Sheets[wsname];
                    
                    // Convert sheet data to JSON
                    const parseData: any[] = XLSX.utils.sheet_to_json(ws, { header: 0, raw: true, rawNumbers: true });
    
                    // Push data to xdata and resolve
                    xdata.push(...parseData);
                    resolve(xdata);
                } catch (error) {
                    reject(error); // Reject the promise on error
                }
            };
    
            reader.onerror = (error) => reject(error); // Handle file reading errors
    
            reader.readAsBinaryString(file);
        });
    };
    

    const onFileUpload = async (file: any) => {
        if(selected === 'staff' && file){
            const parseData: any[] = await readDataFn(file)
            console.log('staff ===>', parseData)
            if(parseData!?.length > 0){
                for (let i = 0; i < parseData.length; i++) {
                    const el: any = parseData[i];
                    if(!el?.name) return swal('Empty Field', `Selected file has an empty field (name) on line ${i + 1}. Please check and upload again`,'warning').then(resetFile)
                }
                setFile(file)
                setData(parseData)
            }else {
                swal({
                  title: 'Error',
                  text: 'Invalid, selected file has no data. Please download and fill the template provided.',
                  icon: 'error'
                })
            }
        }
        if(selected === 'courses' && file){
            const parseData: any[] = await readDataFn(file)
            console.log('data ===>', parseData)
            if(parseData!?.length > 0){
                for (let i = 0; i < parseData.length; i++) {
                    const el: any = parseData[i];
                    if(!el?.name) return swal('Empty Field', `Selected file has an empty field (name) on line ${i + 1}. Please check and upload again`,'warning').then(resetFile)
                    if(!el?.code) return swal('Empty Field', `Selected file has an empty field (code) on line ${i + 1}. Please check and upload again`,'warning').then(resetFile)
                    if(!el?.year) return swal('Empty Field', `Selected file has an empty field (year) on line ${i + 1}. Please check and upload again`,'warning').then(resetFile)
                    if(!el?.trimester) return swal('Empty Field', `Selected file has an empty field (trimester) on line ${i + 1}. Please check and upload again`,'warning').then(resetFile)
                    if(!el?.credit) return swal('Empty Field', `Selected file has an empty field (credit) on line ${i + 1}. Please check and upload again`,'warning').then(resetFile)
                }
                setFile(file)
                setData(parseData)
            }else {
                swal({
                  title: 'Error',
                  text: 'Invalid, selected file has no data. Please download and fill the template provided.',
                  icon: 'error'
                })
            }
        }
        if(selected === 'programmes' && file){
            let bulkData: any[] = []
            const parseData: any[] = await readDataFn(file)
            console.log('programmes ===>', parseData)
            if(parseData!?.length > 0){
                for (let i = 0; i < parseData.length; i++) {
                    const el: any = parseData[i];
                    if(!el?.name) return swal('Empty Field', `Selected file has an empty field (name) on line ${i + 1}. Please check and upload again`,'warning').then(resetFile)
                    if(!el?.department) return swal('Empty Field', `Selected file has an empty field (department) on line ${i + 1}. Please check and upload again`,'warning').then(resetFile)
                    if(!el?.year_month) return swal('Empty Field', `Selected file has an empty field (year_month) on line ${i + 1}. Please check and upload again`,'warning').then(resetFile)
                    if(!el?.duration) return swal('Empty Field', `Selected file has an empty field (duration) on line ${i + 1}. Please check and upload again`,'warning').then(resetFile)
                    
                    // create payload //
                    const payload = {
                        name: el?.name,
                        department: el?.department,
                        duration: { type: el?.year_month, number: el?.duration }
                    }
                    bulkData?.push(payload)
                }
                setFile(file)
                setData(bulkData)
            }else {
                swal({
                  title: 'Error',
                  text: 'Invalid, selected file has no data. Please download and fill the template provided.',
                  icon: 'error'
                })
            }
        }
        if(selected === 'departments' && file){
            const parseData: any[] = await readDataFn(file)
            console.log('departments ===>', parseData)
            if(parseData!?.length > 0){
                for (let i = 0; i < parseData.length; i++) {
                    const el: any = parseData[i];
                    if(!el?.name) return swal('Empty Field', `Selected file has an empty field (name) on line ${i + 1}. Please check and upload again`,'warning').then(resetFile)
                }
                setFile(file)
                setData(parseData)
            }else {
                swal({
                  title: 'Error',
                  text: 'Invalid, selected file has no data. Please download and fill the template provided.',
                  icon: 'error'
                })
            }
        }
    }

    const onFormSubmit = async() => {
        if(selected === 'courses' && progSelect === '') return swal('Invalid', `Please select a programme`,'warning')
        try {
            startLoading('Uploading data. Please wait...')
            const { data: res } = await base.post('/api/staff/course/bulk-upload', { id: progSelect, courses: data })
            if(res?.responseCode === 200){
                swal({
                    title: 'Success',
                    text: res?.message,
                    icon: 'success',
                    closeOnClickOutside: false,
                }).then(reload)
            }
        } catch (error) {
            swal({
                title: '',
                text: '',
                icon: 'error'
            })
        }finally{
            stopLoading()
        }
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
                            icon={<Building03Icon id='icon' style={{ transition: 'all .2s ease-in' }} color='#acacac' size={70} />}
                            title='DEPARTMENTS'
                        />
                        <UploadCard onClick={(val) => onUploadTypeSelect(val, 'excel')}
                            icon={<LibraryIcon id='icon' style={{ transition: 'all .2s ease-in' }} color='#acacac' size={70} />}
                            title='PROGRAMMES'
                        />
                        <UploadCard onClick={(val) => onUploadTypeSelect(val, 'excel')}
                            icon={<LibraryIcon id='icon' style={{ transition: 'all .2s ease-in' }} color='#acacac' size={70} />}
                            title='COURSES'
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
                    { selected === 'courses' && 
                        <InputField
                            type='text' isSelect
                            variant={'outlined'}
                            fullWidth isRequired
                            onChange={(e)=>{ setProgSelect(e?.target?.value)}} 
                            size={'small'}
                            showTopLabel
                            label='Select Programme'
                        >
                            {
                                allProgrammes?.map((el: any) => <MenuItem key={el?.id} value={el?.id}>{el?.name}</MenuItem>)
                            }
                        </InputField>
                    }
                    <UploadComp
                        type={type}
                        onCancel={() => { setUploadStage(0); setSelected(null); setFile(undefined); setData(undefined) }}
                        onUpload={(file: any) => onFileUpload(file)}
                        fileName={file?.name}
                        onSubmit={onFormSubmit}
                    />
                </Box>
            }
        </>
    )
}

export default BulkUpload