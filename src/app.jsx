import {
  BrowserRouter,
  Outlet,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom'
import { Container } from '@mui/material'
import { Home } from './pages/home'
import { Category } from './pages/category'
import { Product } from './pages/product'
import { Navigation } from './components/navigation'
import { Footer } from './components/footer'
import { Login } from './pages/login'
import { SignUp } from './pages/sign-up'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { LoginConfirmation } from './pages/login-confirmation'
import { Dashboard } from './pages/dashboard/dashboard'
import Cart from './pages/cart/cart'
import { MainOrder } from './pages/order/MainOrder'

const AppStructure = () => {
  const location = useLocation()
  const hiddenFooterRoutes = ['/cart','/dash', '/order']

  return (
    <>
      <Navigation />
      <Container sx={{ flexGrow: '1'}}>
        <Outlet />
      </Container>
      {!hiddenFooterRoutes.includes(location.pathname) && <Footer />}
    </>
  )
}

export const App = () => {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<AppStructure />}>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/category/:id" element={<Category />} />
            <Route path="/login" element={<Login />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/confirmation" element={<LoginConfirmation />} />
            <Route path="/dash" element={<Dashboard />} />
            <Route path="/cart" element={<Cart />} />
            <Route path='/order' element={<MainOrder />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}
