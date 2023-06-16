import CardItems from '../../Components/UI/Layout/Card/CardItems';
import { useGetAllItemsQuery, useDeleteItemMutation } from '../../Store/services/items';
import image from '../../assets/image.jpeg';
import { Grid } from '@mui/material';
const handleClick = () => {};
const Items = () => {
  const { data, isLoading } = useGetAllItemsQuery();
  const [deleteItem] = useDeleteItemMutation();
  if (isLoading) return <h1>Loading...</h1>;
  return (
      <Grid container columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{margin: 'auto'}}>
      {data &&
        data.map((item: any) => {
          return (
            <CardItems
              id={item.id}
              key={item.id}
              name={item.item_name}
              image={image}
              create_date={item.create_date}
              description={item.item_description}
              id_category={item.id_category}
              onClick={() => handleClick()}
              onClickDelete={() => deleteItem(item.id)}
            />
          );
        })}
    </Grid>

  );
};

export default Items;
