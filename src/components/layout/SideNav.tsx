import { Avatar, Box, Collapse, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack, styled, Toolbar, Typography } from '@mui/material'
import { AddTeamIcon, ArrowDown01Icon, ArrowRight01Icon, Building03Icon, DashboardSquare01Icon, File01Icon, LibraryIcon, LicenseThirdPartyIcon, LogoutCircle01Icon, Settings01Icon, StudentCardIcon, TaskAdd02Icon, Ticket02Icon, UserAccountIcon, UserGroupIcon, VideoReplayIcon } from 'hugeicons-react';
import React from 'react'
import Logo from '../../assets/images/logo.png'
import { useLocation, useNavigate } from 'react-router-dom';
import { getData, sessionTimeout } from '../../config/appConfig';
import swal from 'sweetalert';



type Props = {
    drawerWidth: number, handleDrawerClose: () => void, handleDrawerTransitionEnd: () => void, mobileOpen: boolean
}
type SideBarMenuProps = {
    name: string,
    icon: React.ReactNode,
    path?: string,
    active?: string,
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
    const path = useLocation().pathname?.split('/')[2]
    const [open, setOpen] = React.useState({ name: '', status: false })
    const currentUser = getData('uid')
    const navigate = useNavigate()
    const isApplicant = currentUser?.role === 'applicant'
    const isStudent = currentUser?.role === 'student'
    const isStaff = currentUser?.role === 'staff' || currentUser?.role === 'admin'


    const allMenu = {
        applicant: [
            { name: 'Dashboard', icon: <File01Icon size={20} />, path: '/account/dashboard', active: 'dashboard' },
            { name: 'Application', icon: <StudentCardIcon size={20} />, path: '/account/application', active: 'application' },
            { name: 'Setting', icon: <Settings01Icon size={20} />, path: '/account/settings', active: 'settings' },
        ],
        staff: [
            { name: 'Dashboard', icon: <DashboardSquare01Icon size={20} />, path: '/staff/dashboard' },
            {
                name: 'Applications', icon: <LicenseThirdPartyIcon size={20} />, hasSubMenu: true, subMenus: [
                    { name: 'All Applicants', icon: <TaskAdd02Icon size={20} />, path: '/staff/applicants' },
                    { name: 'New Application', icon: <AddTeamIcon size={20} />, path: '/staff/application' },
                ]
            },
            {
                name: 'Students', icon: <UserAccountIcon size={20} />, path: '/staff/all-students'
            },
            {
                name: 'Staff', icon: <UserGroupIcon size={20} />, path: '/staff/all-staff'
            },
            { name: 'Programmes', icon: <LibraryIcon size={20} />, path: '/staff/programmes' },
            { name: 'Departments', icon: <Building03Icon size={20} />, path: '/staff/departments' },
        ],
        admin: [
            { name: 'Dashboard', icon: <DashboardSquare01Icon size={20} />, path: '/staff/dashboard' },
            {
                name: 'Applications', icon: <LicenseThirdPartyIcon size={20} />, hasSubMenu: true, subMenus: [
                    { name: 'All Applicants', icon: <TaskAdd02Icon size={20} />, path: '/staff/applicants' },
                    { name: 'New Application', icon: <AddTeamIcon size={20} />, path: '/staff/application' },
                ]
            },
            {
                name: 'Students', icon: <UserAccountIcon size={20} />, path: '/staff/all-students'
            },
            {
                name: 'Staff', icon: <UserGroupIcon size={20} />, path: '/staff/all-staff'
            },
            { name: 'Programmes', icon: <LibraryIcon size={20} />, path: '/staff/programmes' },
            { name: 'Departments', icon: <Building03Icon size={20} />, path: '/staff/departments' },
        ],
        student: []
    }

    const extraMenu: SideBarMenuProps[] = [
        { name: 'Transcripts', icon: <File01Icon size={20} />, path: '/staff/documents' },
        // { name: 'ID Cards', icon: <StudentCardIcon size={20} />, path: '/staff/cards' },
    ]

    const supportMenu: SideBarMenuProps[] = [
        { name: 'Settings', icon: <Settings01Icon size={20} />, path: '/staff/settings' },
        // { name: 'Tickets', icon: <Ticket02Icon size={20} />, path: '/staff/ticketing' },
    ]

    const drawer = (
        <Box display={'flex'} flexDirection={'column'} height={'100%'}>
            <Toolbar sx={{ gap: 1 }}>
                <img src={Logo} alt='logo' width={'30%'} />
                <Typography fontWeight={600} variant='h6' fontSize={'1.1rem'} sx={{ color: '#fff' }}>POTSEC</Typography>
            </Toolbar>
            <Divider sx={{ mb: 2, bgcolor: '#ffffff30' }} />
            <List >
                <StyledMenuTitle>GENERAL</StyledMenuTitle>
                {allMenu[currentUser?.role]?.map((menu: SideBarMenuProps, index: number) => {
                    return (
                        menu?.hasSubMenu ?
                            <div key={index}>
                                <ListItem disablePadding sx={{ color: '#fff', bgcolor: menu?.active === path ? '#c2b5ff4a' : 'transparent', ':hover': { bgcolor: '#c2b5ff4a' } }}>
                                    <ListItemButton disableRipple onClick={() => setOpen({ status: !open.status, name: menu?.name })}>
                                        <ListItemIcon sx={{ minWidth: '40px', color: '#ffffff90' }}>{menu?.icon}</ListItemIcon>
                                        <ListItemText sx={{ '& span': { fontSize: '1rem' } }} primary={menu?.name} />
                                        {(open.status && open.name === menu?.name) ? <ArrowDown01Icon size={18} /> : <ArrowRight01Icon size={18} />}
                                    </ListItemButton>
                                </ListItem>
                                <Collapse in={open.status && open.name === menu?.name} timeout='auto'>
                                    <List >
                                        {
                                            menu?.subMenus?.map((sub, i) => (
                                                <ListItem sx={{ color: '#fff', ':hover': { bgcolor: '#c2b5ff4a' } }} key={i} dense onClick={() => navigate(sub?.path)}>
                                                    <ListItemButton disableRipple>
                                                        <ListItemIcon sx={{ minWidth: '30px', color: '#ffffff90' }}>{sub?.icon}</ListItemIcon>
                                                        <ListItemText sx={{ '& span': { fontSize: '1rem' } }} primary={sub?.name} />
                                                    </ListItemButton>
                                                </ListItem>
                                            ))
                                        }
                                    </List>
                                </Collapse>
                            </div>
                            :
                            <ListItem sx={{ color: '#fff', bgcolor: menu?.active === path ? '#c2b5ff4a' : 'transparent', ':hover': { bgcolor: '#c2b5ff4a' } }} key={index} disablePadding>
                                <ListItemButton disableRipple onClick={() => navigate(menu?.path!)}>
                                    <ListItemIcon sx={{ minWidth: '40px', color: '#ffffff90' }}>{menu?.icon}</ListItemIcon>
                                    <ListItemText sx={{ '& span': { fontSize: '1rem', fontWeight: 400 } }} primary={menu?.name} />
                                </ListItemButton>
                            </ListItem>
                    )
                }
                )}
            </List>
            {
                isStaff && (
                    <>
                        <Divider sx={{ my: 2, bgcolor: '#ffffff30' }} />
                        <List>
                            <StyledMenuTitle>DOCUMENTS</StyledMenuTitle>
                            {extraMenu?.map((menu, index) => (
                                <ListItem key={index} disablePadding sx={{ color: '#fff', ':hover': { bgcolor: '#c2b5ff4a' } }}>
                                    <ListItemButton disableRipple onClick={() => navigate(menu?.path!)}>
                                        <ListItemIcon sx={{ minWidth: '40px', color: '#ffffff90' }}>{menu?.icon}</ListItemIcon>
                                        <ListItemText sx={{ '& span': { fontSize: '1rem' } }} primary={menu?.name} />
                                    </ListItemButton>
                                </ListItem>
                            ))}
                        </List>
                        <Divider sx={{ my: 2, bgcolor: '#ffffff30' }} />
                        <List>
                            <StyledMenuTitle>SUPPORT</StyledMenuTitle>
                            {supportMenu?.map((menu, index) => (
                                <ListItem key={index} disablePadding sx={{ color: '#fff', ':hover': { bgcolor: '#c2b5ff4a' } }}>
                                    <ListItemButton disableRipple onClick={() => navigate(menu?.path!)}>
                                        <ListItemIcon sx={{ minWidth: '40px', color: '#ffffff90' }}>{menu?.icon}</ListItemIcon>
                                        <ListItemText sx={{ '& span': { fontSize: '1rem' } }} primary={menu?.name} />
                                    </ListItemButton>
                                </ListItem>
                            ))}
                        </List>
                    </>
                )
            }
            {/* User Profile */}
            <Stack direction={'row'} gap={0} m={'.8rem'} mt={'auto'} borderRadius='10px' overflow={'hidden'} mb={2} sx={{}}>
                <Box padding='.6rem .8rem' bgcolor='#c2b5ff4a' color='#fff' sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                    <Avatar variant='rounded' sx={{ width: '2rem', height: '2rem', borderRadius: '8px', border: '1px solid #fff' }} src={currentUser?.photo || null} alt='user-img' />
                    <span style={{ width: '80%' }}>
                        <Typography fontWeight={400} variant='body2' mb={-.5} noWrap>{currentUser?.fullname}</Typography>
                        <Typography variant='body2' fontWeight={300} style={{ color: '#ffffff90' }}>{currentUser?.role}</Typography>
                    </span>
                </Box>
                <Box bgcolor={'primary.main'} width={'100%'} display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
                    <LogoutCircle01Icon onClick={() => {
                        swal({
                            icon: 'warning',
                            title: 'Logout',
                            text: 'Do you want to logout?',
                            buttons: ['Cancel', 'Logout'],
                            closeOnClickOutside: false
                        }).then((logout) => {
                            if (logout) {
                                sessionTimeout();
                                (isStudent || isApplicant) ? navigate('/') : navigate('/staff')
                            }
                        })
                    }} size={19} color='#fff' style={{ cursor: 'pointer' }} />
                </Box>
            </Stack>


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
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, bgcolor: 'secondary.main' },
                }}
            >
                {drawer}
            </Drawer>

            {/* Other Media */}
            <Drawer
                variant="permanent"
                sx={{
                    display: { xs: 'none', sm: 'flex' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, bgcolor: 'secondary.main' },
                }}
                open
            >
                {drawer}
            </Drawer>
        </Box>
    )
}

export default SideNav