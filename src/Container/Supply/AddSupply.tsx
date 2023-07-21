/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { GlobalTheme } from '../..';
import { CustomError } from '../../interfaces/errors/CustomError';
import { useGetAllItemsQuery } from '../../Store/services/items';
import { useAddsupplyMutation } from '../../Store/services/supply';
import { useGetAllSuppliersQuery } from '../../Store/services/suppliers';
import { useGetAllStorageQuery } from '../../Store/services/storages';
import BasicSelect from '../../Components/UI/Form/SelectFormElement';
import { Items } from '../../interfaces/Items';
import { useNavigate } from 'react-router';
import {
	Container,
	Button,
	Snackbar,
	Alert,
	Autocomplete,
	TextField,
	ThemeProvider,
	Typography,
	TableContainer,
	TableBody,
	TableRow,
	TableCell,
	Box
} from '@mui/material';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import EnhancedTableHead from '../../Components/Supply/AddSupply/TableHead/TableHead';

interface InvoiceItem {
	item_id: string;
	price: string;
	qty: string;
}

export interface Supply {
	operation_type_id: number;
	source_id: string;
	target_id: string;
	invoice_number: string;
	items: Array<InvoiceItem>;
}

const AddSupply = () => {
	const { data: storages } = useGetAllStorageQuery();
	const { data: suppliers } = useGetAllSuppliersQuery();
	const { data: items } = useGetAllItemsQuery();
	const [addsupply,  { error, isError }] = useAddsupplyMutation();
	const [form, setForm] = useState<Supply>({
		operation_type_id: 1,
		source_id: '',
		target_id: '',
		invoice_number: '',
		items: []
	});
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

	const autocompleteChangeHandler = (event: ChangeEvent<{}>, value: Items | string | null) => {
		if (value !== null) {
			let itemId: string;

			if (typeof value === 'string') {
				itemId = '';
			} else {
				const selectedItem = items?.find(
					(item) => item.item_name === value.item_name,
				);
				itemId = selectedItem ? selectedItem.id.toString() : '';
			}

			if(form.items.length === 0) {
				const newItem: InvoiceItem = {
					item_id: itemId,
					qty: '',
					price: ''
				}
	
				const stateItems = form.items;
				stateItems.unshift(newItem);
	
				setForm((prevState) => ({
					...prevState,
					items: stateItems
				}));
			} else {
				if(form.items[form.items.length - 1].price !== '' && form.items[form.items.length - 1].qty !== '') {
					const newItem: InvoiceItem = {
						item_id: itemId,
						qty: '',
						price: ''
					}
		
					const stateItems = form.items;
					stateItems.unshift(newItem);
		
					setForm((prevState) => ({
						...prevState,
						items: stateItems
					}));
				} else {

				}
			}
		}
	};

	const deleteItem = (index: number): void => {
		const items = form.items;
		items.splice(index, 1);
		
		setForm((prevState) => ({
			...prevState,
			items: items
		}));
	};

	const selectChangeHandler = (name: string, value: string) => {
		setForm((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const isFormValid = () => {
		return (
			form.source_id !== '' &&
			form.target_id !== '' &&
			form.invoice_number !==''&&
			form.items[0]?.price !== '' &&
			form.items[0]?.qty !== '' &&
			form.items.length > 0
		);
	};

	const submitFormHandler = () => {
		if (isFormValid()) {
			addsupply(form);
			
			if (!isError) navigate('/invoices');
		}
	};

	const itemDetailChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		const {id, name, value } = e.target;
		const index = parseInt(id);
		const items = form.items;
		const item = {...items[index], [name]: value};
		items[index] = item;
		setForm((prevState) => ({
			...prevState,
			items: items
		}));
	};

	return (
		<ThemeProvider theme={GlobalTheme}>
			<Container>
				<Typography variant="h4">Новый приход товаров</Typography>
			</Container>
			<Container
				sx={{ marginTop: '50px', marginBottom: 10}}
			>
				<TextField
					name="invoice_number"
					label="Номер накладной"
					value={form.invoice_number}
					onChange={inputChangeHandler}
				/>
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
				<BasicSelect
					value={form.source_id}
					label="Контрагент"
					name="source_id"
					onChange={(value) => selectChangeHandler('source_id', value)}
					options={
						suppliers
							? suppliers.map((suppliers) => ({
									id: suppliers.id,
									name: suppliers.name_supplier,
								}))
							: []
					}
				/>
				<BasicSelect
					value={form.target_id}
					label="Торговая точка"
					name="target"
					onChange={(value) => selectChangeHandler('target_id', value)}
					options={
						storages
							? storages.map((storage) => ({
									id: storage.id,
									name: storage.storage,
								}))
							: []
					}
				/>
				<Autocomplete
					disablePortal
					options={items ? items : []}
					getOptionLabel={(option) => option.item_name}
					onChange={autocompleteChangeHandler}
					renderInput={(params) => (
						<TextField name="item_id" {...params} label="Выберите товар" />
					)}
				/>	
				<Box>
					<Button
						variant="contained"
						color="success"
						type="submit"
						className="submit"
						disabled={!isFormValid()}
						onClick={submitFormHandler}
					>
						Создать Приход
					</Button>
				</Box>		
				<TableContainer sx = {{maxHeight: 500}}>
					<EnhancedTableHead/>
					<TableBody>
						<TableRow>
							<TableCell></TableCell>
							<TableCell ></TableCell>
							<TableCell align='center'></TableCell>
							<TableCell align='center'>
								{
									form.items.length > 0 && 
									form.items[form.items.length-1]?.qty !== '' && 
									form.items[form.items.length-1]?.price !== '' ?
									form.items.reduce((acc, item) => {
										if(item.qty === '') return acc
										return acc + parseInt(item.qty)
									}, 0) : null
								}
							</TableCell>
							<TableCell align='center'></TableCell>
							<TableCell align='center'>
								{
									form.items.length > 0 && 
									form.items[form.items.length-1]?.qty !== '' && 
									form.items[form.items.length-1]?.price !== '' ?
									form.items.reduce((acc, item) => {
										if(item.price === '' && item.qty === '') return acc
										if(item.price === '') return acc
										return acc + (parseInt(item.qty) *parseInt(item.price)) 
									}, 0) : null
								}
							</TableCell>
						</TableRow>
						{
							form.items.length > 0 ? 
							form.items.map((item, i) => {
								const itemName = items?.map(it => {
									if(it.id === parseInt(item.item_id)) return it.item_name
								})
								return(
									<TableRow>
										<TableCell>{i+1}</TableCell>
										<TableCell 
											component="th"
											scope="row"
											padding="none"
										>
											{itemName}
										</TableCell>
										<TableCell align='center'>{0}</TableCell>
										<TableCell align='center'>
											<TextField 
												id={i.toString()}
												name='qty'
												margin='normal'
												size='small'
												sx={{width: 80}}
												onChange={itemDetailChangeHandler}
												value={form.items[i].qty}
											/>
										</TableCell>
										<TableCell align='center'>
											<TextField 
												margin='normal'
												size='small'
												sx={{width: 80}}
												id={i.toString()}
												name='price'
												onChange={itemDetailChangeHandler}
												value={form.items[i].price}
											/>
										</TableCell>
										<TableCell align='center'>
											{isNaN(parseInt(item.price) * parseInt(item.qty))? '0' : parseInt(item.price) * parseInt(item.qty)}
										</TableCell>
										<TableCell align='center' onClick={() => deleteItem(i)}>
											<HighlightOffIcon 
											/>
										</TableCell>
									</TableRow>
								)
							}) : <Typography >Нет выбранных товаров</Typography>
						}
					</TableBody>
				</TableContainer>
			</Container>
		</ThemeProvider>
	);
};

export default AddSupply;
