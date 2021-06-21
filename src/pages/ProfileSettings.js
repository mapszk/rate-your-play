import React, { useState } from 'react'
import Avatar from '../components/Avatar'
import { useAuthContext } from '../hooks/useAuthContext'
import Button from '../components/Button'
import Input from '../components/Input'
import Label from '../components/Label'
import { db } from '../firebase/firebaseConfig'
import { useHistory } from 'react-router'

const userRegex = /^(?=.{5,40}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9_]+(?<![_.])$/

const ProfileSettings = () => {
    const { user } = useAuthContext()
    const { photoURL, displayName, email } = user
    const history = useHistory()
    const [newUsername, setNewUsername] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState(false)
    const [msg, setMsg] = useState('')

    const clearError = () => setTimeout(()=>{
        setError(false)
        setMsg('')
        setIsSubmitting(false)
    }, 6000)
    const handleSubmit = async (e) => {
        debugger
        e.preventDefault()
        setIsSubmitting(true)
        setError(false)
        setMsg('')
        if(newUsername !== ''){
            if(!userRegex.test(newUsername)){
                setIsSubmitting(false)
                setError(true)
                setMsg("Username must be between 5 and 40 characters, can't start or end with underscores")
                clearError()
                return
            }
            user.updateProfile({displayName: newUsername})
            await db.collection('users')
                .doc(user.uid.toString())
                .update({displayName: newUsername})
            return history.push(`/profile/${user.uid}`)
        }
    }
    
    return (
        <>
            <div className="pt-20">
                <div className="w-24 mx-auto">
                    <Avatar url={photoURL}/>
                </div>
                <h1 className="text-primary text-2xl font-semibold text-center mt-4">{displayName}</h1>
                <h1 className="text-mid text-sm font-semibold text-center mt-1">{email}</h1>
                <form className="w-full flex flex-col justify-center items-center max-w-md mt-5 mx-auto" onSubmit={handleSubmit}>
                    <Label>Change username</Label>
                    <Input 
                        value={newUsername} 
                        onChange={e=>setNewUsername(e.target.value)}   
                    />
                    {error && <span className="bg-mid text-white text-center rounded px-3 py-3 w-full">{msg}</span>}
                    <div className="flex flex-col justify-between w-full mt-2">
                        <Button secondary full disabled={isSubmitting?true:false}>Cancel</Button>
                        <Button primary full mt={2} disabled={isSubmitting?true:false}>{isSubmitting? 'Loading...' : 'Save changes'}</Button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default ProfileSettings;
