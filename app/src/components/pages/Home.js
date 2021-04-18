
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import React, { useEffect, useState } from 'react'
import getCategoryList from '../../services/CategoryList.service.js'
import { Button, Container, Grid } from '@material-ui/core';
import createCategory from '../../services/Category.service.js'


const Home = () => {

    const [categoryList, setCategoryList] = useState([{}])

    const [openNewCategory, setOpenNewCategory] = useState(false)
    const [nameNewCategory, setNameNewCategory] = useState("")
    const [errorNameNewCategory, setErrorNameNewCategory] = useState(false)

    const [currentCategoy, setCurrentCategory] = useState("")

    useEffect(() => {
        loadCategoryList()
    }, [])

    const loadCategoryList = async () => {
        const response = await getCategoryList()
        if (response === 401) {

        } else if (response === 403) {

        } else if (response === 500) {

        } else {
            setCategoryList(response)
            if (response.length === 0) {
                setCurrentCategory("")
            } else {
                setCurrentCategory(response[0].name)
            }
        }
        console.log(response[0].name)
    }

    const categoryNameRegEx = /^([a-zA-Z0-9\u0600-\u06FF\u0660-\u0669\u06F0-\u06F9 _.-]+)$/i;

    const onChangeNameNewCategory = (e) => {
        setNameNewCategory(e.target.value) // TODO MIRAR SI NOMBRE DE CATEGORIA YA EXISTE
        if (!categoryNameRegEx.test(e.target.value)) {
            setErrorNameNewCategory(true)
        } else {
            setErrorNameNewCategory(false)
        }
    }

    const handleCreateCategory = async () => {
        if (!categoryNameRegEx.test(nameNewCategory)) { // TODO MIRAR SI NOMBRE DE CATEGORIA YA EXISTE
            setErrorNameNewCategory(true)
        } else {
            setOpenNewCategory(false)
            const response = await createCategory(nameNewCategory)
            if (response === 400) {

            } else if (response === 401) {

            } else if (response === 403) {

            } else if (response === 500) {

            } else {
                loadCategoryList()
            }
        }
        setNameNewCategory("")
    }

    return (
        <Container component='main' maxWidth='xl'>
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                spacing={1}
            >
                <Grid item xs={3}>
                    <Grid
                        spacing={1}
                        container
                        direction='column'
                        justify='center'
                        alignItems='center'
                    >
                        {categoryList.map((item, index) => {
                            return (
                                <Grid item>
                                    <Button
                                        fullWidth={true}
                                        onClick={() => {

                                        }}>
                                        {item.name}
                                    </Button>
                                </Grid>
                            )
                        })}

                        <Button
                            fullWidth={true}
                            onClick={() => {
                                setOpenNewCategory(true)
                            }}>
                            Nueva CATEGORIA +
                        </Button>
                    </Grid>
                </Grid>
                <Grid item xs={6}>
                    <h1>
                        {currentCategoy !== "" ?
                            categoryList[0].name
                            :
                            'Por favor, cree una primera categoría'
                        }
                    </h1>

                </Grid>
                <Grid item xs={3}>
                    cuatro
                </Grid>

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
            </Grid>
        </Container>
    )
}

export default Home;