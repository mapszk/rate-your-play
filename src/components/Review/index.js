import { format, formatISO, fromUnixTime } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { db, getUserDataFromDatabase } from '../../firebase/firebaseConfig';

import Avatar from '../Avatar'
import ReactStars from 'react-rating-stars-component'

const formatDate = (timestamp) => {
    const result = format(new Date(timestamp), 'Pp')
    return result.replace('-', '/')
}

const Index = ({userUID, date, rating, review}) => {
    const [userData, setUserData] = useState(null)
    const [loading, setLoading] = useState(true)
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
        <article className="p-3 border-b-2 border-opacity-20 border-mid">
            <div className="flex text-white items-center">
                <div className="w-10 mr-4">
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
                        />
                    </div>
                </div>
                <h2 className="text-sm font-semibold self-center text-mid ml-auto">{formatDate(date)}</h2>
            </div>
            <blockquote className="text-white italic text-md mt-2">
                {review}
            </blockquote>
        </article>
    );
}

export default Index;
