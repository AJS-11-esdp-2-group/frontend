/* eslint-disable @typescript-eslint/await-thenable */
import { useEditAvailableBouquetMutation, useGetAllAvailableBouquetsQuery, useGetAvailableBouquetByIdQuery } from '../../Store/services/availableBouquets';
import { IAvailableBouquets } from '../../interfaces/IAvailableBouquets';
import AvailableBouquetsList, { AvailableBouquetsProps } from '../../Components/AvailableBouquetsList/AvailableBouquetsList';
import { useEffect, useState } from 'react';
import {
    Box,
    Button,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid,
    List,
    ListSubheader,
} from '@mui/material';

const AvailableBouquets = () => {
    const { data, isLoading, isError, error } = useGetAllAvailableBouquetsQuery();
    const [open, setOpen] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [bouquets, setBouquets] = useState<IAvailableBouquets[]>([]);
    const [editingPriceId, setEditingPriceId] = useState<string | null>(null);
    const [editingPrice, setEditingPrice] = useState(0);
    const [selectedBouquetId, setSelectedBouquetId] = useState<string>('');
    const { data: items } = useGetAvailableBouquetByIdQuery(selectedBouquetId);
    const [changePrice] = useEditAvailableBouquetMutation();

    useEffect(() => {
        setOpen(isError);
    }, [isError]);


    useEffect(() => {
        if (data) {
            setBouquets(data as []);
        }
    }, [data]);

    const onClick = (id: string) => {
        setSelectedBouquetId(id);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setOpenModal(false);
    };

    const handleEditPrice = (bouquetId: string, total_sum: number) => {
        setEditingPrice(total_sum);
        setEditingPriceId(bouquetId);
    };

    const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEditingPrice(Number(event.target.value));
    };

    const handleSaveClick = (id: string, newBouquet: number) => {
        const newPrice = newBouquet || editingPrice;
        const updatedBouquets = bouquets.map((bouquet) => {
            if (id === bouquet.id) {
                return { ...bouquet, total_sum: newPrice };
            }
            return bouquet;
        });

        setBouquets(updatedBouquets);
        setEditingPriceId(null);
    };

    const sellBouquet = async (id: string, totalSum: number) => {
        await changePrice({
            id: id,
            bouquet: { total_sum: totalSum },
        });
    };

    if (isLoading) return <h1>Loading...</h1>;
    return (
        <Container style={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
        }}>
            <Grid container sx={{ maxWidth: '400px', margin: '0 auto', my: 2 }}>
                <Grid item xs={12}>
                    <Box>
                        <ListSubheader component="div">Букеты в наличии</ListSubheader>
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
                                                actual_price={bouquet.actual_price}
                                                onClick={() => onClick(bouquet.id)}
                                                changePrice={() => handleEditPrice(bouquet.id, bouquet.actual_price)}
                                                handleCancelClick={() => setEditingPriceId(null)}
                                                isEditing={editingPriceId === bouquet.id}
                                                handleSaveClick={() => handleSaveClick(bouquet.id, editingPrice)}
                                                editingPrice={editingPrice}
                                                handlePriceChange={handlePriceChange}
                                                sellBouquet={sellBouquet}
                                            />
                                        </List>
                                    </Grid>
                                );
                            })}
                    </Box>
                </Grid>
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
