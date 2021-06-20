import React from 'react';
import { useHistory } from 'react-router';

import styles from '../styles/gameCover.module.css'

const GameCover = ({cover, slug, name}) => {
    const history = useHistory()
    const handleClick = () => history.push(`/game/${slug}`)
    return (
        <div onClick={handleClick} className={styles.cover}>
            <img className={`w-full rounded ${styles.img}`} src={cover} alt="game poster" />
            <div className={`
                ${styles.title} ${name.length>12? 'text-xs' : 'text-sm' }
            `}>
                <h2>{name}</h2>
            </div>
        </div>
    );
}

export default GameCover;
