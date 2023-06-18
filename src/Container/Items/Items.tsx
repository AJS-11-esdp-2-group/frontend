import CardItems from '../../Components/UI/Layout/Card/CardItems';
import { useGetAllItemsQuery, useDeleteItemMutation } from '../../Store/services/items';
import image from '../../assets/image.jpeg';
import { CustomError } from '../../interfaces/errors/CustomError';
import { useEffect, useState } from 'react';
import { Alert, Container, Grid, Snackbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Items = () => {
  const { data, isLoading, isError, error } = useGetAllItemsQuery();
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setOpen(isError);
  }, [isError]);

  const handleClose = () => {
    setOpen(false);
  };

  const [deleteItem] = useDeleteItemMutation();

  const handleDeleteItem = async (itemId: number) => {
    try {
      const result = await deleteItem(itemId);
      if ('error' in result && result.error) {
        setOpen(true);
      }
    } catch (error) {
      setOpen(true);
    }
  };

  if (isLoading) return <h1>Loading...</h1>;
  return (
    <Container>
      <Grid container columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ margin: 'auto' }}>
      {data &&
        data.map((item: any) => {
          return (
            <Grid key={item.id}>
              <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={open}
                autoHideDuration={3000}
                onClose={handleClose}
              >
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                  {(error as CustomError)?.data?.error}
                </Alert>
              </Snackbar>
              <CardItems
                id={item.id}
                name={item.item_name}
                image={image}
                create_date={item.create_date}
                description={item.item_description}
                id_category={item.id_category}
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
