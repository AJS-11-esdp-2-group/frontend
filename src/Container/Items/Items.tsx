import AddItem from './AddItems';
import CardItems from '../../Components/UI/Layout/Card/CardItems';
import { useGetAllItemsQuery, useDeleteItemMutation } from '../../Store/services/items';
import image from '../../assets/image.jpeg';
import { CustomError } from '../../interfaces/errors/CustomError';
import Modal from '../../Components/UI/Modal/Modal';
import { useEffect, useState } from 'react';
import {
  Alert,
  Box,
  Container,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Snackbar,
  Typography
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Add } from '@mui/icons-material';

const Items = () => {
  const { data, isLoading, isError, error } = useGetAllItemsQuery();
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [deleteItem] = useDeleteItemMutation();
  const [deleteItemId, setDeleteItemId] = useState<number | null>(null);
  const [openItemId, setOpenItemId] = useState<number | null>(null);
  const [uncoverForm, setUncoverForm] = useState(false);
  const [itemId, setItemId] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    setOpen(isError);
  }, [isError]);

  const handleClose = () => {
    setOpen(false);
    setOpenModal(false);
  };

  const handleClick = (itemId: number) => {
    setOpenItemId(itemId === openItemId ? null : itemId);
  };

  const handleAddButtonClick = () => {
    setUncoverForm(!uncoverForm);
  };

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
    <Container maxWidth={'xl'} sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
      <List>
        <ListItem>
          <ListItemButton onClick={handleAddButtonClick}>
            <ListItemIcon>
              <Add />
            </ListItemIcon>
            <Typography
              sx={{ color: '#AAAAAA' }}
            >
              Добавить товар
            </Typography>
          </ListItemButton>
        </ListItem>
        {uncoverForm && (<AddItem />)}
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <Typography sx={{ color: 'black' }} >Каталог товаров</Typography>
        </Box>
      </List>
      <Grid container columnSpacing={{ xs: -5, sm: -5, md: -15 }} >
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
