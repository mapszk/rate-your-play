import React, { useState, useEffect, useRef } from 'react';
import { format } from 'date-fns';
import { useAuthContext } from '../hooks/useAuthContext';
import { db } from '../firebase/firebaseConfig';
import { BiRefresh } from 'react-icons/bi'
import { AiFillDelete } from 'react-icons/ai'
import { IconContext } from 'react-icons';
import ReactStars from 'react-rating-stars-component'
import GameCover from './GameCover';
import Loader from './Loader'
import { useParams } from 'react-router';

const formatDate = (timestamp) => {
    const result = format(new Date(timestamp), 'Pp')
    return result.replace('-', '/')
}

const ReviewProfile = ({slug, date, rating, review, replayed}) => {
    const { user } = useAuthContext()
    const { userUID } = useParams()
    const [gameData, setGameData] = useState(null)
    const [loading, setLoading] = useState(true)
    const refReview = useRef()
    
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

    useEffect(()=>{
        const getGameData = async () => {
            await db.collection('games')
                .where('slug', '==', slug)
                .get()
                .then(querySnapshot=>{
                    querySnapshot.forEach(doc=>{
                        setGameData(doc.data())
                        setLoading(false)
                    })
                })
        }
        getGameData()
    }, [slug])

    if(loading) return <Loader />
    return (
        <article ref={refReview} className="p-3 border-b-2 relative border-opacity-20 border-mid flex">
            {   
                user.uid === userUID &&
                <div onClick={deleteReview} className="cursor-pointer absolute hover:bg-primary hover:text-dark rounded p-1 right-0 bottom-3 flex text-secondary font-semibold">
                    <h2 className="hidden md:block mr-2">Delete review</h2>
                    <IconContext.Provider value={{size: '1.5rem'}}>
                        <AiFillDelete/>
                    </IconContext.Provider>
                </div>
            }
            <div className="w-1/4 mr-4 max-w-100 cursor-pointer">
                <GameCover forReview cover={gameData.cover} slug={slug} name={gameData.name} />
            </div>
            <div className="w-3/4 text-white items-center">
                <div className="flex flex-col items-start">
                    <div className="flex items-center flex-wrap mb-2">
                        <h1 className={`text-primary font-semibold mr-4 leading-5 lg:text-lg ${gameData.name.length > 12 ? 'text-md' : 'text-lg'}`}>{gameData.name}</h1>
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
                    <blockquote className="text-white italic text-md mt-2">
                        {review}
                    </blockquote>
                    <h2 className="text-xs mt-2 font-semibold self-center text-mid mr-auto">{formatDate(date)}</h2>
                </div>
            </div>
        </article>
    );
}

export default ReviewProfile;
