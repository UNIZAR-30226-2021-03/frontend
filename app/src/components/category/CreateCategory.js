import { AuthContext } from '../../context'
import React, { useState, useContext } from 'react'
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Button } from '@material-ui/core';
import { createCategory } from '../../services/Category.service'

const CreateCategory = (props) => {

    const { getAccessToken } = useContext(AuthContext)

    // TODO mejor manera de pasar estos estados (atributo+setter)
    const openNewCategory = props.openNewCategory;
    const setOpenNewCategory = props.setOpenNewCategory;
    const setCurrentCategory = props.setCurrentCategory;
    //const setCurrentCategoryID = props.setCurrentCategoryID;
    const loadCategoryList = props.loadCategoryList;
    const categoryNameRegEx = props.categoryNameRegEx;

    const [nameNewCategory, setNameNewCategory] = useState("")
    const [errorNameNewCategory, setErrorNameNewCategory] = useState(false)

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
                //TODO no se puede (recibir el ID???)
                //setCurrentCategoryID()
            } else {
                // TODO network error
            }
        }
        // TODO y esto da error de undefined????
        loadCategoryList()
        setNameNewCategory("")
    }



    const onChangeNameNewCategory = (e) => {
        setNameNewCategory(e.target.value) // TODO MIRAR SI NOMBRE DE CATEGORIA YA EXISTE
        if (!categoryNameRegEx.test(e.target.value)) {
            setErrorNameNewCategory(true)
        } else {
            setErrorNameNewCategory(false)
        }
    }

    return (
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
    )
}

export default CreateCategory;