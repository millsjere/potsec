import { Avatar, Box, Collapse, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack, styled, Toolbar, Typography } from '@mui/material'
import { AddTeamIcon, Analytics02Icon, ArrowDown01Icon, ArrowRight01Icon, Building03Icon, CreditCardValidationIcon, DashboardSquare01Icon, DashboardSquareAddIcon, DocumentValidationIcon, File01Icon, HelpCircleIcon, ImageAdd02Icon, InboxDownloadIcon, LibraryIcon, LicenseThirdPartyIcon, LogoutSquare01Icon, Settings01Icon, StoreLocation01Icon, StudentCardIcon, TaskAdd02Icon, Ticket02Icon, UserGroupIcon, UserSquareIcon, VideoReplayIcon } from 'hugeicons-react';
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
            name: 'Students', icon: <LicenseThirdPartyIcon size={20} />, hasSubMenu: true, subMenus: [
                { name: 'All Students', icon: <TaskAdd02Icon size={20} />, path: '/staff/all-students' },
                { name: 'Add Student', icon: <AddTeamIcon size={20} />, path: '/staff/add-student' },
            ]
        },
        {
            name: 'Staff', icon: <UserGroupIcon size={20} />, path: '/staff/all-staff'
        },
        { name: 'Programmes', icon: <LibraryIcon size={20} />, path: '/staff/programmes' },
        { name: 'Departments', icon: <Building03Icon size={20} />, path: '/staff/departments' },
    ]

    const extraMenu: SideBarMenuProps[] = [
        { name: 'Transcripts', icon: <File01Icon size={20} />, path: '/staff/transcript' },
        { name: 'ID Cards', icon: <StudentCardIcon size={20} />, path: '/staff/cards' },
    ]

    const supportMenu: SideBarMenuProps[] = [
        { name: 'Tickets', icon: <Ticket02Icon size={20} />, path: '/staff/suppport' },
        { name: 'FAQs', icon: <VideoReplayIcon size={20} />, path: '/staff/help' },
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
                {primaryMenu?.map((menu, index) => {
                    return (
                        menu?.hasSubMenu ?
                            <div key={index}>
                                <ListItem disablePadding sx={{ color: '#fff', ':hover': { bgcolor: '#c2b5ff4a' } }}>
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
                            <ListItem sx={{ color: '#fff', ':hover': { bgcolor: '#c2b5ff4a' } }} key={index} disablePadding>
                                <ListItemButton disableRipple onClick={() => navigate(menu?.path!)}>
                                    <ListItemIcon sx={{ minWidth: '40px', color: '#ffffff90' }}>{menu?.icon}</ListItemIcon>
                                    <ListItemText sx={{ '& span': { fontSize: '1rem' } }} primary={menu?.name} />
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
            {/* User Profile */}
            <Box padding='.6rem .8rem' onClick={() => {
                sessionTimeout();
                currentUser?.role === 'student' ? navigate('/') : navigate('/staff')
            }} bgcolor='#c2b5ff4a' color='#fff' margin={'.8rem'} marginTop='auto' borderRadius='10px' mb={2} sx={{ cursor: 'pointer', display: 'flex', gap: 1, alignItems: 'center' }}>
                <Avatar variant='rounded' sx={{ width: '2rem', height: '2rem', borderRadius: '8px', border: '1px solid #fff' }} src={currentUser?.photo || null} alt='user-img' />
                <span style={{ width: '60%' }}>
                    <Typography fontWeight={500} mb={-.5} noWrap>{currentUser?.othernames}</Typography>
                    <Typography variant='body2' style={{ color: '#ffffff90' }}>{currentUser?.role}</Typography>
                </span>
                <Settings01Icon size={19} style={{ marginLeft: 'auto' }} />
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
                open={mobileOpen} pa
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