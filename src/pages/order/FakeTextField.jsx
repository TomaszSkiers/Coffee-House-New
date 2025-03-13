import { Box, Typography, useTheme } from '@mui/material'

export function FakeTextField({ label, value, sx }) {
  const theme = useTheme() // Pobieramy kolory motywu

  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        ...sx,
      }}
    >
      {/* Label */}
      {label && (
        <Typography
          sx={{
            position: 'absolute',
            top: '0',
            left: '12px',
            transform: 'translateY(-50%)',
            backgroundColor: theme.palette.background.paper, // Tło dla etykiety
            paddingX: '4px', // Zapewnia odstęp po bokach
            fontSize: '12px',
            color: theme.palette.text.secondary,
          }}
        >
          {label}
        </Typography>
      )}

      {/* Pole tekstowe */}
      <Box
        sx={{
          width: '100%',
          padding: '10px 14px', // Dopasowanie paddingu
          border: `1px solid ${theme.palette.text.secondary}`,
          borderRadius: '4px',
          backgroundColor: theme.palette.background.paper,
          display: 'flex',
          alignItems: 'center',
          minHeight: '40px',
        }}
      >
        <Typography variant="body1">
          {value}
        </Typography>
      </Box>
    </Box>
  )
}

