import React from 'react';

const index = ({children, htmlFor}) => {
    const labelStyles = [
        'text-white',
        'block',
        'w-full',
        'mb-1'
    ].join(' ')
    return (
        <label className={labelStyles} htmlFor={htmlFor}>
            {children}
        </label>
    );
}

export default index;
