import { Button, Typography, Box, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getAuthToken } from '../../api/user';

export const LoginConfirmation = () => {
  const navigate = useNavigate();
  
  const accessToken = getAuthToken()


  return (
    <Container component="main" maxWidth="xs" sx={{ height: '100%' }}>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          {accessToken
            ? 'Login completed successfully'
            : 'Login failed'}
        </Typography>

        {accessToken.length > 0 ? (
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate('/dash')}
              sx={{ mt: 3 }}
            >
              Go to Dashboard
            </Button>
            <Button
              variant="contained"
              color="primary"
              sx={{ mt: 3 }}
              onClick={() => navigate('/')}
            >
              Go to home page
            </Button>
          </Box>
        ) : (
          <Box>
            <Button onClick={()=>navigate('/login')}>Try again</Button>
          </Box>
        )}
      </Box>
    </Container>
  );
};
