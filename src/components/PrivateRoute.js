import React from 'react';
import { Redirect, Route } from 'react-router';
import { useAuthContext } from '../hooks/useAuthContext';

const Index = ({children, ...rest}) => {
    const { user } = useAuthContext()
    if(user){
        return <Route {...rest}>{children}</Route>
    }else{
        return <Redirect to="/welcome"/>
    }
}

export default Index;
