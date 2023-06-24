import FormElement from '../../Components/UI/Form/FormElement';
import { CustomError } from '../../interfaces/errors/CustomError';
import { useEditItemMutation, useGetItemByIdQuery } from '../../Store/services/items';
import { useGetAllcategoriesQuery } from '../../Store/services/category';
import BasicSelect from '../../Components/UI/Form/SelectFormElement';
import { useAppSelector } from '../../Store/hooks';
import { useNavigate } from 'react-router';
import { Container, Button, Snackbar, Alert } from '@mui/material';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export interface ItemProps {
  item_name: string;
  item_description: string;
  id_category: string;
  id_user: any;
}

const EditItem = () => {
  const { id } = useParams();
  const { data: itemById, refetch } = useGetItemByIdQuery(id as string, {
    refetchOnMountOrArgChange: false,
  });

  const { data: categories } = useGetAllcategoriesQuery();
  const { user } = useAppSelector((state) => state.auth);

  const [editItem, { error }] = useEditItemMutation();

  const [form, setForm] = useState<ItemProps>({
    item_name: '',
    item_description: '',
    id_category: '',
    id_user: '',
  });

  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      await itemById;
      if (itemById) {
        setForm((prevState) => ({
          ...prevState,
          item_name: itemById[0].item_name,
          item_description: itemById[0].item_description,
          id_category: itemById[0].id_category as string,
          image: itemById[0].image_large,
          id_user: user[0].id,
        }));
      }
    };

    fetchData();
  }, [itemById, user]);

  const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm((prevState) => ({
      ...prevState,
      [name as keyof ItemProps]: value,
    }));
  };

  const selectChangeHandler = (name: string, value: string) => {
    setForm((prevState) => ({
      ...prevState,
      [name as keyof ItemProps]: value,
    }));
  };

  const submitFormHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (itemById && form.item_name) {
      const data = await editItem({ itemId: id as string, item: form });

      if (!(data as { error: object }).error) {
        await refetch();
        navigate('/');
      }
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
        <FormElement value={form.item_name} label="Title" name="item_name" onChange={inputChangeHandler} />
        <FormElement
          value={form.item_description}
          label="Description"
          name="item_description"
          onChange={inputChangeHandler}
        />
        <BasicSelect
          value={form.id_category}
          label="Категория"
          name="id_category"
          onChange={(value) => selectChangeHandler('id_category', value)}
          options={categories ? categories.map((category) => ({ id: category.id, name: category.category_name })) : []}
        />
        <Button fullWidth variant="contained" color="success" type="submit" className="submit">
          Edit
        </Button>
      </Container>
    </form>
  );
};

export default EditItem;
