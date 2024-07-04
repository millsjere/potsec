import { Box, Button, Drawer, FormLabel, Grid, IconButton, InputAdornment, MenuItem, TextField, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles';
import React, { useRef, useState } from 'react'
import FileUpload from '../../../assets/images/file-upload.png'
import { grey } from '@mui/material/colors';
import { Cancel01Icon } from 'hugeicons-react';



const drawer = 240;

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    appbar: {
        display: 'flex',
        gap: '2rem',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        background: 'transparent',
        padding: '1rem',
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawer,
            flexShrink: 0,
        },
    },
    drawerPaper: {
        width: drawer,
    },
    content: {
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawer}px)`,
        },
        padding: '1rem'
    },
    badge: {
        '& .MuiBadge-badge': {
            border: '2px solid white',
            color: '#fff',
            padding: 0
        }

    },
    title: {
        fontWeight: 600,
        letterSpacing: 0
    },
    iconBtn: {
        borderRadius: '10px',
        marginLeft: '.8rem',
        padding: '.5rem',
        background: '#fff'
    },
    productDrawer: {
        width: '35rem',
        padding: '2.3rem 3.5rem',
        '& .MuiOutlinedInput-root': {
            borderRadius: '9px'
        }
    },
    field: {
        marginTop: '.5rem',
        marginBottom: '1.2rem'
    },
    media: {
        marginTop: '.5rem',
        marginBottom: '1.8rem',
        border: `1px dashed ${grey[400]}`,
        borderRadius: '6px',
        padding: '2rem',
        textAlign: 'center',
        cursor: 'pointer'
    },
    toolbar: theme.mixins.toolbar,
    btn: {
        color: '#fff', fontWeight: 600,
        '& span': {
            height: '2.8rem',
        }
    }

}))

type Props = {
    open: boolean,
    close: () => void
}

const AddProduct = ({ open, close }: Props) => {
    const classes = useStyles()
    const browse = useRef()
    const [newCat, setNewCat] = useState(false)



    return (
        <div>
            {/* ADD PRODUCT */}
            <Drawer anchor='right' open={open} classes={{ paper: classes.productDrawer }}>
                <Box display={'flex'} justifyContent='space-between' alignItems={'center'} marginBottom='2rem'>
                    <Typography variant='h5' className={classes.title}>Add Product</Typography>
                    <IconButton onClick={() => close()}><Cancel01Icon /></IconButton>
                </Box>

                <Box>
                    <FormLabel required className={classes.label}>Title</FormLabel>
                    <TextField className={classes.field} variant='outlined' placeholder='Name of product' fullWidth />

                    <FormLabel required className={classes.label}>Description</FormLabel>
                    <TextField className={classes.field} variant='outlined' multiline minRows={7} placeholder='Enter product description' fullWidth />

                    <Grid container spacing={3}>
                        <Grid item sm={6}>
                            <FormLabel required className={classes.label}>Regular Price</FormLabel>
                            <TextField className={classes.field} variant='outlined' type={'number'} inputProps={{ min: 0 }} placeholder='0.00' fullWidth InputProps={{
                                startAdornment: <InputAdornment position='start'>GH¢</InputAdornment>
                            }} />
                        </Grid>
                        <Grid item sm={6}>
                            <FormLabel className={classes.label}>Sales Price</FormLabel>
                            <TextField className={classes.field} variant='outlined' type={'number'} inputProps={{ min: 0 }} placeholder='0.00' fullWidth InputProps={{
                                startAdornment: <InputAdornment position='start'>GH¢</InputAdornment>
                            }} />
                        </Grid>
                    </Grid>

                    <Grid container spacing={3}>
                        <Grid item sm={6}>
                            <FormLabel required className={classes.label}>SKU</FormLabel>
                            <TextField className={classes.field} variant='outlined' placeholder='Product SKU' fullWidth />
                        </Grid>
                        <Grid item sm={6}>
                            <FormLabel required className={classes.label}>Quantity</FormLabel>
                            <TextField className={classes.field} type={'number'} inputProps={{ min: 0 }} variant='outlined' placeholder='Available in-stock' fullWidth />
                        </Grid>
                    </Grid>

                    <FormLabel required className={classes.label}>Media</FormLabel>
                    <input type={'file'} accept='.jpg, .png, .jpeg' style={{ display: 'none' }} ref={browse} />
                    <Box className={classes.media}>
                        <img src={FileUpload} alt='file-upload' width={'15%'} />
                        <Typography color='textSecondary'>Browse and upload files</Typography>
                        <Typography color='textSecondary' variant='body2'>File Max Size - 0.5MB</Typography>
                    </Box>
                    <Box>

                    </Box>

                    <Box display='flex' justifyContent={'space-between'}>
                        <FormLabel required className={classes.label}>Category</FormLabel>
                        <FormLabel className={classes.label} onClick={() => setNewCat(!newCat)} style={{ cursor: 'pointer', color: '#083554' }}>+ New category</FormLabel>
                    </Box>
                    <TextField className={classes.field} select defaultValue={''} variant='outlined' label='Select category' fullWidth >
                        {
                            [].map((el, index) => {
                                return (
                                    <MenuItem key={index} value={el}>{'No category'}</MenuItem>
                                )
                            })
                        }
                    </TextField>
                    {
                        newCat &&
                        <TextField className={classes.field} variant='outlined' placeholder='New Category' fullWidth InputProps={{
                            endAdornment: <InputAdornment position='end'>
                                <Button variant='contained' disableElevation style={{ textTransform: 'none' }}>Add Category</Button>
                            </InputAdornment>
                        }} />
                    }

                    <FormLabel className={classes.label}>Brand</FormLabel>
                    <TextField className={classes.field} variant='outlined' placeholder='Select Brand' fullWidth />

                    <FormLabel className={classes.label}>Tags</FormLabel>
                    <TextField className={classes.field} variant='outlined' placeholder='Product tags' fullWidth />

                    <FormLabel className={classes.label} required>In-Stock</FormLabel>
                    <TextField className={classes.field} select defaultValue={''} variant='outlined' label='Stock availability' fullWidth >
                        {
                            ['In-Stock', 'Out-Of-Stock'].map((el, index) => {
                                return (
                                    <MenuItem key={index} value={el}>{el}</MenuItem>
                                )
                            })
                        }
                    </TextField>
                </Box>
                <Button variant='contained' color='primary' className={classes.btn} disableElevation fullWidth>Save  Product</Button>
                <Box className={classes.toolbar}></Box>
            </Drawer>
        </div>
    )
}

export default AddProduct