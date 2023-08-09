import { Delete, StoreRounded, YardRounded } from '@mui/icons-material';
import { Box, Button, Container, Grid, Typography, TableContainer, TableBody } from '@mui/material';
import  {ItemsOnCart} from '../FloristMenu/FloristMenu';
import CartItem from '../../UI/Cart/CartItem';
import {ChangeEvent} from 'react';

interface Props {
    items: ItemsOnCart [];
    clickNavigate: () => void;
    removeItem: (i: number) => void;
    increaseItem: (i: number) => void;
    decreaseItem: (i: number) => void;
    changePrice: (i:number, e: ChangeEvent<HTMLInputElement>) => void;
    activeItem: (i:number) => void;
}

const Cart = ({items, clickNavigate, removeItem, increaseItem, decreaseItem, changePrice, activeItem}: Props) => {
    return (
        <Container sx={{ width: '36%', position: 'fixed', right: 0 }}>
            <Grid container>
                <Grid>
                    <Typography color="primary" variant="h6">
                        Ассортимент
                    </Typography>
                </Grid>
                <Grid minHeight={450} sx={{width:'100%'}}>
                    <TableContainer sx={{maxHeight: 450, overflow: 'scroll'}}>
                        <TableBody >
                            {
                                items.length > 0 ?
                                items.map((item, i) => {
                                    return (
                                        <CartItem 
                                            key={i}
                                            item={item}
                                            increaseItem={() =>increaseItem(i)}
                                            decreaseItem={()=>decreaseItem(i)}
                                            removeItem={()=>removeItem(i)}
                                            changePrice={(e) =>changePrice(i, e)}
                                            activeItem={() => activeItem(i)}
                                        />
                                    )
                                }) : null
                            }
                        </TableBody>
                    </TableContainer>
                </Grid>
            </Grid>
            <Grid
                container
                minHeight={140}
                sx={{ display: 'flex', position: 'relative', background: 'black', color: 'white' }}
            >
                <Box sx={{ display: 'flex', margin: 2 }}>
                    <Grid item sx={{ margin: 1 }}>
                        <YardRounded fontSize="large" />
                        <Typography variant="body1">Букет</Typography>
                    </Grid>
                    <Grid item sx={{ margin: 1 }} onClick={clickNavigate}>
                        <StoreRounded fontSize="large"/>
                        <Typography variant="body1">Витрина</Typography>
                    </Grid>
                    <Typography sx={{ marginLeft: '10px', marginRight: '70px' }} variant="h6">
                        Итого:
                    </Typography>
                    <Typography variant="h6">
                        {
                            items.length > 0 ?
                            items.reduce((acc, item) => {
                                return acc + (item.price * item.qty)
                            }, 0): '0.00'
                        }
                    </Typography>
                </Box>
                <Grid sx={{ margin: 1 }}>
                    <Button sx={{ marginRight: 2 }} variant="outlined" color="error" startIcon={<Delete />}>
                        Очистить корзину
                    </Button>
                    <Button color="success" variant="contained">
                        Оплата
                    </Button>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Cart;
