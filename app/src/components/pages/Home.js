import AuthContext from '../../context'
import React, { useEffect, useState, useContext } from 'react'
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Container, Grid } from '@material-ui/core';
import getCategoryList from '../../services/CategoryList.service'
import getInfoList from '../../services/InfoList.service'
import Info from '../info/Info'
import CreateInfo from '../info/CreateInfo'
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

const Home = (props) => {

    const { getAccessToken } = useContext(AuthContext)

    const classes = useStyles();

    const [categoryList, setCategoryList] = useState([{}])
    const [currentCategory, setCurrentCategory] = useState({ name: "", _id: null })

    const [openNewCategory, setOpenNewCategory] = useState(false)
    const [openDeleteCategory, setOpenDeleteCategory] = useState(false)
    const [openRenameCategory, setOpenRenameCategory] = useState(false)


    const [infoList, setInfoList] = useState([{}])

    const [openNewInfo, setOpenNewInfo] = useState(false)

    // TODO arreglar esto
    useEffect(() => {
        async function loadCategoryList() {
            const response = await getCategoryList(getAccessToken())
            if (response.status === 401) {

            } else if (response.status === 403) {

            } else if (response.status === 500) {

            } else if (response.status === 200) {
                setCategoryList(response.data)
                if (response.data.length !== 0) {
                    setCurrentCategory({ name: response.data[0].name, _id: response.data[0]._id })
                }
            } else {
                // TODO network error
            }
        }
        loadCategoryList()
    }, [getAccessToken])

    useEffect(() => {
        async function loadInfoList() {
            console.log(currentCategory.name)
            const response = await getInfoList(getAccessToken(), currentCategory._id);
            if (response.status === 401) {
            } else if (response.status === 403) {

            } else if (response.status === 500) {

            } else if (response.status === 200) {
                setInfoList(response.data)
            } else {
                // TODO network error
            }
        }
        loadInfoList()
    }, [getAccessToken, currentCategory])

    const refreshCategory = async (action) => {
        const response = await getCategoryList(getAccessToken())
        if (response.status === 401) {

        } else if (response.status === 403) {

        } else if (response.status === 500) {

        } else if (response.status === 200) {
            setCategoryList(response.data)
            if (action.type === "create") {
                const category = response.data.find(category => category.name === action.name)
                setCurrentCategory({ name: category.name, _id: category._id })
            } else if (action.type === "rename") {
                setCurrentCategory({ name: action.name, _id: action._id })
            } else if (action.type === "delete") {
                if (response.data.length === 0) {
                    setCurrentCategory({ name: "", _id: null })
                } else {
                    setCurrentCategory({ name: response.data[0].name, _id: response.data[0]._id })
                }
            }
        } else {
            // TODO network error
        }
    }
    const refreshInfoList = async() => {
        const response = await getInfoList(getAccessToken(),currentCategory._id)
        if (response.status === 401) {

        } else if (response.status === 403) {

        } else if (response.status === 500) {

        } else if (response.status === 200) {
            setInfoList(response.data)
        } else {
            // TODO network error
        }

    }

    /**
     * 1. Pedir info list
     * 2. Actualizar infoList (state)
     * 3. Actualizar currentInfo (puede que no haya ninguna)
     */

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
                                {currentCategory.name}
                            </Typography>

                            <Button fullWidth={true} onClick={() => { setOpenDeleteCategory(true) }}> Eliminar CATEGORIA - </Button>

                            <Button fullWidth={true} onClick={() => { setOpenRenameCategory(true) }}> Renombrar CATEGORIA X </Button>

                            <Button fullWidth={true} color="secondary" variant="contained" onClick={() => { setOpenNewInfo(true) }}> AÑADIR CONTRASEÑA + </Button>
                            {/** CREATE INFO */}
                            {openNewInfo
                                ?
                                <CreateInfo
                                    category={currentCategory}
                                    setOpen={setOpenNewInfo}
                                    refreshInfoList={refreshInfoList}>
                                </CreateInfo>
                                :
                                <></>
                            }

                            {/** PASSWORD INFO */}
                            {infoList.length !== 0 ?
                                infoList.map((item) => {
                                    return (
                                        <Info
                                            _id={item._id}
                                            category_id={currentCategory._id}
                                            name={item.name}
                                            url={item.url}
                                            username={item.username}
                                            password={item.password}
                                            description={item.description}
                                            refreshInfoList={refreshInfoList}
                                        />
                                    )
                                })
                                :
                                ( <></> )
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
                    refreshCategory={refreshCategory}
                    categoryNameRegEx={categoryNameRegEx}
                />

                {/** 4.2. DELETE CATEGORY */}
                <DeleteCategory
                    openDeleteCategory={openDeleteCategory}
                    setOpenDeleteCategory={setOpenDeleteCategory}
                    categoryList={categoryList}
                    currentCategory={currentCategory}
                    refreshCategory={refreshCategory}
                />

                {/** 4.3. RENAME CATEGORY */}

                <RenameCategory
                    openRenameCategory={openRenameCategory}
                    setOpenRenameCategory={setOpenRenameCategory}
                    categoryList={categoryList}
                    currentCategory={currentCategory}
                    categoryNameRegEx={categoryNameRegEx}
                    refreshCategory={refreshCategory}
                />

            </Grid>
        </Container>
    )
}

export default Home;