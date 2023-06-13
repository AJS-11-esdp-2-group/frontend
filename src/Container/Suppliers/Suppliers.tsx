import React from "react";
import {useGetAllSuppliersQuery} from "../../Store/services";
import {Container, Grid} from "@mui/material";
import CardSuppliers from "../../Components/Layout/Card/CardSuppliers";



const handleClick = () => {
    console.log('click')
}
const Suppliers = () => {
    const {data, isLoading} = useGetAllSuppliersQuery()
    console.log(data)
    if(isLoading) return <h1>Loading...</h1>
    return (
        <Container sx={{verticalAlign: 'center'}}>
            {data.map((item: any) => {
                return (
                    <CardSuppliers
                        name={item.name_good}
                        image={item.image_large !== null ? item.image_large : 'image.jpeg'}
                        create_date={item.create_date}
                        description={item.goods_description}
                        id_category={item.id_category}
                        category_description={item.category_description}
                        onClick={() => handleClick()}
                        onClickDelete={() => handleClick()}/>
                )
            })}
        </Container>
    )
}

export default Suppliers