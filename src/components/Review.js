import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { db } from '../firebase/firebaseConfig';
import { useHistory } from 'react-router';
import { BiRefresh } from 'react-icons/bi'
import { IconContext } from 'react-icons';
import Avatar from './Avatar'
import Loader from './Loader'
import ReactStars from 'react-rating-stars-component'
import GameCover from './GameCover';

const formatDate = (timestamp) => {
    const result = format(new Date(timestamp), 'Pp')
    return result.replace('-', '/')
}

const Review = ({forProfile, game_slug, userUID, date, rating, review, replayed}) => {
    const [userData, setUserData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [gameData, setGameData] = useState(null)
    const history = useHistory()

    const handleProfile = () => history.push(`/profile/${userUID}`)

    useEffect(()=>{
        const getData = async () => {
            if(!forProfile){
                await db.collection('users')
                    .doc(userUID)
                    .get()
                    .then(doc=>{
                        setUserData(doc.data())
                        setLoading(false)
                    })
            }
        }
        getData()
    }, [userUID])

    useEffect(()=>{
        const getGameData = async () => {
            if(forProfile){
                await db.collection('games')
                    .where('slug', '==', game_slug)
                    .get()
                    .then(querySnapshot=>{
                        querySnapshot.forEach(doc=>{
                            setGameData(doc.data())
                            setLoading(false)
                        })
                    })
            }
        }
        getGameData()
    }, [game_slug])

    if(loading) return <Loader />
    if(forProfile) return(
        <article className="p-3 border-b-2 border-opacity-20 border-mid flex">
            <div className="w-1/4 mr-4 max-w-100 cursor-pointer">
                <GameCover forReview cover={gameData.cover} slug={game_slug} name={gameData.name} />
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
    )
    return (
        <article className="p-3 border-b-2 border-opacity-20 border-mid flex flex-col">
            <div className="flex text-white items-center">
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
