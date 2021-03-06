import React from 'react'
import Loader from '../components/Loader'
import GameCover from '../components/GameCover'
import useSearchResultPage from '../hooks/useSearchResultPage'
import { FaRegSadTear } from 'react-icons/fa'
import { IconContext } from 'react-icons/lib'
import styles from '../styles/genre.module.css'
import { Helmet } from 'react-helmet'

const SearchResult = () => {
    const { gamesInfo, loading, keyword } = useSearchResultPage()
    
    if(loading) return <Loader />
    if(gamesInfo===0 || gamesInfo.length === 0) return(
        <>
            <Helmet>
                <title>Search {keyword} - Rate Your Play</title>
            </Helmet>
            <div className="w-full py-24 flex flex-col justify-center items-center text-mid font-semibold px-10 text-center">
                <IconContext.Provider value={{size: '4rem'}}>
                    <FaRegSadTear />
                </IconContext.Provider>
                <h1 className="px-5 mt-4">Apparently there are no results for your search</h1>
            </div>
        </>
    )
    return (
        <>
            <Helmet>
                <title>Search {keyword} - Rate Your Play</title>
            </Helmet>
            <h1 className="text-primary text-2xl font-semibold mb-3">
                Results for:
                <span className="text-white">
                    {` ${keyword}`}
                </span>
            </h1>
            <div className={styles.grid}>
                {
                    gamesInfo.map(({cover, slug, name})=>{
                        return <GameCover cover={cover} name={name} slug={slug}/>
                    })
                }
            </div>
        </>
    );
}

export default SearchResult;
