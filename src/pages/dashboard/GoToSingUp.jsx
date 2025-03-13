import { Box, Typography } from "@mui/material";
import { Link } from 'react-router-dom'
import { Link as RouterLink } from "react-router-dom";

export function GoToSingUp() {
  return (
    <Box sx={{display: 'flex', flexDirection: 'column'}}>
      <Typography>User not created</Typography>
      <Link component={RouterLink} to="/sign-up">
        Go to Sign-up
      </Link>
      <Link component={RouterLink} to='/login'>
        Go to Login
      </Link>
    </Box>
  )
}
