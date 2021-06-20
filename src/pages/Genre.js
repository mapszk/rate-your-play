import React, { useEffect } from 'react';

import useGetGenreGames from '../hooks/useGetGenreGames'
import Loader from '../components/Loader'
import Container from '../components/Container'
import GameCover from '../components/GameCover'

import styles from '../styles/genre.module.css'

const Genre = () => {
    const { loading, games, genre } = useGetGenreGames() 

    if(loading) return <Loader />
    return (
        <Container>
            <div>
                <h1 className="text-primary text-2xl font-semibold mb-3">
                    Genre: 
                    <span className="text-white">
                        {` ${genre.charAt(0).toUpperCase()+genre.slice(1)}`}
                    </span>
                </h1>
                {
                    games ?
                    <div className={styles.grid}>
                        {    
                            games.map(game=>{
                                return <GameCover key={game.slug} name={game.name} cover={game.cover} slug={game.slug} />
                            })
                        }
                    </div> :
                    <div className="w-full h-24 text-mid flex justify-center items-center font-semibold text-center px-24">
                        There are no games for the genre: "{genre}"
                    </div>
                }
            </div>
        </Container>
    );
}

export default Genre;
