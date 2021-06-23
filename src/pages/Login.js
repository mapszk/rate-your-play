import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import Logo from '../components/Logo'
import Container from '../components/Container'
import LoginForm from '../components/LoginForm'
import portal from '../images/portal.png'
import { useAuthContext } from '../hooks/useAuthContext';
import { Helmet } from 'react-helmet';

const Login = () => {
    const { user } = useAuthContext()

    if(user) return <Redirect to="/welcome" />
    else return (
        <>
            <Helmet>
                <title>Login - Rate Your Play</title>
            </Helmet>
            <Container>
                <section className="min-h-screen w-full flex flex-col justify-center items-center py-10">
                    <Logo fill="white" width="3" classNames="mb-4" />
                    <h1 className="text-white text-center font-semibold text-2xl mb-3">Log in</h1>
                    <LoginForm />
                    <Link to="/register" className="text-primary underline">I don't have an account</Link>
                </section>
            </Container>
            <div className="absolute flex justify-center items-start top-0 left-0 right-0 opacity-5 z-n overflow-hidden">
                <img className="object-cover" src={portal} alt="portal" />
            </div>
        </>
    )
}

export default Login;
