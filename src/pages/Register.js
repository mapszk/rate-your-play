import React from 'react';
import { Link, Redirect } from 'react-router-dom'
import Logo from '../components/Logo'
import Container from '../components/Container'
import RegisterForm from '../components/RegisterForm'
import halo from '../images/halo.png'
import { useAuthContext } from '../hooks/useAuthContext'
import { Helmet } from 'react-helmet';

const Register = () => {
    const { user } = useAuthContext()

    if(user) return <Redirect to="/welcome" />
    else return(
        <>
            <Helmet>
                <title>Register - Rate Your Play</title>
            </Helmet>
            <Container>
                <section className="min-h-screen w-full flex flex-col justify-center items-center py-10">
                    <Logo fill="white" width="3" classNames="mb-4" />
                    <RegisterForm />
                    <Link to="/login" className="text-primary underline">I have an account</Link>
                </section>
            </Container>
            <div className="absolute flex justify-center items-start top-0 left-0 right-0 opacity-5 z-n overflow-hidden">
                <img className="object-cover h-1/4" src={halo} alt="Halo" />
            </div>
        </>
    )
}

export default Register;
