import React, { useEffect, useState } from 'react';
import useProfilePage from '../hooks/useProfilePage'
import ReviewsSection from '../components/ReviewsSection'
import Error from '../components/Error'
import Loader from '../components/Loader'
import Avatar from '../components/Avatar'
import Wishlist from '../components/Wishlist'

const Profile = () => {
    const { error, profileData, loading } = useProfilePage()
    const { desc, photoURL, displayName, reviews, wishlist} = profileData
    const [showReviews, setShowReviews] = useState(true)
    useEffect(()=>console.log(wishlist),[wishlist])
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
            <div className="flex justify-center items-center my-2">
                <h1 onClick={()=>setShowReviews(true)} className={`${showReviews?'text-white':'text-secondary'} cursor-pointer text-2xl font-semibold mr-10`}>Reviews</h1>
                <h1 onClick={()=>setShowReviews(false)} className={`${showReviews?'text-secondary':'text-white'} cursor-pointer text-2xl font-semibold`}>Wishlist</h1>
            </div>
            {
                showReviews ?
                <ReviewsSection reviews={reviews} forProfile={true}/> :
                <Wishlist wishlist={wishlist}/>
            }
        </>
    );
}

export default Profile;
