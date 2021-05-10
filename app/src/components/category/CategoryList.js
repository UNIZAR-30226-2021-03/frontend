import React from 'react'
import { Button, Container, Grid } from '@material-ui/core';

const CategoryList = (props) => {

    // TODO mejor manera de pasar estos estados (atributo+setter)
    const setOpenNewCategory = props.setOpenNewCategory;
    const setCurrentCategory = props.setCurrentCategory;
    const categoryList = props.categoryList;

    const handleChangeCategory = (item) => {
        setCurrentCategory({ name: item.name, _id: item._id })
        console.log("Change to " + item.name)
    }

    return (
        <Container component='main' maxWidth='xl'>

            <Grid
                container
                spacing={1}
                direction="column"
                justify="flex-start"
                alignItems="stretch"
            >
                {categoryList.length !== 0
                    ? categoryList.map((item, index) => {
                        return (
                            <Grid item xs={12}>
                                <Button
                                    variant="contained"
                                    fullWidth
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
                <Grid item xs={12}>
                    <Button
                        variant="contained"
                        fullWidth
                        onClick={() => {
                            setOpenNewCategory(true)
                        }}>
                        Nueva CATEGORIA +
                    </Button>
                </Grid>
            </Grid>
        </Container>
    )
}

export default CategoryList;