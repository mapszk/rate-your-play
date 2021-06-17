import React, { useState } from 'react';

import { Link } from 'react-router-dom';

import Logo from '../components/Logo'
import Button from '../components/Button'
import Container from '../components/Container'
import portal from '../images/portal.png'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(false)
    const [msg, setMsg] = useState('')

    const sectionStyles = [
        'min-h-screen',
        'w-full',
        'flex',
        'flex-col',
        'justify-center',
        'items-center',
        'py-10',
    ].join(' ')
    const formStyles = [
        'w-full',
        'flex',
        'flex-col',
        'justify-center',
        'items-center',
        'max-w-md',
    ].join(' ')
    const labelStyles = [
        'text-white',
        'block',
        'w-full',
        'mb-1'
    ].join(' ')
    const inputStyles = [
        'px-2',
        'block',
        'w-full',
        'mb-4',
        'h-8',
        'rounded',
        'focus:ring-primary focus:ring-2 focus:outline-none'
    ].join(' ')
    const errorStyles = [
        'bg-secondary',
        'text-white',
        'text-center',
        'rounded',
        'px-3',
        'py-3',
        'w-full'
    ].join(' ')

    return (
        <>
            <Container>
                <section className={sectionStyles}>
                    <Logo white width="3rem" mb="2rem" />
                    <h1 className="text-white text-center font-semibold text-2xl mb-3">Log in</h1>
                    <form className={formStyles}>
                        <label className={labelStyles} htmlFor="email">Email</label>
                        <input value={email} onChange={e=> setEmail(e.target.value)} className={inputStyles} type="text" id="email" name="email" />

                        <label className={labelStyles} htmlFor="password">Password</label>
                        <input value={password} onChange={e=> setPassword(e.target.value)} className={inputStyles} type="password" id="password" name="password"/>

                        {error && <span className={errorStyles}>{msg}</span>}
                        <Button mt="2" mb="10" full primary>Log me</Button>
                    </form>
                    <Link to="/register" className="text-primary underline">I don't have an account</Link>
                </section>
            </Container>
            <div className="absolute flex justify-center items-start top-0 left-0 right-0 opacity-5 z-n overflow-hidden">
                <img className="object-cover" src={portal} alt="" />
            </div>
        </>
    );
}

export default Login;
