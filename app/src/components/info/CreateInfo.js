import AuthContext from '../../context'
import React, { useState, useContext } from 'react'
import { Button, Grid } from '@material-ui/core';
import { createInfo } from '../../services/Info.service.js'
import InfoGrid from './InfoGrid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    info: {
        padding: theme.spacing(1),
        backgroundColor: 'rgb(255, 255, 222)'
    }
}));


const CreateInfo = (props) => {

    const classes = useStyles();

    const { getAccessToken } = useContext(AuthContext)

    const currentCategory = props.category;
    const setOpen = props.setOpen;
    const refreshInfoList = props.refreshInfoList;

    const [nameNewInfo, setNameNewInfo] = useState("")
    const [usernameNewInfo, setUsernameNewInfo] = useState("")
    const [passwordNewInfo, setPasswordNewInfo] = useState("")
    const [urlNewInfo, setUrlNewInfo] = useState("")
    const [descriptionNewInfo, setDescriptionNewInfo] = useState("")

    const [errorName, setErrorName] = useState(false)
    const [errorPassword, setErrorPassword] = useState(false)
    const [errorUsername, setErrorUsername] = useState(false)
    const [errorUrl, setErrorUrl] = useState(false)
    const [errorDescription, setErrorDescription] = useState(false)

    const infoNameRegEx = /^([a-zñA-ZÑ0-9\u0600-\u06FF\u0660-\u0669\u06F0-\u06F9 _.-]+)$/i;

    const handleCreateInfo = async () => {
        var error = false;
        if (!infoNameRegEx.test(nameNewInfo)) {
            setErrorName(true)
            error = true;
        }
        if (usernameNewInfo === "") {
            setErrorUsername(true)
            error = true;
        }
        if (passwordNewInfo === "") {
            setErrorPassword(true)
            error = true;
        }
        // TODO mas comprobaciones
        if (!error) {
            console.log("aqui")
            const response = await createInfo(getAccessToken(), nameNewInfo, usernameNewInfo, passwordNewInfo, urlNewInfo, descriptionNewInfo, currentCategory._id)

            if (response.status === 400) {

            } else if (response.status === 401) {

            } else if (response.status === 403) {

            } else if (response.status === 500) {

            } else if (response.status === 200) {
                setOpen(false)
                refreshInfoList()
            } else {
                // TODO network error
            }
        }
    }

    const handleCancelNewInfo = () => {
        setOpen(false)
    }

    return (
        <Grid
            container
            className={classes.info}
            direction="column"
            justify="center"
            alignItems="stretch"
        >
            <Grid item xs={12}>
                <InfoGrid
                    name={nameNewInfo}
                    username={usernameNewInfo}
                    password={passwordNewInfo}
                    url={urlNewInfo}
                    description={descriptionNewInfo}
                    setName={setNameNewInfo}
                    setUsername={setUsernameNewInfo}
                    setPassword={setPasswordNewInfo}
                    setUrl={setUrlNewInfo}
                    setDescription={setDescriptionNewInfo}
                    showFile={false}
                    errorName={errorName}
                    setErrorName={setErrorName}
                    errorPassword={errorPassword}
                    setErrorPassword={setErrorPassword}
                    errorUsername={errorUsername}
                    setErrorUsername={setErrorUsername}
                    errorUrl={errorUrl}
                    setErrorUrl={setErrorUrl}
                    errorDescription={errorDescription}
                    setErrorDescription={setErrorDescription}

                />
            </Grid>

            <Grid item xs={12}>
                <Grid container
                    spacing={1}
                    direction='row'
                    justify='center'
                    alignItems='center'
                >
                    <Grid item xs={2}>
                        <Button
                            fullWidth={true}
                            variant="contained"
                            onClick={() => { handleCancelNewInfo() }}>
                            CANCELAR
                    </Button>
                    </Grid>
                    <Grid item xs={2}>
                        <Button
                            fullWidth={true}
                            variant="contained"
                            onClick={() => { handleCreateInfo() }}>
                            ACEPTAR
                     </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default CreateInfo;