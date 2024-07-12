import React from 'react'
import NullState from '../../../components/shared/NullState/NullState'
import PageHeader from '../../../components/shared/PageHeader'
import Empty from '../../../assets/images/department.png'
import FilterBar from '../../../components/filter/FilterBar'
import { RoundButton } from '../../../components/shared'
import { AddCircleIcon } from 'hugeicons-react'


const Departments = () => {
    return (
        <div>
            <PageHeader title={'All Departments'} breadcrumbs={[{ label: 'Departments', link: '#' }]} />
            <FilterBar
                showYear={false}
                showProgramme={false}
                showView={false}
                onSearch={() => { }}
                moreBtns={
                  <RoundButton
                      variant={'contained'} sx={{ borderRadius: '10px', py: .8, mt: 1 }}
                      color={'primary'} disableElevation
                      text='Department' startIcon={<AddCircleIcon size={18} color='#fff' />}
                      onClick={() => { }}
                  />
                }
            />
            <NullState
                title='Departments'
                subtext={`Oops. No department records were found`}
                image={Empty}
                btnText={'Add Department'}
                onClick={() => { }}
                opacity={0.4}
            />

        </div>
    )
}

export default Departments