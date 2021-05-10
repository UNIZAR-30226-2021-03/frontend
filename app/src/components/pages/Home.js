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
        width: '100%',
        //height: '100%',
        //position: 'relative',
        padding: theme.spacing(5),
        flexGrow: 1,
        minHeight: '100%',
        //width: '100%',
        margin: '0',

        display: 'flex',
        position: 'relative',
        flexDirection: 'column',
        justifyContent: 'center',

        top: '0',
    },
    mainGrid: {
        //padding: theme.spacing(2),
        flexGrow: 1,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'top',
    },
    heading: {
        //padding: theme.spacing(2),
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
    categoryName: {
        padding: theme.spacing(1),
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgb(255, 255, 222)'
    },
    info: {
        //padding: theme.spacing(3),
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgb(255, 255, 222)'
    }

}));

const Home = () => {

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
    const refreshInfoList = async () => {
        const response = await getInfoList(getAccessToken(), currentCategory._id)
        if (response.status === 401) {

        } else if (response.status === 403) {

        } else if (response.status === 500) {

        } else if (response.status === 200) {
            setInfoList(response.data)
        } else {
            // TODO network error
        }

    }

    const categoryNameRegEx = /^([a-zñA-ZÑ0-9\u0600-\u06FF\u0660-\u0669\u06F0-\u06F9 _.-]+)$/i;

    return (
        <Container component='main' maxWidth='xl' className={classes.container}>
            <Grid
                container
                spacing={2}
                //className={classes.mainGrid}
                direction="row"
                justify="center"
                alignItems="stretch"
            >
                {/** 1. CATEGORIES GRID */}
                <Grid item xs={2}>
                    <CategoryList
                        setOpenNewCategory={setOpenNewCategory}
                        setCurrentCategory={setCurrentCategory}
                        categoryList={categoryList}
                    />
                </Grid>

                {/** 2. PASSWORD GRID */}
                <Grid item xs={8}>
                    <Grid
                        container
                        direction="column"
                        justify="flex-start"
                        alignItems="felx-start"
                        spacing={1}
                    >
                        {categoryList.length !== 0
                            ?
                            <>
                                <Grid item>
                                    <Grid
                                        container
                                        direction="row"
                                        justify="center"
                                        alignItems="center"
                                        className={classes.categoryName}
                                    >
                                        {/** 2.1. 1+ CATEGORIES */}
                                        {/** CURRENT CATEGORY BUTTONS */}
                                        <Grid item xs={2}>

                                        </Grid>
                                        <Grid item xs={8}>
                                            {/* TODO STYLE THIS */}
                                            <Typography
                                                component='div'
                                                variant='h4'
                                                align='center'>
                                                {currentCategory.name}
                                            </Typography>
                                        </Grid>

                                        <Grid item xs={1}>
                                            <Button
                                                fullWidth={true}
                                                variant="contained"
                                                onClick={() => { setOpenDeleteCategory(true) }}>
                                                ELIMINAR
                                            </Button>
                                        </Grid>
                                        <Grid item xs={1}>

                                            <Button
                                                fullWidth={true}
                                                variant="contained"
                                                onClick={() => { setOpenRenameCategory(true) }}> RENOMBRAR </Button>
                                        </Grid>
                                    </Grid>
                                </Grid>

                                {/** CREATE INFO */}
                                {openNewInfo
                                    ?
                                    <Grid item>
                                        <CreateInfo
                                            category={currentCategory}
                                            setOpen={setOpenNewInfo}
                                            refreshInfoList={refreshInfoList}>
                                        </CreateInfo>
                                    </Grid>
                                    :
                                    <></>
                                }

                                {/** PASSWORD INFO */}
                                {/* <Grid item>
                                    <Grid
                                        container
                                        direction="column"
                                        justify="center"
                                        alignItems="stretch"
                                    > */}
                                {infoList.length !== 0 ?
                                    infoList.map((item) => {
                                        return (
                                            <Grid item>
                                                <Info
                                                    _id={item._id}
                                                    category_id={currentCategory._id}
                                                    name={item.name}
                                                    url={item.url}
                                                    username={item.username}
                                                    password={item.password}
                                                    description={item.description}
                                                    file={item.file}
                                                    refreshInfoList={refreshInfoList}
                                                />
                                            </Grid>
                                        )
                                    })
                                    :
                                    (<></>)
                                }
                                {/* </Grid>
                                </Grid> */}
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

                        <Grid item xs={12}>

                            <Button
                                variant="contained"
                                onClick={() => { setOpenNewInfo(true) }}>
                                AÑADIR CONTRASEÑA +
                            </Button>
                        </Grid>
                    </Grid>

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