import React, { useState } from 'react';
import Button from './Button'
import Input from './Input'
import Label from './Label'
import { FcGoogle } from 'react-icons/fc'
import { db, loginWithGoogle, writeUserOnDatabase } from '../firebase/firebaseConfig';

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
            .then(async ({user})=> {
                /* 
                check if the user is already registered on the database
                */
                await db.collection('users')
                    .where('uid', '==', user.uid)
                    .get()
                    .then(querySnapshot=> {
                        if(querySnapshot.empty){
                            const USER = {
                                displayName: user.displayName.replace(' ', ''),
                                photoURL: user.photoURL,
                                uid: user.uid
                            }
                            user.updateProfile({
                                displayName: user.displayName.replace(' ', '')
                            })
                            writeUserOnDatabase(USER)
                        }
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
                        Log me with Google <FcGoogle className="ml-2"/> 
                    </div>
                </Button>
            </div>
        </>
    );
}

export default Index;
