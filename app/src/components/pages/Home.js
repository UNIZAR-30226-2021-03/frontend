import AuthContext from '../../context'
import React, { useEffect, useState, useContext } from 'react'
import Typography from '@material-ui/core/Typography';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';
import { Button, Container, Grid } from '@material-ui/core';
import getCategoryList from '../../services/CategoryList.service'
import getInfoList from '../../services/InfoList.service'
import Info from '../info/Info'
import CreateInfo from '../info/CreateInfo'
import CategoryList from '../category/CategoryList'
import CreateCategory from '../category/CreateCategory'
import DeleteCategory from '../category/DeleteCategory'
import { BsFillTrashFill, BsPencil, BsPlus } from "react-icons/bs";

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
    },
    margin: {
        margin: theme.spacing(1),
    },

}));

const Home = () => {

    const { getAccessToken, signOutToken } = useContext(AuthContext)

    const classes = useStyles();

    const [categoryList, setCategoryList] = useState([{}])
    const [currentCategory, setCurrentCategory] = useState({ name: "", _id: null })

    const [openNewCategory, setOpenNewCategory] = useState(false)
    const [openDeleteCategory, setOpenDeleteCategory] = useState(false)
    const [openRenameCategory, setOpenRenameCategory] = useState(false)

    const [orderInfo, setOrderInfo] = useState("date")

    const [infoList, setInfoList] = useState([{}])

    const [openNewInfo, setOpenNewInfo] = useState(false)

    useEffect(() => {
        async function loadCategoryList() {
            const response = await getCategoryList(getAccessToken())
            if (response.status === 401) {
                signOutToken()
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
    }, [getAccessToken, signOutToken])

    useEffect(() => {
        async function loadInfoList() {
            console.log("currCategory: ", currentCategory.name)
            const response = await getInfoList(getAccessToken(), currentCategory._id);
            if (response.status === 401) {
                signOutToken()
            } else if (response.status === 403) {

            } else if (response.status === 500) {

            } else if (response.status === 200) {
                const info = sortData(response.data)
                setInfoList(info)
                console.log(info)
            } else {
                // TODO network error
            }
        }
        loadInfoList()
    }, [getAccessToken, currentCategory, signOutToken])



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
    const refreshInfoList = async (orderInfo) => {
        const response = await getInfoList(getAccessToken(), currentCategory._id)
        if (response.status === 401) {

        } else if (response.status === 403) {

        } else if (response.status === 500) {

        } else if (response.status === 200) {
            const info = sortData(response.data, orderInfo)
            setInfoList(info)
            console.log(info)
        } else {
            // TODO network error
        }

    }

    const sortData = (data, orderInfo) => {
        console.log("Sorting by", orderInfo)
        if (orderInfo === "name") {
            data.sort((a, b) => {
                let fa = a.name.toLowerCase(),
                    fb = b.name.toLowerCase()

                if (fa < fb) {
                    return -1
                } else if (fa > fb) {
                    return 1
                } else {
                    return 0
                }
            })
        } else if (orderInfo == "date") {
            data.sort((a, b) => {
                let da = new Date(a.creation_date),
                    db = new Date(b.creation_date);
                return da - db;
            });
        }
        return data
    }

    const handleChangeOrder = (e) => {
        console.log(orderInfo)
        setOrderInfo(e.target.value)
        refreshInfoList(e.target.value)
    }

    const categoryNameRegEx = /^([a-zñA-ZÑ0-9\u0600-\u06FF\u0660-\u0669\u06F0-\u06F9 _.-]+)$/i;

    const BootstrapInput = withStyles((theme) => ({
        root: {
            'label + &': {
                marginTop: theme.spacing(3),
            },
        },
        input: {
            borderRadius: 4,
            position: 'relative',
            backgroundColor: theme.palette.background.paper,
            border: '1px solid #ced4da',
            fontSize: 16,
            padding: '10px 26px 10px 12px',
            transition: theme.transitions.create(['border-color', 'box-shadow']),
            // Use the system font instead of the default Roboto font.
            fontFamily: [
                '-apple-system',
                'BlinkMacSystemFont',
                '"Segoe UI"',
                'Roboto',
                '"Helvetica Neue"',
                'Arial',
                'sans-serif',
                '"Apple Color Emoji"',
                '"Segoe UI Emoji"',
                '"Segoe UI Symbol"',
            ].join(','),
            '&:focus': {
                borderRadius: 4,
                borderColor: '#80bdff',
                boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
            },
        },
    }))(InputBase);

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
                        setOpenNewInfo={setOpenNewInfo}
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
                        alignItems="stretch"
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
                                                size="large"
                                                /* fullWidth={true} */
                                                variant="contained"
                                                onClick={() => { setOpenDeleteCategory(true) }}>
                                                <BsFillTrashFill />
                                            </Button>
                                        </Grid>
                                        <Grid item xs={1}>

                                            <Button
                                                size="large"
                                                /* fullWidth={true} */
                                                variant="contained"
                                                onClick={() => { setOpenRenameCategory(true) }}>
                                                <BsPencil />
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Grid>

                                <Grid item>
                                    <Grid container
                                        direction="row"
                                        justify="stretch"
                                        alignItems="center">
                                        <Grid item xs={2}>
                                            <Button
                                                size="large"
                                                fullWidth={true} variant="contained"
                                                onClick={() => { setOpenNewInfo(true) }}>
                                                CREATE INFO
                                            </Button>
                                        </Grid>
                                        <Grid item xs={8}></Grid>
                                        <Grid item xs={2}>

                                            <FormControl className={classes.margin}>
                                                <InputLabel htmlFor="demo-customized-select-native">Ordenación</InputLabel>
                                                <NativeSelect
                                                    id="demo-customized-select-native"
                                                    value={orderInfo}
                                                    onChange={handleChangeOrder}
                                                    input={<BootstrapInput />}
                                                >
                                                    <option value={"name"}>Nombre</option>
                                                    <option value={"date"}>Fecha de creación</option>

                                                </NativeSelect>
                                            </FormControl>
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
                            </>
                            :
                            <>
                                {/** 2.2. 0 CATEGORY */}
                                <Grid
                                    container
                                    className={classes.info}
                                    spacing={1}
                                    direction='row'
                                    justify='flex-end'
                                    alignItems='center'
                                    className={classes.info}
                                >
                                    <Grid item xs={7}>
                                        <Typography
                                            component='div'
                                            variant='h5'
                                            align='center'
                                        >
                                            Por favor, cree una primera categoría
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={2}>

                                    </Grid>
                                    <Grid item xs={3}>
                                        <Button
                                            onClick={() => { setOpenNewCategory(true) }}
                                            variant="contained"
                                            size="large"
                                        >
                                            <BsPlus />
                                        </Button>
                                    </Grid>
                                </Grid>
                            </>
                        }
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