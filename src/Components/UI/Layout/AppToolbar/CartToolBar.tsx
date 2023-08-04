import { Typography, Toolbar, AppBar, Box, Grid, Button, Container } from '@mui/material';
import { Link } from 'react-router-dom';
import { ArrowForward, CalendarMonth, Delete, StoreRounded, YardRounded } from '@mui/icons-material';

const CartToolBar = () => {

    return (
        <Container sx={{position: 'relative'}}>
            <AppBar position="fixed" sx={{ backgroundColor: '#383b48', marginBottom: '64px' }}>
                <Toolbar sx={{ justifyContent: 'space-between' }}>
                    <Typography
                        variant="h6"
                        sx={{
                            textDecoration: 'none',
                            color: 'aliceblue',
                            fontSize: '24px',
                            fontWeight: 'bold',
                        }}
                    >
                        <Link to="/">Flower Shop</Link>
                    </Typography>
                    <Box
                        minWidth="35%"
                        minHeight={70}
                        sx={{
                            background: '#00c499',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-around',
                        }}
                    >
                        <Typography variant="h6">
                            <CalendarMonth /> Календарь заказов
                        </Typography>
                        <ArrowForward />
                    </Box>
                </Toolbar>
                 <Container sx={{ width: '36%', position: 'absolute', right: 0}}>
                <Grid container>
                    <Grid item sx={{marginTop: 10}}>
                        <Typography color="primary" variant="h6">Ассортимент</Typography>
                    </Grid>
                    <Grid minHeight={600}>{/* место для товаров */}</Grid>
                </Grid>
                <Grid container 
                    minHeight={140} sx={{ display: 'flex', position: 'relative', background: 'black', color: 'white'}}>
                    <Box sx={{ display: 'flex', margin: 1 }}>
                        <Grid item sx={{margin: 1}}>
                            <YardRounded fontSize="large" />
                            <Typography variant="body1">Букет</Typography>
                        </Grid>
                        <Grid item sx={{margin: 1}}>
                            <StoreRounded fontSize="large" />
                            <Typography variant="body1">Витрина</Typography>
                        </Grid>
                        <Typography sx={{marginLeft: '10px', marginRight: '70px'}} variant="h6">Итого</Typography>
                        <Typography variant="h6">0.00</Typography>
                    </Box>
                    <Grid sx={{margin: 1}}>
                        <Button 
                            sx={{margin: 3}} 
                            variant="outlined" color="error" startIcon={<Delete />}>Очистить корзину</Button>
                        <Button color="success" variant="contained">
                            Оплата
                        </Button>
                    </Grid>
                </Grid>
            </Container>
            </AppBar>
        </Container>
    );
};

export default CartToolBar;
