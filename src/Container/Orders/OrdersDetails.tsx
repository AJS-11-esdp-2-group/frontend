import Order from '../../Components/Orders/Order';
import { useGetOrderByIdQuery } from '../../Store/services/orders';
import { GlobalTheme } from '../..';
import {
    Container,
    Grid,
    Paper,
    Table,
    TableBody,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { useParams } from 'react-router';
import { ThemeProvider, styled } from '@mui/material/styles';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const OrdersDetails = () => {
    const { id } = useParams();
    const { data: order } = useGetOrderByIdQuery(id as string);

    return (
        <ThemeProvider theme={GlobalTheme}>
            <Container>
                {order && (
                    <Grid>
                        <Typography variant="h4">
                            Детали заказа от {new Date(order[0].added_date).toISOString().replace('T', ' ').split('.')[0]}
                        </Typography>
                    </Grid>
                )}
                <Grid margin={1}>
                    <TableRow>
                    <TableCell>Номер заказа</TableCell>
                    <TableCell>{order && order[0].order_number}</TableCell>
                    </TableRow>
                    <TableRow>
                    <TableCell>Заказ выполнил</TableCell>
                    <TableCell>{order && order[0].first_name}</TableCell>
                    </TableRow>
                </Grid>
                <Grid margin={1}>
                    <Typography variant="h5">Товары</Typography>
                </Grid>
                <TableContainer component={Paper}>
                    <Table aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Название букета</StyledTableCell>
                                <StyledTableCell align="right">Цена по прайсу</StyledTableCell>
                                <StyledTableCell align="right">Цена продажи</StyledTableCell>
                                <StyledTableCell align="right">Способ оплаты</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>{order && <Order order={order} />}</TableBody>
                    </Table>
                </TableContainer>
            </Container>
        </ThemeProvider>
    );
};

export default OrdersDetails;
