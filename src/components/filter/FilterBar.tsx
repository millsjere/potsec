import { Box, IconButton, InputAdornment, MenuItem, Stack } from '@mui/material'
import { GridViewIcon, RightToLeftListDashIcon, Search01Icon } from 'hugeicons-react'
import React from 'react'
import { InputField } from '../shared'
import { programmes, getYearRange } from '../../utils'

interface Props {
    view: string
    onViewChange: (val: string) => void
}

const FilterBar = ({ view, onViewChange }: Props) => {
    return (
        <Box display={'flex'} gap={2}>
            <InputField
                variant={'outlined'}
                onChange={() => { }}
                size={'small'} fullWidth
                label={'Search'}
                showTopLabel
                InputProps={{
                    endAdornment: <InputAdornment position='end'><Search01Icon size={18} /></InputAdornment>
                }}
            />
            <InputField
                variant={'outlined'}
                isSelect sx={{ width: '12rem' }}
                onChange={() => { }}
                size={'small'}
                placeholder={''}
                label={'Programmes'}
                showTopLabel
            >
                {programmes?.map((el, i) => <MenuItem key={i} value={el}>{el}</MenuItem>)}
            </InputField>

            <InputField
                variant={'outlined'}
                isSelect sx={{ width: '12rem' }}
                onChange={() => { }}
                size={'small'}
                label={'Enroll Year'}
                showTopLabel
            >
                {getYearRange(2019 - 19)?.map((el, i) => <MenuItem key={i} value={el}>{el}</MenuItem>)}
            </InputField>
            <Stack direction={'row'} ml={'auto'} alignItems={'center'} gap={1}>
                <IconButton disableRipple onClick={() => onViewChange('grid')} sx={{ bgcolor: view === 'grid' ? theme => theme.palette.primary.main : '#ededed', borderRadius: '8px', color: view === 'grid' ? '#fff' : null }}><GridViewIcon size={18} /></IconButton>
                <IconButton disableRipple onClick={() => onViewChange('list')} sx={{ bgcolor: view === 'list' ? theme => theme.palette.primary.main : '#ededed', borderRadius: '8px', color: view === 'list' ? '#fff' : null }}><RightToLeftListDashIcon size={18} /></IconButton>
            </Stack>
        </Box>
    )
}

export default FilterBar