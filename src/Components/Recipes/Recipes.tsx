import { IBouquets } from '../../interfaces/IBouquets';
import { apiUrl } from '../../common/constans';
import { IconButton, ImageListItem, ImageListItemBar } from '@mui/material';
import { Info } from '@mui/icons-material';
import { MouseEventHandler } from 'react';

interface Props extends IBouquets {
	onClick: MouseEventHandler<HTMLDivElement>;
}

const RecipesComponent = ({
	onClick,
	id,
	bouquet_description,
	bouquet_name,
	author,
	image,
	sum
}: Props) => {
	return (
		<ImageListItem key={id}>
			<img
				src={`${image}?w=248&fit=crop&auto=format`}
				srcSet={`${image}?w=248&fit=crop&auto=format&dpr=2 2x`}
				alt={bouquet_name}
				loading="lazy"
			/>
			<ImageListItemBar
              sx={{
                background:
                  'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
                  'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
              }}
              title={parseInt(sum).toFixed().toString() === 'NaN' ? '0 т': `${parseInt(sum).toFixed()} т`}
              position="top"
            />
			<ImageListItemBar
				key={id}
				title={bouquet_name}
				subtitle={bouquet_description}
				onClick={onClick}
				actionIcon={
					<IconButton
						key={id}
						sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
						aria-label={`info about ${author}`}
					>
						<Info />
					</IconButton>
				}
			/>
		</ImageListItem>
	);
};

export default RecipesComponent;
