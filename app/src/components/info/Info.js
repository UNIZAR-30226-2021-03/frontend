import React, {useState, useContext,useEffect} from 'react'
import AuthContext from '../../context'
import { Container, Grid, Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { BsFillCaretDownFill,BsFillCaretUpFill,BsFileEarmarkArrowDown,BsFileEarmarkArrowUp } from "react-icons/bs";
import { deleteInfo,renameInfo } from '../../services/Info.service'
import { uploadFile } from '../../services/File.service'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({

    file: {
        width: '100px',
        height: '100px'
        
    },
    file_photo: {
        width: '50px',
        height: '50px'
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

    const [onChange,setOnChange] = useState(false);

    useEffect(() => {
        setNameNewInfo(name)
        setUsernameNewInfo(username)
        setPasswordNewInfo(password)
        setUrlNewInfo(url)
        setDescriptionNewInfo(description)
    })

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
    const onHandleUpload = async(e) => {
        const response = await uploadFile(getAccessToken(),category_id,_id,e.target.files[0])
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

    const onHandleDownload = async() => {

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
                            {nameNewInfo}
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
                    { file === undefined ?
                        <Grid container
                            spacing={2}
                            direction='column'
                            justify='center'
                            alignItems='center'>
                            <Grid item
                                fullWidth={true} >
                                <Button
                                    className={classes.file}
                                    variant="contained"
                                    component="label"
                                    onChange={onHandleUpload}
                                    >
                                      <BsFileEarmarkArrowUp className={classes.file_photo}/>
                                      <input
                                        type="file"
                                        hidden
                                      />
                                </Button>
                            </Grid>
                            <Grid item
                                fullWidth={true} >
                                SUBIR ARCHIVO
                            </Grid>
                        </Grid>
                        :
                        <Grid container
                            spacing={0}
                            direction='column'
                            justify='center'
                            alignItems='center'>
                            <Grid item
                                fullWidth={true} >
                                <Button 
                                    variant="contained"
                                    component="label"
                                    onClick={onHandleDownload}>
                                    <BsFileEarmarkArrowDown/>
                                </Button>
                            </Grid>
                            <Grid item
                                fullWidth={true} >
                                {file.name}
                            </Grid>
                        </Grid>
                    }
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