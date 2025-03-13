import { Box, Container, Typography, IconButton } from '@mui/material'
import TwitterIcon from '@mui/icons-material/Twitter'
import FacebookIcon from '@mui/icons-material/Facebook'
import InstagramIcon from '@mui/icons-material/Instagram'

export const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{ my: 4, borderTop: 1, borderColor: 'divider' }}
    >
      <Container
        maxWidth="lg"
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          py: 3,
        }}
      >
        <Box sx={{ flex: 1 }}>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mb: { xs: 3, md: 0 } }}
          >
            © {new Date().getFullYear()} Coffee House, Inc
          </Typography>
        </Box>
        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'end' }}>
          <IconButton href="#" color="inherit" aria-label="Twitter">
            <TwitterIcon />
          </IconButton>
          <IconButton href="#" color="inherit" aria-label="Facebook">
            <FacebookIcon />
          </IconButton>
          <IconButton href="#" color="inherit" aria-label="Instagram">
            <InstagramIcon />
          </IconButton>
        </Box>
      </Container>
    </Box>
  )
}