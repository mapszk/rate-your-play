import React from 'react';

import Logo from '../components/Logo'
import { AiFillInstagram, AiFillFacebook } from 'react-icons/ai'
import { IconContext } from 'react-icons'
import { useHistory } from 'react-router';

const index = ({children}) => {
    return (
        <div className="w-11/12 max-w-screen-lg mx-auto text-primary">
            {children}
            <footer className="my-5 flex justify-between items-center py-2">
                <Logo width="2.5rem" primary />
                <div className="flex">
                    <a rel="noopener noreferer" target="_blank" href="https://www.instagram.com">
                        <IconContext.Provider value={{size: 25}}>
                            <AiFillFacebook />
                        </IconContext.Provider>
                    </a>
                    <div className="ml-3">
                        <a rel="noopener noreferer" target="_blank" href="https://www.facebook.com">
                            <IconContext.Provider value={{size: 25}}>
                                <AiFillInstagram/>
                            </IconContext.Provider>
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default index;
