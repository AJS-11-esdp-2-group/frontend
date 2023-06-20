import FormElement from '../../Components/UI/Form/FormElement';
import FileUpload from '../../Components/UI/Form/FileUpload';
import { CustomError } from '../../interfaces/errors/CustomError';
import { useAddItemMutation } from '../../Store/services/items';
import { useGetAllcategoriesQuery } from '../../Store/services/category';
import BasicSelect from '../../Components/UI/Form/SelectFormElement';
import { useAppSelector } from '../../Store/hooks';
import { useNavigate } from 'react-router';
import { Grid, Container, Button, Snackbar, Alert } from '@mui/material';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';

const AddItem = () => {
  const [addItem, { error, isError }] = useAddItemMutation();
  const { user } = useAppSelector((state) => state.auth);

  const { data: categories } = useGetAllcategoriesQuery();
  interface Props {
    item_name: string;
    item_description: string;
    id_category: string;
    category_name_description: string;
    image_large: string;
    image_small: string;
    id_user: any;
  }
  const [form, setForm] = useState<Props>({
    item_name: '',
    item_description: '',
    id_category: '',
    category_name_description: '',
    image_large: '',
    image_small: '',
    id_user: user[0].id,
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

  const fileChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    if (e.target.files) {
      const file = e.target.files[0];
      setForm((prevState) => ({
        ...prevState,
        [name]: file,
      }));
    }
  };

  const submitFormHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    for (let key in form) {
      formData.append(key, form[key as keyof typeof form]);
    }
    const data = await addItem(formData);
    if (!(data as { error: object }).error) {
      navigate('/');
    }
  };
  const selectChangeHandler = (name: string, value: string) => {
    setForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
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
        <FormElement value={form.item_name} label="Товар" name="item_name" onChange={inputChangeHandler} />
        <FormElement
          value={form.item_description}
          label="Описание"
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
        <Grid item xs>
          <FileUpload label="image" name="image" onChange={fileChangeHandler} />
        </Grid>
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
export default AddItem;
