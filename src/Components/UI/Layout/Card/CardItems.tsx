import { MouseEventHandler } from 'react';
import {Card, CardHeader, CardMedia, CardActions, Button} from '@mui/material';
import {Edit, DeleteForever} from '@mui/icons-material';

interface IProps {
  id: number;
  image: string;
  name: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
  onClickDelete: MouseEventHandler<HTMLButtonElement>;
  description: string;
  create_date: string;
  id_category: number;
}

const CardItems = ({ id, name, description, image, onClick, onClickDelete }: IProps) => {
  return (
    <Card key={id} sx={{ width: 280, m: '10px' }}>
      <CardMedia component="img" height="194" image={image} alt="Items img"  sx={{borderRadius: 1}}/>
      <CardHeader sx={{ height: '120px' }} title={name} subheader={description} />
      <CardActions>
        <Button
          variant="contained"
          startIcon={<DeleteForever />}
          color="error"
          onClick={onClickDelete}
          aria-label="settings"
        >
          Удалить
        </Button>
        <Button onClick={onClick} startIcon={<Edit />} variant="contained" color="secondary" aria-label="settings">
          Изменить
        </Button>
        ,
      </CardActions>
    </Card>
  );
};

export default CardItems;
