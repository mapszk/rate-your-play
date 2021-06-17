import React from 'react';
import { Link } from 'react-router-dom';

const index = ({mt, mr, mb, ml, handleClick, url, children, ...props}) => {
    const primary = [
        `mt-${mt}`,
        `mr-${mr}`,
        `mb-${mb}`,
        `ml-${ml}`,
        'transition-transform',
        'bg-primary',
        'rounded',
        'min-w-150',
        'w-max',
        'text-white',
        'font-semibold',
        'py-1.5',
        'px-2.5',
        'focus:ring-primary focus:ring-opacity-30 focus:ring-4 focus:outline-none focus:scale-90',
        'active:transform scale-50'
    ].join(' ')
    const secondary = [
        `mt-${mt}`,
        `mr-${mr}`,
        `mb-${mb}`,
        `ml-${ml}`,
        'transition-transform',
        'bg-secondary',
        'rounded',
        'min-w-150',
        'w-max',
        'text-white',
        'font-semibold',
        'py-1.5',
        'px-2.5',
        'focus:ring-secondary focus:ring-opacity-30 focus:ring-4 focus:outline-none focus:scale-90',
        'active:transform scale-50'
    ].join(' ')

    return(
        <button onClick={handleClick} className={props.secondary ? secondary : props.primary ? primary : null}>
            {children}
        </button>
    )
}

export default index;
