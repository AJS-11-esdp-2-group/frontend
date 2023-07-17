/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { GlobalTheme } from '../..';
import { useGetAllItemsQuery } from '../../Store/services/items';
import { useAddsupplyMutation } from '../../Store/services/supply';
import { useGetAllSuppliersQuery } from '../../Store/services/suppliers';
import { useGetAllStorageQuery } from '../../Store/services/storages';
import FormElement from '../../Components/UI/Form/FormElement';
import { useAppSelector } from '../../Store/hooks';
import BasicSelect from '../../Components/UI/Form/SelectFormElement';
import { Items } from '../../interfaces/Items';
import { getUser } from '../../Store/user/userSelectors';
import { useNavigate } from 'react-router';
import {
	Container,
	Button,
	Autocomplete,
	TextField,
	ThemeProvider,
	Box,
	Typography,
} from '@mui/material';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';

export interface Supply {
	operation_type_id: number;
	source_id: string;
	target_id: string;
	item_id: string;
	qty: string;
	price: string;
	total_price: number;
	date: Date;
	update_date?: Date;
	user: number | any;
}

const AddSupply = () => {
	const { data: storages } = useGetAllStorageQuery();
	const { data: suppliers } = useGetAllSuppliersQuery();
	const { data: items } = useGetAllItemsQuery();
	const { user } = useAppSelector(getUser);
	const [addsupply, { error, isError }] = useAddsupplyMutation();
	const [form, setForm] = useState<Supply>({
		operation_type_id: 1,
		source_id: '',
		target_id: '',
		item_id: '',
		qty: '',
		price: '',
		total_price: 0,
		date: new Date(),
		user: user.id,
	});
	const [open, setOpen] = useState(false);

	const navigate = useNavigate();

	const handleClose = () => {
		setOpen(false);
	};

	useEffect(() => {
		setOpen(isError);
	}, [isError]);

	useEffect(() => {
		setForm((prevState) => ({
			...prevState,
			total_price: Number(prevState.qty) * Number(prevState.price),
		}));
	}, [form.qty, form.price]);

	const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;

		setForm((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};
	const autocompleteChangeHandler = (
		event: ChangeEvent<{}>,
		value: Items | string | null,
	) => {
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

			setForm((prevState) => ({
				...prevState,
				item_id: itemId,
			}));
		}
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
			form.item_id !== '' &&
			form.qty !== '' &&
			form.price !== ''
		);
	};

	const submitFormHandler = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (isFormValid()) {
			const data = await addsupply(form);
			if (!(data as { error: object }).error) {
				navigate('/');
			}
		}
	};

	return (
		<ThemeProvider theme={GlobalTheme}>
			<form onSubmit={submitFormHandler}>
				<Container>
					<Box display="flex" alignItems="center" >
						<div style={{ width: '300px' }}>
							<Typography variant="h6">Контрагент</Typography>
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
						</div>
					</Box>
					<Box display="flex" alignItems="center">
						<div style={{ width: '300px' }}>
						<Typography variant="h6">Торговая точка</Typography>
							<BasicSelect
								value={form.target_id}
								label="Торговая точка"
								name="target"
								onChange={(value) => selectChangeHandler('target_id', value)}
								options={
									storages
										? storages
											.filter((storage) => storage.id === 3)
											.map((storage) => ({
												id: storage.id,
												name: storage.storage,
											}))
										: []
								}
							/>
						</div>
					</Box>
					<Box display="flex" alignItems="center" justifyContent="space-between">
						<Box marginRight={2}>
							<Autocomplete
								disablePortal
								options={items ? items : []}
								getOptionLabel={(option) => option.item_name}
								onChange={autocompleteChangeHandler}
								value={
									items?.find((item) => item.id.toString() === form.item_id) || null
								}
								renderInput={(params) => <TextField name="item_id" {...params} label="Товар" />}
								style={{ width: 300 }}
							/>
						</Box>
						<Box marginRight={2}>
							<FormElement
								type="number"
								value={form.qty}
								label="Количество"
								name="qty"
								onChange={inputChangeHandler}
							/>
						</Box>
						<Box marginRight={2}>
							<FormElement
								type="number"
								value={form.price}
								label="Закупочная цена"
								name="price"
								onChange={inputChangeHandler}
							/>
						</Box>
						<Box marginRight={2}>
							<FormElement
								value={form.total_price.toString()}
								label="Сумма"
								name="total_price"
							/>
						</Box>
						<Button
							variant="contained"
							color="success"
							type="submit"
							className="submit"
							disabled={!isFormValid()}
						>
							Создать приход
						</Button>
					</Box>
				</Container>
			</form>
		</ThemeProvider>
	);
};

export default AddSupply;
