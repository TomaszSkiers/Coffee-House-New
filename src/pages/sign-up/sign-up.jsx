import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import Checkbox from '@mui/material/Checkbox'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { Link as RouterLink } from 'react-router-dom'

import { z } from 'zod'
import { CommonTextField } from '../../components/common-inputs/CommonTextField'
import { FormContextProvider } from '../../contexts/signIn-login-context/FormContextProvider'
import { Controller } from 'react-hook-form'
import { FormControl, FormControlLabel, FormHelperText } from '@mui/material'
import { registerUser } from '../../api/user'

// Zod schema
const schema = z
  .object({
    firstName: z.string().min(1, 'The field is required'),
    lastName: z.string().min(1, 'The field is required'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(8, 'Password must contain at least 8 characters'),
    confirmPassword: z
      .string()
      .min(8, 'Password must contain at least 8 characters'),
    acceptTermsCheckbox: z.boolean().refine((value) => value === true, {
      message: 'You must accept the terms and conditions',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords must match',
    path: ['confirmPassword'],
  })

// SignUp Component
export const SignUp = () => {

  const onSubmit = async (data) => {
    console.log('dane z formularza' , data)
    registerUser(data)

  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <FormContextProvider
          onSubmit={onSubmit}
          schema={schema}
          component="form"
          sx={{ mt: 3 }}
          noValidate
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <CommonTextField name="firstName" label="First Name" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CommonTextField name="lastName" label="Last Name" />
            </Grid>
            <Grid item xs={12}>
              <CommonTextField name="email" label="Email Address" fullWidth />
            </Grid>
            <Grid item xs={12}>
              <CommonTextField
                name="password"
                label="Password"
                type="password"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <CommonTextField
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="acceptTermsCheckbox"
                defaultValue={false}
                render={({ field, fieldState: { error } }) => (
                  <FormControl error={!!error} component="fieldset">
                    <FormControlLabel
                      control={<Checkbox {...field} checked={field.value} />}
                      label="I accept the terms and conditions"
                    />
                    <FormHelperText>{error?.message}</FormHelperText>
                  </FormControl>
                )}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to="/login" variant="body2" component={RouterLink}>
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </FormContextProvider>
      </Box>
    </Container>
  )
}
