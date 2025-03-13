import {
    Box,
    Card,
    CardContent,
    IconButton,
    TextField,
    Typography,
  } from '@mui/material'
  import { useSelector } from 'react-redux'
  import { selectUserObject } from '../../redux/userSlice'
  import { useState } from 'react'
  import { Edit as EditIcon, Save as SaveIcon } from '@mui/icons-material'
  import { useForm } from 'react-hook-form'
  import { GoToSingUp } from './GoToSingUp'
  
  //todo sprawdzenie czy użytkownik jest utworzony w bazie danych
  export function DataFromDatabaseArea() {
    // eslint-disable-next-line no-unused-vars
    const { accessToken, ...userObject } = useSelector(selectUserObject)
  
    const [editingField, setEditingField] = useState(null)
  
    const { register, handleSubmit, setValue, getValues } = useForm({
      defaultValues: userObject,
    })
  
    const onSubmit = (data) => {
      //* debugger
      console.log('Updated Data:', data)
      setEditingField(null)
      // tutaj zapis do storea i do localStorage
    }
  
    if (userObject.name === 'login') return <GoToSingUp />
  
    return (
      <Card sx={{ maxWidth: 400, p: 2 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            User Information
          </Typography>
          {Object.keys(userObject).map((field) => (
            <div
              key={field}
              style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}
            >
              {editingField === field ? (
                <TextField
                  label={field}
                  disabled
                  {...register(field)}
                  sx={{ height: '30px' }}
                  fullWidth
                  variant="outlined"
                />
              ) : (
                <Box sx={{ width: '100%' }}>
                  <Typography variant="body1">{field}:</Typography>
                  <Typography variant="body2" style={{ flexGrow: 1 }}>
                    {getValues(field)}
                  </Typography>
                </Box>
              )}
              <IconButton
                onClick={() =>
                  editingField === field
                    ? handleSubmit(onSubmit)()
                    : setEditingField(field)
                }
                size="small"
              >
                {editingField === field ? <SaveIcon /> : <EditIcon />}
              </IconButton>
            </div>
          ))}
        </CardContent>
      </Card>
    )
  }
  
  //* Component display all user data from localStorage
  // jak zorganizować sobie wyświetlanie 
  
  // na początek za pomocą Object.keys(userObject).map() 
  // wyświetlę sobie wszystkie potrzebne inputy w formie nie aktywnej 
  // obok inputa dodam przycisk, który będzie aktywował inputa
  // do inputów poprzypinam ...register z useForm