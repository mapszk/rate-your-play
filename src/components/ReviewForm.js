import React, { useState } from 'react';
import Label from './Label'
import ReactStars from 'react-rating-stars-component'
import Button from './Button'
import { useParams } from 'react-router';
import { db } from '../firebase/firebaseConfig';
import { useAuthContext } from '../hooks/useAuthContext';

const ReviewForm = ({onClose}) => {
    const { gameslug } = useParams()
    const { user } = useAuthContext()
    const [review, setReview] = useState('')
    const [rating, setRating] = useState(null)
    const [error, setError] = useState(false)
    const [msg, setMsg] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)

    const clearError = () => setTimeout(()=>{
        setError(false)
        setMsg('')
        setIsSubmitting(false)
    }, 6000)
    
    const handleSubmit = (e) => {
        e.preventDefault()
        if(rating === null) return
        const date = Date.now()
        const newReviewToGame = {
            date,
            rating,
            review: review.trim(),
            userUID: user.uid,
            slug: gameslug
        }
        const newReviewToProfile = {
            date,
            game_slug: gameslug,
            rating,
            review: review.trim()
        }
        
        const addReviewToGame = async () => {
            setIsSubmitting(true)

            await db.collection('games')
                .where('slug', '==', gameslug)
                .get()
                .then(querySnapshot=>{
                    querySnapshot.forEach(doc=>{
                        const { reviews } = doc.data()
                        for(let i=0; i<reviews.length; i++){
                            if(reviews[i].userUID === user.uid){
                                newReviewToGame.replayed = true
                                newReviewToProfile.replayed = true
                                break
                            }
                        }
                        doc.ref.update({reviews: [...reviews, newReviewToGame]})
                    })
                })
                .catch(err=>{
                    setError(true)
                    setMsg(err.message)
                    isSubmitting(false)
                    clearError()
                    return
                })
        }
        const addReviewToProfile = async () => {
            await db.collection('users')
                .doc(user.uid)
                .get()
                .then(doc=>{
                    const { reviews } = doc.data()
                    if(!reviews) doc.ref.set({reviews: [newReviewToProfile]}, {merge: true})
                    if(reviews) doc.ref.update({reviews: [...reviews, newReviewToProfile]})
                    setIsSubmitting(false)
                    onClose()
                    setTimeout(()=>window.location.reload(), 2000)
                })
                .catch(err=>{
                    console.log(err)
                    setError(true)
                    setMsg(err.message)
                    setIsSubmitting(false)
                    clearError()
                    return
                })
        }
        addReviewToGame()
        addReviewToProfile()
    }

    return (
        <form onSubmit={handleSubmit} className="w-full font-semibold">
            <h1 className="text-white text-2xl">Rate</h1>
            <div>
                <ReactStars 
                    size={40} 
                    color="#452044" 
                    activeColor="#ED6D5C" 
                    classNames="-mt-3" 
                    onChange={(value)=>setRating(value)}
                    edit={true}
                />  
            </div>
            <Label>Your review <span className="text-sm">(optional)</span></Label>
            <textarea value={review} onChange={(e)=>setReview(e.target.value)} className="w-full focus:ring-primary focus:ring-2 rounded px-2 py-1 resize-none h-32 focus:outline-none"></textarea>
            {error && <span className="bg-mid text-white text-center rounded px-3 py-3 w-full">{msg}</span>}
            <div className="flex mt-2 flex-wrap">
                <Button full mb="2" secondary handleClick={onClose}>Cancel</Button>
                <Button full primary type="submit">Send</Button>
            </div>
        </form>
    );
}

export default ReviewForm;
