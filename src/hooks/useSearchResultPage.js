import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { db } from "../firebase/firebaseConfig";

const useSearchResultPage = () => {
    const { keyword } = useParams()
    const [loading, setLoading] = useState(true)
    const [gamesInfo, setGamesInfo] = useState([])

    useEffect(()=>{
        const getGamesData = async () => {
            await db.collection('games')
                .get()
                .then(querySnapshot=>{
                    if(querySnapshot.empty){
                        setGamesInfo(0)
                        setLoading(false)
                    }
                    querySnapshot.forEach(doc=>{
                        const newGame = doc.data()
                        setGamesInfo(gamesInfo=> ([...gamesInfo, newGame]))
                    })
                    setGamesInfo(gamesInfo=> gamesInfo.filter(game=> game.name.toLowerCase().includes(keyword)))
                    setLoading(false)
                })
        }
        getGamesData()
    }, [keyword])
    return {gamesInfo, loading, keyword}
}

export default useSearchResultPage