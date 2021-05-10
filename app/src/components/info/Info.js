import React, { useState, useContext, useEffect } from 'react'
import AuthContext from '../../context'
import { Grid, Button } from '@material-ui/core';
import { BsFillCaretDownFill, BsFillCaretUpFill} from "react-icons/bs";
import { deleteInfo, renameInfo } from '../../services/Info.service'
import { makeStyles } from '@material-ui/core/styles';
import InfoGrid from './InfoGrid';

const useStyles = makeStyles((theme) => ({

    file: {
        width: '100px',
        height: '100px'

    },
    file_photo: {
        width: '50px',
        height: '50px'
    },
    info: {
        padding: theme.spacing(1),
        backgroundColor: 'rgb(255, 255, 222)'
    }
}));



const Info = (props) => {

    const { getAccessToken } = useContext(AuthContext)

    const classes = useStyles();

    const name = props.name
    const username = props.username
    const url = props.url
    const description = props.description
    const password = props.password
    const _id = props._id
    const category_id = props.category_id
    const refreshInfoList = props.refreshInfoList;
    const file = props.file;

    const [nameNewInfo, setNameNewInfo] = useState("")
    const [usernameNewInfo, setUsernameNewInfo] = useState("")
    const [passwordNewInfo, setPasswordNewInfo] = useState("")
    const [urlNewInfo, setUrlNewInfo] = useState("")
    const [descriptionNewInfo, setDescriptionNewInfo] = useState("")

    const [onChange, setOnChange] = useState(false);

    useEffect(() => {
        setNameNewInfo(name)
        setUsernameNewInfo(username)
        setPasswordNewInfo(password)
        setUrlNewInfo(url)
        setDescriptionNewInfo(description)
    }, [name, username, password, url, description])


    const onHandleEdit = async () => {
        const response = await renameInfo(getAccessToken(), nameNewInfo, usernameNewInfo, passwordNewInfo, urlNewInfo, descriptionNewInfo, category_id, _id)

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

    const onHandleDelete = async () => {
        const response = await deleteInfo(getAccessToken(), category_id, _id)
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
        <>
            { onChange === false ?
                /* INFO GRID CLOSED */

                <Grid
                    container
                    className={classes.info}
                    //spacing={1}
                    direction='row'
                    justify='space-between'
                    alignItems='center'
                >
                    <Grid item>
                        {nameNewInfo}
                    </Grid>
                    <Grid item>
                        <Button
                            onClick={() => setOnChange(true)}
                            variant="contained"
                        >
                            <BsFillCaretDownFill />
                        </Button>
                    </Grid>
                </Grid>

                :
                /* INFO GRID OPENED */

                <Grid
                    container
                    className={classes.info}
                    //spacing={3}
                    direction='row'
                    justify='flex-end'
                    alignItems='stretch'
                >
                    <Grid item>
                        <Button
                            onClick={() => setOnChange(false)}
                            variant="contained"
                        >
                            <BsFillCaretUpFill />
                        </Button>
                    </Grid>

                    <Grid item>
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
                            showFile={true}
                            _id={_id}
                            category_id={category_id}
                            refreshInfoList={refreshInfoList}
                            file={file}
                        />
                    </Grid>

                    {/* BUTTONs  */}
                    <Grid container
                        spacing={1}
                        direction='row'
                        justify='center'
                        alignItems='center'>

                        <Grid item xs={2}>
                            <Button
                                fullWidth={true}
                                variant="contained"
                                onClick={onHandleDelete}>
                                ELIMINAR
                            </Button>
                        </Grid>

                        <Grid item xs={2}>
                            <Button
                                fullWidth={true}
                                variant="contained"
                                onClick={onHandleEdit}>
                                EDITAR
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            }
        </>
    )
}

export default Info