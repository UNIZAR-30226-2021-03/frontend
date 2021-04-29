import { AuthContext } from '../../context'
import React, { useState, useContext } from 'react'
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Button } from '@material-ui/core';
import { renameCategory } from '../../services/Category.service'

const RenameCategory = (props) => {

    const { getAccessToken } = useContext(AuthContext)

    // TODO mejor manera de pasar estos estados (atributo+setter)
    const openRenameCategory = props.openRenameCategory;
    const setOpenRenameCategory = props.setOpenRenameCategory;
    const categoryList = props.categoryList;
    const setCurrentCategory = props.setCurrentCategory;
    const currentCategory = props.currentCategory;
    const setCurrentCategoryID = props.setCurrentCategoryID;
    const categoryNameRegEx = props.categoryNameRegEx;
    const loadCategoryList = props.loadCategoryList;

    const [nameRenameCategory, setNameRenameCategory] = useState("")
    const [errorNameRenameCategory, setErrorNameRenameCategory] = useState(false)

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
                setCurrentCategoryID(category._id)
                loadCategoryList()
            } else {
                // TODO network error
            }

        }
        setNameRenameCategory("")
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
        <Dialog
            open={openRenameCategory}
            onClose={() => { setOpenRenameCategory(false) }}
            aria-labelledby="form-dialog-title"
        >
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
    )
}

export default RenameCategory;