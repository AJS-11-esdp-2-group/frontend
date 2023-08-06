import AddSupplier from './AddSuppliers';
import {
	useDeleteSupplierMutation,
	useGetAllSuppliersQuery,
} from '../../Store/services/suppliers';
import { ISuppliers } from '../../interfaces/ISuppliers';
import { CustomError } from '../../interfaces/errors/CustomError';
import Modal from '../../Components/UI/Modal/Modal';
import {
	Alert,
	Container,
	Grid,
	Snackbar,
	Typography,
	List,
	ListSubheader,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	IconButton,
	Collapse,
} from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Add, ExpandLess, ExpandMore, Edit, Person } from '@mui/icons-material';

const Suppliers = () => {
	const { data, isLoading, refetch, isError, error } =
		useGetAllSuppliersQuery();
	const [open, setOpen] = useState(false);
	const [openModal, setOpenModal] = useState(false);
	const [deleteSupplier] = useDeleteSupplierMutation();
	const [deleteSupplierId, setDeleteSupplierId] = useState<number | null>(null);
	const [openItemId, setOpenItemId] = useState<number | null>(null);
	const [uncoverForm, setUncoverForm] = useState(false);
	const [supplierId, setSupplierId] = useState(0);
	const navigate = useNavigate();

	useEffect(() => {
		setOpen(isError);
	}, [isError]);

	const handleClose = () => {
		setOpen(false);
		setOpenModal(false);
	};

	const handleClick = (itemId: number) => {
		setOpenItemId(itemId === openItemId ? null : itemId);
	};

	const handleAddButtonClick = () => {
		setUncoverForm(!uncoverForm);
	};

	const handleDelete = async (supplierId: number): Promise<void> => {
		setDeleteSupplierId(supplierId);
		setOpenModal(true);
	};

	const handleConfirmDelete = async () => {
		if (deleteSupplierId) {
			try {
				const result = await deleteSupplier(deleteSupplierId);
				if ('error' in result && result.error) {
					setOpenModal(true);
					setOpen(true);
				} else {
					setOpenModal(false);
					setOpen(false);
				}
				setDeleteSupplierId(null);
				refetch();
			} catch (error) {
				setOpen(true);
			}
		}
	};

	if (isLoading) return <h1>Loading...</h1>;

	return (
		<Container maxWidth={'xs'} sx={{ verticalAlign: 'center', m: '0 auto' }}>
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
						База поставщиков
					</ListSubheader>
				}
			>
				<ListItem>
					<ListItemButton onClick={handleAddButtonClick}>
						<ListItemIcon>
							<Add />
						</ListItemIcon>
						<Typography sx={{ color: '#AAAAAA' }}>
							Добавить поставщика
						</Typography>
					</ListItemButton>
				</ListItem>
				{uncoverForm && <AddSupplier />}
				{data &&
					data.map((supplier: ISuppliers) => {
						const isItemOpen = supplier.id === openItemId;
						return (
							<Grid key={supplier.id}>
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
									isOpen={openModal && deleteSupplierId === supplier.id}
									onClose={handleClose}
									title="Вы действительно хотите удалить этого поставщика?"
									isLoading={isLoading}
									actionButtonLabel="Удалить"
									onActionButtonClick={handleConfirmDelete}
								></Modal>
								<ListItemButton onClick={() => handleClick(supplier.id)}>
									<ListItemIcon>
										<Person />
									</ListItemIcon>
									<ListItemText primary={supplier.name_supplier} />
									<IconButton
										onClick={() => navigate(`/edit-supplier/${supplier.id}`)}
										aria-label="settings"
									>
										<Edit />
									</IconButton>
									<IconButton
										onClick={() => handleDelete(supplier.id)}
										aria-label="settings"
									>
										<DeleteForeverIcon />
									</IconButton>
									{isItemOpen ? (
										<ExpandLess
											onClick={() => {
												setSupplierId(0);
											}}
										/>
									) : (
										<ExpandMore
											onClick={() => {
												setSupplierId(supplier.id);
											}}
										/>
									)}
								</ListItemButton>
								<Collapse in={isItemOpen} timeout="auto" unmountOnExit>
									<List component="div" disablePadding>
										<ListItemButton sx={{ pl: 4 }}>
											<ListItemText primary={'Почта: ' + supplier.email} />
										</ListItemButton>
									</List>
									<List component="div" disablePadding>
										<ListItemButton sx={{ pl: 4 }}>
											<ListItemText primary={'Телефон: ' + supplier.phone} />
										</ListItemButton>
									</List>
									<List component="div" disablePadding>
										<ListItemButton sx={{ pl: 4 }}>
											<ListItemText
												primary={
													'Адрес: ' + supplier.address
												}
											/>
										</ListItemButton>
									</List>
									<List component="div" disablePadding>
										<ListItemButton sx={{ pl: 4 }}>
											<ListItemText
												primary={
													'Комментарий: ' + supplier.comment
												}
											/>
										</ListItemButton>
									</List>
								</Collapse>
							</Grid>
						);
					})}
			</List>
		</Container>
	);
};

export default Suppliers;
