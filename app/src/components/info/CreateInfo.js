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

    const [nameNewInfo, setNameNewInfo] = useState(null)
    const [usernameNewInfo, setUsernameNewInfo] = useState(null)
    const [passwordNewInfo, setPasswordNewInfo] = useState(null)
    const [urlNewInfo, setUrlNewInfo] = useState(null)
    const [descriptionNewInfo, setDescriptionNewInfo] = useState(null)

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