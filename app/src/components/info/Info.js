import React, { useState, useContext, useEffect } from 'react'
import AuthContext from '../../context'
import { Grid, Button } from '@material-ui/core';
import { BsFillCaretDownFill, BsFillCaretUpFill, BsClipboardData, BsFillEyeFill } from "react-icons/bs";
import { deleteInfo, renameInfo } from '../../services/Info.service'
import { makeStyles } from '@material-ui/core/styles';
import InfoGrid from './InfoGrid';
import CopyToClipboard from 'react-copy-to-clipboard'

const useStyles = makeStyles((theme) => ({
    info: {
        padding: theme.spacing(1),
        backgroundColor: 'rgb(232,238,241)',
        border: '2px solid rgb(5,125,205)',
        borderRadius: '10px',
    },
    up: {
        padding: theme.spacing(1),
    },
    button: {
        textTransform: "none",
        fontSize: '20px',
        padding: '8px 20px',
        borderRadius: '3px',
        outline: 'none',
        cursor: 'pointer',
        justifyContent: 'center',
        alignItems: 'center',
        transition: 'all 0.3s ease-out',
        border: '1px solid rgb(30,61,88)',
        backgroundColor: 'rgb(5, 125, 205)',
        color: 'rgb(232, 238, 241)',
        '&:hover': {
            backgroundColor: 'transparent',
            color: 'rgb(30,61,88)',
            transition: 'all 0.3s ease-out',
            border: '1px solid rgb(5, 125, 205)',
        }
    },
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

    const [open, setOpen] = useState(false);

    const [errorName, setErrorName] = useState(false)
    const [errorPassword, setErrorPassword] = useState(false)
    const [errorUsername, setErrorUsername] = useState(false)
    const [errorUrl, setErrorUrl] = useState(false)
    const [errorDescription, setErrorDescription] = useState(false)

    const [passwordType, setPasswordType] = useState(true)


    useEffect(() => {
        setNameNewInfo(name)
        setUsernameNewInfo(username)
        setPasswordNewInfo(password)
        setUrlNewInfo(url)
        setDescriptionNewInfo(description)

        return function cleanup() {
            setNameNewInfo("")
            setUsernameNewInfo("")
            setPasswordNewInfo("")
            setUrlNewInfo("")
            setDescriptionNewInfo("")
        }
    }, [name, username, password, url, description])


    const onHandleEdit = async () => {
        const response = await renameInfo(getAccessToken(), nameNewInfo, usernameNewInfo, passwordNewInfo, urlNewInfo, descriptionNewInfo, category_id, _id)

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

    const onHandleDelete = async () => {
        const response = await deleteInfo(getAccessToken(), category_id, _id)
        if (response.status === 400) {

        } else if (response.status === 401) {

        } else if (response.status === 403) {

        } else if (response.status === 500) {

        } else if (response.status === 200) {
            refreshInfoList()
            setOpen(false);
        } else {
            // TODO network error
        }
    }

    const handleShowPassword = () => {
        if (passwordType) {
            setPasswordType(false)
        } else {
            setPasswordType(true)
        }
    }

    return (
        <>
            { open === false ?
                /* INFO GRID CLOSED */

                <Grid
                    container
                    className={classes.info}
                    //spacing={1}
                    direction='row'
                    justify='flex-end'
                    alignItems='center'
                >
                    <Grid item xs={2}>
                        {nameNewInfo}
                    </Grid>
                    <Grid item xs={2}>
                        {passwordType ?
                            <>
                                ***
                            </>
                            :
                            <>
                                {password}
                            </>
                        }
                    </Grid>
                    <Grid item xs={1}>
                        <Button
                            className={classes.button}
                            onClick={handleShowPassword}
                            variant="contained"
                            size="large">
                            <BsFillEyeFill />
                        </Button>
                    </Grid>
                    <Grid item xs={1}>
                        <CopyToClipboard text={password}>
                            <Button
                                className={classes.button}
                                variant="contained"
                                size="large">
                                <BsClipboardData />
                            </Button>
                        </CopyToClipboard>
                    </Grid>
                    <Grid item xs={5}>

                    </Grid>
                    <Grid item xs={1}>
                        <Button
                            className={classes.button}
                            onClick={() => setOpen(true)}
                            variant="contained"
                            size="large"
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
                    <Grid item xs={12}>
                        <Grid
                            container
                            className={classes.up}
                            //spacing={1}
                            direction='row'
                            justify='flex-end'
                            alignItems='flex-end'>
                            <Grid item xs={11}>
                            </Grid>
                            <Grid item xs={1}>
                                <Button
                                    className={classes.button}
                                    onClick={() => setOpen(false)}
                                    variant="contained"
                                    size="large"
                                >
                                    <BsFillCaretUpFill />
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>

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
                            showFile={true}
                            _id={_id}
                            category_id={category_id}
                            refreshInfoList={refreshInfoList}
                            file={file}
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

                    {/* BUTTONs  */}
                    <Grid container
                        spacing={1}
                        direction='row'
                        justify='center'
                        alignItems='center'>

                        <Grid item xs={2}>
                            <Button
                                className={classes.button}
                                fullWidth={true}
                                variant="contained"
                                onClick={onHandleDelete}>
                                ELIMINAR
                            </Button>
                        </Grid>

                        <Grid item xs={2}>
                            <Button
                                className={classes.button}
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