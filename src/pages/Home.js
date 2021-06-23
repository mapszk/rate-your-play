import React, { useEffect, useState } from 'react';
import { BiHappyBeaming } from 'react-icons/bi'
import { IconContext } from 'react-icons'
import GameCover from '../components/GameCover'
import Loader from '../components/Loader'
import styles from '../styles/home.module.css'
import { db } from '../firebase/firebaseConfig';
import { Helmet } from 'react-helmet';

const Home = () => {
  const [games, setGames] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(()=>{
    const getData = async () => {
      await db.collection('games')
        .limit(6)
        .get()
        .then(querySnapshot=>{
          querySnapshot.forEach(doc=>{
            setGames(games=> [...games, doc.data()])
            setLoading(false)
          })
        })
    }
    getData()
  }, [])
  
  return (
    <>
      <Helmet>
          <title>Home - Rate Your Play</title>
      </Helmet>
      <div>
        <div className="bg-mid font-lg font-semibold text-dark py-3 mt-2 mb-4 rounded text-center">
          <IconContext.Provider value={{size: '2.5rem'}}>
            <BiHappyBeaming className="mx-auto"/>
          </IconContext.Provider>
          <h1 className="text-lg font-bold">Start rating your games!</h1>
          <p className="font-baseline">You can use the search up there</p>
        </div>
        {
          loading ? <Loader /> :
          <div className={styles.grid}>
            {
              games.map(({cover, slug, name})=>{
                return <GameCover 
                  cover={cover}
                  slug={slug}
                  name={name}
                />
              })
            }
          </div>
        }
      </div>
    </>
  );
}

export default Home;
