
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { makeStyles } from '@material-ui/core/styles';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import React, { useEffect, useState, useContext } from 'react'
import getCategoryList from '../../services/CategoryList.service.js'
import { Button, Container, Grid } from '@material-ui/core';
import { createCategory, deleteCategory, renameCategory } from '../../services/Category.service.js'
import AuthContext from '../../context'


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

    const [openNewCategory, setOpenNewCategory] = useState(false)
    const [nameNewCategory, setNameNewCategory] = useState("")
    const [errorNameNewCategory, setErrorNameNewCategory] = useState(false)

    const [openDeleteCategory, setOpenDeleteCategory] = useState(false)

    const [openRenameCategory, setOpenRenameCategory] = useState(false)
    const [nameRenameCategory, setNameRenameCategory] = useState("")
    const [errorNameRenameCategory, setErrorNameRenameCategory] = useState(false)


    useEffect(() => {
        loadCategoryList()
    }, [])

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
            } else if (currentCategory === "") { // Si existen categorias y esta vacía
                setCurrentCategory(response.data[0].name)
            } else if (response.data.find(category => category.name === currentCategory) === undefined) { // Si la cateogoria actual se ha borrado
                setCurrentCategory(response.data[0].name)
            }
        } else {
            // TODO network error
        }
    }

    const handleCreateCategory = async () => {
        if (!categoryNameRegEx.test(nameNewCategory)) {
            // TODO MIRAR SI NOMBRE DE CATEGORIA YA EXISTE
            // TODO tener en cuenta que son ALL CAPS
            setErrorNameNewCategory(true)
        } else {
            setOpenNewCategory(false)
            const response = await createCategory(getAccessToken(), nameNewCategory)
            if (response.status === 400) {

            } else if (response.status === 401) {

            } else if (response.status === 403) {

            } else if (response.status === 500) {

            } else if (response.status === 200) {
                setCurrentCategory(nameNewCategory)
            } else {
                // TODO network error
            }
        }
        loadCategoryList()
        setNameNewCategory("")
    }

    const handleDeleteCategory = async () => {
        setOpenDeleteCategory(false)
        const category = categoryList.find(category => category.name === currentCategory)
        console.log("CATEGORY: " + category._id)
        const response = await deleteCategory(getAccessToken(), category._id)
        if (response.status === 400) {

        } else if (response.status === 401) {
        } else if (response.status === 403) {
        } else if (response.status === 500) {
        } else if (response.status === 200) {
            // TODO editar state hook de lista de categorias para eliminar el elemento (mas eficiente que cargar todas otra vez llamando a loadCategoriyList)
            setCurrentCategory("")

        } else {
            // TODO network error
        }
        loadCategoryList()

    }

    const handleChangeCategory = (item) => {
        setCurrentCategory(item.name)
        console.log("Change to " + item.name)
    }

    const handleRenameCategory = async () => {
        if (!categoryNameRegEx.test(nameRenameCategory)) {
            // TODO MIRAR SI NOMBRE DE CATEGORIA YA EXISTE
            // TODO tener en cuenta que son ALL CAPS
            setErrorNameRenameCategory(true)
        } else {
            setOpenRenameCategory(false)
            const category = categoryList.find(category => category.name === currentCategory)
            const response = await renameCategory(getAccessToken(), nameRenameCategory, category._id)
            if (response.status === 400) {

            } else if (response.status === 401) {

            } else if (response.status === 403) {

            } else if (response.status === 500) {

            } else if (response.status === 200) {
                setCurrentCategory(nameRenameCategory)
            } else {
                // TODO network error
            }
            loadCategoryList()
        }
        setNameRenameCategory("")
    }

    const categoryNameRegEx = /^([a-zñA-ZÑ0-9\u0600-\u06FF\u0660-\u0669\u06F0-\u06F9 _.-]+)$/i;

    const onChangeNameNewCategory = (e) => {
        setNameNewCategory(e.target.value) // TODO MIRAR SI NOMBRE DE CATEGORIA YA EXISTE
        if (!categoryNameRegEx.test(e.target.value)) {
            setErrorNameNewCategory(true)
        } else {
            setErrorNameNewCategory(false)
        }
    }

    const onChangeNameRenameCategory = (e) => {
        setNameRenameCategory(e.target.value) // TODO MIRAR SI NOMBRE DE CATEGORIA YA EXISTE
        if (!categoryNameRegEx.test(e.target.value)) {
            setErrorNameRenameCategory(true)
        } else {
            setErrorNameRenameCategory(false)
        }
    }

    return (
        <Container component='main' maxWidth='xl' className={classes.container}>
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                spacing={1}
            >
                {/** 1. CATEGORIES GRID */}
                <Grid item xs={3}>
                    <Grid
                        spacing={1}
                        container
                        direction='column'
                        justify='center'
                        alignItems='center'
                    >
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
                    </Grid>
                </Grid>

                {/** 2. PASSWORD GRID */}
                <Grid item xs={6}>
                    {categoryList.length !== 0
                        ?
                        <>
                            {/** 2.1. 1+ CATEGORIES */}
                            <Typography component='div' variant='h3' align='center'>
                                {currentCategory}
                            </Typography>
                            <Button fullWidth={true} onClick={() => { setOpenDeleteCategory(true) }}> Eliminar CATEGORIA - </Button>
                            <Button fullWidth={true} onClick={() => { setOpenRenameCategory(true) }}> Renombrar CATEGORIA X </Button>
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
                <Grid item xs={3}>

                </Grid>

                {/** 4. DIALOGS */}
                {/** 4.1. NEW CATEGORY */}
                <Dialog
                    open={openNewCategory}
                    onClose={() => { setOpenNewCategory(false) }}
                    aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Nombre Categoría Nueva:</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Introduzca el nombre de la nueva categoría
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="none"
                            label="Nombre"
                            fullWidth={true}
                            required
                            size="medium"
                            name="name"
                            autoComplete="off"
                            onChange={onChangeNameNewCategory}
                            value={nameNewCategory}
                            error={errorNameNewCategory}
                            helperText={errorNameNewCategory ? 'Debe contener solo carácteres alfanuméricos' : ' '}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCreateCategory} color="primary" fullWidth={true}>
                            Crear
                        </Button>
                    </DialogActions>
                </Dialog>

                {/** 4.2. DELETE CATEGORY */}
                <Dialog
                    open={openDeleteCategory}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            ¿Desea borrar la categoría "{currentCategory}"?
                        </DialogContentText>
                    </DialogContent>

                    <DialogActions>

                        <Button onClick={() => { setOpenDeleteCategory(false) }} color="primary">
                            Cancelar
                        </Button>
                        <Button onClick={handleDeleteCategory} color="primary">
                            Aceptar
                        </Button>
                    </DialogActions>
                </Dialog>

                {/** 4.3. RENAME CATEGORY */}
                <Dialog
                    open={openRenameCategory}
                    onClose={() => { setOpenRenameCategory(false) }}
                    aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Nombre Categoría:</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Introduzca el nuevo nombre de la categoría
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="none"
                            label="Nombre"
                            fullWidth={true}
                            required
                            size="medium"
                            name="name"
                            autoComplete="off"
                            onChange={onChangeNameRenameCategory}
                            value={nameRenameCategory}
                            error={errorNameRenameCategory}
                            helperText={errorNameRenameCategory ? 'Debe contener solo carácteres alfanuméricos' : ' '}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleRenameCategory} color="primary" fullWidth={true}>
                            Renombrar
                        </Button>
                    </DialogActions>
                </Dialog>
            </Grid>
        </Container>
    )
}

export default Home;