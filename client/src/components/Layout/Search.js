import React, { useState } from 'react';
import { Paper,Grid} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop:'20px',
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
}));

export default function Main() {
  const classes = useStyles();
  const [ target , setTarget ] = useState('');
  const onChangetarget = e => {
    setTarget(e.target.value);
  };
  const handlesubmit = e => {
    e.preventDefault();
    //
    window.location.href=`https://tonews.netlify.com/news?search=${target}`;
  }
  return (
    <div className="Main">
              <Grid container justify = "center">
                  <h1 className="sub_title">Search</h1>
              </Grid>
              <Grid container justify = "center">
                  <Paper className={classes.root} component="form" onSubmit={handlesubmit}>
                    <InputBase
                      name="query"
                      className={classes.input}
                      placeholder="뉴스 검색하기"
                      inputProps={{ 'aria-label': '뉴스검색하기' }}
                      onChange={onChangetarget}
                    />
                    <IconButton type="submit" className={classes.iconButton} aria-label="search" onClick = {() => {window.location.href=`https://friendly-mahavira-49926b.netlify.com/news/${target}`}}>
                      <SearchIcon />
                    </IconButton>
                  </Paper>
              </Grid>  
    </div>
  )
}