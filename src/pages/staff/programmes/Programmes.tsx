import React, { useState } from 'react'
import PageHeader from '../../../components/shared/PageHeader'
import NullState from '../../../components/shared/NullState/NullState'
import Empty from '../../../assets/images/folders.png'
import FilterBar from '../../../components/filter/FilterBar'
// import LoadingState from '../../../components/shared/Loaders/LoadingState'
import { RoundButton } from '../../../components/shared'
import { AddCircleIcon } from 'hugeicons-react'

const Programmes = () => {
    const [isLoading, setIsLoading] = useState(false)

    return (
        <div>
            <PageHeader title={'All Programmes'} breadcrumbs={[{ label: 'Programmes', link: '#' }]} />
            <FilterBar
                showYear={false}
                showProgramme={false}
                showView={false}
                onSearch={() => { }}
                isLoading={isLoading}
                moreBtns={
                    <RoundButton
                        variant={'contained'} sx={{ borderRadius: '10px', py: .8, mt: 1 }}
                        color={'primary'} disableElevation
                        text='Programme' startIcon={<AddCircleIcon size={18} color='#fff' />}
                        onClick={() => { }}
                    />
                }
            />
            {/* <LoadingState state='students' /> */}
            <NullState
                title='Programmes'
                subtext={`Oops. No programme records were found`}
                image={Empty}
                btnText={'Add Programme'}
                onClick={() => { }}
                opacity={0.2}
            />

        </div>
    )
}

export default Programmes