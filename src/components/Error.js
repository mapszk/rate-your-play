import React from 'react';
import { FaRegSadTear } from 'react-icons/fa'
import { IconContext } from 'react-icons/lib';

const Error = () => {
    return (
        <div className="w-full h-screen flex flex-col justify-center items-center text-mid font-semibold px-10 text-center">
            <IconContext.Provider value={{size: '4rem'}}>
                <FaRegSadTear />
            </IconContext.Provider>
            <h1 className="px-5 mt-4">Oops! Something was gone wrong, try again.</h1>
        </div>
    );
}

export default Error;
