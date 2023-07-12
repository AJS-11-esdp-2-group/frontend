/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-shadow */
import AddCategory from './AddCategory';
import {
	useDeleteCategoryMutation,
	useGetAllcategoriesQuery,
	useGetSubcategoriesByIdCategoryQuery,
} from '../../Store/services/categories';
import { ICategories } from '../../interfaces/ICategories';
import Modal from '../../Components/UI/Modal/Modal';
import { CustomError } from '../../interfaces/errors/CustomError';
import React, { useEffect, useState } from 'react';
import { ISubcategories } from '../../interfaces/ISubcategories';
import {
	Container,
	List,
	ListItemButton,
	ListSubheader,
	ListItem,
	ListItemIcon,
	ListItemText,
	Collapse,
	Typography,
	Grid,
	Snackbar,
	Alert,
} from '@mui/material';

import {
	Add,
	Send as SendIcon,
	ExpandLess,
	ExpandMore,
	StarBorder,
} from '@mui/icons-material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import IconButton from '@mui/material/IconButton';

const Categories = () => {
	const { data, isLoading, isError, error } = useGetAllcategoriesQuery();
	const [open, setOpen] = useState(false);
	const [openUnder] = useState<number | null>(null);
	const [openModal, setOpenModal] = useState(false);
	const [deleteCategory] = useDeleteCategoryMutation();
	const [deleteCategoryId, setDeleteCategoryId] = useState<number | null>(null);
	const [openItemId, setOpenItemId] = useState<number | null>(null);
	const [uncoverForm, setUncoverForm] = useState(false);

	useEffect(() => {
		setOpen(isError);
	}, [isError]);

	const handleCloseSnackbar = () => {
		setOpen(false);
	};

	const handleClick = (itemId: number) => {
		setOpenItemId(itemId === openItemId ? null : itemId);
		setCategoryId(itemId);
	};

	const handleCloseModal = () => {
		setOpen(false);
		setOpenModal(false);
	};

	const handleAddButtonClick = () => {
		setUncoverForm(!uncoverForm);
	};

	const handleDeleteCategory = async (categoryId: number) => {
		setDeleteCategoryId(categoryId);
		setOpenModal(true);
	};

	const handleConfirmDelete = async () => {
		if (deleteCategoryId) {
			try {
				const result = await deleteCategory(deleteCategoryId);
				if ('error' in result && result.error) {
					setOpenModal(true);
					setOpen(true);
				} else {
					setOpenModal(false);
				}
				setDeleteCategoryId(null);
			} catch (error) {
				setOpenModal(true);
				setOpen(true);
			}
		}
	};

	const [categoryId, setCategoryId] = useState(0);
	const {
		data: subcategories,
		refetch,
		isFetching,
	} = useGetSubcategoriesByIdCategoryQuery(categoryId);

	if (isLoading) return <h1>Loading...</h1>;
	return (
		<Container
			maxWidth={'xl'}
			sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}
		>
			<List
				sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
				component="nav"
				aria-labelledby="nested-list-subheader"
				subheader={
					<ListSubheader
						component="div"
						id="nested-list-subheader"
						sx={{ fontSize: '1.5rem', textAlign: 'center', color: 'white' }}
					>
						Список категорий
					</ListSubheader>
				}
			>
				<ListItem>
					<ListItemButton onClick={handleAddButtonClick}>
						<ListItemIcon>
							<Add />
						</ListItemIcon>
						<Typography sx={{ color: '#AAAAAA' }}>Создать категорию</Typography>
					</ListItemButton>
				</ListItem>
				{uncoverForm && <AddCategory />}
				{data &&
					data.map((category: ICategories) => {
						const isItemOpen = category.id === openItemId;
						return (
							<Grid key={category.id}>
								<Snackbar
									anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
									open={open}
									autoHideDuration={3000}
									onClose={handleCloseSnackbar}
								>
									<Alert
										onClose={handleCloseSnackbar}
										severity="error"
										sx={{ width: '100%' }}
									>
										{(error as CustomError)?.data?.message}
									</Alert>
								</Snackbar>
								<Modal
									isOpen={openModal && deleteCategoryId === category.id}
									onClose={handleCloseModal}
									title="Вы действительно хотите удалить эту категорию?"
									isLoading={isLoading}
									actionButtonLabel="Удалить"
									onActionButtonClick={handleConfirmDelete}
									children={undefined}
								/>
								<ListItemButton
									onClick={() => handleClick(category.id)}
									key={category.id}
								>
									<ListItemIcon>
										<StarBorder />
									</ListItemIcon>
									<ListItemText primary={category.category_name} />
									<IconButton
										onClick={() => handleDeleteCategory(category.id)}
										aria-label="settings"
									>
										<DeleteForeverIcon />
									</IconButton>
									{isItemOpen ? (
										<ExpandLess
											onClick={() => {
												setCategoryId(0);
											}}
										/>
									) : (
										<ExpandMore
											onClick={() => {
												setCategoryId(category.id);
											}}
										/>
									)}
								</ListItemButton>
								<Collapse
									in={isItemOpen}
									timeout="auto"
									unmountOnExit
									sx={{ flexDirection: 'column' }}
								>
									<List
										component="div"
										disablePadding
										sx={{ flexDirection: 'column' }}
									>
										<>
											{isFetching ? (
												<ListItemText sx={{ pl: 9 }}>Loading...</ListItemText>
											) : subcategories?.length === 0 ? (
												<ListItemButton sx={{ pl: 4 }}>
													<ListItemIcon>
														<SendIcon />
													</ListItemIcon>
													<ListItemText>Нет подкатегорий</ListItemText>
												</ListItemButton>
											) : (
												subcategories?.map((sub: ISubcategories) => {
													const isUnderOpen = sub.id === openUnder;
													return (
														<ListItemButton key={sub.id} sx={{ pl: 4 }}>
															<ListItemIcon>
																<SendIcon />
															</ListItemIcon>
															<ListItemText key={sub.id}>
																{sub.subcategory_name}
															</ListItemText>
															<IconButton>
																<DeleteForeverIcon />
															</IconButton>
														</ListItemButton>
													);
												})
											)}
										</>
									</List>
								</Collapse>
							</Grid>
						);
					})}
			</List>
		</Container>
	);
};
export default Categories;
