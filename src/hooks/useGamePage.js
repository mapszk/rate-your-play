import { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { db } from '../firebase/firebaseConfig'
import { useParams } from 'react-router';

const useGamePage = () => {
    const { gameslug } = useParams()
    const history = useHistory()
    const [loading, setLoading] = useState(true)
    const [gameInfo, setGameInfo] = useState({})

    useEffect(() => {
        const getGameData = async () => {
            await db.collection('games').where('slug', '==', gameslug.trim())
            .get()
            .then(querySnapshot=>{
                querySnapshot.forEach(doc=>{
                    setGameInfo(doc.data())
                    setLoading(false)
                })
            })
            .catch(err=> {
                history.push('/')
            })
        }
        getGameData()
    }, [gameslug, history])

    return {loading, gameInfo}
}

export default useGamePage
