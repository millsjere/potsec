import React, { useState } from 'react'
import FilterBar from '../../../components/filter/FilterBar'
import PageHeader from '../../../components/shared/PageHeader'
import LoadingState from '../../../components/shared/Loaders/LoadingState'
import NullState from '../../../components/shared/NullState/NullState'
import { useNavigate } from 'react-router-dom'
import swal from 'sweetalert'
import { useLoader } from '../../../context/LoaderContext'
import { base } from '../../../config/appConfig'
import { reload } from '../../../utils'
import NoStudent from '../../../assets/images/student_data.png'
import useAxiosFetch from '../../../hooks/useAxiosFetch'
import { RoundButton } from '../../../components/shared'
import { AddCircleIcon } from 'hugeicons-react'
import MuiTable from '../../../components/shared/Tables/MuiTable'


const AllStudents = () => {
  const navigate = useNavigate()
  const { startLoading, stopLoading } = useLoader()
  const { isLoading, response: data, setIsLoading, setResponse, fetchData } = useAxiosFetch('/api/all-students')
  const headers = ['Index No.', 'Fullname', 'Phone', 'Date Applied', 'Programme', 'Year', 'Action']
  const [params, setParams] = useState({ label: '', value: '' })

  const onDeleteApplicant = (id: string) => {
    swal({
      icon: 'warning',
      title: 'Are You Sure?',
      text: 'This action will delete this applicant.',
      buttons: ['Cancel', 'Delete'],
      dangerMode: true,
      closeOnClickOutside: false
    }).then(async (del) => {
      if (del) {
        startLoading('Deleting account. Please wait')
        await base.delete(`/api/applicant/${id}`)
        stopLoading()
        reload()
      }
    })
  }

  const onSearchHandler = async () => {
    if (params.label === '' || params.value === '') return
    console.log('params ==>', params)
    try {
      setIsLoading(true)
      const { data: res } = await base.get(`/api/search/students?${params?.label?.toLowerCase()}=${params?.value}`)
      if (res?.status === 'success') {
        setResponse(res?.data)
      }
    } catch (error) {
      swal({
        title: 'Error',
        text: 'Sorry, could not get data. Please refresh and try again',
        icon: 'error'
      }).then(reload)
    } finally {
      setIsLoading(false)
    }

  }

  const resetFilter = async () => {
    setParams({ label: '', value: '' })
    await fetchData()
  }


  return (
    <div>
      <PageHeader title={'All Students'} breadcrumbs={[{ label: 'Students', link: '#' }]} />
      <FilterBar
        showView={false}
        showExport={true}
        isLoading={isLoading}
        moreBtns={
          <RoundButton
            variant={'contained'} sx={{ borderRadius: '10px', py: .8, mt: 1 }}
            color={'primary'} disableElevation
            text='New Student' startIcon={<AddCircleIcon size={18} color='#fff' />}
            onClick={() => { navigate('/staff/application') }}
            loading={isLoading}
          />
        }
        filterParams={params}
        onSearch={onSearchHandler}
        onReset={resetFilter}
        onExport={() => { }}
        onFilter={(e: any) => { setParams({ label: e?.target?.value, value: '' }) }}
        onKeywordChange={(e: any) => { setParams(prev => ({ ...prev, value: e?.target?.value })) }}
        filterOptions={['Name', 'Index']}
      />
      {
        isLoading ? <LoadingState state='students' /> :
          (!isLoading && data?.length > 0) ? (
            <>
              <MuiTable
                data={data}
                headers={headers}
                onEditClick={(id: string) => navigate(`/staff/applicant/${id}/view`)}
                onDeleteClick={(id: string) => onDeleteApplicant(id)}
              />
            </>

          ) :
            (
              <NullState
                title='No Students'
                subtext={`Oops. No students records were found`}
                image={NoStudent}
                btnText={'Add Student'}
                onClick={() => { navigate('/staff/application') }}
                opacity={0.5}
              />

            )
      }
    </div>
  )
}

export default AllStudents