import { useDeleteSupplierMutation, useGetAllSuppliersQuery } from '../../Store/services/suppliers';
import CardSuppliers from '../../Components/UI/Layout/Card/CardSuppliers';
import { ISuppliers } from '../../interfaces/ISuppliers';
import { CustomError } from '../../interfaces/errors/CustomError';
import Modal from '../../Components/UI/Modal/Modal';
import { Alert, Container, Grid, Snackbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Suppliers = () => {
  const { data, isLoading, refetch, isError, error } = useGetAllSuppliersQuery();
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [deleteSupplier] = useDeleteSupplierMutation();
  const [deleteSupplierId, setDeleteSupplierId] = useState<number | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    setOpen(isError);
  }, [isError]);

  const handleCloseSnackbar = () => {
    setOpen(false);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
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
          setOpen(true);
        } else {
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
    <Container sx={{ verticalAlign: 'center' }}>
      {data &&
        data.map((supplier: ISuppliers) => {
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
              <CardSuppliers
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
              />
            </Grid>
          );
        })}
    </Container>
  );
};

export default Suppliers;
