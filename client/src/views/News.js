import React,{Fragment} from 'react';
import {News} from '../components/News'
import '../components/Layout/Header.css'
import '../components/Layout/Search.css'
import '../components/News/news.css'
import querystring from 'query-string';

export default function Main({location,match}) {
    console.log(location);
    console.log(match);
    console.log(match.params.name)
    return(
        <Fragment>
            <News target={querystring.parse(location.search).search}/>
        </Fragment>
    )
}