import React, { useEffect, useState } from 'react'
import PageHeader from '../../../components/shared/PageHeader'
import swal from 'sweetalert'
import { base } from '../../../config/appConfig'
import LoadingState from '../../../components/shared/Loaders/LoadingState'
import { Grid } from '@mui/material'
import FilterBar from '../../../components/filter/FilterBar'
import { RoundButton } from '../../../components/shared'
import NoStaff from '../../../assets/images/team.png'
import { AddCircleIcon } from 'hugeicons-react'
import UserCard from '../../../components/shared/Cards/UserCard'
import AddStaff from './AddStaff'
import NullState from '../../../components/shared/NullState/NullState'


const Staffs = () => {
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [open, setOpen] = useState(false)
    const [view, setView] = useState('grid')
    const [type, setType] = useState('add')

    const fetchAllStaff = async () => {
        try {
            setIsLoading(true)
            const url = '/api/staff/all'
            const { data: res } = await base.get(url)
            if (res?.responseCode === 200) {
                setData(res?.data)
            }
        } catch (error) {
            console.log(error?.response)
            swal({ title: 'Error', text: 'Sorry, could not fetch all staff. Please refresh the page', icon: 'error' })
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchAllStaff()
    }, [])

    return (
        <div>
            <PageHeader title={'All Staff'} breadcrumbs={[{ label: 'Staff', link: '#' }]} />
            <FilterBar
                showYear={false} view={view}
                onViewChange={(val) => setView(val)}
                isLoading={isLoading}
                moreBtns={
                    <RoundButton
                        variant={'contained'} sx={{ borderRadius: '10px', py: .8, mt: 1 }}
                        color={'primary'} disableElevation
                        text='Staff' startIcon={<AddCircleIcon size={18} color='#fff' />}
                        onClick={() => { setOpen(true); setType('add') }}
                        loading={isLoading}
                    />
                }
                onSearch={() => { }}
            />
            {
                isLoading ? <LoadingState state='staff' /> :
                    (!isLoading && data?.length > 0) ? (
                        <>
                            {
                                view === 'list' &&
                                data?.map((el, i) => {
                                    return <UserCard user={el} key={i} variant={view} />
                                })
                            }
                            {
                                view === 'grid' && (
                                    <Grid container spacing={3}>
                                        {
                                            data?.map((el, i) => {
                                                return <Grid item sm={3} key={i}>
                                                    <UserCard user={el} variant={view} role='staff' onClick={() => { setOpen(true); setType('edit') }} />
                                                </Grid>
                                            })
                                        }
                                    </Grid>
                                )
                            }
                        </>

                    ) :
                        (
                            <NullState
                                title='Staff'
                                subtext={`Oops. No staff records were found`}
                                image={NoStaff}
                                btnText={'Add Staff'}
                                onClick={() => { setOpen(true); setType('add') }}
                                opacity={0.5}
                            />

                        )

            }

            {/* ADD STAFF */}
            <AddStaff open={open} onClose={() => setOpen(false)} type={type} callBack={fetchAllStaff} />
        </div>
    )
}

export default Staffs