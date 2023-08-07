import { apiUrl } from '../../../common/constans';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';

interface Props {
    id: number;
    item_name: string;
    price: number;
    image_small: string;
}

const Items = ({ id, item_name, price, image_small }: Props) => {
    let cardImage;
    if (image_small) {
        cardImage = `${apiUrl}/uploads/${image_small}`;
    }
    return (
        <Card key={id} sx={{ width: 240, height: 170, margin: 1 }}>
            <CardContent style={{ position: 'relative' }}>
                <CardMedia sx={{ height: 80 }} image={cardImage} title={cardImage} />

                <Typography variant="body1" style={{ maxWidth: '100%' }}>
                    {item_name}
                </Typography>
                <Typography variant="body1" color="textSecondary">
                    Цена: {price}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default Items;
