import { useSelector } from 'react-redux'
import { selectUserObject } from '../../redux/userSlice'
import { Box, Button, Typography } from '@mui/material'
import  SettingsIcon  from '@mui/icons-material/Settings'
import { Link as RouterLink} from 'react-router-dom'
import {OrderSummary} from './OrderSummary'

export function MainOrder() {
  const { name, surname, email, phone, address } = useSelector(selectUserObject)
  

  const requiredFields = [name, surname, email, phone, address]

  if (requiredFields.every((field) => field && field !== 'no data' && field !== 'login')) {
    console.log('Mam wszystkie dane')
    return(<OrderSummary />)
  } else {
    console.log('Brakuje jakiejś danej')
    return (
        <Box 
            sx={{
                mt: '70px'
            }}
        >
            <Typography>I do not have all the information needed to create an order, go to settitngs and fill in the details.</Typography>
            <Button
                startIcon={<SettingsIcon />}
                component={RouterLink}
                to='/dash'
                sx={{
                    mt: 2
                }}
            >
                go to settings
            </Button>
        </Box>
    )
  }


}

/**
 * ok mam sprawdzenie to co dalej? , 
 * zacznę od przekierowania do ustawień jak nie mam jakiejś wartości
 * > potrzeba wygenerować informację że nie ma wszystkich potrzebnych informacji i 
 * > wyświetlić przycisk, który przekieruje na ustawienia
 */

