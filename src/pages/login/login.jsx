import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { Grid, Link, TextField } from '@mui/material'
import { Link as RouterLink, useNavigate } from 'react-router-dom'

import { z } from 'zod'
import { getAuthToken, login, logOut } from '../../api/user.js'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { useDispatch } from 'react-redux'
import { setUser } from '../../redux/userSlice.js'
import { useTheme } from '@emotion/react'

const schema = z.object({
  email: z.string().email('invalid email'),
  password: z.string().min(6, 'password must hava at least 6 characters'),
  rememberMe: z.boolean().optional(),
})
// Login start
export const Login = () => {
  const dispatch = useDispatch()
  const theme = useTheme()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  })
  const accessToken = getAuthToken()
  const navigate = useNavigate()

  const handleLogOut = () => {
    logOut()
    dispatch(
      setUser({
        name: 'login',
        accessToken: null,
      })
    )
    navigate('/')
  }

  const onSubmit = async (data) => {
    console.log('dane z formularza', data)
    try {
      const userData = await login(data)
      //te dane mogę nie wiem może wyświetlić w dashboard
      // console.log(userData.user.firstName)

      dispatch(
        setUser({
          name: userData.user.firstName,
          accessToken: userData.accessToken,
        })
      )

      navigate('/confirmation')
    } catch (err) {
      console.log('niepoprawne dane logowania')
    }
  }

  if (accessToken) {
    return (
      <Box sx={{ display: 'flex',flexDirection: 'column', justifyContent: 'center', mt: 25, p: 10, backgroundColor: theme.palette.background.paper }}>
        <Button sx={{p: 3}} onClick={handleLogOut}>Log out</Button>
        <Button sx={{p: 3}} onClick={()=> navigate('/dash')}>Dashboard</Button>
      </Box>
    )
  }

  return (
    <Container component="form" onSubmit={handleSubmit(onSubmit)} maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          {...register('email')}
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <TextField
          label="Password"
          variant="outlined"
          fullWidth
          {...register('password')}
          error={!!errors.password}
          helperText={errors.password?.message}
        />
        <FormControlLabel
          label="Remember me"
          control={<Checkbox {...register('rememberMe')} />}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Login
        </Button>
        <Grid container>
          <Grid item>
            <Link to="/sign-up" variant="body2" component={RouterLink}>
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}
