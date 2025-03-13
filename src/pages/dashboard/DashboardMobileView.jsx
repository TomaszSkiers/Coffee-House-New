import { Box, Typography, useTheme } from '@mui/material'
import { BottomIcons } from './BottomIcons'
import { DataFromDatabaseArea } from './DataFromDatabaseArea'
import { useState } from 'react'
import { Orders } from './Orders'

export function DashboardMobileView() {
  const theme = useTheme()
  const [view, setView] = useState('orders')

  return (
    <Box
      sx={{
        position: 'absolute',
        top: '65px',
        left: 0,
        width: '100%',
        // border: '1px solid yellow',
        height: 'calc(100vh - 75px)',
      }}
    >
      <Typography 
      variant='h6'
      sx={{ ml: 2, color: theme.palette.customGreen }}>
        {view === 'orders' ? 'Your orders' : 'User settings:'}
      </Typography>

      {/** all user fields from userStore */}
      {view === 'settings' ? (
        <DataFromDatabaseArea />
      ):(
        <Orders />
      )}

      {/** bottom menu with icons */}
      <BottomIcons setView={setView}/>
    </Box>
  )
}
