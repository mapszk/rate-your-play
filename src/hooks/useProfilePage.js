import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { db } from "../firebase/firebaseConfig";

const useProfilePage = () => {
    const { userUID } = useParams()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [profileData, setProfileData] = useState({})

    useEffect(()=>{
        const getData = async () => {
            await db.collection('users')
                .where('uid', '==', userUID)
                .get()
                .then(querySnapshot=>{
                    if(querySnapshot.empty){
                        setLoading(false)
                        setError(true)
                    }
                    querySnapshot.forEach(doc=>{
                        setProfileData(doc.data())
                        setLoading(false)
                    })
                })
                .catch(err=>{
                    setError(true)
                    setLoading(false)
                })
        }
        getData()
    }, [userUID])
    return { loading, error, profileData }
}

export default useProfilePage