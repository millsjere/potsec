import { Box, Typography } from '@mui/material';
import { Album02Icon, Cancel01Icon, ClipboardIcon, Upload04Icon, File01Icon } from 'hugeicons-react';
import React, { useRef } from 'react'
import { RoundButton } from '../shared';
import { validateFile } from '../../utils';
interface Props {
    type: 'image' | 'excel' | 'pdf' | string,
    onCancel: () => void,
    onSubmit: () => void,
    onUpload: (file: any) => void
    iconSize?: number
    showTitle?: boolean
    showCancelBtn?: boolean
    fileName?: string
}

const UploadComp = ({ type = 'image', onCancel, fileName, onUpload, onSubmit, iconSize = 90, showCancelBtn = true, showTitle = true }: Props) => {
    const ref = useRef()

    return (
        <Box textAlign={'center'} p={5} onClick={() => ref?.current?.click()}
            sx={{
                cursor: 'pointer', transition: 'all .2s ease-in-out',
                ':hover': { border: theme => `2px dashed ${theme.palette.primary.main}` }
            }}
            borderRadius={'10px'} border={'1.5px dashed lightgrey'}
        >
            <input type='file' accept={type === 'image' ? '.jpg,.jpeg,.png' : '.xlsx,.xls,.numbers,.csv'} style={{ display: 'none' }} ref={ref} onChange={(e) => onUpload(validateFile(e?.target?.files![0], type))} />
            { 
                type === 'excel' ? 
                (fileName ? <File01Icon size={iconSize} color='#acacac' style={{ margin: '0 auto' }} /> : <ClipboardIcon size={iconSize} color='#acacac' style={{ margin: '0 auto' }} /> )
                : 
                (fileName ? <File01Icon size={iconSize} color='#acacac' style={{ margin: '0 auto' }} /> : <Album02Icon size={iconSize} color='#acacac' style={{ margin: '0 auto' }} /> )
            }
            {showTitle && <Typography mt={3}>{ fileName || 'Browse or Click to upload file'}</Typography>}
            <Typography mt={showTitle ? 0 : 2} color={'GrayText'} variant='body2'>Accepted files are {type === 'excel' ? ' xlsx, csv, numbers' : 'jpg, png, jpeg'}</Typography>
            <Typography mb={2} color={'GrayText'} variant='body2'>Maximum file size - 1MB</Typography>
            <RoundButton
                text={fileName ? 'Upload Data' : 'Browse File'} sx={{ padding: '.5rem .8rem' }} color={'secondary'}
                onClick={(e) => {
                    e.stopPropagation();
                    fileName ? onSubmit() : ref?.current?.click()
                    
                }} variant={'contained'}
                disableElevation size={'small'} startIcon={<Upload04Icon size={18} />}
            />
            {
                showCancelBtn &&
                <RoundButton
                    text={'Cancel'} sx={{ padding: '.5rem .8rem', ml: 2 }} color={'primary'}
                    onClick={(e) => { e.stopPropagation(); onCancel() }} variant={'outlined'}
                    disableElevation size={'small'} startIcon={<Cancel01Icon size={18} />}
                />
            }
        </Box>
    )
}

export default UploadComp