import React from 'react';
import styles from '../styles/genre.module.css'
import GameCover from './GameCover';

const Wishlist = ({wishlist}) => {
    if(wishlist===undefined || wishlist.length===0) return(
        <div className="text-mid font-semibold text-center w-full h-24 flex justify-center items-center p-4">
            This user hasn't any games in wishlist
        </div>
    )
    return (
        <div className={styles.grid}>
            {
                wishlist.map(game=>{
                    return <GameCover 
                        key={game.slug}
                        cover={game.cover}
                        slug={game.slug}
                        name={game.name}
                    />
                })
            }
        </div>
    );
}

export default Wishlist;
