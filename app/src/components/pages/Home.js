import { AuthContext } from '../../context'
import React, { useEffect, useState, useContext } from 'react'
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Container, Grid } from '@material-ui/core';
import getCategoryList from '../../services/CategoryList.service'
import getInfoList from '../../services/InfoList.service'
import Info from '../info/Info'
import CreateInfo from '../createInfo/CreateInfo'
import CategoryList from '../category/CategoryList'
import CreateCategory from '../category/CreateCategory'
import DeleteCategory from '../category/DeleteCategory'

import RenameCategory from '../category/RenameCategory';

const useStyles = makeStyles((theme) => ({
    container: {
        paddingTop: theme.spacing(10),
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    heading: {
        padding: theme.spacing(2),
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    submit: {
        textTransform: "none",
        fontSize: '20px',
        padding: '8px 20px',
        borderRadius: '3px',
        outline: 'none',
        cursor: 'pointer',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
        color: 'rgb(30,61,88)',
        transition: 'all 0.3s ease-out',
        border: '1px solid rgb(30,61,88)',
        '&:hover': {
            backgroundColor: 'rgb(5, 125, 205)',
            color: 'rgb(232, 238, 241)',
            transition: 'all 0.3s ease-out',
            border: '1px solid rgb(5, 125, 205)',
        }
    },

}));

const Home = () => {

    const { getAccessToken } = useContext(AuthContext)

    const classes = useStyles();

    const [categoryList, setCategoryList] = useState([{}])
    const [currentCategory, setCurrentCategory] = useState("")
    const [currentCategoryID, setCurrentCategoryID] = useState(null)

    const [openNewCategory, setOpenNewCategory] = useState(false)
    const [openDeleteCategory, setOpenDeleteCategory] = useState(false)
    const [openRenameCategory, setOpenRenameCategory] = useState(false)


    const [infoList, setInfoList] = useState([{}])
    const [currentInfo, setCurrentInfo] = useState("")

    const [openNewInfo, setOpenNewInfo] = useState(false)

    // TODO arreglar esto
    useEffect(() => {
        loadCategoryList()
        console.log("puta")
    }, []) // TODO resolver dependencias bien (??)

    const loadCategoryList = async () => {
        const response = await getCategoryList(getAccessToken())
        if (response.status === 401) {

        } else if (response.status === 403) {

        } else if (response.status === 500) {

        } else if (response.status === 200) {
            setCategoryList(response.data)
            console.log(response.data)
            if (response.data.length === 0) { // Si no existe ninguna categoria
                setCurrentCategory("")
                setCurrentCategoryID(null)
            } else if (currentCategory === "") { // Si existen categorias y esta vacía
                setCurrentCategory(response.data[0].name)
                setCurrentCategoryID(response.data[0]._id)
                loadInfoList()
            } else if (response.data.find(category => category.name === currentCategory) === undefined) { // Si la cateogoria actual se ha borrado
                setCurrentCategory(response.data[0].name)
                setCurrentCategoryID(response.data[0]._id)
                loadInfoList()
            }
        } else {
            // TODO network error
        }
    }

    // TODO quitar parametro si se soluciona
    const loadInfoList = async () => {

        if (currentCategory !== "") {
            console.log("ahora:", currentCategory)
            // TODO resolver, a veces category undefinec

            //const category = categoryList.find(category => category.name === currentCategory)
            console.log(currentCategory)
            console.log(categoryList)
            const response = await getInfoList(getAccessToken(), currentCategoryID)
            if (response.status === 401) {

            } else if (response.status === 403) {

            } else if (response.status === 500) {

            } else if (response.status === 200) {
                setInfoList(response.data)
                console.log(response.data)
                // TODO revisar esta funcion (necesariia esta parte??)
                if (response.data.length === 0) { // Si no existe ninguna categoria
                    setCurrentInfo("")
                } else if (currentInfo === "") { // Si existen categorias y esta vacía
                    setCurrentInfo(response.data[0].name)
                } else if (response.data.find(info => info.name === currentInfo) === undefined) { // Si la cateogoria actual se ha borrado
                    setCurrentInfo(response.data[0].name)
                }
            } else {
                // TODO network error
            }
        }
    }

    const categoryNameRegEx = /^([a-zñA-ZÑ0-9\u0600-\u06FF\u0660-\u0669\u06F0-\u06F9 _.-]+)$/i;


    return (
        <Container component='main' maxWidth='xl' className={classes.container}>
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                spacing={3}
            >
                {/** 1. CATEGORIES GRID */}
                <Grid item xs={2}>
                    <Grid
                        spacing={1}
                        container
                        direction='column'
                        justify='center'
                        alignItems='center'
                    >
                        <CategoryList
                            setOpenNewCategory={setOpenNewCategory}
                            setCurrentCategory={setCurrentCategory}
                            setCurrentCategoryID={setCurrentCategoryID}
                            categoryList={categoryList}
                        />

                    </Grid>
                </Grid>

                {/** 2. PASSWORD GRID */}
                <Grid item xs={8}>
                    {categoryList.length !== 0
                        ?
                        <>
                            {/** 2.1. 1+ CATEGORIES */}

                            {/** CURRENT CATEGORY BUTTONS */}
                            <Typography component='div' variant='h3' align='center'>
                                {currentCategory}
                            </Typography>

                            <Button fullWidth={true} onClick={() => { setOpenDeleteCategory(true) }}> Eliminar CATEGORIA - </Button>

                            <Button fullWidth={true} onClick={() => { setOpenRenameCategory(true) }}> Renombrar CATEGORIA X </Button>

                            {/** PASSWORD INFO */}
                            <Button fullWidth={true} color="secondary" variant="contained" onClick={() => { setOpenNewInfo(true) }}> AÑADIR CONTRASEÑA + </Button>

                            {infoList.length !== 0
                                ? infoList.map((item, index) => {
                                    return (
                                        <Info name={item.name} url={item.url} username={item.username} password={item.password} description={item.description} />
                                    )
                                })
                                :
                                (<></>)
                            }

                            {/** CREATE INFO */}
                            {openNewInfo
                                ?
                                <CreateInfo
                                    category={currentCategory}
                                    categoryList={categoryList}
                                    setOpen={setOpenNewInfo}
                                    loadInfoList={loadInfoList}>
                                </CreateInfo>
                                :
                                <></>
                            }



                        </>
                        :
                        <>
                            {/** 2.2. 0 CATEGORY */}
                            <h2>
                                Por favor, cree una primera categoría
                            </h2>
                            <Button fullWidth={true} onClick={() => { setOpenNewCategory(true) }}> Nueva CATEGORIA + </Button>
                        </>
                    }
                </Grid>

                {/** 3. SEARCH GRID (EMPTY) */}
                <Grid item xs={2}>

                </Grid>

                {/** 4. DIALOGS */}
                {/** 4.1. NEW CATEGORY */}
                <CreateCategory
                    openNewCategory={openNewCategory}
                    setOpenNewCategory={setOpenNewCategory}
                    setCurrentCategory={setCurrentCategory}
                    setCurrentCategoryID={setCurrentCategoryID}
                    loadCategoryList={loadCategoryList}
                    categoryNameRegEx={categoryNameRegEx}
                />

                {/** 4.2. DELETE CATEGORY */}
                <DeleteCategory
                    openDeleteCategory={openDeleteCategory}
                    setOpenDeleteCategory={setOpenDeleteCategory}
                    categoryList={categoryList}
                    currentCategory={currentCategory}
                    setCurrentCategory={setCurrentCategory}
                    setCurrentCategoryID={setCurrentCategoryID}
                    loadCategoryList={loadCategoryList}
                />

                {/** 4.3. RENAME CATEGORY */}

                <RenameCategory
                    openRenameCategory={openRenameCategory}
                    setOpenRenameCategory={setOpenRenameCategory}
                    categoryList={categoryList}
                    setCurrentCategory={setCurrentCategory}
                    currentCategory={currentCategory}
                    setCurrentCategoryID={setCurrentCategoryID}
                    categoryNameRegEx={categoryNameRegEx}
                    loadCategoryList={loadCategoryList}
                />

            </Grid>
        </Container>
    )
}

export default Home;