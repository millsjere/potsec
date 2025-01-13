import { Box, IconButton, MenuItem, Stack } from '@mui/material'
import { Download01Icon, GridViewIcon, RightToLeftListDashIcon, Search01Icon } from 'hugeicons-react'
import React from 'react'
import { InputField, RoundButton } from '../shared'

interface Props {
    view?: string
    onViewChange?: (val: string) => void
    showView?: boolean
    showProgramme?: boolean
    showYear?: boolean
    moreBtns?: React.ReactNode
    onSearch: () => void
    onKeywordChange: (val: any) => void
    onFilter: (val: any) => void
    onExport: () => void
    onReset: () => void
    isLoading?: boolean
    showExport?: boolean
    filterOptions?: string[]
    filterParams: { label: string, value: string }
    selectFieldOptions?: any[]
}

const FilterBar = ({ view, onViewChange, selectFieldOptions, filterOptions, filterParams, onReset, onKeywordChange, onFilter, showView = true, moreBtns, showExport, onSearch, onExport, isLoading }: Props) => {
    return (
        <Box px={3} pb={1} pt={2} mb={4} bgcolor='#fff' borderRadius={'10px'}>
            <Box display={'flex'} gap={2} alignItems={'center'}>
                <InputField
                    variant={'outlined'} isSelect
                    onChange={onFilter}
                    size={'small'} fullWidth
                    label={'Filter By'} sx={{ width: '12rem' }}
                    showTopLabel
                    value={filterParams.label}
                >
                    {filterOptions?.map((el, i) => <MenuItem key={i} value={el}>{el}</MenuItem>)}
                </InputField>

                {filterParams.label === 'Department' ?
                    <InputField
                        variant={'outlined'}
                        onChange={onKeywordChange}
                        size={'small'} fullWidth
                        label={'Departments'}
                        showTopLabel isSelect sx={{ width: '14rem' }}
                        value={filterParams.value}
                    >
                        {selectFieldOptions?.map((el: any, i) => <MenuItem key={i} value={el?.id}>{el?.name}</MenuItem>)}
                    </InputField>

                    : filterParams.label === 'Status' ?
                        <InputField
                            variant={'outlined'}
                            onChange={onKeywordChange}
                            size={'small'} fullWidth
                            label={'Status'}
                            showTopLabel isSelect sx={{ width: '14rem' }}
                            value={filterParams.value}
                        >
                            {selectFieldOptions?.map((el: any, i) => <MenuItem key={i} value={el?.toLowerCase()}>{el}</MenuItem>)}
                        </InputField>
                        :
                        <InputField
                            variant={'outlined'}
                            onChange={onKeywordChange}
                            size={'small'} fullWidth
                            label={'Keyword'}
                            showTopLabel
                            value={filterParams.value}

                        />
                }
                <RoundButton
                    variant={'contained'} sx={{ borderRadius: '10px', py: .8, mt: 1 }}
                    color={'primary'} disableElevation
                    text='Search' startIcon={<Search01Icon size={18} color='#fff' />}
                    onClick={onSearch}
                    loading={isLoading}
                />
                <RoundButton
                    variant={'outlined'} sx={{ borderRadius: '10px', py: .8, mt: 1 }}
                    color={'primary'} disableElevation
                    text='Reset'
                    onClick={onReset}
                    loading={isLoading}
                />
                <Stack direction={'row'} ml={'auto'} alignItems={'center'} gap={1}>
                    {moreBtns}
                    {showExport &&
                        <RoundButton
                            variant={'outlined'} sx={{ borderRadius: '10px', py: .8, mt: 1 }}
                            color={'secondary'} disableElevation
                            text='Download' startIcon={<Download01Icon size={18} />}
                            onClick={onExport}
                            loading={isLoading}
                        />
                    }
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