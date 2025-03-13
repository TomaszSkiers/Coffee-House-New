import { useTheme } from "@emotion/react";
import { Typography } from "@mui/material";





export function UniversalLabel({value}){
    const theme = useTheme()

    return(
        <Typography
        sx={{
          position: 'absolute',
          top: 0,
          left: '12px',
          transform: 'translateY(-50%)',
          backgroundColor: theme.palette.background.paper,
          px: '4px',
          border: `1px solid ${theme.palette.text.secondary}`,
          borderRadius: 1,
        }}
      >
        {value}
      </Typography>
    )
}