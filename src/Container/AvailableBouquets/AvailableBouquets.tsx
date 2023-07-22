/* eslint-disable @typescript-eslint/await-thenable */
import { useGetAllAvailableBouquetsQuery } from '../../Store/services/availableBouquets';
import { IAvailableBouquets } from '../../interfaces/IAvailableBouquets';
import AvailableBouquetsList from '../../Components/AvailableBouquetsList/AvailableBouquetsList';
import { CustomError } from '../../interfaces/errors/CustomError';
import { GlobalTheme } from '../..';
import { useEffect, useState } from 'react';
import { Alert, Container, Grid, ImageList, ImageListItem, List, ListSubheader, Snackbar, ThemeProvider } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AvailableBouquets = () => {
    const { data, isLoading, isError, error } = useGetAllAvailableBouquetsQuery();
    const [open, setOpen] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [bouquets, setBouquets] = useState<IAvailableBouquets[]>([]);
    const [editingPriceId, setEditingPriceId] = useState<number | null>(null);
    const [editingPrice, setEditingPrice] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        setOpen(isError);
    }, [isError]);


    useEffect(() => {
        if (data) {
            setBouquets(data as []);
        }
    }, [data]);

    const onClick = () => {

    };

    const handleClose = () => {
        setOpen(false);
        setOpenModal(false);
    };

    const handleEditPrice = (bouquetId: number, actual_price: number) => {
        setEditingPrice(actual_price);
        setEditingPriceId(bouquetId);
    };


    if (isLoading) return <h1>Loading...</h1>;
    return (
        <Container style={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
        }}>
            <Grid container sx={{ maxWidth: '600px', margin: '0 auto', my: 2 }}>
                <ImageList sx={{ width: '100%', height: 450 }}>
                    <ImageListItem key="Subheader" cols={2}>
                        <ListSubheader component="div">Букеты в наличии</ListSubheader>
                    </ImageListItem>
                    {bouquets &&
                        bouquets.map((bouquet) => {
                            return (
                                <Grid item key={bouquet.id}>
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
                                    <List>
                                        <AvailableBouquetsList
                                            id={bouquet.id}
                                            name_bouquet={bouquet.name_bouquet}
                                            image_bouquet={bouquet.image_bouquet}
                                            added_date={bouquet.added_date}
                                            actual_price={editingPriceId === bouquet.id ? editingPrice : bouquet.actual_price}
                                            changePrice={() => handleEditPrice(bouquet.id, bouquet.actual_price)}
                                            handleCancelClick={() => setEditingPriceId(null)}
                                            isEditing={editingPriceId === bouquet.id}

                                            editingPrice={editingPrice}

                                        />
                                    </List>
                                    <List />
                                </Grid>
                            );
                        })}
                </ImageList>
            </Grid>
            </Container>
    );
};

export default AvailableBouquets;
