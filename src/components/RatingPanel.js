import React, { useEffect, useState } from 'react';
import Button from './Button'
import ReactStars from 'react-rating-stars-component'
import Modal from './Modal'
import ReviewForm from './ReviewForm';
import { db } from '../firebase/firebaseConfig';
import { useAuthContext } from '../hooks/useAuthContext';
import { useParams } from 'react-router';

const RatingPanel = ({reviews, site, gameplay, cover, name, classNames}) => {
    const { gameslug } = useParams()
    const { user } = useAuthContext()
    const [modal, setModal] = useState(false)
    const [isWishlist, setIsWishlist] = useState()
    const ratings = reviews.map(review=> review.rating)
    const average = ratings.reduce((accumulator, current)=> accumulator + current, 0)

    const handleWishlist = async () => {
        if(isWishlist){
            setIsWishlist(false)
            await db.collection('users')
                .doc(user.uid)
                .get()
                .then(doc=>{
                    const { wishlist: oldWish } = doc.data()
                    doc.ref.update({wishlist: oldWish.filter(game=> game.slug!==gameslug)})
                })
            return
        }
        if(!isWishlist){
            setIsWishlist(true)
            await db.collection('users')
                .doc(user.uid)
                .get()
                .then(doc=>{
                    const { wishlist: oldWish } = doc.data()
                    if(!oldWish) doc.ref.set({wishlist: [{slug: gameslug, cover, name}]}, {merge: true})
                    if(oldWish) doc.ref.update({wishlist: [...oldWish, {slug: gameslug, cover, name}]})
                })
            return
        }
    }
    useEffect(()=>{
        const getWishlist = async () => {
            await db.collection('users')
                .doc(user.uid)
                .get()
                .then(doc=>{
                    const { wishlist } = doc.data()
                    if(!wishlist) return setIsWishlist(false)
                    for(let i=0; i<wishlist.length; i++){
                        if(wishlist[i].slug===gameslug){
                            setIsWishlist(true)
                            break
                        }
                    }
                })
        }
        getWishlist()
    }, [])
    return (
        <div className={`text-center bg-mid py-2 px-2 rounded ${classNames}`}>
            <h3 className="text-white font-semibold">Average rating</h3>
            <ReactStars 
                size={40} 
                color="#452044" 
                activeColor="#ED6D5C" 
                classNames="mx-auto -mt-2 mb-1" 
                edit={false}
                value={Math.round(average/ratings.length) || 0}
            />
            <Button mb="2" full primary handleClick={()=>setModal(true)}>Rate!</Button>
            <Button mb="2" full secondary handleClick={handleWishlist}>
                {isWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
            </Button>
            <Button full secondary>
                <a className="w-full inline-block" target="_blank" rel="noopener noreferrer" href={gameplay}>Watch gameplay</a>
            </Button>
            <div className="my-2">
                <a className="text-primary font-semibold underline" target="_blank" rel="noopener noreferrer" href={site}>Go to website</a>
            </div>
            {modal && <Modal><ReviewForm onClose={()=>setModal(false)}/></Modal>}
        </div>
    )
}

export default RatingPanel;
