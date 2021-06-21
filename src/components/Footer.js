import React from 'react';
import { AiFillInstagram, AiFillFacebook } from 'react-icons/ai'
import { IconContext } from 'react-icons'

const Footer = () => {
    return (
        <footer className="h-24 w-full flex justify-between items-end pb-5">
            <h1 className="text-mid font-semibold text-md">rateyourplay.com</h1>
            <div className="flex">
                <a rel="noopener noreferer" target="_blank" href="https://www.instagram.com">
                    <IconContext.Provider value={{size: 25, color: '#594373'}}>
                        <AiFillFacebook />
                    </IconContext.Provider>
                </a>
                <div className="ml-3">
                    <a rel="noopener noreferer" target="_blank" href="https://www.facebook.com">
                        <IconContext.Provider value={{size: 25, color: '#594373'}}>
                            <AiFillInstagram/>
                        </IconContext.Provider>
                    </a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
