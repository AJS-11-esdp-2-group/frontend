import React from 'react'
import CardItems from '../../Components/Layout/Card/CardItems'
import { useGetAllItemsQuery } from '../../Store/services/crmApi'
import { Grid } from '@mui/material'

const handleClick = () => {
  console.log('click')
}
const Items = () => {
  const { data, isLoading } = useGetAllItemsQuery()
  console.log(data)
  if (isLoading) return <h1>Loading...</h1>
  return (
    <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      {data.map((item: any) => {
        return (
          <CardItems
            key={item.id_item}
            name={item.name_good}
            image={item.image_large !== null ? item.image_large : 'image.jpeg'}
            create_date={item.create_date}
            description={item.goods_description}
            id_category={item.id_category}
            category_description={item.category_description}
            onClick={() => handleClick()}
            onClickDelete={() => handleClick()}
          />
        )
      })}
    </Grid>
  )
}

export default Items
