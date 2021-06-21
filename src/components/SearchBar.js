import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa'
import { useHistory } from 'react-router';

const SearchBar = ({classNames}) => {
    const history = useHistory()
    const [query, setQuery] = useState('')
    const search = () => {
        history.push(`/search/${query.toLowerCase().trim()}`)
        setQuery('')
    }

    const searchStyles = [
        'rounded-full',
        'w-full',
        'h-full',
        'focus:outline-none',
        'px-4',
        'font-semibold',
        'pb-0.5'
    ].join(' ')
    return (
        <div className={`relative ${classNames}`}>
            <input 
                className={searchStyles}
                type="text"
                placeholder="Search"
                value={query}
                onChange={e=>setQuery(e.target.value)}
            />
            <button onClick={search} className="absolute right-3 top-2 text-secondary">
                <FaSearch/>
            </button>
        </div>

    );
}

export default SearchBar;
