import React, { useState } from 'react'
import { Grid, Typography } from '@material-ui/core'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'
import InfoFile from './InfoFile'
import Checkbox from '@material-ui/core/Checkbox'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'
import { BsForwardFill, BsFillEyeFill } from "react-icons/bs"
import { generatePassword } from '../../helpers/password.helper'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
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


const InfoGrid = (props) => {

    const classes = useStyles();

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

    const errorName = props.errorName
    const setErrorName = props.setErrorName
    const errorPassword = props.errorPassword
    const setErrorPassword = props.setErrorPassword
    const errorUsername = props.errorUsername
    const setErrorUsername = props.setErrorUsername
    const errorUrl = props.errorUrl
    const setErrorUrl = props.setErrorUrl
    const errorDescription = props.errorDescription
    const setErrorDescription = props.setErrorDescription

    const [upperGen, setUpperGen] = useState(false)
    const [numberGen, setNumberGen] = useState(false)
    const [specialGen, setSpecialGen] = useState("_-")
    const [lengthGen, setLengthGen] = useState(10)
    const [entropyGen, setEntropyGen] = useState("")

    const [passwordType, setPasswordType] = useState("password")

    const infoNameRegEx = /^([a-z??A-Z??0-9\u0600-\u06FF\u0660-\u0669\u06F0-\u06F9 _.-]+)$/i

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
        if (e.target.value === "") { // TODO comprobaciones??
            setErrorPassword(true)
        } else {
            setErrorPassword(false)
        }
    }
    const onChangeUsername = (e) => {
        setUsername(e.target.value)
        if (e.target.value === "") { // TODO comprobaciones??
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

    const onChangeSpecialGen = (e) => {
        // TODO revisar
        setSpecialGen(e.target.value)
    }

    const onChangeLengthGen = (e) => {
        setLengthGen(e.target.value)
    }

    const handleClickUpper = (e) => {
        setUpperGen(e.target.checked)
    }

    const handleClickNumber = (e) => {
        setNumberGen(e.target.checked)
    }

    const handleGeneration = () => {
        const { password, entropy } = generatePassword(lengthGen, true, upperGen, numberGen, specialGen)
        setPassword(password)
        setEntropyGen(Math.floor(entropy))
        console.log(Math.floor(entropy))
    }

    const handleShowPassword = () => {
        if (passwordType === "text") {
            setPasswordType("password")
        } else {
            setPasswordType("text")
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
                    variant="outlined"
                    required
                    fullWidth
                    size="medium"
                    name="name"
                    autoComplete="off"
                    onChange={onChangeName}
                    value={name}
                    error={errorName}
                //helperText={errorName ? 'Introduce un nombre de caracteres alfanum??ricos' : ' '}

                />
            </Grid>
            <Grid item xs={6}>
                <TextField
                    margin="none"
                    label="Usuario"
                    variant="outlined"
                    required
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
            <Grid item xs={5}>
                <TextField
                    margin="none"
                    label="Contrase??a"
                    variant="outlined"
                    required
                    fullWidth
                    size="medium"
                    name="password"
                    type={passwordType}
                    autoComplete="off"
                    onChange={onChangePassword}
                    value={password}
                    error={errorPassword}
                //helperText={errorPassword ? '' : ' '}
                />
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
            <Grid item xs={6}>
                <TextField
                    margin="none"
                    label="URL"
                    variant="outlined"
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
                            margin="none"
                            label="Descripci??n"
                            variant="outlined"
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
                            margin="none"
                            label="Descripci??n"
                            variant="outlined"
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
            <Divider light />
            <Grid item xs={12}>
                <Typography variant="h5">
                    Generar contrase??a
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Grid
                    container
                    direction="row"
                    justify="flex-end"
                    alignItems="flex-end"
                    spacing={2}>
                    <Grid item xs={6}>
                        <Grid
                            container
                            direction="row"
                            justify="flex-start"
                            alignItems="flex-end"
                            spacing={1}
                        >
                            <Grid item xs={8}>
                                <FormControl component="fieldset">
                                    {<FormLabel component="legend">Caracteres incluidos</FormLabel>}
                                    <FormGroup aria-label="position" row>
                                        <FormControlLabel
                                            value="lower"
                                            control={<Checkbox checked color="primary" />}
                                            label="a-z"
                                            labelPlacement="start"
                                        />
                                        <FormControlLabel
                                            value="start"
                                            control={<Checkbox checked={upperGen} onChange={handleClickUpper} color="primary" />}
                                            label="A-Z"
                                            labelPlacement="start"
                                        />
                                        <FormControlLabel
                                            value="bottom"
                                            control={<Checkbox checked={numberGen} onChange={handleClickNumber} color="primary" />}
                                            label="0-9"
                                            labelPlacement="start"
                                        />
                                    </FormGroup>
                                </FormControl>
                            </Grid>
                            <Grid item xs={2}>
                                <TextField
                                    fullWidth
                                    margin="none"
                                    label="Esp."
                                    variant="outlined"
                                    size="small"
                                    autoComplete="off"
                                    onChange={onChangeSpecialGen}
                                    value={specialGen}
                                //helperText={errorUrl ? '' : ' '}
                                />
                            </Grid>
                            <Grid item xs={2}>
                                <TextField
                                    fullWidth
                                    margin="none"
                                    label="N??m."
                                    variant="outlined"
                                    size="small"
                                    autoComplete="off"
                                    onChange={onChangeLengthGen}
                                    value={lengthGen}
                                //helperText={errorUrl ? '' : ' '}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={1}>
                        <Button
                            className={classes.button}
                            onClick={handleGeneration}
                            variant="contained"
                            size="large">
                            <BsForwardFill />
                        </Button>
                    </Grid>
                    <Grid item xs={5}>
                        <Typography
                            component='div'
                            variant='h5'
                            align='center'>
                            Entrop??a: {entropyGen}
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>

            </Grid>
        </Grid>
    )
}

export default InfoGrid