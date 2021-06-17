import React, { useState } from 'react';

import Button from '../../components/Button'
import Input from '../../components/Input'
import Label from '../../components/Label'
import { FcGoogle } from 'react-icons/fc'
import { loginWithGoogle } from '../../firebase/firebaseConfig';

const Index = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(false)
    const [msg, setMsg] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)

    const clearError = () => setTimeout(()=>{
        setError(false)
        setMsg('')
        setIsSubmitting(false)
    }, 6000)
    const loginGoogle = () => {
        loginWithGoogle()
            .then(userCredential=> {
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
    const formStyles = [
        'w-full',
        'flex',
        'flex-col',
        'justify-center',
        'items-center',
        'max-w-md',
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
            <form className={formStyles}>
                <Label htmlFor="email">Email</Label>
                <Input value={email} onChange={e=> setEmail(e.target.value)} id="email" name="email" />

                <Label htmlFor="password">Password</Label>
                <Input value={password} onChange={e=> setPassword(e.target.value)} type="password" id="password" name="password"/>

                {error && <span className={errorStyles}>{msg}</span>}
                <Button mt="2" mb="3" full primary disabled={isSubmitting ? true : false}>{isSubmitting ? 'Loading...' : 'Log me'}</Button>
            </form>
            <div className="w-full max-w-md">
                <Button 
                    secondary
                    full 
                    mb="10" 
                    handleClick={loginGoogle}
                >
                    <div className="flex justify-center items-center">
                        Log me with Google <FcGoogle/> 
                    </div>
                </Button>
            </div>
        </>
    );
}

export default Index;
