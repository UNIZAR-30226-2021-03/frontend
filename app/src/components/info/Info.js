import React from 'react'
import { Container, Grid } from '@material-ui/core';

const Info = (props) => {

    const name = props.name
    const url = props.url
    const description = props.description
    
    return (
        <Container component='main' maxWidth='md'>
            <Grid
                container
                direction='row'
                justify='center'
                spacing={3}
            >
                <Grid item xs={4}>
                    {name}
                </Grid>
                <Grid item xs={4}>
                    {url}
                </Grid>
                <Grid item xs={4}>
                    {description}
                </Grid>
            </Grid>
        </Container>
    )
}

export default Info