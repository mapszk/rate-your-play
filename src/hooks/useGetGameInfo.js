import { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { db } from '../firebase/firebaseConfig'

const useGetGameInfo = ({gameslug}) => {
    const history = useHistory()
    const [loading, setLoading] = useState(true)
    const [gameInfo, setGameInfo] = useState({})

    useEffect(() => {
        db.collection('games').where('slug', '==', gameslug.trim())
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
    }, [gameslug])

    return {loading, gameInfo}
}

export default useGetGameInfo
