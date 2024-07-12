import { Box, Grid, Skeleton } from '@mui/material'
import { grey } from '@mui/material/colors'
import React from 'react'


interface Props {
  state: string
}

const LoadStudents = () => {
  return (
    <Box bgcolor={grey[200]} p={3} borderRadius={'10px'}>
      <Skeleton variant='circular' sx={{ mb: 2 }} width={'4rem'} height={'4rem'} animation='wave' />
      <Skeleton animation='wave' />
      <Skeleton animation='wave' width={'80%'} />
      <Skeleton animation='wave' width={'10rem'} />
    </Box>
  )
}

const LoadingState = ({ state }: Props) => {
  return (
    <div>
      <Box>
        <Grid container spacing={3}>
          {
            Array(12).fill(1)?.map((_el, i) => (
              <Grid item sm={3} key={i}>
                <LoadStudents />
              </Grid>
            ))
          }
        </Grid>
      </Box>
    </div>
  )
}

export default LoadingState