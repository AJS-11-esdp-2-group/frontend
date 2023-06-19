import { useDeleteSupplierMutation, useGetAllSuppliersQuery } from '../../Store/services/suppliers';
import CardSuppliers from '../../Components/UI/Layout/Card/CardSuppliers';
import { ISuppliers } from '../../interfaces/ISuppliers';
import { CustomError } from '../../interfaces/errors/CustomError';
import { Alert, Container, Grid, Snackbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Suppliers = () => {
  const { data, isLoading, refetch, isError, error  } = useGetAllSuppliersQuery();
  const [open, setOpen] = useState(false);
  const [deleteSupplier] = useDeleteSupplierMutation();

  const navigate = useNavigate();

  useEffect(() => {
    setOpen(isError);
  }, [isError]);

  const handleClose = () => {
    setOpen(false);
  };

  if (isLoading) return <h1>Loading...</h1>;

  const handleDelete = async (supplierId: number): Promise<void> => {
    try {
      const result = await deleteSupplier(supplierId);
      refetch();
      if ('error' in result && result.error) {
        setOpen(true);
      }
    } catch (error) {
      setOpen(true);
    }
  };

  return (
    <Container sx={{ verticalAlign: 'center' }}>
      {data && data.map((supplier: ISuppliers) => {
        return (
          <Grid key={supplier.id}>
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
