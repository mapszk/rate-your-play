import React from 'react';
import { useAuthContext } from '../hooks/useAuthContext';

import sampleUser from '../images/sampleUser.png'

const Index = ({url}) => {
    const { user } = useAuthContext()
    if(url){
        return(
            <img 
                src={url || sampleUser} 
                className="ring-2 ring-primary rounded-full w-full" 
                alt="profile"
            />
        )
    }else{
        return (
            <img 
                src={user.photoURL || sampleUser} 
                className="ring-2 ring-primary rounded-full w-full" 
                alt="profile"
            />
        )
    }
}

export default Index;
