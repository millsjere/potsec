import { Download01Icon } from 'hugeicons-react'
import React, { useState } from 'react'
import FilterBar from '../../../components/filter/FilterBar'
import { RoundButton } from '../../../components/shared'
import LoadingState from '../../../components/shared/Loaders/LoadingState'
import NullState from '../../../components/shared/NullState/NullState'
import PageHeader from '../../../components/shared/PageHeader'
import MuiTable from '../../../components/shared/Tables/MuiTable'
import useAxiosFetch from '../../../hooks/useAxiosFetch'
import NoStudent from '../../../assets/images/student_data.png'

const AcademicResult = () => {
    const { isLoading, response: data } = useAxiosFetch('/api/staff/results/all-files') 
    const headers = ['Index No.', 'Fullname', 'Phone', 'Date Applied', 'Programme', 'Year', 'Action']
    const [params, setParams] = useState({ label: '', value: '' })



  return (
    <div>
        <PageHeader backOption title={'Academic Results'} breadcrumbs={[{ label: 'All Gradings', link: '/staff/applicants' }, { label: 'Details', link: '#' }]} />
        <FilterBar
        showView={false}
        showExport={false}
        isLoading={false}
        moreBtns={
          <RoundButton
            variant={'contained'} sx={{ borderRadius: '10px', py: .8, mt: 1 }}
            color={'primary'} disableElevation
            text='Upload Results' startIcon={<Download01Icon size={18} color='#fff' />}
            onClick={() => { }}
            loading={false}
          />
        }
        filterParams={params}
        onSearch={()=>{}}
        onReset={()=>{}}
        onExport={() => { }}
        onFilter={(e: any) => { setParams({ label: e?.target?.value, value: '' }) }}
        onKeywordChange={(e: any) => { setParams(prev => ({ ...prev, value: e?.target?.value })) }}
        filterOptions={['File Name', 'Programme']}
      />

{
        isLoading ? <LoadingState state='students' /> :
          (!isLoading && data?.length > 0) ? (
            <>
              <MuiTable
                data={data}
                headers={headers}
                onEditClick={(id: string) => {}}
                onDeleteClick={(id: string) => {}}
              />
            </>

          ) :
            (
              <NullState
                title='No Grade Results'
                subtext={`Oops. No grading records were found`}
                image={NoStudent}
                btnText={'Add Results'}
                onClick={() => {}}
                opacity={0.5}
              />

            )
      }
    </div>
  )
}

export default AcademicResult