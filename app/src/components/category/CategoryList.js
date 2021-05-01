import React from 'react'
import { Button, Container, Grid } from '@material-ui/core';

const CategoryList = (props) => {

    // TODO mejor manera de pasar estos estados (atributo+setter)
    const setOpenNewCategory = props.setOpenNewCategory;
    const setCurrentCategory = props.setCurrentCategory;
    const categoryList = props.categoryList;

    const handleChangeCategory = (item) => {
        setCurrentCategory({name:item.name, _id:item._id})
        console.log("Change to " + item.name)
    }

    return (
        <Container component='main' maxWidth='xl'>
            {categoryList.length !== 0
                ? categoryList.map((item, index) => {
                    return (
                        <Grid item>
                            <Button
                                fullWidth={true}
                                onClick={() => {
                                    handleChangeCategory(item)
                                }}>
                                {item.name}
                            </Button>
                        </Grid>
                    )
                })
                : (<></>)
            }

            <Button
                fullWidth={true}
                onClick={() => {
                    setOpenNewCategory(true)
                }}>
                Nueva CATEGORIA +
        </Button>
        </Container>
    )
}

export default CategoryList;