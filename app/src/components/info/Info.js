import React, {useState, useContext} from 'react'
import AuthContext from '../../context'
import { Container, Grid, Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { BsFillCaretDownFill,BsFillCaretUpFill } from "react-icons/bs";
import { deleteInfo,renameInfo } from '../../services/Info.service.js'
const Info = (props) => {

    const { getAccessToken } = useContext(AuthContext)

    const name = props.name
    const username = props.username
    const url = props.url
    const description = props.description
    const password = props.password
    const _id = props._id
    const category_id = props.category_id
    const refreshInfoList = props.refreshInfoList;
    
    const [nameNewInfo, setNameNewInfo] = useState(name)
    const [usernameNewInfo, setUsernameNewInfo] = useState(username)
    const [passwordNewInfo, setPasswordNewInfo] = useState(password)
    const [urlNewInfo, setUrlNewInfo] = useState(url)
    const [descriptionNewInfo, setDescriptionNewInfo] = useState(description)

    const [onChange,setOnChange] = useState(false);

    const onChangeNameNewInfo = (e) => {
        setNameNewInfo(e.target.value)
    }

    const onChangePasswordNewInfo = (e) => {
        setPasswordNewInfo(e.target.value)

    }
    const onChangeUsernameNewInfo = (e) => {
        setUsernameNewInfo(e.target.value)
    }
    const onChangeUrlNewInfo = (e) => {
        setUrlNewInfo(e.target.value)
    }
    const onChangeDescriptionNewInfo = (e) => {
        setDescriptionNewInfo(e.target.value)
    }

    const onHandleEdit = async() => {
        const response = await renameInfo(getAccessToken(),nameNewInfo,usernameNewInfo,passwordNewInfo,urlNewInfo,descriptionNewInfo,category_id,_id)

        if (response.status === 400) {

        } else if (response.status === 401) {

        } else if (response.status === 403) {

        } else if (response.status === 500) {

        } else if (response.status === 200) {
            refreshInfoList()
        } else {
            // TODO network error
        }
    }

    const onHandleDelete = async() => {
        const response = await deleteInfo(getAccessToken(),category_id,_id)
        if (response.status === 400) {

        } else if (response.status === 401) {

        } else if (response.status === 403) {

        } else if (response.status === 500) {

        } else if (response.status === 200) {
            refreshInfoList()
            setOnChange(false);
        } else {
            // TODO network error
        }
    }

    return (
        <Container component='main' maxWidth='xl'>

            {onChange === false ?
                <Container maxWidth="xl">
                    <Grid
                        container
                        spacing={1}
                        direction='row'
                        justify='space-between'
                        alignItems='center'
                    >
                        <Grid item>
                            {name}
                        </Grid>
                        <Grid item>
                            <Button onClick={() => setOnChange(true)}>
                                <BsFillCaretDownFill/>
                            </Button>
                        </Grid>
                    </Grid>
                </Container>
                
            :  
                <Container maxWidth="xl">
                    <Grid
                        container
                        spacing={1}
                        direction='row'
                        justify='flex-end'
                        alignItems='center'
                    >
                        <Grid item>
                            <Button onClick={() => setOnChange(false)}>
                                <BsFillCaretUpFill/>
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid
                        container
                        spacing={1}
                        direction='row'
                        justify='center'
                        alignItems='center'
                    >
                        <Grid item xs={4}>
                            <TextField
                                autoFocus
                                margin="none"
                                label="Nombre"
                                required
                                size="medium"
                                name="name"
                                autoComplete="off"
                                onChange={onChangeNameNewInfo}
                                value={nameNewInfo}

                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                autoFocus
                                margin="none"
                                label="Contraseña"
                                required
                                size="medium"
                                name="password"
                                type="password"
                                autoComplete="off"
                                onChange={onChangePasswordNewInfo}
                                value={passwordNewInfo}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                autoFocus
                                margin="none"
                                label="Usuario"
                                required
                                size="medium"
                                name="name"
                                autoComplete="off"
                                onChange={onChangeUsernameNewInfo}
                                value={usernameNewInfo}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                autoFocus
                                margin="none"
                                label="URL"
                                required
                                size="medium"
                                name="name"
                                autoComplete="off"
                                onChange={onChangeUrlNewInfo}
                                value={urlNewInfo}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                autoFocus
                                margin="none"
                                label="Descripción"
                                size="medium"
                                name="name"
                                autoComplete="off"
                                onChange={onChangeDescriptionNewInfo}
                                value={descriptionNewInfo}
                            />
                        </Grid>
                    </Grid>
                    <Grid container
                        spacing={1}
                        direction='row'
                        justify='center'
                        alignItems='center'>
                        <Grid item xs={2}>
                            <Button fullWidth={true} color="secondary" variant="contained" onClick={onHandleEdit}> EDITAR</Button>
                        </Grid>
                        <Grid item xs={2}>
                            <Button fullWidth={true} color="secondary" variant="contained" onClick={onHandleDelete}> ELIMIAR </Button>
                        </Grid>
                    </Grid>
                </Container>
            }
        </Container>
    )
}

export default Info