/* eslint-disable @typescript-eslint/await-thenable */
import { useGetAllAvailableBouquetsQuery, useGetAvailableBouquetByIdQuery } from '../../Store/services/availableBouquets';
import { IAvailableBouquets } from '../../interfaces/IAvailableBouquets';
import AvailableBouquetsList from '../../Components/AvailableBouquetsList/AvailableBouquetsList';
import { useEffect, useState } from 'react';
import {
    Button,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid,
    ImageList,
    ImageListItem,
    List,
    ListSubheader,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AvailableBouquets = () => {
    const { data, isLoading, isError, error } = useGetAllAvailableBouquetsQuery();
    const [open, setOpen] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [bouquets, setBouquets] = useState<IAvailableBouquets[]>([]);
    const [editingPriceId, setEditingPriceId] = useState<number | null>(null);
    const [editingPrice, setEditingPrice] = useState(0);
    const [selectedBouquetId, setSelectedBouquetId] = useState<number>(0);
    const { data: items } = useGetAvailableBouquetByIdQuery(selectedBouquetId);
    const navigate = useNavigate();

    useEffect(() => {
        setOpen(isError);
    }, [isError]);


    useEffect(() => {
        if (data) {
            setBouquets(data as []);
        }
    }, [data]);

    const onClick = (id: number) => {
        setSelectedBouquetId(id);
        setOpen(true);
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
                                    <List>
                                        <AvailableBouquetsList
                                            id={bouquet.id}
                                            name_bouquet={bouquet.name_bouquet}
                                            image_bouquet={bouquet.image_bouquet}
                                            added_date={bouquet.added_date}
                                            actual_price={editingPriceId === bouquet.id ? editingPrice : bouquet.actual_price}
                                            onClick={() => onClick(bouquet.id)}
                                            changePrice={() => handleEditPrice(bouquet.id, bouquet.actual_price)}
                                            handleCancelClick={() => setEditingPriceId(null)}
                                            isEditing={editingPriceId === bouquet.id}
                                            editingPrice={editingPrice}
                                        />
                                    </List>
                                </Grid>
                            );
                        })}
                </ImageList>
            </Grid>
            <Dialog open={open} onClose={handleClose} PaperProps={{ style: { backgroundColor: '#F0F0F0' } }}>
                <DialogTitle >Состав букета</DialogTitle>
                <DialogContent>
                    {items &&
                        items.map((item) => (
                            <DialogContentText key={item.id} style={{ color: 'black' }}>
                                {item.item_name}: {item.qty} штук(-а) по {item.price} тенге
                            </DialogContentText>
                        ))}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Закрыть</Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default AvailableBouquets;
