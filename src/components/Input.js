import React from 'react';

const index = ({onChange, value, type, id, placeholder, name}) => {
    const inputStyles = [
        'px-2',
        'block',
        'w-full',
        'mb-4',
        'h-8',
        'rounded',
        'focus:ring-primary focus:ring-2 focus:outline-none'
    ].join(' ')
    return (
        <input 
            onChange={onChange}
            value={value}
            type={type ? type : 'text'}
            id={id}
            placeholder={placeholder}
            name={name}
            className={inputStyles}
        />
    );
}

export default index;
