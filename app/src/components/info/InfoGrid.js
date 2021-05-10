import React, { useState} from 'react'
import { Grid } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import InfoFile from './InfoFile';

const InfoGrid = (props) => {

    const name = props.name
    const username = props.username
    const password = props.password
    const url = props.url
    const description = props.description
    const setName = props.setName
    const setUsername = props.setUsername
    const setPassword = props.setPassword
    const setUrl = props.setUrl
    const setDescription = props.setDescription

    const showFile = props.showFile
    const _id = props._id
    const category_id = props.category_id
    const refreshInfoList = props.refreshInfoList
    const file = props.file

    const [errorName, setErrorName] = useState(false)
    const [errorPassword, setErrorPassword] = useState(false)
    const [errorUsername, setErrorUsername] = useState(false)
    const [errorUrl, setErrorUrl] = useState(false)
    const [errorDescription, setErrorDescription] = useState(false)

    const infoNameRegEx = /^([a-zñA-ZÑ0-9\u0600-\u06FF\u0660-\u0669\u06F0-\u06F9 _.-]+)$/i;

    const onChangeName = (e) => {
        setName(e.target.value)
        if (!infoNameRegEx.test(e.target.value)) {
            setErrorName(true)
        } else {
            setErrorName(false)
        }
    }

    const onChangePassword = (e) => {
        setPassword(e.target.value)
        if (false) { // TODO comprobaciones??
            setErrorPassword(true)
        } else {
            setErrorPassword(false)
        }
    }
    const onChangeUsername = (e) => {
        setUsername(e.target.value)
        if (false) { // TODO comprobaciones??
            setErrorUsername(true)
        } else {
            setErrorUsername(false)
        }
    }
    const onChangeUrl = (e) => {
        setUrl(e.target.value)
        if (false) { // TODO comprobaciones??
            setErrorUrl(true)
        } else {
            setErrorUrl(false)
        }
    }
    const onChangeDescription = (e) => {
        setDescription(e.target.value)
        if (false) { // TODO comprobaciones??
            setErrorDescription(true)
        } else {
            setErrorDescription(false)
        }
    }

    return (
        
            <Grid
                container
                spacing={2}
                direction='row'
                justify='center'
                alignItems='center'
            >
                <Grid item xs={6}>
                    <TextField
                        autoFocus
                        margin="none"
                        label="Nombre"
                        variant="filled"
                        required
                        fullWidth
                        size="medium"
                        name="name"
                        autoComplete="off"
                        onChange={onChangeName}
                        value={name}
                        error={errorName}
                    //helperText={errorName ? 'Introduce un nombre de caracteres alfanuméricos' : ' '}

                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        autoFocus
                        margin="none"
                        label="Usuario"
                        variant="filled"
                        fullWidth
                        size="medium"
                        name="name"
                        autoComplete="off"
                        onChange={onChangeUsername}
                        value={username}
                        error={errorUsername}
                    //helperText={errorUsername ? '' : ' '}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        autoFocus
                        margin="none"
                        label="Contraseña"
                        variant="filled"
                        fullWidth
                        size="medium"
                        name="password"
                        type="password"
                        autoComplete="off"
                        onChange={onChangePassword}
                        value={password}
                        error={errorPassword}
                    //helperText={errorPassword ? '' : ' '}
                    />
                </Grid>
                <Grid item xs={6}>  
                    <TextField
                        autoFocus
                        margin="none"
                        label="URL"
                        variant="filled"
                        fullWidth
                        size="medium"
                        name="name"
                        autoComplete="off"
                        onChange={onChangeUrl}
                        value={url}
                        error={errorUrl}
                    //helperText={errorUrl ? '' : ' '}
                    />
                </Grid>
                {showFile ?
                    <>
                        <Grid item xs={6}>
                            <TextField
                                autoFocus
                                margin="none"
                                label="Descripción"
                                variant="filled"
                                multiline
                                rows={5}
                                fullWidth
                                size="medium"
                                name="name"
                                autoComplete="off"
                                onChange={onChangeDescription}
                                value={description}
                                error={errorDescription}
                            //helperText={errorDescription ? '' : ' '}
                            />
                        </Grid>

                        <Grid item xs={6}>
                            <InfoFile
                                _id={_id}
                                category_id={category_id}
                                refreshInfoList={refreshInfoList}
                                file={file}
                            />
                        </Grid>
                    </>
                    :
                    <>
                        <Grid item xs={12}>
                            <TextField
                                autoFocus
                                margin="none"
                                label="Descripción"
                                variant="filled"
                                multiline
                                rows={5}
                                fullWidth
                                size="medium"
                                name="name"
                                autoComplete="off"
                                onChange={onChangeDescription}
                                value={description}
                                error={errorDescription}
                            //helperText={errorDescription ? '' : ' '}
                            />
                        </Grid>
                    </>
                }
            </Grid>
    )
}

export default InfoGrid