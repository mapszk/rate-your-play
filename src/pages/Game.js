import React from 'react';

import { useParams } from 'react-router';
import useGetGameInfo from '../hooks/useGetGameInfo'

import Container from '../components/Container'
import GameInfo from '../components/GameInfo'
import Loader from '../components/Loader'
import RatingPanel from '../components/RatingPanel'
import Review from '../components/Review'


const Game = () => {
    const { gameslug } = useParams()
    const { loading, gameInfo } = useGetGameInfo({gameslug})
    const { cover, name, genres, price, releaseYear, dev, gameplay, site, reviews } = gameInfo
    console.log(reviews)
    if(loading) return <Loader />
    return (
        <Container>
            <section className="py-2">
                    <GameInfo 
                        cover={cover} 
                        name={name} 
                        dev={dev} 
                        genres={genres} 
                        price={price} 
                        releaseYear={releaseYear}
                    />
                    <RatingPanel 
                        gameplay={gameplay}
                        site={site}
                    /> 
                    <h1 className="text-2xl text-white font-semibold">Reviews</h1>
                    {
                        reviews.map(({userUID, review, date, rating})=>{
                            return <Review 
                                key={userUID}
                                userUID={userUID} 
                                review={review} 
                                date={date} 
                                rating={rating} 
                            />
                        })
                    }
            </section>
        </Container>
    );
}

export default Game;
