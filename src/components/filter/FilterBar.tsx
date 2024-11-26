import { Box, IconButton, InputAdornment, MenuItem, Stack } from '@mui/material'
import { GridViewIcon, RightToLeftListDashIcon, Search01Icon } from 'hugeicons-react'
import React from 'react'
import { InputField, RoundButton } from '../shared'
import { programmes, getYearRange } from '../../utils'

interface Props {
    view?: string
    onViewChange?: (val: string) => void
    showView?: boolean
    showProgramme?: boolean
    showYear?: boolean
    moreBtns?: React.ReactNode
    onSearch: () => void
    isLoading?: boolean
}

const FilterBar = ({ view, onViewChange, showView = true, showProgramme = true, showYear = true, moreBtns, onSearch, isLoading }: Props) => {
    return (
        <Box px={3} pb={1} pt={2} mb={4} bgcolor='#fff' borderRadius={'10px'}>
            <Box display={'flex'} gap={2} alignItems={'center'}>
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
                {
                    showProgramme &&
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
                }

                {
                    showYear &&
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
                }
                <RoundButton
                    variant={'contained'} sx={{ borderRadius: '10px', py: .8, mt: 1 }}
                    color={'primary'} disableElevation
                    text='Search' startIcon={<Search01Icon size={18} color='#fff' />}
                    onClick={onSearch}
                    loading={isLoading}
                />
                <Stack direction={'row'} ml={'auto'} alignItems={'center'} gap={1}>
                    {moreBtns}
                    {
                        showView &&
                        <Stack direction={'row'} ml={'auto'} alignItems={'center'} gap={1}>
                            <IconButton disableRipple onClick={() => onViewChange!('list')} sx={{ mt: 1, bgcolor: view === 'list' ? theme => theme.palette.primary.main : '#ededed', borderRadius: '8px', color: view === 'list' ? '#fff' : null }}><RightToLeftListDashIcon size={20} /></IconButton>
                            <IconButton disableRipple onClick={() => onViewChange!('grid')} sx={{ mt: 1, bgcolor: view === 'grid' ? theme => theme.palette.primary.main : '#ededed', borderRadius: '8px', color: view === 'grid' ? '#fff' : null }}><GridViewIcon size={20} /></IconButton>
                        </Stack>
                    }
                </Stack>
            </Box>
        </Box>
    )
}

export default FilterBar