import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { db } from '../firebase/firebaseConfig'

const useGetGenreGames = () => {
    const { genre } = useParams()
    const [loading, setLoading] = useState(true)
    const [games, setGames] = useState([])

    useEffect(()=>{
        const getData = async () => {
            await db.collection('games')
                .where('genres', 'array-contains', genre.toLowerCase())
                .get()
                .then(querySnapshot=> {
                    if(querySnapshot.empty){
                        setLoading(false)
                        setGames(false)
                        return
                    }
                    querySnapshot.forEach(doc=>{
                        const newData = doc.data()
                        setGames(games=> ([...games, newData]))
                        setLoading(false)
                    })
                })
        }
        getData()
    }, [genre])
    return { loading, games, genre }
}

export default useGetGenreGames