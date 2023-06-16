import FormElement from '../../Components/UI/Form/FormElement';
import FileUpload from '../../Components/UI/Form/FileUpload';
import { CustomError } from '../../interfaces/errors/CustomError';
import { useAddItemMutation } from '../../Store/services/items';
import { useNavigate } from 'react-router';
import { Grid, Container, Button, Snackbar, Alert } from '@mui/material';
import{ ChangeEvent, FormEvent, useEffect, useState } from 'react';

const AddItem = () => {
  const [addItem, { error, isError }] = useAddItemMutation();
  interface Props {
    item_name: string,
    item_description: string,
   category: string,
   image: string,
  }
  const [form, setForm] = useState<Props>({
    item_name: '',
    item_description: '',
   category: '',
   image: '',
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
            {(error as CustomError)?.data?.error}
          </Alert>
        </Snackbar>
        <FormElement
          value={form.item_name}
          label="Title"
          name="title"
          onChange={inputChangeHandler}
        />
        <FormElement
          value={form.item_description}
          label="Title"
          name="title"
          onChange={inputChangeHandler}
        />
        <FormElement
          value={form.category}
          label="Title"
          name="title"
          onChange={inputChangeHandler}
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
