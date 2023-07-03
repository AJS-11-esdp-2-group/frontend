import AddSupplier from './AddSuppliers';
import { useDeleteSupplierMutation, useGetAllSuppliersQuery } from '../../Store/services/suppliers';
import { ISuppliers } from '../../interfaces/ISuppliers';
import { CustomError } from '../../interfaces/errors/CustomError';
import Modal from '../../Components/UI/Modal/Modal';
import {
  Alert,
  Container,
  Grid,
  Snackbar,
  Typography,
  List,
  ListSubheader,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Collapse,
} from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Add, ExpandLess, ExpandMore, Edit, Person } from '@mui/icons-material';

const Suppliers = () => {
  const { data, isLoading, refetch, isError, error } = useGetAllSuppliersQuery();
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [deleteSupplier] = useDeleteSupplierMutation();
  const [deleteSupplierId, setDeleteSupplierId] = useState<number | null>(null);
  const [openItemId, setOpenItemId] = useState<number | null>(null);
  const [uncoverForm, setUncoverForm] = useState(false);
  const [supplierId, setSupplierId] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    setOpen(isError);
  }, [isError]);

  const handleCloseSnackbar = () => {
    setOpen(false);
  };

  const handleClick = (itemId: number) => {
    setOpenItemId(itemId === openItemId ? null : itemId);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleAddButtonClick = () => {
    setUncoverForm(!uncoverForm);
  };

  const handleDelete = async (supplierId: number): Promise<void> => {
    setDeleteSupplierId(supplierId);
    setOpenModal(true);
  };

  const handleConfirmDelete = async () => {
    if (deleteSupplierId) {
      try {
        const result = await deleteSupplier(deleteSupplierId);
        if ('error' in result && result.error) {
          setOpenModal(true);
          setOpen(true);
        } else {
          setOpenModal(false);
          setOpen(false);
        }
        setDeleteSupplierId(null);
        refetch();
      } catch (error) {
        setOpen(true);
      }
    }
  };

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <Container maxWidth={'xs'} sx={{ verticalAlign: 'center', m: '0 auto' }}>
      <List
        sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader
            component="div"
            id="nested-list-subheader"
            sx={{ fontSize: '1.5rem', textAlign: 'center', color: 'white' }}
          >
            База поставщиков
          </ListSubheader>
        }
      >
        <ListItem>
          <ListItemButton onClick={handleAddButtonClick}>
            <ListItemIcon>
              <Add />
            </ListItemIcon>
            <Typography
              sx={{ color: '#AAAAAA' }}
            >
              Добавить поставщика
            </Typography>
          </ListItemButton>
        </ListItem>
        {uncoverForm && (<AddSupplier />)}
        {data &&
          data.map((supplier: ISuppliers) => {
            const isItemOpen = supplier.id === openItemId;
            return (
              <Grid key={supplier.id}>
                <Snackbar
                  anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                  open={open}
                  autoHideDuration={3000}
                  onClose={handleCloseSnackbar}
                >
                  <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
                    {(error as CustomError)?.data?.message}
                  </Alert>
                </Snackbar>
                <Modal
                  isOpen={openModal && deleteSupplierId === supplier.id}
                  onClose={handleCloseModal}
                  title="Вы действительно хотите удалить этого поставщика?"
                  isLoading={isLoading}
                  actionButtonLabel="Удалить"
                  onActionButtonClick={handleConfirmDelete}
                >
                </Modal>
                <ListItemButton onClick={() => handleClick(supplier.id)}>
                  <ListItemIcon>
                    <Person/>
                  </ListItemIcon>
                  <ListItemText primary={supplier.name_supplier} />
                  <IconButton
                    onClick={() => navigate(`/edit-supplier/${supplier.id}`)}
                    aria-label="settings"
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDelete(supplier.id)}
                    aria-label="settings"
                  >
                    <DeleteForeverIcon />
                  </IconButton>
                  {isItemOpen ? (
                    <ExpandLess
                      onClick={() => {
                        setSupplierId(0);
                      }}
                    />
                  ) : (
                    <ExpandMore
                      onClick={() => {
                        setSupplierId(supplier.id);
                      }}
                    />
                  )}
                </ListItemButton>
                <Collapse in={isItemOpen} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 4 }}>
                      <ListItemText primary={'Контактное лицо: ' + supplier.contact_person} />
                    </ListItemButton>
                  </List>
                  <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 4 }}>
                      <ListItemText primary={supplier.email} />
                    </ListItemButton>
                  </List>
                  <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 4 }}>
                      <ListItemText primary={supplier.phone} />
                    </ListItemButton>
                  </List>
                  <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 4 }}>
                      <ListItemText primary={supplier.address} />
                    </ListItemButton>
                  </List>
                  <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 4 }}>
                      <ListItemText primary={supplier.id_country} />
                    </ListItemButton>
                  </List>
                  <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 4 }}>
                      <ListItemText primary={supplier.id_city} />
                    </ListItemButton>
                  </List>
                  <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 4 }}>
                      <ListItemText primary={'Был добавлен ' + new Date(supplier.create_date).toLocaleDateString()} />
                    </ListItemButton>
                  </List>
                </Collapse>
                 {/* <CardSuppliers
                  id={supplier.id}
                  key={supplier.id}
                  name_supplier={supplier.name_supplier}
                  contact_person={supplier.contact_person}
                  email={supplier.email}
                  phone={supplier.phone}
                  address={supplier.address}
                  id_country={supplier.id_country}
                  id_city={supplier.id_city}
                  create_date={supplier.create_date}
                  onClick={() => navigate(`/edit-supplier/${supplier.id}`)}
                  onClickDelete={() => handleDelete(supplier.id)}
                /> */}
              </Grid>
            );
          })}
      </List>
    </Container>
  );
};

export default Suppliers;
