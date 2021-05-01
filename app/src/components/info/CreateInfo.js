import AuthContext from '../../context'
import React, { useState, useContext } from 'react'
import TextField from '@material-ui/core/TextField';
import { Button, Container, Grid } from '@material-ui/core';
import { createInfo } from '../../services/Info.service.js'


const CreateInfo = (props) => {

    const { getAccessToken } = useContext(AuthContext)

    const currentCategory = props.category;
    const setOpen = props.setOpen;
    const refreshInfoList = props.refreshInfoList;

    const [nameNewInfo, setNameNewInfo] = useState("")
    const [usernameNewInfo, setUsernameNewInfo] = useState("")
    const [passwordNewInfo, setPasswordNewInfo] = useState("")
    const [urlNewInfo, setUrlNewInfo] = useState("")
    const [descriptionNewInfo, setDescriptionNewInfo] = useState("")

    const [errorNameNewInfo, setErrorNameNewInfo] = useState(false)
    const [errorPasswordNewInfo, setErrorPasswordNewInfo] = useState(false)
    const [errorUsernameNewInfo, setErrorUsernameNewInfo] = useState(false)
    const [errorUrlNewInfo, setErrorUrlNewInfo] = useState(false)
    const [errorDescriptionNewInfo, setErrorDescriptionNewInfo] = useState(false)

    const handleCreateInfo = async () => {

        const response = await createInfo(getAccessToken(), nameNewInfo, usernameNewInfo, passwordNewInfo, urlNewInfo, descriptionNewInfo, currentCategory._id)
        if (response.status === 400) {

        } else if (response.status === 401) {

        } else if (response.status === 403) {

        } else if (response.status === 500) {

        } else if (response.status === 200) {
            refreshInfoList()
            setOpen(false)
        } else {
            // TODO network error
        }
    }

    const handleCancelNewInfo = () => {
        setOpen(false)
    }

    const infoNameRegEx = /^([a-zñA-ZÑ0-9\u0600-\u06FF\u0660-\u0669\u06F0-\u06F9 _.-]+)$/i;

    const onChangeNameNewInfo = (e) => {
        setNameNewInfo(e.target.value)
        if (!infoNameRegEx.test(e.target.value)) {
            setErrorNameNewInfo(true)
        } else {
            setErrorNameNewInfo(false)
        }
    }

    const onChangePasswordNewInfo = (e) => {
        setPasswordNewInfo(e.target.value)
        if (false) { // TODO comprobaciones??
            setErrorPasswordNewInfo(true)
        } else {
            setErrorPasswordNewInfo(false)
        }
    }
    const onChangeUsernameNewInfo = (e) => {
        setUsernameNewInfo(e.target.value)
        if (false) { // TODO comprobaciones??
            setErrorUsernameNewInfo(true)
        } else {
            setErrorUsernameNewInfo(false)
        }
    }
    const onChangeUrlNewInfo = (e) => {
        setUrlNewInfo(e.target.value)
        if (false) { // TODO comprobaciones??
            setErrorUrlNewInfo(true)
        } else {
            setErrorUrlNewInfo(false)
        }
    }
    const onChangeDescriptionNewInfo = (e) => {
        setDescriptionNewInfo(e.target.value)
        if (false) { // TODO comprobaciones??
            setErrorDescriptionNewInfo(true)
        } else {
            setErrorDescriptionNewInfo(false)
        }
    }

    return (
        <Container component='main' maxWidth='xl'>

            <Container maxWidth="xl">
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
                            error={errorNameNewInfo}
                        //helperText={errorNameNewInfo ? 'Debe contener solo carácteres alfanuméricos' : ' '}
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
                            error={errorPasswordNewInfo}
                        //helperText={errorMail ? 'Intorduce la contraseña' : failAuthPassword ? 'La contraseña es incorrecta' : ' '}
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
                            error={errorUsernameNewInfo}
                        //helperText={errorNameNewInfo ? 'Debe contener solo carácteres alfanuméricos' : ' '}
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
                            error={errorUrlNewInfo}
                        //helperText={errorNameNewInfo ? 'Debe contener solo carácteres alfanuméricos' : ' '}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            autoFocus
                            margin="none"
                            label="Descripción"
                            required
                            size="medium"
                            name="name"
                            autoComplete="off"
                            onChange={onChangeDescriptionNewInfo}
                            value={descriptionNewInfo}
                            error={errorDescriptionNewInfo}
                        //helperText={errorNameNewInfo ? 'Debe contener solo carácteres alfanuméricos' : ' '}
                        />
                    </Grid>


                </Grid>
                <Grid container
                    spacing={1}
                    direction='row'
                    justify='center'
                    alignItems='center'>
                    <Grid item xs={2}>
                        <Button fullWidth={true} color="secondary" variant="contained" onClick={() => { handleCancelNewInfo() }}> CANCELAR</Button>
                    </Grid>
                    <Grid item xs={2}>
                        <Button fullWidth={true} color="secondary" variant="contained" onClick={() => { handleCreateInfo() }}> ACEPTAR </Button>
                    </Grid>
                </Grid>
            </Container>

        </Container>
    )
}

export default CreateInfo;