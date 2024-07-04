import { Avatar, Box, Collapse, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack, Toolbar, Typography } from '@mui/material'
import { Analytics02Icon, ArrowDown01Icon, ArrowRight01Icon, CreditCardValidationIcon, DashboardSquare01Icon, DashboardSquareAddIcon, HelpCircleIcon, ImageAdd02Icon, InboxDownloadIcon, LogoutSquare01Icon, Settings01Icon, StoreLocation01Icon, TaskAdd02Icon, UserSquareIcon } from 'hugeicons-react';
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


const SideNav = ({ drawerWidth, handleDrawerClose, handleDrawerTransitionEnd, mobileOpen }: Props) => {
    const [open, setOpen] = React.useState({ name: '', status: false })
    const currentUser = getData('uid')
    const navigate = useNavigate()


    const primaryMenu: SideBarMenuProps[] = [
        { name: 'Dashboard', icon: <DashboardSquare01Icon size={20} />, path: '/dashboard' },
        {
            name: 'Inventory', icon: <InboxDownloadIcon size={20} />, hasSubMenu: true, subMenus: [
                { name: 'Product', icon: <TaskAdd02Icon size={20} />, path: '/products' },
                { name: 'Categories', icon: <DashboardSquareAddIcon size={20} />, path: '/categories' },
                { name: 'Brands', icon: <ImageAdd02Icon size={20} />, path: '/brands' },
            ]
        },
        { name: 'Analytics', icon: <Analytics02Icon size={20} />, path: '/analytics' },
        {
            name: 'Stores', icon: <StoreLocation01Icon size={20} />, hasSubMenu: true, subMenus: [
                { name: 'All Stores', icon: <TaskAdd02Icon size={20} />, path: '/stores' },
                { name: 'Add Store', icon: <DashboardSquareAddIcon size={20} />, path: '/stores/add' },
            ]
        },
        { name: 'Account', icon: <UserSquareIcon size={20} />, path: '/account' },
    ]

    const extraMenu: SideBarMenuProps[] = [
        { name: 'Subscription', icon: <CreditCardValidationIcon size={20} />, path: '/pricing' },
        { name: 'Help Centre', icon: <HelpCircleIcon size={20} />, path: '/help' },
    ]

    const drawer = (
        <Box display={'flex'} flexDirection={'column'} height={'100vh'} bgcolor={'secondary.main'}>
            <Toolbar sx={{ gap: 1 }}>
                <img src={Logo} alt='logo' width={'30%'} />
                <Typography fontWeight={500} variant='h6' fontSize={'1.0rem'} sx={{ color: '#fff' }}>Hive Afrika</Typography>
            </Toolbar>
            <Divider sx={{ bgcolor: '#ffffff30' }} />
            <List >
                {primaryMenu?.map((menu, index) => {
                    return (
                        menu?.hasSubMenu ?
                            <>
                                <ListItem key={index} disablePadding sx={{ color: '#fff' }}>
                                    <ListItemButton onClick={() => setOpen({ status: !open.status, name: menu?.name })}>
                                        <ListItemIcon color='primary.main' sx={{ minWidth: '40px', color: '#ED8A2F' }}>{menu?.icon}</ListItemIcon>
                                        <ListItemText sx={{ '& span': { fontSize: '.9rem' } }} primary={menu?.name} />
                                        {(open.status && open.name === menu?.name) ? <ArrowDown01Icon size={18} /> : <ArrowRight01Icon size={18} />}
                                    </ListItemButton>
                                </ListItem>
                                <Collapse in={open.status && open.name === menu?.name} timeout='auto'>
                                    <List >
                                        {
                                            menu?.subMenus?.map((sub, i) => (
                                                <ListItem sx={{ color: '#fff' }} key={i} dense onClick={() => navigate(sub?.path)}>
                                                    <ListItemButton>
                                                        <ListItemIcon sx={{ minWidth: '30px', color: '#ED8A2F' }}>{sub?.icon}</ListItemIcon>
                                                        <ListItemText sx={{ '& span': { fontSize: '.9rem' } }} primary={sub?.name} />
                                                    </ListItemButton>
                                                </ListItem>
                                            ))
                                        }
                                    </List>
                                </Collapse>
                            </>

                            :
                            <ListItem sx={{ color: '#fff' }} key={index} disablePadding>
                                <ListItemButton onClick={() => navigate(menu?.path!)}>
                                    <ListItemIcon sx={{ minWidth: '40px', color: '#ED8A2F' }}>{menu?.icon}</ListItemIcon>
                                    <ListItemText sx={{ '& span': { fontSize: '.9rem' } }} primary={menu?.name} />
                                </ListItemButton>
                            </ListItem>
                    )
                }
                )}
            </List>
            <Divider sx={{ bgcolor: '#ffffff30' }} />
            <List>
                {extraMenu?.map((menu, index) => (
                    <ListItem key={index} disablePadding sx={{ color: '#fff' }}>
                        <ListItemButton onClick={() => navigate(menu?.path!)}>
                            <ListItemIcon sx={{ minWidth: '40px', color: '#ED8A2F' }}>{menu?.icon}</ListItemIcon>
                            <ListItemText sx={{ '& span': { fontSize: '.9rem' } }} primary={menu?.name} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            {/* User Profile */}
            <Box padding='1rem' textAlign={'center'} bgcolor='#256d945c' color='#fff' margin={'1rem'} marginTop='auto' borderRadius='15px' style={{ backgroundImage: 'linear-gradient(181deg, #0969ab, #083554)' }}>
                <Avatar sx={{ width: '4rem', height: '4rem', m: '0 auto', mb: '.5rem', mt: '-3rem', border: theme => `6px solid ${theme.palette.secondary.main}` }} src={currentUser?.photo || null} alt='user-img' />
                <Typography noWrap>{currentUser?.firstname}</Typography>
                <Typography noWrap variant='body2'>{currentUser?.email}</Typography>
                <Typography variant='body2' style={{ color: '#ffffff70' }}>Administrator</Typography>
                <Stack direction={'row'} gap={0} justifyContent={'center'} mt={2}>
                    <IconButton color='primary'><Settings01Icon /></IconButton>
                    <IconButton onClick={() => { sessionTimeout(); navigate('/') }} color='primary'><LogoutSquare01Icon /></IconButton>
                </Stack>
                {/* <Button variant='contained' startIcon={<ExitToApp />} disableElevation onClick={Logout} style={{background: '#0271bd80', textTransform: 'none', marginTop: '1rem', borderRadius: '8px', color: '#e7e7e7'}} > Sign Out </Button> */}
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