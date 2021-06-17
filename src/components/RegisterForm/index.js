import React, { useState } from 'react';

import { auth, loginWithGoogle } from '../../firebase/firebaseConfig';
import Button from '../../components/Button'
import Input from '../../components/Input'
import Label from '../../components/Label'
import { FcGoogle } from 'react-icons/fc'

const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
const passRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
const userRegex = /^(?=.{5,40}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9_]+(?<![_.])$/

const Index = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [repass, setRepass] = useState('')
    const [error, setError] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [msg, setMsg] = useState('')

    const clearError = () => setTimeout(()=>{
        setError(false)
        setMsg('')
        setIsSubmitting(false)
    }, 6000)
    const handleSubmit = () => {
        setIsSubmitting(true)
        auth.createUserWithEmailAndPassword(email, password)
            .then(userCredential=> {
                const user = userCredential.user
                user.updateProfile({
                    displayName: username.trim()
                })
                setIsSubmitting(false)
            })
            .catch(err=> {
                setIsSubmitting(false)
                setError(true)
                setMsg(err.message)
                clearError()
            })
    }
    const loginGoogle = () => {
        loginWithGoogle()
            .then(userCredential => {
                const user = userCredential.user
                const oldName = userCredential.user.displayName
                user.updateProfile({
                    displayName: oldName.replace(' ', '')
                })
                setIsSubmitting(false)
            })
            .catch(error=> {
                setError(true)
                setMsg(error.message)
                clearError()
                setIsSubmitting(false)
            })
    }
    const validation = (e) => {
        e.preventDefault()
        setIsSubmitting(true)
        setError(false)
        setMsg('')
        if(email === '' || password === '' || repass === ''){
            setIsSubmitting(false)
            setError(true)
            setMsg('Please complete all the fields')
            clearError()
            return
        }else if(!userRegex.test(username)){
            setIsSubmitting(false)
            setError(true)
            setMsg("Username must be between 5 and 40 characters, can't start or end with underscores")
            clearError()
            return
        }else if(!emailRegex.test(email)){
            setIsSubmitting(false)
            setError(true)
            setMsg('Please put a valid email')
            clearError()
            return
        }else if(!passRegex.test(password)){
            setIsSubmitting(false)
            setError(true)
            setMsg('Password must be at least 8 characters long, must contain one number and one letter')
            clearError()
            return
        }else if(repass !== password){
            setIsSubmitting(false)
            setError(true)
            setMsg('Check the password confirmation')
            clearError()
            return
        }else{
            handleSubmit()
        }
    }

    const formStyles = [
        'w-full',
        'flex',
        'flex-col',
        'justify-center',
        'items-center',
        'max-w-md',
    ].join(' ')
    const errorStyles = [
        'bg-mid',
        'text-white',
        'text-center',
        'rounded',
        'px-3',
        'py-3',
        'w-full'
    ].join(' ')
    
    return (
        <>
            <h1 className="text-white text-center font-semibold text-2xl mb-3">Create an account</h1>
            <form className={formStyles} onSubmit={validation}>
                <Label htmlFor="username">Username</Label>
                <Input 
                    value={username} 
                    onChange={e=> setUsername(e.target.value)} 
                    id="username" 
                    name="username" 
                />
                <Label htmlFor="email">Email</Label>
                <Input 
                    value={email} 
                    onChange={e=> setEmail(e.target.value)} 
                    id="email" 
                    name="email" 
                />
                <Label htmlFor="password">Password</Label>
                <Input 
                    value={password} 
                    onChange={e=> setPassword(e.target.value)} 
                    type="password" 
                    id="password" 
                    name="password"
                />
                <Label htmlFor="repass">Repeat your password</Label>
                <Input 
                    value={repass} 
                    onChange={e=> setRepass(e.target.value)} 
                    type="password" 
                    id="repass" 
                    name="repass"
                />
                {error && <span className={errorStyles}>{msg}</span>}
                <Button 
                    mt="2"
                    mb="3" 
                    full 
                    primary 
                    type="submit"
                    disabled={isSubmitting ? true : false}
                >
                    {isSubmitting ? 'Loading...' : 'Register'}
                </Button>
            </form>
            <div className="w-full max-w-md">
                <Button 
                    secondary
                    full 
                    mb="10" 
                    handleClick={loginGoogle}
                >
                    <div className="flex justify-center items-center">
                        Sign in with Google <FcGoogle/> 
                    </div>
                </Button>
            </div>
        </>
    );
}

export default Index;
