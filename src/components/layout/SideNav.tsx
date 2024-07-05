import { Avatar, Box, Collapse, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack, styled, Toolbar, Typography } from '@mui/material'
import { AddTeamIcon, Analytics02Icon, ArrowDown01Icon, ArrowRight01Icon, CreditCardValidationIcon, DashboardSquare01Icon, DashboardSquareAddIcon, DocumentValidationIcon, File01Icon, HelpCircleIcon, ImageAdd02Icon, InboxDownloadIcon, LicenseThirdPartyIcon, LogoutSquare01Icon, Settings01Icon, StoreLocation01Icon, StudentCardIcon, TaskAdd02Icon, UserGroupIcon, UserSquareIcon } from 'hugeicons-react';
import React from 'react'
import Logo from '../../assets/images/logo.png'
import { useNavigate } from 'react-router-dom';
import { getData, sessionTimeout } from '../../config/appConfig';



type Props = {
    drawerWidth: number, handleDrawerClose: () => void, handleDrawerTransitionEnd: () => void, mobileOpen: boolean
}
type SideBarMenuProps = {
    name: string,
    icon: React.ReactNode,
    path?: string,
    hasSubMenu?: boolean,
    subMenus?: any[]
}

const StyledMenuTitle = styled(Typography)({
    fontSize: '.75rem',
    color: '#ffffff90',
    marginLeft: '1rem',
    marginBottom: '1rem',
    
    
})


