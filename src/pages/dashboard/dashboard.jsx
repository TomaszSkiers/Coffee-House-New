import { useTheme } from '@emotion/react'
import { useMediaQuery } from '@mui/material'
import { DashboardMobileView } from './DashboardMobileView'
import { DashboardDesktopView } from './DashboardDesktopView'

export function Dashboard() {
  const theme = useTheme()
  const isxs = useMediaQuery(theme.breakpoints.down('sm'))

  if (isxs) return <DashboardMobileView />

  if (!isxs) return <DashboardDesktopView />
}
