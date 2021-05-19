import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Button, Container, Grid } from '@material-ui/core'
import { BsPlus } from "react-icons/bs";

const useStyles = makeStyles((theme) => ({
    button: {
        textTransform: "none",
        fontSize: '20px',
        padding: '8px 20px',
        borderRadius: '3px',
        outline: 'none',
        cursor: 'pointer',
        justifyContent: 'center',
        alignItems: 'center',
        transition: 'all 0.3s ease-out',
        border: '1px solid rgb(30,61,88)',
        backgroundColor: 'rgb(5, 125, 205)',
        color: 'rgb(232, 238, 241)',
        '&:hover': {
            backgroundColor: 'transparent',
            color: 'rgb(30,61,88)',
            transition: 'all 0.3s ease-out',
            border: '1px solid rgb(5, 125, 205)',
        }
    },
}));

const CategoryList = (props) => {

    const classes = useStyles();

    // TODO mejor manera de pasar estos estados (atributo+setter)
    const setOpenNewCategory = props.setOpenNewCategory
    const setOpenNewInfo = props.setOpenNewInfo
    const setCurrentCategory = props.setCurrentCategory
    const categoryList = props.categoryList

    const handleChangeCategory = (item) => {
        setCurrentCategory({ name: item.name, _id: item._id })
        setOpenNewInfo(false)
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
                                    className={classes.button}
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
                        className={classes.button}
                        variant="contained"
                        fullWidth
                        onClick={() => {
                            setOpenNewCategory(true)
                        }}>
                        <BsPlus />
                    </Button>
                </Grid>
            </Grid>
        </Container>
    )
}

export default CategoryList