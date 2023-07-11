import { ListItem, ListItemText, ListItemIcon, Button, TextField, Grid } from '@mui/material';
import { Delete, ModeEdit, Done, Clear } from '@mui/icons-material';
import { MouseEventHandler, ChangeEventHandler } from 'react';

interface Props {
  id: number;
  item_name: string;
  price: number;
  isEditing: boolean;
  editingPrice: number;
  onClick: MouseEventHandler<HTMLDivElement>;
  onDelete: MouseEventHandler<HTMLDivElement>;
  changePrice: MouseEventHandler<HTMLButtonElement>;
  handleSaveClick: (itemId: number, newPrice: number) => void;
  handleCancelClick: MouseEventHandler<HTMLDivElement>;
  handlePriceChange: ChangeEventHandler<HTMLInputElement>;
}

const ItemsList = ({
  id,
  item_name,
  price,
  isEditing,
  onClick,
  onDelete,
  editingPrice,
  changePrice,
  handleSaveClick,
  handleCancelClick,
  handlePriceChange,
}: Props) => {
  const handleSaveButtonClick = () => {
    handleSaveClick(id, editingPrice);
  };

  return (
    <>
      <ListItem key={id}>
        <ListItem
          disableGutters
          secondaryAction={
            <>
              <ListItemIcon onClick={onClick}>
                <ModeEdit />
              </ListItemIcon>
              <ListItemIcon onClick={onDelete}>
                <Delete />
              </ListItemIcon>
            </>
          }
        >
          <ListItemText primary={item_name} />
        </ListItem>
        {isEditing ? (
          <Grid container alignItems="center">
            <TextField
              value={editingPrice}
              onChange={handlePriceChange}
              id="outlined-basic"
              label="Цена"
              variant="outlined"
              type="number"
            />
            <ListItemIcon onClick={handleSaveButtonClick}>
              <Done />
            </ListItemIcon>
            <ListItemIcon onClick={handleCancelClick}>
              <Clear />
            </ListItemIcon>
          </Grid>
        ) : (
          <ListItem key={id} disableGutters secondaryAction={<Button onClick={changePrice}>Изменить Цену</Button>}>
            <ListItemText secondary={price} />
          </ListItem>
        )}
      </ListItem>
    </>
  );
};

export default ItemsList;
