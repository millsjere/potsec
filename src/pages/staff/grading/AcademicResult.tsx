import { UploadCircle01Icon } from 'hugeicons-react'
import React, { useState } from 'react'
import FilterBar from '../../../components/filter/FilterBar'
import { RoundButton } from '../../../components/shared'
import LoadingState from '../../../components/shared/Loaders/LoadingState'
import NullState from '../../../components/shared/NullState/NullState'
import PageHeader from '../../../components/shared/PageHeader'
import MuiTable from '../../../components/shared/Tables/MuiTable'
import useAxiosFetch from '../../../hooks/useAxiosFetch'
import NoStudent from '../../../assets/images/student_data.png'
import { useUploader } from '../../../context/UploadContext'

const AcademicResult = () => {
  const { openUpload } = useUploader()
  const { isLoading, response: data } = useAxiosFetch('/api/staff/results/files')
  const headers = ['File Name', 'Upload By', 'Date Uploaded', 'Programme', 'Course', 'Year', 'Action']
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
            color={'secondary'} disableElevation
            text='Upload Results' startIcon={<UploadCircle01Icon size={18} color='#fff' />}
            onClick={() => { openUpload() }}
            loading={false}
          />
        }
        filterParams={params}
        onSearch={() => { }}
        onReset={() => { }}
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
                onEditClick={(id: string) => { }}
                onDeleteClick={(id: string) => { }}
                editLabel='Download'
              />
            </>

          ) :
            (
              <NullState
                title='No Grade Results'
                subtext={`Oops. No grading records were found`}
                image={NoStudent}
                btnText={'Add Results'}
                onClick={openUpload}
                opacity={0.5}
              />

            )
      }
    </div>
  )
}

export default AcademicResult