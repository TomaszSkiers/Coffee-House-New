import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Box,
} from '@mui/material'
import { Link } from 'react-router-dom'
import { FavouriteButton } from '../favourite-button'
import React from 'react'
import { useDispatch } from 'react-redux'
import { addItem } from '../../redux/cartSlice'

//* ProductCardComponent

const ProductCardComponent = ({ id, image, title, description, price }) => {
  const dispatch = useDispatch()

  const handleAdd = () => {
    const product = {
      id: id,
      title: title,
      price: price,
      image: image,
    }
    dispatch(addItem({...product, quantity: 1}))
  }

  return (
    <Card sx={{ position: 'relative' }}>
      <CardActionArea component={Link} to={`/product/${id}`}>
        <CardMedia component="img" image={`/products/${image}`} alt={title} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <Box sx={{ flexGrow: 1 }} />
      <CardActions
        disableSpacing
        sx={{ justifyContent: 'space-between', p: 2 }}
      >
        <Typography variant="subtitle1">${Number(price).toFixed(2)}</Typography>
        <Box>
          <FavouriteButton />{' '}
          <Button 
            size="small"
             variant="outlined"
            onClick={handleAdd}
          >
            Add to cart
          </Button>
        </Box>
      </CardActions>
    </Card>
  )
}
ProductCardComponent.displayName = 'ProductCard'
export const ProductCard = React.memo(ProductCardComponent)
