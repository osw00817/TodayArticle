import React from 'react';
import {Grid} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
      maxWidth: 300,
    },
    media: {
      height: 140,
    },
  });

class News extends React.Component {
        state = {
            news:""
        }
    
      componentDidMount(){
        console.log()
        this.callApi()
        .then(res => {
            this.setState({news:res}) 
            console.log(res);
        })
        .catch(err => console.log(err))
      }
    
      callApi = async() => {
        const target = await this.props.target ? (this.props.target) : ("nodejs");
        await console.log(this.props.target);
        const response = await fetch('/naver/news?search='+ target);
        await console.log(response);
        const body = await response.json();
        await console.log(body);
        return body;
      }

    render() {
        return(
          <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
          style={{ minHeight: '100vh' }}
        >        
         <Grid item xs={5}>
         <h1>기사 목록</h1>            
            <Grid container spacing={2}>
                {this.state.news ? this.state.news.map(c =>{
                return <Grid item md={6}><Container article={c}/></Grid>}) : 'err'}
            </Grid>
         </Grid>
          
           </Grid>
        )
    }
}

 function Container({article}){
    console.log(article);
  const classes = useStyles();

  return (
    <Link href={article.link}>
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={article.src}
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {article.report}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {article.title}
            </Typography>
          </CardContent>
      </CardActionArea>
    </Card>
    </Link>
  );
}

export default News;