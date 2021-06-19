import React from 'react';

const index = () => {
    const searchStyles = [
        'rounded-full',
        'w-full',
        'h-full'
    ].join(' ')
    return (
        <input 
            className={searchStyles}
            type="search"

        />
    );
}

export default index;
