import { useLogoutMutation } from '../../../../Store/services/auth';
import * as React from 'react';
import {
	Box,
	Drawer,
	Button,
	List,
	Divider,
	ListItem,
	ListItemButton,
	ListItemIcon,
	Typography,
} from '@mui/material';
import BlindsClosedOutlinedIcon from '@mui/icons-material/BlindsClosedOutlined';
import { Link } from 'react-router-dom';
import {
	LocalFlorist,
	LocalShipping,
	Logout,
	CategoryRounded,
	EmojiNatureTwoTone,
} from '@mui/icons-material';
import { useState } from 'react';

const Navigation = () => {
	const [leftState, setLeftState] = useState({
		left: false,
	});

	const [logout] = useLogoutMutation();

	const logoutHandler = async () => {
		await logout();
	};

	const toggleDrawer =
		(open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
			if (
				event &&
				event.type === 'keydown' &&
				((event as React.KeyboardEvent).key === 'Tab' ||
					(event as React.KeyboardEvent).key === 'Shift')
			) {
				return;
			}

			setLeftState({ ...leftState, left: open });
		};

	const left = (left1: string) => (
		<Box
			sx={{ width: 250, color: 'white' }}
			role="presentation"
			onClick={toggleDrawer(false)}
			onKeyDown={toggleDrawer(false)}
		>
			<List>
				<ListItem>
					<ListItemButton component={Link} to="/items">
						<ListItemIcon>
							<LocalFlorist />
						</ListItemIcon>
						<Typography>Каталог товаров</Typography>
					</ListItemButton>
				</ListItem>
				<ListItem>
					<ListItemButton component={Link} to="/suppliers">
						<ListItemIcon>
							<LocalShipping />
						</ListItemIcon>
						<Typography>Поставщики</Typography>
					</ListItemButton>
				</ListItem>
				<ListItem>
					<ListItemButton>
						<ListItemIcon>
							<BlindsClosedOutlinedIcon />
						</ListItemIcon>
						<Typography component={Link} to="/supply">
							Приходы
						</Typography>
					</ListItemButton>
				</ListItem>
				<ListItem>
					<ListItemButton component={Link} to="/items_categories">
						<ListItemIcon>
							<CategoryRounded />
						</ListItemIcon>
						<Typography>Категории товаров</Typography>
					</ListItemButton>
				</ListItem>
				<ListItemButton component={Link} to="/recipes">
					<ListItemIcon>
						<EmojiNatureTwoTone />
					</ListItemIcon>
					<Typography>Рецепты</Typography>
				</ListItemButton>
			</List>
			<Divider />
			<List>
				<ListItem>
					<ListItemButton>
						<ListItemIcon>
							<Logout />
						</ListItemIcon>
						<Typography onClick={logoutHandler} component={Link} to={'/'}>
							Выйти
						</Typography>
					</ListItemButton>
				</ListItem>
			</List>
		</Box>
	);

	return (
		<div>
			<Button sx={{ color: 'secondary' }} onClick={toggleDrawer(true)}>
				Menu
			</Button>
			<Drawer anchor="left" open={leftState.left} onClose={toggleDrawer(false)}>
				{left('left')}
			</Drawer>
		</div>
	);
};

export default Navigation;
