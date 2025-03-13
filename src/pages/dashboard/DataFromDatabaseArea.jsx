import { Box } from '@mui/material'
import { useSelector } from 'react-redux'
import { selectUserObject } from '../../redux/userSlice'
import { Row } from './Row'
import { SwitchTheme } from './SwitchTheme'

export function DataFromDatabaseArea() {
  // eslint-disable-next-line no-unused-vars
  const { accessToken, ...user } = useSelector(selectUserObject)

  return (
    <Box
      sx={{
        // border: '1px solid red',
        height: 'calc(100vh - 155px)',
        maxHeight: 'calc(100vh - 155px)',
        overflow: 'auto',
      }}
    >
      {Object.keys(user).map((key) => {
        if (key === 'theme') return <SwitchTheme key={key} />
        return <Row key={key} user={user} rowKey={key} />
      })}
    </Box>
  )
}
