import React from 'react';
import Review from '../components/Review'

const ReviewsSection = ({reviews}) => {
    return (
        <div>
            <h1 className="text-2xl text-primary font-semibold">Reviews</h1>
            {
                reviews ? 
                reviews.map(({userUID, review, date, rating})=>{
                    return <Review 
                        key={userUID}
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
