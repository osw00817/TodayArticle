import React from 'react';
import {AppBar , Toolbar , Typography} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles(theme => ({
    Toolbar: {
        minHeight: 500
    } 
}));
export default function Header() {
    const classes = useStyles();
    return(
        <AppBar position="sticky" height="75%" color="inherit">
        <Toolbar className={classes.toolbar}>
            <Typography href="https://tonews.netlify.com/" className="title" variant="h6">
               <a style={{textDecoration:'none',color:'black'}} href="https://tonews.netlify.com/">News</a>
            </Typography>
        </Toolbar>
        </AppBar>
    );
}
