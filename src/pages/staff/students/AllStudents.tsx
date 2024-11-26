import React, { useState } from 'react'
import FilterBar from '../../../components/filter/FilterBar'
import PageHeader from '../../../components/shared/PageHeader'

const AllStudents = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [view, setView] = useState('list')


  return (
    <div>
        <PageHeader title={'All Students'} breadcrumbs={[{ label: 'Students', link: '#' }]} />
        <FilterBar
            showYear={false} 
            view={view}
            onViewChange={(val) => setView(val)}
            isLoading={isLoading}
            onSearch={() => { }}
          />
    </div>
  )
}

export default AllStudents