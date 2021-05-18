import React, { useContext } from 'react'
import AuthContext from '../../context'
import { Container, Grid, Button } from '@material-ui/core';
import { BsFileEarmarkArrowDown, BsFileEarmarkArrowUp } from "react-icons/bs";
import { downloadFile, uploadFile, deleteFile } from '../../services/File.service'
import { makeStyles } from '@material-ui/core/styles';
import FileDownload from 'js-file-download';

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
        backgroundColor: 'rgb(255, 255, 222)'
    }
}));

const InfoFile = (props) => {

    const { getAccessToken } = useContext(AuthContext)

    const classes = useStyles()

    const _id = props._id
    const category_id = props.category_id
    const refreshInfoList = props.refreshInfoList
    const file = props.file

    const onHandleUpload = async (e) => {
        console.log(e.target)
        const response = await uploadFile(getAccessToken(), category_id, _id, e.target.files[0])
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

    const onHandleDownload = async () => {
        const response = await downloadFile(getAccessToken(), file.file_id)
        if (response.status === 400) {

        } else if (response.status === 401) {

        } else if (response.status === 403) {

        } else if (response.status === 500) {

        } else if (response.status === 200) {
            FileDownload(response.data, file.name)
        } else {
            // TODO network error
        }
    }

    const onHandleDeleteFile = async () => {
        const response = await deleteFile(getAccessToken(), category_id, _id, file.file_id)
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
    return (
        <Container component='main' maxWidth='xl'>
            {/* FILE SECTION */}
            {file === undefined ?
                /* FILE TO BE UPLOADED */
                <Grid container
                    spacing={2}
                    direction='column'
                    justify='center'
                    alignItems='center'>
                    <Grid item>
                        <Button
                            className={classes.file}
                            fullWidth={true}
                            variant="contained"
                            component="label"
                            onChange={onHandleUpload}
                        >
                            <BsFileEarmarkArrowUp className={classes.file_photo} />
                            <input
                                type="file"
                                hidden
                            />
                        </Button>
                    </Grid>
                    <Grid item >
                        SUBIR ARCHIVO
                    </Grid>
                </Grid>
                :

                /* FILE TO BE DOWNLOADED */
                <Grid container
                    spacing={0}
                    direction='column'
                    justify='center'
                    alignItems='center'>
                    <Grid item >
                        <Button
                            variant="contained"
                            component="label"
                            onClick={onHandleDownload}
                            className={classes.file}>
                            <BsFileEarmarkArrowDown className={classes.file_photo} />
                        </Button>
                    </Grid>
                    <Grid item >
                        {file.name}
                    </Grid>
                    <Grid item>
                        <Button fullWidth={true} color="secondary" variant="contained" onClick={onHandleDeleteFile}> BORRAR</Button>
                    </Grid>
                </Grid>
            }
        </Container>
    )
}

export default InfoFile