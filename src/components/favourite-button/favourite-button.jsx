
import StarIcon from '@mui/icons-material/Star'
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { IconButton, styled } from '@mui/material';
import { useState, useCallback } from 'react';

const FavoriteIconButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  margin: theme.spacing(0.5),
  top: 5,
  right: 5,
  color: '#fff',
  backdropFilter: 'blur(20px)',
}));

export const FavouriteButton = () => {
  const [isFavourite, setIsFavourite] = useState(true)

  const handleFavourite = useCallback(() => {
    setIsFavourite(prv => !prv)
  },[])

  return (
    <FavoriteIconButton size="medium" onClick={handleFavourite}>
     {isFavourite ? <StarBorderIcon /> : <StarIcon />}
    </FavoriteIconButton>
  );
};
