/* eslint-disable @typescript-eslint/no-misused-promises */
import FileUpload from '../../Components/UI/Form/FileUpload';
import FormElement from '../../Components/UI/Form/FormElement';
import { CustomError } from '../../interfaces/errors/CustomError';
import { useAddItemMutation } from '../../Store/services/items';
import { useGetAllcategoriesQuery, useGetSubcategoriesByIdCategoryQuery } from '../../Store/services/categories';
import { useGetUnderSubcategoriesByIdCategoryQuery } from '../../Store/services/subcategories';
import BasicSelect from '../../Components/UI/Form/SelectFormElement';
import { useAppSelector } from '../../Store/hooks';
import { useNavigate } from 'react-router';
import { Container, Button, Snackbar, Alert } from '@mui/material';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';

const AddItem = () => {
  const [addItem, { error, isError }] = useAddItemMutation();
  const { user } = useAppSelector((state) => state.auth);

  const [categoryId, setCategoryId] = useState(0);
  const [subCategoryId, setSubCategoryId] = useState(0);

	const { data: categories } = useGetAllcategoriesQuery();
	interface Props {
		item_name: string;
		item_description: string;
		id_category: string;
		id_subcategory: string;
		id_under_subcategory: string;
		id_user: number;
	}
	const initialFormState: Props = {
		item_name: '',
		item_description: '',
		id_category: '',
		id_subcategory: '',
		id_under_subcategory: '',
		id_user: user.id as number,
	};

  const { data: subcategory } = useGetSubcategoriesByIdCategoryQuery(categoryId);
  const { data: underSubcategory } = useGetUnderSubcategoriesByIdCategoryQuery(subCategoryId);

  const [openItemId, setOpenItemId] = useState<number | null>(null);

  const handleClick = (itemId: number) => {
    setOpenItemId(itemId === openItemId ? null : itemId);
    setCategoryId(itemId);
  };
  const handleClickSubcategory = (itemId: number) => {
    setOpenItemId(itemId === openItemId ? null : itemId);
    setSubCategoryId(itemId);
  };


  const [form, setForm] = useState<Props>(initialFormState);
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

  const submitFormHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = await addItem(form);
    if (!(data as unknown as { error: object }).error) {
      navigate('/items');
      setForm(initialFormState);
    }
  };
  const selectChangeHandler = (name: string, value: string) => {
    setForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const fileChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      setForm((prevState) => ({
        ...prevState,
        image_small: file as unknown as string,
      }));
    }
  };

  return (
    <form onSubmit={submitFormHandler}>
      <Container component="section" maxWidth="xs">
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
          onChange={(value) => {
            const categoryId = parseInt(value);
            selectChangeHandler('id_category', value);
            handleClick(categoryId);
          }}
          options={
            categories
              ? categories.map((category) => ({
                  id: category.id,
                  name: category.category_name,
                }))
              : []
          }
        />
        <BasicSelect
          value={form.id_subcategory}
          label="Подкатегория"
          name="id_subcategory"
          onChange={(value) => {
            const subCategoryId = parseInt(value);
            selectChangeHandler('id_subcategory', value);
            handleClickSubcategory(subCategoryId);
          }}
          options={
            subcategory
              ? subcategory.map((subcategory) => ({
                  id: subcategory.id,
                  name: subcategory.subcategory_name,
                }))
              : []
          }
        />
        <BasicSelect
          value={form.id_under_subcategory}
          label="Подкатегория подкатегории"
          name="id_under_subcategory"
          onChange={(value) => selectChangeHandler('id_under_subcategory', value)}
          options={
            underSubcategory
              ? underSubcategory.map((undersubs) => ({
                  id: undersubs.id,
                  name: undersubs.under_subcategory_name,
                }))
              : []
          }
        />

        <FileUpload onChange={fileChangeHandler} name="image_small" label="Фото" />
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
