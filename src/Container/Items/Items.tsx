/* eslint-disable @typescript-eslint/await-thenable */
import AddItem from './AddItems';
import CardItems from '../../Components/UI/Layout/Card/CardItems';
import {
	useGetAllItemsQuery,
	useDeleteItemMutation,
} from '../../Store/services/items';
import { CustomError } from '../../interfaces/errors/CustomError';
import Modal from '../../Components/UI/Modal/Modal';
import { useEffect, useState } from 'react';
import {
	Alert,
	Box,
	Container,
	Grid,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	Snackbar,
	Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Add } from '@mui/icons-material';

const Items = () => {
	const { data, isLoading, isError, error } = useGetAllItemsQuery();
	const [open, setOpen] = useState(false);
	const [openModal, setOpenModal] = useState(false);
	const [deleteItem] = useDeleteItemMutation();
	const [deleteItemId, setDeleteItemId] = useState<number | null>(null);
	const [uncoverForm, setUncoverForm] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		setOpen(isError);
	}, [isError]);

	const handleClose = () => {
		setOpen(false);
		setOpenModal(false);
	};

	const handleAddButtonClick = () => {
		setUncoverForm(!uncoverForm);
	};

	const handleDeleteItem = async (itemId: number) => {
		await setDeleteItemId(itemId);
		setOpenModal(true);
	};

	const handleConfirmDelete = async () => {
		if (deleteItemId) {
			try {
				const result = await deleteItem(deleteItemId);
				if ('error' in result && result.error) {
					setOpenModal(true);
					setOpen(true);
				} else {
					setOpenModal(false);
				}
			} catch (deleteError) {
				setOpenModal(true);
				setOpen(true);
			}
			setDeleteItemId(null);
		}
	};

	if (isLoading) return <h1>Loading...</h1>;
	return (
		<Container
			maxWidth={'xl'}
			sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}
		>
			<List>
				<ListItem>
					<ListItemButton onClick={handleAddButtonClick}>
						<ListItemIcon>
							<Add />
						</ListItemIcon>
						<Typography sx={{ color: '#AAAAAA' }}>Добавить товар</Typography>
					</ListItemButton>
				</ListItem>
				{uncoverForm && <AddItem />}
				<Box
					sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}
				>
					<Typography sx={{ color: 'white' }}>Каталог товаров</Typography>
				</Box>
			</List>
			<Grid container columnSpacing={{ xs: -5, sm: -5, md: -15 }}>
				{data &&
					data.map((item) => {
						return (
							<Grid item key={item.id}>
								<Snackbar
									anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
									open={open}
									autoHideDuration={3000}
									onClose={handleClose}
								>
									<Alert
										onClose={handleClose}
										severity="error"
										sx={{ width: '100%' }}
									>
										{(error as CustomError)?.data?.message}
									</Alert>
								</Snackbar>
								<Modal
									isOpen={openModal && deleteItemId === item.id}
									onClose={handleClose}
									title="Вы действительно хотите удалить этот товар?"
									isLoading={isLoading}
									actionButtonLabel="Удалить"
									onActionButtonClick={handleConfirmDelete}
								></Modal>
								<CardItems
									id={item.id}
									name={item.item_name}
									description={item.item_description}
									category_name={item.category_name}
									subcategory_name={item.subcategory_name}
									under_subcategory_name={item.under_subcategory_name}
									onClick={() => navigate(`/edit-item/${item.id}`)}
									onClickDelete={() => handleDeleteItem(item.id)}
								/>
							</Grid>
						);
					})}
			</Grid>
		</Container>
	);
};

export default Items;
