import React from 'react';

import useGamePage from '../hooks/useGamePage'

import Container from '../components/Container'
import GameInfo from '../components/GameInfo'
import Loader from '../components/Loader'
import RatingPanel from '../components/RatingPanel'
import ReviewsSection from '../components/ReviewsSection'


const Game = () => {
    const { loading, gameInfo } = useGamePage()
    const { cover, name, genres, price, releaseYear, dev, gameplay, site, reviews } = gameInfo

    if(loading) return <Loader />
    return (
        <section className="">
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
                    classNames="mb-2"
                /> 
                <ReviewsSection reviews={reviews}/>
        </section>
    );
}

export default Game;
