import { CustomError } from '../../interfaces/errors/CustomError';
import { useGetAllItemsQuery } from '../../Store/services/items';
import { useAddsupplyMutation } from '../../Store/services/supply';
import { useGetAllSourcesQuery } from '../../Store/services/source';
import { useGetAllStorageQuery } from '../../Store/services/storages';
import FormElement from '../../Components/UI/Form/FormElement';
import { useAppSelector } from '../../Store/hooks';
import BasicSelect from '../../Components/UI/Form/SelectFormElement';
import { useNavigate } from 'react-router';
import { Container, Button, Snackbar, Alert } from '@mui/material';
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
  update_date?: Date ;
  user: string | any;
}

const AddSupply = () => {
  const { data: storages } = useGetAllStorageQuery();
  const { data: sources } = useGetAllSourcesQuery();
  const { data: items } = useGetAllItemsQuery();
  const { user } = useAppSelector((state) => state.auth);

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
    user: user,
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

  const selectChangeHandler = (name: string, value: string) => {
    setForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const submitFormHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = await addsupply(form);
    
    if (!(data as { error: object }).error) {
      navigate('/');
    }
  };

  return (
    <form onSubmit={submitFormHandler}>
      <Container component="section" maxWidth="xs" sx={{ marginTop: '100px' }}>
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
          label="Откуда"
          name="source_id"
          onChange={(value) => selectChangeHandler('source_id', value)}
          options={sources ? sources.map((source) => ({ id: source.id, name: source.name })) : []}
        />

        <BasicSelect
          value={form.target_id}
          label="Куда"
          name="target"
          onChange={(value) => selectChangeHandler('target_id', value)}
          options={storages ? storages.map((storage) => ({ id: storage.id, name: storage.storage })) : []}
        />
        <BasicSelect
          value={form.item_id}
          label="Товар"
          name="item_id"
          onChange={(value) => selectChangeHandler('item_id', value)}
          options={items ? items.map((item) => ({ id: item.id, name: item.item_name })) : []}
        />
        <FormElement value={form.qty} label="Количество" name="qty" onChange={inputChangeHandler} />
        <FormElement value={form.price} label="Цена за штуку" name="price" onChange={inputChangeHandler} />
        <FormElement value={form.total_price.toString()} label="Общая цена" name="total_price" />
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

export default AddSupply;
