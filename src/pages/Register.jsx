import React, { useState } from 'react';

import { Link } from 'react-router-dom';

import Button from '../components/Button'
import Logo from '../components/Logo'
import Container from '../components/Container'
import halo from '../images/halo.png'

const userRegex = /^(?=.{5,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9_]+(?<![_.])$/
const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
const passRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/

const Register = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [repass, setRepass] = useState('')
    const [error, setError] = useState(false)
    const [msg, setMsg] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        setError(false)
        setMsg('')
        if(username === '' || email === '' || email === '' || password === '' || repass === ''){
            setError(true)
            setMsg('Please complete all the fields')
        }else if(!userRegex.test(username)){
            setError(true)
            setMsg('Username must be contain between 5 and 20 characters, only underscores are allowed except at the beginning and in the end')
        }else if(!emailRegex.test(email)){
            setError(true)
            setMsg('Please put a valid email')
        }else if(!passRegex.test(password)){
            setError(true)
            setMsg('Password must be at least 8 characters long, at least one number and one letter')
        }else if(repass !== password){
            setError(true)
            setMsg('Check the password confirmation')
        }

    }

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
                    <h1 className="text-white text-center font-semibold text-2xl mb-3">Create an account</h1>
                    <form className={formStyles} onSubmit={handleSubmit}>
                        <label className={labelStyles} htmlFor="username">Username</label>
                        <input value={username} onChange={e=> setUsername(e.target.value)} className={inputStyles} type="text" id="username" name="username" placeholder="xX_coolg4mer_Xx" />

                        <label className={labelStyles} htmlFor="email">Email</label>
                        <input value={email} onChange={e=> setEmail(e.target.value)} className={inputStyles} type="text" id="email" name="email" placeholder="c00lgam3r@gmail.com" />

                        <label className={labelStyles} htmlFor="password">Password</label>
                        <input value={password} onChange={e=> setPassword(e.target.value)} className={inputStyles} type="password" id="password" name="password"/>

                        <label className={labelStyles} htmlFor="repass">Repeat your password</label>
                        <input value={repass} onChange={e=> setRepass(e.target.value)} className={inputStyles} type="password" id="repass" name="repass"/>
                        
                        {error && <span className={errorStyles}>{msg}</span>}
                        <Button mt="2" mb="10" full primary>Register</Button>
                    </form>
                    <Link to="/login" className="text-primary underline">I have an account</Link>
                </section>
            </Container>
            <div className="absolute flex justify-center items-start top-0 left-0 right-0 opacity-5 z-n overflow-hidden">
                <img className="object-cover h-1/4" src={halo} alt="" />
            </div>
        </>
    );
}

export default Register;
