import React, { ChangeEvent, FormEvent, KeyboardEvent , useState } from 'react'
import './Searchbar.scss'
import { Link } from 'react-router-dom';

type SearchbarProps = {
    searchRequest(searchTerm:string):void;
}

const Searchbar:React.FC<SearchbarProps> = ({ searchRequest }) => {
    const [searchInput, setSearchInput] = useState('');

    const getSearchInput = (e:ChangeEvent <HTMLInputElement>) => {
        let term = e.target.value;
        setSearchInput(term);
    }

    const searchOnEnter = (e:KeyboardEvent <HTMLInputElement>) => {
        if(e.key === 'Enter'){
            searchRequest(searchInput);
        }
    }

    const sendSearch = (e:FormEvent <HTMLFormElement>) => {        
        e.preventDefault();
        if(searchInput.length > 0 ){
            searchRequest(searchInput);
        }
    }

    return (
        <div className="search-bar-container">
            <form className="search-bar" onSubmit={sendSearch}>
                <label id="search-bar-label" htmlFor="search-bar">Sök</label>
                <input type="text" name="search" onChange={getSearchInput} onKeyUp={searchOnEnter}/>
                <Link to ="/search" id="search-icon-container"
                onClick={() => searchRequest(searchInput)}>
                    <button>
                        <div id="search-icon"></div>
                    </button>
                </Link>
            </form>
        </div>
    )
}

export default Searchbar;