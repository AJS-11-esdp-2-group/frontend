/* eslint-disable @typescript-eslint/no-misused-promises */
import FormElement from '../../Components/UI/Form/FormElement';
import { CustomError } from '../../interfaces/errors/CustomError';
import { useAddCategoryMutation } from '../../Store/services/categories';
import { useNavigate } from 'react-router';
import { Container, Button, Snackbar, Alert } from '@mui/material';
import { ChangeEvent, useEffect, useState } from 'react';

const AddCategory = () => {
	const [addCategory, { error, isError }] = useAddCategoryMutation();

	interface Props {
		category_name: string;
		category_description: string;
	}
	const initialFormState: Props = {
		category_name: '',
		category_description: '',
	};
	const [form, setForm] = useState<Props>(initialFormState);
	const [open, setOpen] = useState(false);

	const navigate = useNavigate();

	const handleClose = () => {
		setOpen(false);
	};

	useEffect(() => {
		setOpen(isError);
	}, [isError]);

	const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;

		setForm((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const submitFormHandler = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const data = await addCategory(form);
		if (!(data as unknown as { error: object }).error) {
			navigate('/items_categories');
			setForm(initialFormState);
		}
	};

	return (
		<form onSubmit={submitFormHandler}>
			<Container component="section" maxWidth="xs">
				<Snackbar
					anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
					open={open}
					autoHideDuration={3000}
					onClose={handleClose}
				>
					<Alert severity="error" onClose={handleClose}>
						{(error as CustomError)?.data?.message}
					</Alert>
				</Snackbar>
				<FormElement
					value={form.category_name}
					label="Название категории"
					name="category_name"
					onChange={inputChangeHandler}
				/>
				<FormElement
					value={form.category_description}
					label="Описание категории"
					name="category_description"
					onChange={inputChangeHandler}
				/>
				<Button
					fullWidth
					variant="contained"
					color="success"
					type="submit"
					className="submit"
					sx={{ marginBottom: 2, marginTop: 3 }}
				>
					Добавить категорию
				</Button>
			</Container>
		</form>
	);
};

export default AddCategory;
