import { GlobalTheme } from '../../..';
import { useState } from 'react';
import { Grid, Button, TextField, Typography, Container, Paper, ThemeProvider } from '@mui/material';
import { purple } from '@mui/material/colors';

interface Props {
    paymentTypes: {
        type: string;
        id: number;
    }[];
    sum: number | null;
    saleHandler: () => void;
    selectPaymentType: (selectedPayment: number) => void;
}

const Payment = ({ sum, saleHandler, paymentTypes, selectPaymentType }: Props) => {
    const [inputValue, setInputValue] = useState('');
    const [selectedPaymentType, setSelectedPaymentType] = useState<number | null>(null);
    const buttons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, '.', 'X'];
    const handleButtonClick = (value: number | string) => {
        if (value === 'X') {
            setInputValue(inputValue.slice(0, -1));
        } else {
            setInputValue(inputValue + value);
        }
    };

    const isInputEmpty = inputValue.trim() === '';

    return (
        <ThemeProvider theme={GlobalTheme}>
            <Container>
                <Paper elevation={3} sx={{ background: '#383b48', padding: '16px' }}>
                    <Grid container alignItems='center' spacing={2}>
                        <Grid item xs={12} sm={2}>
                            <Typography variant='h6'>К оплате:</Typography>
                        </Grid>
                        <Grid item xs={12} sm={10}>
                            <Typography color='secondary' variant='h2'>
                                {sum}.00 ₸
                            </Typography>
                        </Grid>
                    </Grid>
                </Paper>
                <Grid container spacing={4} marginTop={1}>
                    <Grid item xs={12} sm={6}>
                        <Typography variant='h5'>Введите сумму:</Typography>
                        <TextField
                            type='text'
                            variant='outlined'
                            fullWidth
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                        />
                        <Grid container spacing={2}>
                            {buttons.map((button, index) => (
                                <Grid key={index} sx={{ marginTop: 1 }} item xs={4}>
                                    <Button variant='contained' fullWidth onClick={() => handleButtonClick(button)}>
                                        {button}
                                    </Button>
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant='h5'>Выберите способ оплаты:</Typography>
                        <Grid container spacing={1}>
                            {paymentTypes.map((type, index) => (
                                <Grid key={index} item xs={12} sm={6}>
                                    <Button
                                        sx={{
                                            marginBottom: 1,
                                            background: 'primary',
                                            ':focus': {
                                                background: purple[700],
                                            },
                                        }}
                                        key={type.id}
                                        variant='contained'
                                        fullWidth
                                        color='primary'
                                        disabled={isInputEmpty}
                                        onClick={() => {
                                            setSelectedPaymentType(type.id);
                                            selectPaymentType(type.id);
                                        }}
                                    >
                                        {type.type}
                                    </Button>
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
            <Grid sx={{ display: 'flex', flexDirection: 'column', marginTop: 5 }}>
                <Button
                    sx={{ display: 'flex', flexDirection: 'column', background: purple[700] }}
                    variant='contained'
                    disabled={isInputEmpty}
                    onClick={saleHandler}
                >
                    <Typography variant='h6'>Внесите оплату для закрытия заказа</Typography>
                    <Typography>К оплате {sum}.00 ₸</Typography>
                </Button>
            </Grid>
        </ThemeProvider>
    );
};

export default Payment;
