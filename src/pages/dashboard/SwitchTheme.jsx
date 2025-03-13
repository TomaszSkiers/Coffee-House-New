import { Box, Typography } from '@mui/material'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import IconButton from '@mui/material/IconButton'
import { useColorMode } from '../../contexts/color-mode/color-mode-context'

export function SwitchTheme() {
  const { mode, toggleColorMode } = useColorMode()
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}
    >
      <Typography 
        sx={{
          pl: 2,

        }}
      >Set theme</Typography>
      <IconButton
        sx={{ ml: 1, mr: 1 }}
        color="inherit"
        onClick={toggleColorMode}
      >
        {mode === 'dark' ? (
          <Brightness7Icon fontSize="large" />
        ) : (
          <Brightness4Icon fontSize="large" />
        )}
      </IconButton>
    </Box>
  )
}
