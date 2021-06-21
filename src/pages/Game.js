import React from 'react';
import useGamePage from '../hooks/useGamePage'
import styles from '../styles/game.module.css'
import GameInfo from '../components/GameInfo'
import Loader from '../components/Loader'
import RatingPanel from '../components/RatingPanel'
import ReviewsSection from '../components/ReviewsSection'

const Game = () => {
    const { loading, gameInfo } = useGamePage()
    const { cover, name, genres, price, releaseYear, dev, gameplay, site, reviews } = gameInfo

    if(loading) return <Loader />
    return (
        <section className={`flex flex-col`}>
                <img className={`order-first rounded-lg object-cover h-52 w-full mb-2`} src={cover}/>
                <div className={`flex flex-col ${styles.grid}`}>
                    <GameInfo 
                        classNames={`${styles.info}`}
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
                        classNames={`mb-2 ${styles.rating}`}
                    /> 
                    <ReviewsSection classNames={`w-full ${styles.reviews}`} reviews={reviews}/>
                </div>
        </section>
    );
}

export default Game;
