import React,{Fragment} from 'react';
import {Search} from '../components/Layout';
import {Information} from '../components/News'
import '../components/Layout/Header.css'
import '../components/Layout/Search.css'
import '../components/News/Information.css'

export default function Main() {
    return(
        <Fragment>
            <Search />
            <Information />
        </Fragment>
    )
}