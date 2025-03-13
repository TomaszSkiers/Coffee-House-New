import ReactDOM from 'react-dom/client'
import { App } from './app'
import './css/styles.css'
import { ColorModeProvider } from './contexts/color-mode/color-mode-context'
import CssBaseline from '@mui/material/CssBaseline'
import { Provider } from 'react-redux'
import store from './redux/store'

ReactDOM.createRoot(document.getElementById('root')).render(
  <ColorModeProvider>
    <Provider store={store}>
      <CssBaseline />
      <App />
    </Provider>
  </ColorModeProvider>
)
