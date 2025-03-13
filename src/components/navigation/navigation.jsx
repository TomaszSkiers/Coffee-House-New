import { useEffect, useState } from 'react'
import { Link as RouterLink, NavLink, useNavigate } from 'react-router-dom'
import { fetchCategories } from '../../api/products.js'
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Badge,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  useMediaQuery
} from '@mui/material'
import { styled } from '@mui/material/styles'
import CoffeeIcon from '@mui/icons-material/LocalCafe'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import MenuIcon from '@mui/icons-material/Menu'
import { useSelector } from 'react-redux'
import { selectUserName } from '../../redux/userSlice.js'
import { useTheme } from '@emotion/react'

const StyledNavLink = styled(NavLink)(({ theme }) => ({
  textDecoration: 'none',
  marginRight: theme.spacing(2),
  color: theme.palette.text.secondary,
  '&.active': {
    color: theme.palette.primary.main,
    fontWeight: 'bold',
  },
}))

//* Navigation
export const Navigation = () => {
  const navigate = useNavigate()
  const [categories, setCategories] = useState([])
  const [drawerOpen, setDrawerOpen] = useState(false) // sterowanie Drawerem
  const theme = useTheme()

  // Zmieniamy breakpoint — np. 'sm' oznacza do 600px (material default)
  // Na mniejszych ekranach (true), będziemy używać Drawer
  const isxs = useMediaQuery(theme.breakpoints.down('sm'))

  const userName = useSelector(selectUserName)
  const itemsCount = useSelector((state) =>
    state.cart.items.reduce((total, item) => total + item.quantity, 0)
  )

  const fetchData = async () => {
    const data = await fetchCategories()
    setCategories(data)
  }

  useEffect(() => {
    fetchData()
  }, [])

  // Funkcja otwierania/zamykania Drawera
  const toggleDrawer = (open) => (event) => {
    // Zabezpieczenie przed przypadkowym zamknięciem Drawera przy Tab/Shift
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return
    }
    setDrawerOpen(open)
  }

  // Zawartość Drawera z kategoriami (na małych ekranach)
  const drawerList = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <Typography variant="h6" sx={{ p: 2 }}>
        Categories
      </Typography>
      <Divider />
      <List>
        {categories.map(({ id, name }) => (
          <ListItem
            button
            key={id}
            component={RouterLink}
            to={`/category/${id}`}
          >
            <ListItemText primary={name} />
          </ListItem>
        ))}
      </List>
    </Box>
  )

  return (
    <>
      <AppBar
        position="fixed"
        color="default"
        elevation={1}
        sx={{
          width: '100%',
          maxWidth: '1000px',
          left: '50%',
          transform: 'translateX(-50%)',
          margin: 'auto',
        }}
      >
        <Toolbar>
          {/* Na małych ekranach wyświetlamy przycisk hamburgera */}
          {isxs && (
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 1 }}
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
          )}

          {/* LOGO sklepu / Nazwa 
              - Na małych ekranach wyświetlamy samą ikonę kawy, 
                na większych — pełną nazwę z ikoną */}
          {isxs ? (
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              component={RouterLink}
              to="/"
              sx={{ mr: 2 }}
            >
              <CoffeeIcon />
            </IconButton>
          ) : (
            <Typography variant="h6" component="div" sx={{ mr: 2 }}>
              <RouterLink
                to="/"
                style={{
                  textDecoration: 'none',
                  color: 'inherit',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                Coffee House
                <CoffeeIcon sx={{ ml: 1 }} />
              </RouterLink>
            </Typography>
          )}

          {/* Kategorie — widoczne tylko na większych ekranach */}
          {!isxs && (
            <Box>
              {categories.map(({ id, name }) => (
                <StyledNavLink key={id} to={`/category/${id}`}>
                  {name}
                </StyledNavLink>
              ))}
            </Box>
          )}

          {/* Prawa część: login i koszyk, przesunięte za pomocą ml:'auto' */}
          <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center' }}>
            <Button
              color="inherit"
              component={RouterLink}
              to="/login"
              sx={{ textTransform: 'none' }}
            >
              {userName ? userName : 'login'}
            </Button>
            <IconButton
              color="inherit"
              onClick={() => {
                navigate('/cart')
              }}
            >
              <Badge badgeContent={itemsCount} color="secondary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Drawer dla małych ekranów */}
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        {drawerList}
      </Drawer>
    </>
  )
}
