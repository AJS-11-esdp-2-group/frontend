/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/no-misused-promises */
import AddButton from '../../Components/UI/Button/AddButton';
import FormElement from '../../Components/UI/Form/FormElement';
import {
	useGetAllBouquetsQuery,
	useCreateBouquetMutation,
} from '../../Store/services/bouquets';
import { useGetRecipeByIdQuery } from '../../Store/services/recipes';
import RecipesComponent from '../../Components/Recipes/Recipes';
import { useGetAllImagesQuery } from '../../Store/services/bouquetsImages';
import { useGetAllcategoriesQuery } from '../../Store/services/categories';
import BasicSelect from '../../Components/UI/Form/SelectFormElement';
import { useAppSelector } from '../../Store/hooks';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
	Button,
	Container,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Grid,
	ImageList,
	ImageListItem,
	ListSubheader,
} from '@mui/material';

const Recipes = () => {
	const navigate = useNavigate();
	const { user } = useAppSelector((state) => state.auth);

	const [selectedBouquetId, setSelectedBouquetId] = useState<number>(0);
	const { data: bouquets } = useGetAllBouquetsQuery();
	const { data: recipes } = useGetRecipeByIdQuery(selectedBouquetId);
	const { data: images } = useGetAllImagesQuery();
	const { data: categories } = useGetAllcategoriesQuery();
	const [createBouquet] = useCreateBouquetMutation();
	const [showForm, setShowForm] = useState(false);
	const [open, setOpen] = useState(false);
	interface Props {
		bouquet_name: string;
		bouquet_description: string;
		author: string;
		id_category: string;
		image: string;
	}
	const [form, setForm] = useState<Props>({
		bouquet_name: '',
		bouquet_description: '',
		author: user[0].first_name as string,
		id_category: '',
		image: '',
	});

	const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;

		setForm((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};
	const submitFormHandler = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const data = await createBouquet(form);
		if (!('error' in data)) {
			const bouquetId = data.data[0].id;
			navigate(`/new-recipes/${bouquetId}`);
		}
	};

	const selectChangeHandler = (name: string, value: string) => {
		setForm((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};
	const handleClose = () => {
		setOpen(false);
	};

	const handleAddButtonClick = () => {
		setShowForm(!showForm);
	};

	const handleBouquetClick = (id: number) => {
		setSelectedBouquetId(id);
		setOpen(true);
	};
	const bouquetsWithImages = bouquets?.map((bouquet) => ({
		...bouquet,
		image: images?.find((image) => image.id_bouquet === bouquet.id),
	}));

	return (
		<Container
			style={{
				display: 'flex',
				justifyContent: 'center',
				flexDirection: 'column',
			}}
		>
			<AddButton
				onClick={handleAddButtonClick}
				buttonText="Создать новый рецепт"
			/>
			<form onSubmit={submitFormHandler}>
				{showForm && (
					<Grid
						container
						sx={{
							justifyContent: 'space-between',
							maxWidth: '600px',
							margin: '0 auto',
							my: 2,
						}}
					>
						<FormElement
							value={form.bouquet_name}
							label="Название"
							name="bouquet_name"
							onChange={inputChangeHandler}
						/>
						<FormElement
							value={form.bouquet_description}
							label="Описание"
							name="bouquet_description"
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
						<Button type="submit" variant="contained" color="success">
							Создать
						</Button>
						<Button
							variant="contained"
							color="error"
							onClick={handleAddButtonClick}
						>
							Отмена
						</Button>
					</Grid>
				)}
			</form>
			<Grid container sx={{ maxWidth: '600px', margin: '0 auto', my: 2 }}>
				<ImageList sx={{ width: '100%', height: 450 }}>
					<ImageListItem key="Subheader" cols={2}>
						<ListSubheader component="div">Рецепты</ListSubheader>
					</ImageListItem>
					{bouquetsWithImages &&
						bouquetsWithImages.map((bouquet) => (
							<RecipesComponent
								onClick={() => handleBouquetClick(bouquet.id)}
								id={bouquet.id}
								bouquet_name={bouquet.bouquet_name}
								bouquet_description={bouquet.bouquet_description}
								author={bouquet.author}
								id_category={bouquet.id}
								image={bouquet.image?.image as string}
							/>
						))}
				</ImageList>
			</Grid>
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>Состав</DialogTitle>
				<DialogContent>
					{recipes &&
						recipes.map((item) => (
							<DialogContentText>
								{item.item_name} : {item.qty} штук(а)
							</DialogContentText>
						))}
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Закрыть</Button>
				</DialogActions>
			</Dialog>
		</Container>
	);
};

export default Recipes;
