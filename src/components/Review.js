import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { db } from '../firebase/firebaseConfig';

import Avatar from './Avatar'
import ReactStars from 'react-rating-stars-component'
import { useHistory } from 'react-router';

const formatDate = (timestamp) => {
    const result = format(new Date(timestamp), 'Pp')
    return result.replace('-', '/')
}

const Index = ({userUID, date, rating, review}) => {
    const [userData, setUserData] = useState(null)
    const [loading, setLoading] = useState(true)
    const history = useHistory()
    const handleProfile = () => {
        history.push(`/profile/${userUID}`)
    }
    useEffect(()=>{
        const getData = async () => {
            await db.collection('users')
                .where('uid', '==', userUID)
                .get()
                .then(querySnapshot=>{
                    querySnapshot.forEach(doc=>{
                        setUserData(doc.data())
                        setLoading(false)
                    })
                })
                .catch(err=> console.log(err))
        }
        getData()
    }, [userUID])
    if(loading) return 'Loading...'
    return (
        <article className="p-3 border-b-2 border-opacity-20 border-mid flex flex-col">
            <div className="flex text-white items-center">
                <div className="w-10 mr-4 cursor-pointer" onClick={handleProfile}>
                    <Avatar url={userData.photoURL}/>
                </div>
                <div className="flex flex-col items-start">
                    <h1 className="text-primary font-semibold text-lg">{userData.displayName}</h1>
                    <div className="-mt-2">
                        <ReactStars 
                            color="#452044" 
                            activeColor="#ED6D5C" 
                            value={rating}
                            size={20}
                            edit={false}
                        />
                    </div>
                </div>
            </div>
            <blockquote className="text-white italic text-md mt-2">
                {review}
            </blockquote>
            <h2 className="text-xs mt-2 font-semibold self-center text-mid mr-auto">{formatDate(date)}</h2>
        </article>
    );
}

export default Index;
