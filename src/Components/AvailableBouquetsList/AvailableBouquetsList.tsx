import { ListItem, ListItemText, ListItemIcon, Button, TextField, Grid, ThemeProvider, ImageListItem } from '@mui/material';
import { Delete, ModeEdit, Done, Clear } from '@mui/icons-material';
import { GlobalTheme } from '../..';
import { MouseEventHandler, ChangeEventHandler } from 'react';

interface Props {
  id: number;
  name_bouquet: string;
  actual_price: number;
  image_bouquet: string;
  added_date: Date;
  isEditing: boolean;
  editingPrice: number;
  changePrice: MouseEventHandler<HTMLButtonElement>;
  handleCancelClick: MouseEventHandler<HTMLDivElement>;
}

const AvailableBouquetsList = ({
  id,
  name_bouquet,
  actual_price,
  image_bouquet,
  isEditing,
  editingPrice,
  changePrice,
  handleCancelClick,
}: Props) => {

  return (
    <>
      <ThemeProvider theme={GlobalTheme}>
        <ImageListItem
          key={id}
          style={{
            border: '1px solid #ccc', borderRadius: '5px', padding: '5px'
          }}>
          <img
            src={image_bouquet}
            srcSet={image_bouquet}
            alt={name_bouquet}
            loading="lazy"
            style={{
              objectFit: 'cover',
              width: '100%',
              height: '100%',
              maxHeight: '200px',
              maxWidth: '300px',
            }}
          />
          <ListItem>
            <ListItemText primary={name_bouquet} style={{ textAlign: 'center' }} />
          </ListItem>
          {isEditing ? (
            <Grid>
              <TextField
                value={editingPrice}
                id="outlined-basic"
                label="Цена"
                variant="outlined"
                type="number"
              />

              <ListItemIcon onClick={handleCancelClick}>
                <Clear />
              </ListItemIcon>
            </Grid>
          ) : (
            <ListItem key={id} disableGutters secondaryAction={<Button onClick={changePrice}>Изменить Цену</Button>}>
              <ListItemText secondary={actual_price} />
            </ListItem>
          )}
        </ImageListItem>
      </ThemeProvider>
    </>
  );
};

export default AvailableBouquetsList;
