import { MouseEventHandler } from 'react';
import {Card, CardHeader, CardMedia, CardActions, Button} from '@mui/material';
import {Edit, DeleteForever} from '@mui/icons-material';

interface IProps {
  id: number;
  name: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
  onClickDelete: MouseEventHandler<HTMLButtonElement>;
  description: string;
  create_date: string;
  id_category: number;
  id_subcategory: number;
  id_under_subcategory: number;
}

const CardItems = ({ id, name, description, onClick, onClickDelete }: IProps) => {
  return (
    <Card key={id} sx={{ width: 280, m: '10px' }}>
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
