import { TableRow, TableCell, TextField, Avatar } from "@mui/material";
import ImageIcon from '@mui/icons-material/Image';
import {ChangeEvent} from 'react';

interface Props {
    id: number;
    image: string;
    name: string;
    price: number;
    total_sum: number;
    actualPriceChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const CartBouquet = ({id, image, name, price, actualPriceChange, total_sum}: Props) => {
    return (
        <TableRow  sx={{width: '100%', display: 'flex', justifyContent: 'strech'}}>
            <TableCell align='left' sx={{width: '15%'}}>
                <Avatar>
                    {image? <img src={image}/> : <ImageIcon />}
                </Avatar>
            </TableCell>
            <TableCell align='center' sx={{width: '35%'}}>{name}</TableCell>
            <TableCell align='center' sx={{width: '25%'}}>{price}</TableCell>
            <TableCell align='right' sx={{width: '25%', padding: '8px', display: 'flex', alignItems: 'baseline'}}>
                <TextField
                    sx={{height:30}}
                    id={id.toString()}
                    name='price'
                    margin='normal'
                    size='small'
                    value={total_sum}
                    type='number'
                    onChange={actualPriceChange} 
                />
            </TableCell>
        </TableRow>
    );
};

export default CartBouquet;