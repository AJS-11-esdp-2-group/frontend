/* eslint-disable @typescript-eslint/no-misused-promises */
import FormElement from '../../Components/UI/Form/FormElement';
import { CustomError } from '../../interfaces/errors/CustomError';
import { useAddItemMutation } from '../../Store/services/items';
import { useGetAllcategoriesQuery } from '../../Store/services/categories';
import BasicSelect from '../../Components/UI/Form/SelectFormElement';
import { useAppSelector } from '../../Store/hooks';
import { useNavigate } from 'react-router';
import { Container, Button, Snackbar, Alert } from '@mui/material';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';

const AddItem = () => {
	const [addItem, { error, isError }] = useAddItemMutation();
	const { user } = useAppSelector((state) => state.auth);

	const { data: categories } = useGetAllcategoriesQuery();
	interface Props {
		item_name: string;
		item_description: string;
		id_category: string;
		id_subcategory: string;
		id_under_subcategory: string;
		id_user: number;
	}
	const initialFormState: Props = {
		item_name: '',
		item_description: '',
		id_category: '',
		id_subcategory: '',
		id_under_subcategory: '',
		id_user: user.id as number,
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

	const submitFormHandler = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const data = await addItem(form);
		if (!(data as unknown as { error: object }).error) {
			navigate('/items');
			setForm(initialFormState);
		}
	};
	const selectChangeHandler = (name: string, value: string) => {
		setForm((prevState) => ({
			...prevState,
			[name]: value,
		}));
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
					value={form.item_name}
					label="Товар"
					name="item_name"
					onChange={inputChangeHandler}
				/>
				<FormElement
					value={form.item_description}
					label="Описание"
					name="item_description"
					onChange={inputChangeHandler}
				/>
				<BasicSelect
					value={form.id_category}
					label="Категория"
					name="id_category"
					onChange={(value) => selectChangeHandler('id_category', value)}
					options={
						categories
							? categories.map((category) => ({
									id: category.id,
									name: category.category_name,
							  }))
							: []
					}
				/>
				<FormElement
					value={form.id_subcategory}
					label="Подкатегория"
					name="id_subcategory"
					onChange={inputChangeHandler}
				/>
				<FormElement
					value={form.id_under_subcategory}
					label="Подкатегория подкатегории"
					name="id_under_subcategory"
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
					Add
				</Button>
			</Container>
		</form>
	);
};
export default AddItem;
