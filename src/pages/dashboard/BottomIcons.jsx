import { Box, IconButton, Typography } from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import SettingsIcon from '@mui/icons-material/Settings'
import { useTheme } from '@emotion/react'
import { logOut } from '../../api/user'
import { useDispatch } from 'react-redux'
import { setUser } from '../../redux/userSlice'

export function BottomIcons({setView}) {
  const theme = useTheme()
  const dispatch = useDispatch()

  const handleLogOut = () => {
    logOut()
    dispatch(setUser({ name: 'login', accessToken: null }))
  }

  return (
    <Box
      sx={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        height: 65,
        pt: 1,
        justifyContent: 'space-around',
        borderTop: '1px solid lightgray',

        backgroundColor: theme.palette.background.default,
      }}
    >
      <IconButton
        onClick={handleLogOut}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: 80,
          height: 80,
          
        }}
      >
        <LogoutIcon fontSize="large" />
        <Typography variant="body2">Log out</Typography>
      </IconButton>

      <IconButton 
      sx={{
          display: 'flex',
          flexDirection: 'column',
          width: 80,
          height: 80,
          
        }}
        onClick={()=> setView('orders')}
        >
        <ShoppingCartIcon fontSize="large" />
        <Typography variant="body2">Orders</Typography>
      </IconButton>

      <IconButton
        color="primary"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: 80,
          height: 80,
          
        }}
        onClick={()=>setView('settings')}
      >
        <SettingsIcon fontSize="large" />
        <Typography variant="body2">Settings</Typography>
      </IconButton>
    </Box>
  )
}
