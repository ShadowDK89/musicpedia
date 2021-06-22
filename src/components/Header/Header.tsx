import React from 'react';
import './Header.scss'
import Searchbar from '../Searchbar/Searchbar';
import { NavLink } from 'react-router-dom';

type TeaderProps = {
    forwardSearch(searchTerm:string):void;
}

const Header:React.FC<TeaderProps> = ({ forwardSearch }) => {
    const sendSearchRequest = (searchTerm:string) => {      
        forwardSearch(searchTerm);
    }
    return (
        <header>
            <NavLink to="/" exact><h1>MusicPedia</h1></NavLink>
            <h3>Här hittar du allt om dina favorit musiker</h3>
            <Searchbar searchRequest={sendSearchRequest}/>
        </header>
    )
}

export default Header;