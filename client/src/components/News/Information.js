import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {Grid, Paper,ListItem,ListItemText} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
      marginTop: '50px',
    },
    paper: {
      height:'500px',
      padding: theme.spacing(1),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    rankbar: {
      width: '100%',
      height: 400,
      maxWidth: 300,
      backgroundColor: theme.palette.background.paper,
    },
  }));
  //
  class Infect extends React.Component {
    state = {
      name:'',
      infect: '',
      die: '',
      cure: '',
    }

  componentDidMount(){
    this.callApi()
    .then(res => {
        this.setState({
          name:res[0].name,
          infect: res[0].infect,
          die: res[0].die,
          cure: res[0].cure,
        }) 
        console.log(res);
    })
    .catch(err => console.log(err))
  }

  callApi = async() => {
    const response = await fetch('/korea/infect');
    const body = await response.json();
    return body;
  }
  
render() {
    return(
        <div>
          <h1>코로나 현황</h1>
          <p style={{marginTop:150}}>{this.state.name}</p>
          <p>감염자수: {this.state.infect}</p>
          <p>사망자수: {this.state.die}</p>
          <p>치료자수: {this.state.cure}</p>
          </div>
    )
}
}
  class Weather extends React.Component {
    state = {
        temperature : 0,
        name: '',
        icon: '',
    }

  componentDidMount(){
    this.callApi()
    .then(res => {
        this.setState({
          temperature: Math.floor(res.main.temp - 273.15),
          name : res.weather[0].main,
          icon: res.weather[0].icon,
        }) 
        console.log(res);
    })
    .catch(err => console.log(err))
  }

  callApi = async() => {
    const response = await fetch('/weather/seoul');
    const body = await response.json();
    return body;
  }
  
render() {
    return(
        <div>
          <h1>날씨/온도</h1>
          <p style={{marginTop:-20}}>Seoul</p> 
          <br />
          <br />
          <p><img src={"http://openweathermap.org/img/wn/" + this.state.icon + "@2x.png"} height="100"/></p> 
          <h3> {this.state.name}</h3>
          <h3>{this.state.temperature}°C</h3>  
          </div>
    )
}
}
  
  class Rank extends React.Component {
    state = {
        rank:""
    }

  componentDidMount(){
    this.callApi()
    .then(res => {
        this.setState({rank:res}) 
        console.log(res);
    })
    .catch(err => console.log(err))
  }

  callApi = async() => {
    const response = await fetch('/naver/ranking');
    const body = await response.json();
    return body;
  }

render() {
    return(
        <div>
          <h1>실시간 검색어</h1>
          <p style={{marginTop:-20}}>(서비스 종료)</p> 
                  {this.state.rank ? this.state.rank.map(c =>{
                  return  <ListItem className="rank"><ListItemText primary={c.rank + " " + c.title} /></ListItem>}) : 'err'}
          </div>
    )
}
}

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      width: window.innerWidth,
    };
  }
  
  componentWillMount() {
    window.addEventListener('resize', this.handleWindowSizeChange);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowSizeChange);
  }
  
  handleWindowSizeChange = () => {
    this.setState({ width: window.innerWidth });
  };
  
  render() {
    const { classes } = this.props;
    const { width } = this.state;
    const isMobile = width <= 1000;
    // the rest is the same...
  
    if (isMobile) {
      return (
        <div style={{marginTop: '70px'}} className={classes.root}>
        <Paper className="mobile" style={{marginBottom:30,width:300}}><Rank /></Paper>
        <Paper className="mobile" style={{marginBottom:50,height:400,width:300,textAlign:"center"}}><Weather /></Paper>
        <Paper className="mobile" style={{marginBottom:30,height:400,width:300,textAlign:"center"}}><Infect /></Paper>
      </div>
      );
    } else {
      return (
        <div style={{ flexGrow: 1,
          marginTop: '50px'}} className={classes.root}>
        <Grid container item xs={12} spacing={4} justify="center">
            <Grid item xs={3}>
              <Paper style={{height:'500px',
      textAlign: 'center'}}><Rank /></Paper>
            </Grid>
            <Grid item xs={3}>
            <Paper style={{height:'500px',
     textAlign: 'center'}}><Weather /></Paper>
            </Grid>
            <Grid item xs={3}>
            <Paper style={{height:'500px',
      textAlign: 'center'}}><Infect /></Paper>
            </Grid>
        </Grid>
        </div>
      );
    }
  }
}

export default withStyles(useStyles)(Header);
