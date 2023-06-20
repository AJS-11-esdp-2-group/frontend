import FormElement from '../../Components/UI/Form/FormElement';
import FileUpload from '../../Components/UI/Form/FileUpload';
import { CustomError } from '../../interfaces/errors/CustomError';
import { useEditItemMutation, useGetItemByIdQuery } from '../../Store/services/items';
import { useNavigate } from 'react-router';
import { Grid, Container, Button, Snackbar, Alert } from '@mui/material';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

interface Props {
  item_name: string;
  item_description: string;
  category_name: string;
  image: File | null;
}

const EditItem = () => {
  const { id } = useParams();
  const { data } = useGetItemByIdQuery(id as unknown as number);

  const [editItem, { error, isError }] = useEditItemMutation();

  const [form, setForm] = useState<Props>({
    item_name: '',
    item_description: '',
    category_name: '',
    image: null,
  });

  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (data) {
      setForm({
        item_name: data.item_name,
        item_description: data.item_description,
        category_name: data.category_name,
        image: null, 
      });
    }
  }, [data]);

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
      formData.append(key, form[key as keyof typeof form] as string | Blob);
    }
    const data = await editItem(formData);
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
        <FormElement value={form.item_name} label="Title" name="item_name" onChange={inputChangeHandler} />
        <FormElement
          value={form.item_description}
          label="Description"
          name="item_description"
          onChange={inputChangeHandler}
        />
        <FormElement value={form.category_name} label="Category" name="category" onChange={inputChangeHandler} />
        <Grid item xs>
          <FileUpload label="Image" name="image" onChange={fileChangeHandler} />
        </Grid>
        <Button
          fullWidth
          variant="contained"
          color="success"
          type="submit"
          className="submit"
          sx={{ marginBottom: 2, marginTop: 3 }}
        >
          Edit
        </Button>
      </Container>
    </form>
  );
};

export default EditItem;
