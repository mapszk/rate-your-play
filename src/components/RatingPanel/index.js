import React from 'react';
import Button from '../Button'
import ReactStars from 'react-rating-stars-component'

const index = ({site, gameplay}) => {
    return (
        <div className="text-center bg-mid py-2 px-2 rounded">
            <h3 className="text-white font-semibold">Average rating</h3>
            <ReactStars 
                size={40} 
                color="#452044" 
                activeColor="#ED6D5C" 
                classNames="mx-auto -mt-2 mb-1" 
                edit={false}
                value={4}
            />
            <Button mb="2" full primary>Rate!</Button>
            <Button mb="2" full secondary>
                <a className="w-full inline-block" target="_blank" href={gameplay}>Watch gameplay</a>
            </Button>
            <Button full secondary>
                <a className="w-full inline-block" target="_blank" href={site}>Go to website</a>
            </Button>
        </div>
    )
}

export default index;
