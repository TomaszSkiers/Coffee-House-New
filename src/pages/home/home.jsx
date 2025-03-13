import { useEffect, useState } from 'react'
import { Hero } from '../../components/hero'
import { ProductCard } from '../../components/product-card'
import { Box, CircularProgress, Grid, Typography } from '@mui/material'
import { fetchCategories } from '../../api/products'

export const Home = () => {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchCategories({
        embedProducts: true,
        limitProducts: 4,
      })
      setCategories(data)
    }

    fetchData()
  }, [])

  return (
    <Box sx={{maxWidth: '1000px', margin: 'auto', mt: '70px'}}>
      <Hero />
      {!categories.length ? (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </Box>
      ) : (
        categories.map((category) => (
          <Box key={category.id} sx={{ mt: 5 }}>
            <Typography variant="h5">{category.name}</Typography>
            <Grid container spacing={2} marginTop={1}>
              {category.products.map((product) => (
                <Grid item key={product.id} xs={12} sm={6} lg={3}>
                  <ProductCard {...product} />
                </Grid>
              ))}
            </Grid>
          </Box>
        ))
      )}
    </Box>
  )
}
