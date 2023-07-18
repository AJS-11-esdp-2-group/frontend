import { LoginForm } from '../../interfaces/loginForm';
import { useSignInMutation } from '../../Store/services/auth';
import FormElement from '../../Components/UI/Form/FormElement';
import { CustomError } from '../../interfaces/errors/CustomError';
import { useAppSelector } from '../../Store/hooks';
import { getUser } from '../../Store/user/userSelectors';
import { ChangeEvent, FormEvent, forwardRef, useEffect, useState } from 'react';
import {
	Container,
	Avatar,
	Typography,
	Grid,
	Link,
	Box,
	Snackbar,
} from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { LockOpen } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
	props,
	ref,
) {
	return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Login = () => {
	const [form, setForm] = useState<LoginForm>({
		username: '',
		password: '',
	});
	const user = useAppSelector(getUser);
	const [signIn, { isError, error }] = useSignInMutation();
	const [open, setOpen] = useState(false);

	const navigate = useNavigate();

	useEffect(() => {
		setOpen(isError);
	}, [isError]);

	const handleClose = () => {
		setOpen(false);
	};

	const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;

		setForm((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const submitFormHandler = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const data = await signIn(form);
		if (!(data as { error: object }).error) {
			setForm({
				username: '',
				password: '',
			});
			navigate('/');
		}
	};
	return (
		<Container component="section" maxWidth="xs">
			<Snackbar
				anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
				open={open}
				autoHideDuration={3000}
				onClose={handleClose}
			>
				<Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
					{(error as CustomError)?.data?.message}
				</Alert>
			</Snackbar>
			<Box>
				<Avatar sx={{ marginTop: 3, marginBottom: 2, marginLeft: 22 }}>
					<LockOpen />
				</Avatar>
				<Typography
					component="h1"
					variant="h5"
					sx={{ marginTop: 3, marginBottom: 2, marginLeft: 20 }}
				>
					Войти
				</Typography>
				<Box>
					<form onSubmit={submitFormHandler}>
						<Grid container spacing={2}>
							<FormElement
								required
								value={form.username}
								onChange={inputChangeHandler}
								name="username"
								label="Имя пользователя"
							/>
							<FormElement
								required
								value={form.password}
								onChange={inputChangeHandler}
								type="password"
								name="password"
								label="Пароль"
							/>
						</Grid>
						<LoadingButton
							type="submit"
							fullWidth
							variant="contained"
							color="primary"
							loading={user.isLoading}
						>
							Войти
						</LoadingButton>
						<Grid container>
							<Grid item sx={{ marginLeft: 6 }}>
								<Link component={RouterLink} to="/register">
									У вас нет аккаунта? Зарегистрироваться
								</Link>
							</Grid>
						</Grid>
					</form>
				</Box>
			</Box>
		</Container>
	);
};

export default Login;
