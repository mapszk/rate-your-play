import React, { useEffect } from 'react';

import useProfilePage from '../hooks/useProfilePage'
import Container from '../components/Container'
import ReviewsSection from '../components/ReviewsSection'
import Error from '../components/Error'
import Loader from '../components/Loader'
import Avatar from '../components/Avatar'

const Profile = () => {
    const {error, profileData, loading} = useProfilePage()
    const { desc, photoURL, displayName, reviews} = profileData
    useEffect(()=>console.log(profileData), [profileData])
    if(loading) return <Loader />
    if(error) return <Error />
    return (
        <>
            <div>
                <div className="w-24 mx-auto pt-4">
                    <Avatar url={photoURL}/>
                </div>
                <h1 className="text-primary text-2xl font-semibold text-center mt-2">{displayName}</h1>
                <p className="text-mid text-center text-md px-2 mt-1 border-b-2 border-mid  border-opacity-20 pb-3">{desc}</p>
            </div>
            <ReviewsSection reviews={reviews} forProfile={true}/>
        </>
    );
}

export default Profile;
