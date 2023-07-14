import { IBouquets } from '../../interfaces/IBouquets';
import { GlobalTheme } from '../..';
import { ImageListItem, ImageListItemBar, ThemeProvider } from '@mui/material';
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
		<ThemeProvider theme={GlobalTheme}>
			<ImageListItem key={id}>
				<img
					src={image}
					srcSet={image}
					alt={bouquet_name}
					loading="lazy"
				/>
				<ImageListItemBar
				title={parseInt(sum).toFixed().toString() === 'NaN' ? '0 т': `${parseInt(sum).toFixed()} т`}
				position="top"
				/>
				<ImageListItemBar
					key={id}
					title={bouquet_name}
					subtitle={bouquet_description}
					onClick={onClick}
				/>
			</ImageListItem>
		</ThemeProvider>
	);
};

export default RecipesComponent;
