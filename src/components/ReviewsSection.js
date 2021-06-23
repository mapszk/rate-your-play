import React from 'react';
import Review from '../components/Review'

const ReviewsSection = ({forProfile, reviews, classNames}) => {
    if(forProfile) return(
        <div className={classNames}>
            {
                reviews.length === 0 ? 
                <div className="text-mid font-semibold text-center w-full h-24 flex justify-center items-center p-4">
                    This user hasn't made any review yet
                </div> : 
                reviews.sort((a,b)=> b.date-a.date).map(({game_slug, review, date, rating, replayed})=>{
                    return <Review 
                        replayed={replayed}
                        forProfile={true}
                        key={date}
                        game_slug={game_slug} 
                        review={review} 
                        date={date} 
                        rating={rating} 
                    />
                })
            }
        </div>
    )
    return (
        <div className={classNames}>
            <h1 className="text-2xl text-white font-semibold">Reviews</h1>
            {
                reviews.length > 0 ? 
                reviews.sort((a,b)=> b.date-a.date).map(({userUID, review, date, rating, replayed})=>{
                    return <Review 
                        replayed={replayed}
                        key={date}
                        userUID={userUID} 
                        review={review} 
                        date={date} 
                        rating={rating} 
                    />
                }) : 
                <div className="text-mid font-semibold text-center w-full h-24 flex justify-center items-center p-4">
                    At the moment there are no reviews for this game.
                </div>
            }
        </div>
    );
}

export default ReviewsSection;