const SideNav = ({ drawerWidth, handleDrawerClose, handleDrawerTransitionEnd, mobileOpen }: Props) => {
    const [open, setOpen] = React.useState({ name: '', status: false })
    const currentUser = getData('uid')
    const navigate = useNavigate()


    const primaryMenu: SideBarMenuProps[] = [
        { name: 'Dashboard', icon: <DashboardSquare01Icon size={20} />, path: '/staff/dashboard' },
        {
            name: 'Students', icon: <UserGroupIcon size={20} />, hasSubMenu: true, subMenus: [
                { name: 'All Students', icon: <TaskAdd02Icon size={20} />, path: '/staff/all-students' },
                { name: 'Add Student', icon: <DashboardSquareAddIcon size={20} />, path: '/staff/add-student' },
            ]
        },
        {
            name: 'Staff', icon: <UserGroupIcon size={20} />, hasSubMenu: true, subMenus: [
                { name: 'All Staff', icon: <TaskAdd02Icon size={20} />, path: '/staff/all-staff' },
                { name: 'Add Staff', icon: <AddTeamIcon size={20} />, path: '/staff/new-staff' },
            ]
        },
        { name: 'Courses', icon: <LicenseThirdPartyIcon size={20} />, path: '/staff/courses' },
        { name: 'Registration', icon: <DocumentValidationIcon size={20} />, path: '/staff/registration' },
        { name: 'Account', icon: <UserSquareIcon size={21} />, path: '/staff/account' },
    ]

    const extraMenu: SideBarMenuProps[] = [
        { name: 'Transcripts', icon: <File01Icon size={20} />, path: '/staff/transcript' },
        { name: 'ID Cards', icon: <StudentCardIcon size={20} />, path: '/staff/cards' },
    ]

    const drawer = (
        <Box display={'flex'} flexDirection={'column'} height={'100vh'} bgcolor={'secondary.main'}>
            <Toolbar sx={{ gap: 1 }}>
                <img src={Logo} alt='logo' width={'30%'} />
                <Typography fontWeight={600} variant='h6' fontSize={'1.1rem'} sx={{ color: '#fff' }}>POTSEC</Typography>
            </Toolbar>
            <Divider sx={{ mb: 2, bgcolor: '#ffffff30' }} />
            <List >
                <StyledMenuTitle>GENERAL</StyledMenuTitle>
                {primaryMenu?.map((menu, index) => {
                    return (
                        menu?.hasSubMenu ?
                            <>
                                <ListItem key={index} disablePadding sx={{ color: '#fff',  ':hover':{ bgcolor: '#c2b5ff4a'} }}>
                                    <ListItemButton onClick={() => setOpen({ status: !open.status, name: menu?.name })}>
                                        <ListItemIcon sx={{ minWidth: '40px', color: '#fff' }}>{menu?.icon}</ListItemIcon>
                                        <ListItemText sx={{ '& span': { fontSize: '.9rem' } }} primary={menu?.name} />
                                        {(open.status && open.name === menu?.name) ? <ArrowDown01Icon size={18} /> : <ArrowRight01Icon size={18} />}
                                    </ListItemButton>
                                </ListItem>
                                <Collapse in={open.status && open.name === menu?.name} timeout='auto'>
                                    <List >
                                        {
                                            menu?.subMenus?.map((sub, i) => (
                                                <ListItem sx={{ color: '#fff',  ':hover':{ bgcolor: '#c2b5ff4a'} }} key={i} dense onClick={() => navigate(sub?.path)}>
                                                    <ListItemButton>
                                                        <ListItemIcon sx={{ minWidth: '30px', color: '#fff' }}>{sub?.icon}</ListItemIcon>
                                                        <ListItemText sx={{ '& span': { fontSize: '.9rem' } }} primary={sub?.name} />
                                                    </ListItemButton>
                                                </ListItem>
                                            ))
                                        }
                                    </List>
                                </Collapse>
                            </>
                            :
                            <ListItem sx={{ color: '#fff', ':hover':{ bgcolor: '#c2b5ff4a'} }} key={index} disablePadding>
                                <ListItemButton onClick={() => navigate(menu?.path!)}>
                                    <ListItemIcon sx={{ minWidth: '40px', color: '#fff' }}>{menu?.icon}</ListItemIcon>
                                    <ListItemText sx={{ '& span': { fontSize: '.9rem' } }} primary={menu?.name} />
                                </ListItemButton>
                            </ListItem>
                    )
                }
                )}
            </List>
            <Divider sx={{ my: 2, bgcolor: '#ffffff30' }} />
            <List>
                <StyledMenuTitle>DOCUMENTS</StyledMenuTitle>
                {extraMenu?.map((menu, index) => (
                    <ListItem key={index} disablePadding sx={{ color: '#fff',  ':hover':{ bgcolor: '#c2b5ff4a'} }}>
                        <ListItemButton onClick={() => navigate(menu?.path!)}>
                            <ListItemIcon sx={{ minWidth: '40px', color: '#fff' }}>{menu?.icon}</ListItemIcon>
                            <ListItemText sx={{ '& span': { fontSize: '.9rem' } }} primary={menu?.name} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            {/* User Profile */}
            <Box padding='.6rem .8rem' onClick={() => { 
                sessionTimeout(); 
                currentUser?.role === 'student' ? navigate('/') : navigate('/staff') }} bgcolor='#c2b5ff4a' color='#fff' margin={'.8rem'} marginTop='auto' borderRadius='10px' sx={{ cursor: 'pointer', display: 'flex', gap: 1, alignItems: 'center' }}>
                <Avatar variant='rounded' sx={{ width: '2rem', height: '2rem', borderRadius: '8px', border: '1px solid #fff'}} src={currentUser?.photo || null} alt='user-img' />
                <span style={{ width: '60%'}}>
                    <Typography fontWeight={500} mb={-.5} noWrap>{currentUser?.othernames}</Typography>
                    <Typography variant='body2' style={{ color: '#ffffff90' }}>{currentUser?.role}</Typography>
                </span>
               <LogoutSquare01Icon style={{marginLeft: 'auto'}} />
            </Box>
        </Box>
    );

    return (
        <Box
            component="nav"
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
            aria-label="mailbox folders"
        >
            {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
            {/* Mobile View */}
            <Drawer
                variant="temporary"
                open={mobileOpen}
                onTransitionEnd={handleDrawerTransitionEnd}
                onClose={handleDrawerClose}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                }}
                sx={{
                    display: { xs: 'block', sm: 'none' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                }}
            >
                {drawer}
            </Drawer>

            {/* Other Media */}
            <Drawer
                variant="permanent"
                sx={{
                    display: { xs: 'none', sm: 'flex' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                }}
                open
            >
                {drawer}
            </Drawer>
        </Box>
    )
}

export default SideNav