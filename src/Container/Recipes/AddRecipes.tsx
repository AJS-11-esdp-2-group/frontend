import { useGetBouquetByIdQuery } from '../../Store/services/bouquets';
import { useCreateImageMutation } from '../../Store/services/bouquetsImages';
import FileUpload from '../../Components/UI/Form/FileUpload';
import { useGetAllItemsQuery } from '../../Store/services/items';
import { Items } from '../../interfaces/Items';
import FormElement from '../../Components/UI/Form/FormElement';
import AddButton from '../../Components/UI/Button/AddButton';
import { useCreateRecipeMutation } from '../../Store/services/recipes';
import { GlobalTheme } from '../..';
import {
	Autocomplete,
	Box,
	Button,
	Container,
	Grid,
	TextField,
	Typography,
	ThemeProvider,
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';

interface Props {
	item_name: string;
	id_item: string;
	qty: string;
	id_bouquet: number;
	image_large: string;
}

const AddRecipes = () => {
	const { id } = useParams();
	const { data: bouquet } = useGetBouquetByIdQuery(id as unknown as number);
	const { data: items } = useGetAllItemsQuery();
	const [createImage] = useCreateImageMutation();
	const [createRecipe] = useCreateRecipeMutation();
	const [bouquetName, setBouquetName] = useState({
		bouquet_name: '',
	});
	const [form, setForm] = useState<Props>({
		item_name: '',
		id_item: '',
		qty: '',
		id_bouquet: id as unknown as number,
		image_large: '',
	});
	const [newImage, setNewImage] = useState({
		image: '',
		id_bouquet: id,
	});
	const [itemsList, setItemsList] = useState<
		{ id_item: string; qty: string }[]
	>([]);

	const navigate = useNavigate();

	useEffect(() => {
		if (bouquet) {
			setBouquetName({
				bouquet_name: bouquet[0].bouquet_name,
			});
		}
	}, [bouquet]);

	const fileChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			const file = e.target.files[0];
			setNewImage((prevState) => ({
				...prevState,
				image: file as unknown as string,
				id_bouquet: id,
			}));
		}
	};

	const autocompleteChangeHandler = (
		event: ChangeEvent<{}>,
		value: Items | string | null,
	) => {
		if (value !== null) {
			let itemId: string;
			let itemName: string;

			if (typeof value === 'string') {
				itemId = '';
				itemName = value;
			} else {
				const selectedItem = items?.find(
					(item) => item.item_name === value.item_name,
				);
				itemId = selectedItem ? selectedItem.id.toString() : '';
				itemName = value.item_name;
			}

			setForm((prevState) => ({
				...prevState,
				id_item: itemId,
				item_name: itemName,
			}));
		}
	};

	const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;

		setForm((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const addButtonClickHandler = async () => {
		if (form.id_item && form.qty) {
			setItemsList((prevState) => [
				...prevState,
				{ id_item: form.id_item, qty: form.qty },
			]);

			await createRecipe({
				id_bouquet: id as unknown as number,
				id_item: form.id_item,
				qty: form.qty,
				item_name: form.item_name,
			});

			setForm((prevState) => ({ ...prevState, id_item: '', qty: '' }));
		}
	};

	const submitFormHandler = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData();

		if (newImage.image) {
			formData.append('image', newImage.image);
		}
		formData.append('id_bouquet', newImage.id_bouquet as string);

		if (!newImage.image) {
			return;
		} else {
			await createImage(formData);
			navigate('/recipes');
		}
	};

	return (
		<ThemeProvider theme={GlobalTheme}>
			<Container
				style={{
					display: 'flex',
					justifyContent: 'center',
					flexDirection: 'column',
				}}
			>
				<Box>
					<Typography variant="h4">{bouquetName.bouquet_name}</Typography>
				</Box>
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<Autocomplete
							disablePortal
							options={items ? items : []}
							getOptionLabel={(option) => option.item_name}
							onChange={autocompleteChangeHandler}
							value={items?.find((item) => item.id.toString() === form.id_item)}
							renderInput={(params) => (
								<TextField name="id_item" {...params} label="Товар" />
							)}
							noOptionsText="Вариантов нет"
						/>
						<FormElement
							type="number"
							value={form.qty}
							label="Количество"
							name="qty"
							onChange={inputChangeHandler}
						/>
						<AddButton
							onClick={addButtonClickHandler}
							buttonText="Добавить Товар"
						/>
					</Grid>
				</Grid>
				<form onSubmit={submitFormHandler}>
					<FileUpload
						onChange={fileChangeHandler}
						label="Фото букета"
						name="newImage"
					/>
					{itemsList.map((item, index) => {
						const selectedItem = items?.find(
							(i) => i.id.toString() === item.id_item,
						);
						const itemName = selectedItem ? selectedItem.item_name : '';
						return (
							<div key={index}>
								<Typography>Товар: {itemName}</Typography>
								<Typography>Количество: {item.qty}</Typography>
							</div>
						);
					})}
					<Button
						fullWidth
						variant="contained"
						color="success"
						type="submit"
						className="submit"
					>
						Создать Букет
					</Button>
				</form>
			</Container>
		</ThemeProvider>
	);
};

export default AddRecipes;
