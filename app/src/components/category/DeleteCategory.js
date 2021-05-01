import AuthContext from '../../context'
import React, { useContext } from 'react'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Button } from '@material-ui/core';
import { deleteCategory } from '../../services/Category.service'

const CreateCategory = (props) => {

    const { getAccessToken } = useContext(AuthContext)

    const openDeleteCategory = props.openDeleteCategory;
    const setOpenDeleteCategory = props.setOpenDeleteCategory;
    const categoryList = props.categoryList;
    const currentCategory = props.currentCategory;
    const refreshCategory = props.refreshCategory;


    const handleDeleteCategory = async () => {
        setOpenDeleteCategory(false)
        const category = categoryList.find(category => category.name === currentCategory.name)
        console.log("CATEGORY: " + category._id)
        const response = await deleteCategory(getAccessToken(), category._id)
        if (response.status === 400) {

        } else if (response.status === 401) {
        } else if (response.status === 403) {
        } else if (response.status === 500) {
        } else if (response.status === 200) {
            // TODO editar state hook de lista de categorias para eliminar el elemento (mas eficiente que cargar todas otra vez llamando a loadCategoryList)
            refreshCategory({type:"delete"})
        } else {
            // TODO network error
        }
    }

    return (
        <Dialog
            open={openDeleteCategory}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{"¿Desea borrar la categria " + currentCategory.name + " ?"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    ¿Desea borrar la categoría "{currentCategory.name}"?
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

    )
}

export default CreateCategory;