import { Breadcrumbs, IconButton, Link, Stack, Typography } from '@mui/material'
import { ArrowRight01Icon, Home06Icon, SquareArrowLeft02Icon } from 'hugeicons-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

interface BreadCrumbProps {
    label: string,
    link: string,
    active?: boolean
}

interface PageHeaderProps {
    title: string,
    breadcrumbs: BreadCrumbProps[],
    backOption?: boolean
}

const PageHeader = ({ title, breadcrumbs, backOption = false }: PageHeaderProps) => {
    const navigate = useNavigate()
    return (
        <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} mb={3}>
            <Stack gap={0} direction={'row'} alignItems={'center'}>
            { backOption && <IconButton disableRipple onClick={()=>navigate(-1)}><SquareArrowLeft02Icon size={24} /></IconButton> }
                <Typography variant='h6' mb={0}>{title}</Typography>
            </Stack>
            <Breadcrumbs separator={<ArrowRight01Icon size={16} />}>
                <Typography variant='body2' sx={{ display: 'flex', alignItems: 'center', gap: .5 }}><Home06Icon size={15} /> Home</Typography>
                {
                    breadcrumbs?.map((crumb, i) => (
                        <Link underline="hover" key={i} color="inherit" sx={{ fontSize: '.9rem' }} onClick={() => navigate(crumb?.link)}>
                            {crumb?.label}
                        </Link>
                    ))
                }
            </Breadcrumbs>
        </Stack>
    )
}

export default PageHeader