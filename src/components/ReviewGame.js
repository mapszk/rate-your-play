import React, { useEffect, useRef, useState } from 'react';
import { format } from 'date-fns';
import { db } from '../firebase/firebaseConfig';
import { useHistory } from 'react-router';
import { BiRefresh } from 'react-icons/bi'
import { AiFillDelete } from 'react-icons/ai'
import { IconContext } from 'react-icons';
import Avatar from './Avatar'
import Loader from './Loader'
import ReactStars from 'react-rating-stars-component'
import { useAuthContext } from '../hooks/useAuthContext';

const formatDate = (timestamp) => {
    const result = format(new Date(timestamp), 'Pp')
    return result.replace('-', '/')
}

const Review = ({slug, userUID, date, rating, review, replayed}) => {
    const { user } = useAuthContext()
    const [userData, setUserData] = useState(null)
    const [loading, setLoading] = useState(true)
    const history = useHistory()
    const refReview = useRef()

    useEffect(()=>{
        const getData = async () => {
            await db.collection('users')
                .doc(userUID)
                .get()
                .then(doc=>{
                    setUserData(doc.data())
                    setLoading(false)
                })
        }
        getData()
    }, [userUID])

    const handleProfile = () => history.push(`/profile/${userUID}`)
    const deleteReview = async () => {
        if(!window.confirm('Are you sure?')) return
        await db.collection('users')
            .doc(user.uid)
            .get()
            .then(doc=>{
                const { reviews: oldReviews } = doc.data()
                doc.ref.update({reviews: oldReviews.filter(review=> review.date!==date)})
            })
        await db.collection('games')
            .where('slug', '==', slug)
            .get()
            .then(querySnapshot=>{
                querySnapshot.forEach(doc=>{
                    const { reviews: oldReviews } = doc.data()
                    doc.ref.update({reviews: oldReviews.filter(review=> review.date!==date)})
                })
                refReview.current.remove()
            })
    }

    if(loading) return <Loader />
    return (
        <article ref={refReview} className="p-3 border-b-2 border-opacity-20 border-mid flex flex-col relative">
            <div className="flex text-white items-center">
                {   
                    user.uid === userUID &&
                    <div onClick={deleteReview} className="cursor-pointer absolute hover:bg-primary hover:text-dark rounded p-1 right-0 bottom-3 flex text-secondary font-semibold">
                        <h2 className="hidden md:block mr-2">Delete review</h2>
                        <IconContext.Provider value={{size: '1.5rem'}}>
                            <AiFillDelete/>
                        </IconContext.Provider>
                    </div>
                }
                <div className="w-10 mr-4 cursor-pointer text-primary flex-shrink-0" onClick={handleProfile}>
                    <Avatar url={userData.photoURL}/>
                </div>
                <div className="flex flex-col items-start">
                    <div className="flex flex-wrap mb-1">
                        <h1 className="text-primary mr-4 font-semibold text-lg">{userData.displayName}</h1>
                        {
                            replayed &&
                            <div className="text-mid flex items-center font-semibold">
                                <IconContext.Provider value={{size: '1.5rem'}}>
                                    <BiRefresh className="mr-1"/> 
                                </IconContext.Provider>
                                <span>Replayed</span>
                            </div>
                        }
                    </div>
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

export default Review;
