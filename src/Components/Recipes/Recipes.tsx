import { IBouquets } from '../../interfaces/IBouquets';
import { apiUrl } from '../../common/constans';
import { IconButton, ImageListItem, ImageListItemBar } from '@mui/material';
import { Info } from '@mui/icons-material';
import { MouseEventHandler } from 'react';

interface Props extends IBouquets {
  onClick: MouseEventHandler<HTMLDivElement>;
}

const RecipesComponent = ({ onClick,id, bouquet_description, bouquet_name, author, image }: Props) => {

    let cardImage; 
    if (image) { 
      cardImage = `${apiUrl}/uploads/${image}`; 
    } 
   

  return (
        <ImageListItem key={id}>
          <img
            src={`${cardImage}?w=248&fit=crop&auto=format`}
            srcSet={`${cardImage}?w=248&fit=crop&auto=format&dpr=2 2x`}
            alt={bouquet_name}
            loading="lazy"
          />
          <ImageListItemBar
          key={id}
            title={bouquet_name}
            subtitle={bouquet_description}
            onClick={onClick}
            actionIcon={
              <IconButton key={id} sx={{ color: 'rgba(255, 255, 255, 0.54)' }} aria-label={`info about ${author}`}>
                <Info />
              </IconButton>
            }
          />
        </ImageListItem>
  );
};

export default RecipesComponent;
