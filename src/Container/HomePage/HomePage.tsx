import { useAppSelector } from '../../Store/hooks';
import { getUser } from '../../Store/user/userSelectors';
import { Container, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const HomePage = () => {
	const user = useAppSelector(getUser);
	return (
		<Container
			sx={{
				flexGrow: 1,
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				gap: '50px',
			}}
		>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'row',
					justifyContent: 'center',
					alignItems: 'center',
					padding: '0px',
					gap: '20px',
				}}
			>
				<Typography variant="h6" color="primary">
					Flowers Shop CRM
				</Typography>
			</Box>
			{user.isAuthenticated ? (
				<Container
					sx={{
						flexGrow: 1,
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
						alignItems: 'center',
						padding: '100px',
						gap: '20px',
					}}
				>
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'center',
							alignItems: 'center',
							padding: '0px',
							gap: '10px',
						}}
					>
						<Button sx={{ width: '100%' }} variant="contained" color="primary">
							<Typography variant="body1" component={Link} to="/new-supply">
								Создать Приход
							</Typography>
						</Button>
						<Button sx={{ width: '100%' }} variant="contained" color="success">
							<Typography variant="body1" component={Link} to="/invoices">
								Приходы
							</Typography>
						</Button>
					</Box>
				</Container>
			) : null}
		</Container>
	);
};

export default HomePage;
