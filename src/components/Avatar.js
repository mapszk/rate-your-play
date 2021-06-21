import React from 'react';
import { useAuthContext } from '../hooks/useAuthContext';

import sampleUser from '../images/sampleUser.png'

const Index = ({url, classNames}) => {
    const { user } = useAuthContext()
    if(url !== undefined){
        return(
            <img 
                src={url || sampleUser} 
                className={`ring-2 ring-primary rounded-full w-full ${classNames}`}
                alt="profile"
            />
        )
    }else{
        return (
            <img 
                src={user.photoURL || sampleUser} 
                className={`ring-2 ring-primary rounded-full w-full ${classNames}`}
                alt="profile"
            />
        )
    }
}

export default Index;
