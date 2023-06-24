import CardItems from '../../Components/UI/Layout/Card/CardItems';
import { useGetAllItemsQuery, useDeleteItemMutation } from '../../Store/services/items';
import image from '../../assets/image.jpeg';
import { CustomError } from '../../interfaces/errors/CustomError';
import Modal from '../../Components/UI/Modal/Modal';
import { useEffect, useState } from 'react';
import { Alert, Container, Grid, Snackbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Items = () => {
  const { data, isLoading, isError, error } = useGetAllItemsQuery();
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState<number | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    setOpen(isError);
  }, [isError]);

  const handleClose = () => {
    setOpen(false);
    setOpenModal(false);
  };

  const [deleteItem] = useDeleteItemMutation();

  const handleDeleteItem = async (itemId: number) => {
    setDeleteItemId(itemId);
    setOpenModal(true);
  };

  const handleConfirmDelete = async () => {
    if (deleteItemId) {
      try {
        const result = await deleteItem(deleteItemId);
        if ('error' in result && result.error) {
          setOpenModal(true);
          setOpen(true);
        } else {
          setOpenModal(false);
        }
      } catch (error) {
        setOpenModal(true);
        setOpen(true);
      }
      setDeleteItemId(null);
    }
  };

  if (isLoading) return <h1>Loading...</h1>;
  return (
    <Container sx={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
      <Grid container columnSpacing={{ xs: 3, sm: 2, md: 1 }}>
        {data &&
          data.map((item: any) => {
            return (
              <Grid item key={item.id}>
                <Snackbar
                  anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                  open={open}
                  autoHideDuration={3000}
                  onClose={handleClose}
                >
                  <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    {(error as CustomError)?.data?.message}
                  </Alert>
                </Snackbar>
                <Modal
                  isOpen={openModal && deleteItemId === item.id}
                  onClose={handleClose}
                  title="Вы действительно хотите удалить этот товар?"
                  isLoading={isLoading}
                  actionButtonLabel="Удалить"
                  onActionButtonClick={handleConfirmDelete}
                >
                </Modal>
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
