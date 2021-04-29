import React from 'react'
import { Container, Grid } from '@material-ui/core';

const Info = (props) => {
    return (
        <Container component='main' maxWidth='md'>
            <Grid
                container
                direction='row'
                justify='center'
                spacing={3}
            >
                <Grid item xs={4}>
                    {props.name}
                </Grid>
                <Grid item xs={4}>
                    {props.url}
                </Grid>
                <Grid item xs={4}>
                    {props.description}
                </Grid>
            </Grid>
        </Container>
    )
}

export default Info