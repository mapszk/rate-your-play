import React, { useState } from 'react';

import { useAuthContext } from '../hooks/useAuthContext';
import Footer from './Footer';
import Header from './Header';

const Container = ({children}) => {
    const { user } = useAuthContext()
    return (
        <div className="w-11/12 max-w-960 mx-auto relative">
            {
                user && 
                <Header/>
            }
            <main className="min-h-custom">
                {children}  
            </main>
            {
                user &&
                <Footer/>
            }
        </div>
    );
}

export default Container;
