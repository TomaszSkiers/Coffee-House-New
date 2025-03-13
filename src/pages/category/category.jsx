import { Fragment, useEffect, useRef, useState } from 'react';
import { ProductCard } from '../../components/product-card';
import { Box, CircularProgress, Grid } from '@mui/material';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useIntersection } from '@mantine/hooks';
import { useTheme, useMediaQuery } from '@mui/material';

const fetchProducts = async ({ pageParam }) => {
  console.log(pageParam);
  const response = await axios.get(
    `http://localhost:4001/products/?categoryId=${pageParam.id}&_page=${pageParam.page}&_limit=${pageParam.limit}`
  );

  return response.data;
};

export const Category = () => {
  const paramId = useParams();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('sm')); // Sprawdza, czy ekran jest większy lub równy 'md'
  console.log(isDesktop);
  const containerRef = useRef(null);
  const { ref, entry } = useIntersection({
    root: null,
    threshold: 0.5,
  });

  const [isRendered, setIsRendered] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsRendered(true);
    }, 2000); // 2 sekundy opóźnienia

    return () => clearTimeout(timer); // Czyszczenie timera
  }, []);

  const { data, isLoading, fetchNextPage } = useInfiniteQuery({
    queryKey: ['products', paramId.id, isDesktop],
    queryFn: ({ pageParam = 1 }) =>
      fetchProducts({
        pageParam: {
          page: pageParam,
          id: paramId.id,
          limit: isDesktop ? 4 : 1,
        },
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, _, lastPageParam) => {
      if (lastPage.length === 0) {
        return undefined;
      }
      return lastPageParam + 1;
    },
  });

  useEffect(() => {
    if (entry && entry.isIntersecting) {
      fetchNextPage();
    }
  }, [entry, fetchNextPage]);

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <Box ref={containerRef} sx={{ mt: 5 }}>
        <Grid container spacing={2} marginTop={1}>
          {data?.pages?.map((group, i) => (
            <Fragment key={i}>
              {group.map((product) => (
                <Grid item key={product.id} xs={12} sm={6} lg={3}>
                  <ProductCard {...product} />
                </Grid>
              ))}
            </Fragment>
          ))}
        </Grid>
      </Box>
      {isRendered && <div ref={ref} style={{ border: '2px solid red' }} />}
    </>
  );
};
