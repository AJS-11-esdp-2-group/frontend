import CardItems from '../../Components/UI/Layout/Card/CardItems';
import { useGetAllItemsQuery } from '../../Store/services/items';
import image from '../../assets/image.jpeg';
import { Grid } from '@mui/material';
const handleClick = () => {};
const Items = () => {
  const { data, isLoading } = useGetAllItemsQuery();
  if (isLoading) return <h1>Loading...</h1>;
  return (
    <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
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
              onClickDelete={() => handleClick()}
            />
          );
        })}
    </Grid>
  );
};

export default Items;
