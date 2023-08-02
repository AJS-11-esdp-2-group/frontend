import { ListItem, ListItemText, ListItemIcon, Button, TextField, Grid, ThemeProvider, ImageListItem } from '@mui/material';
import { Clear, Done } from '@mui/icons-material';
import { GlobalTheme } from '../..';
import { MouseEventHandler, ChangeEventHandler, useState } from 'react';

export interface AvailableBouquetsProps {
  id: number;
  count: number;
  name_bouquet: string;
  actual_price: number;
  image_bouquet: string;
  added_date: Date;
  onClick: MouseEventHandler<HTMLDivElement>;
  isEditing: boolean;
  editingPrice: number;
  changePrice: MouseEventHandler<HTMLButtonElement>;
  handleSaveClick: (itemId: number, newPrice: number) => void;
  handleCancelClick: () => void;
  handlePriceChange: ChangeEventHandler<HTMLInputElement>;
  sellBouquet: (id: number, totalSum: number, count: number) => void;
}

const AvailableBouquetsList = ({
  id,
  count,
  name_bouquet,
  actual_price,
  image_bouquet,
  added_date,
  onClick,
  isEditing,
  changePrice,
  handleSaveClick,
  handleCancelClick,
  sellBouquet,
}: AvailableBouquetsProps) => {
  const [totalSum, setTotalSum] = useState(actual_price);
  const [previousTotalSum, setPreviousTotalSum] = useState(actual_price);

  const handlePriceInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTotalSum(Number(event.target.value));
  };

  const handleSaveButtonClick = () => {
    handleSaveClick(id, totalSum || actual_price);
    setPreviousTotalSum(totalSum);
  };

  const handleCancelClickInternal = () => {
    setTotalSum(previousTotalSum);
    handleCancelClick();
  };

  const handleSellButtonClick = () => {
    sellBouquet(id, totalSum || actual_price, count); 
  };

  return (
    <>
      <ThemeProvider theme={GlobalTheme}>
        <ImageListItem
          key={id}
          style={{
            border: '1px solid #ccc', borderRadius: '5px', padding: '5px'
          }}>
          <div onClick={onClick}>
            <img
              src={image_bouquet}
              srcSet={image_bouquet}
              alt={name_bouquet}
              loading="lazy"
              style={{
                objectFit: 'cover',
                width: '100%',
                height: '100%',
                maxHeight: '300px',
              }}
            />
            <ListItem>
              <ListItemText primary={name_bouquet} />
              <ListItemText secondary={'Количество букетов в наличии: ' + count} />
              <ListItemText secondary={'Цена букета по прайсу ' + actual_price + ' тенге'} />
              <ListItemText secondary={'Цена продажи ' + totalSum + ' тенге'} />
            </ListItem>
          </div>
          {isEditing ? (
            <Grid>
              <TextField
                value={totalSum}
                id="outlined-basic"
                label="Цена"
                variant="outlined"
                type="number"
                onChange={handlePriceInputChange}
              />
              <ListItemIcon onClick={handleSaveButtonClick}>
                <Done />
              </ListItemIcon>
              <ListItemIcon onClick={handleCancelClickInternal}>
                <Clear />
              </ListItemIcon>
            </Grid>
          ) : (
            <Button onClick={changePrice}>Изменить цену продажи</Button>
          )}
          <Button onClick={handleSellButtonClick}>Продать букет</Button>
        </ImageListItem>
      </ThemeProvider>
    </>
  );
};

export default AvailableBouquetsList;
