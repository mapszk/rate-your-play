import React from 'react';
import useGamePage from '../hooks/useGamePage'
import styles from '../styles/game.module.css'
import GameInfo from '../components/GameInfo'
import Loader from '../components/Loader'
import RatingPanel from '../components/RatingPanel'
import ReviewsSection from '../components/ReviewsSection'
import { Helmet } from 'react-helmet';

const Game = () => {
    const { loading, gameInfo } = useGamePage()
    const { cover, name, genres, price, releaseYear, dev, gameplay, site, reviews } = gameInfo
    if(loading) return <Loader />
    return (
        <>
            <Helmet>
                <title>{name} - Rate Your Play</title>
            </Helmet>
            <section className={styles.section}>
                    <img className="rounded object-cover h-52 w-full mb-2" alt={name} src={cover}/>
                    <div className={styles.grid}>
                        <GameInfo 
                            classNames={styles.info}
                            name={name} 
                            dev={dev} 
                            genres={genres} 
                            price={price} 
                            releaseYear={releaseYear}
                        />
                        <RatingPanel 
                            cover={cover}
                            name={name}
                            gameplay={gameplay}
                            site={site}
                            reviews={reviews}
                            classNames={styles.rating}
                        /> 
                        <ReviewsSection classNames={styles.reviews} reviews={reviews.filter(rev=>rev.review.length>0)}/>
                    </div>
            </section>
        </>
    );
}

export default Game;
