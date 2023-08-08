import { Delete, StoreRounded, YardRounded } from '@mui/icons-material';
import { Box, Button, Container, Grid, Typography, TableContainer } from '@mui/material';

interface Props {
    clickNavigate: () => void;
}

const Cart = ({clickNavigate}: Props) => {
    return (
        <Container sx={{ width: '36%', position: 'fixed', right: 0 }}>
            <Grid container>
                <Grid>
                    <Typography color="primary" variant="h6">
                        Ассортимент
                    </Typography>
                </Grid>
                <Grid minHeight={450}>
                    <TableContainer>

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
                        Итого
                    </Typography>
                    <Typography variant="h6">0.00</Typography>
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
