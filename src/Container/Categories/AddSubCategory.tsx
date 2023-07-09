/* eslint-disable @typescript-eslint/no-misused-promises */
import FormElement from '../../Components/UI/Form/FormElement';
import { CustomError } from '../../interfaces/errors/CustomError';
import { useAddSubCategoryMutation } from '../../Store/services/categories';
import { useNavigate } from 'react-router';
import { Container, Button, Snackbar, Alert } from '@mui/material';
import { ChangeEvent, MouseEventHandler, useEffect, useState } from 'react';

interface Props {
    id_category: number;
    onSend: MouseEventHandler;
  }
const AddSubCategory = ({ id_category, 
    onSend
}: Props) => {
	const [addSubCategory, { error, isError }] = useAddSubCategoryMutation();

	interface Props {
		subcategory_name: string;
		subcategory_description: string;
        id_category:number;
	}
	const initialFormState: Props = {
		subcategory_name: '',
		subcategory_description: '',
        id_category:id_category,
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
		const data = await addSubCategory(form);
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
                ID категорий:  {id_category}
				<FormElement
					value={form.subcategory_name}
					label="Название подкатегории"
					name="subcategory_name"
					onChange={inputChangeHandler}
				/>
				<FormElement
					value={form.subcategory_description}
					label="Описание подкатегории"
					name="subcategory_description"
					onChange={inputChangeHandler}
				/>
				<Button
					fullWidth
					variant="contained"
					color="success"
					type="submit"
					className="submit"
                    onClick={onSend}
                    disabled={form.subcategory_description.length&& form.subcategory_name.length>0?false:true}
					sx={{ marginBottom: 2, marginTop: 3 }}
				>
					Добавить подкатегорию
				</Button>
			</Container>
		</form>
	);
};

export default AddSubCategory;
