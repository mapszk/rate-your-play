import React from 'react';
import { useHistory } from 'react-router';

const formatPrice = num => num.toLocaleString('en-US', {style: 'currency', currency: 'USD'})

const GameInfo = ({name, genres, price, releaseYear, dev, classNames}) => {
    const history = useHistory()

    return (
        <div className={`mb-2 ${classNames}`}>
            <div className="w-full flex justify-between items-start">
                <h1 className={`text-white font-bold lg:text-5xl ${name.length>13?'text-2xl':'text-4xl'}`}>{name}</h1>
                <h3 className="text-white text-2xl lg:text-4xl font-semibold text-primary">{price? formatPrice(price) : 'Free'}</h3>
            </div>
            <h3 className="text-white text-2xl font-semibold text-primary my-1">{releaseYear} <span className="text-lg text-mid font-semibold">by {dev}</span></h3>
            {genres.map((genre,index)=> {
                return <span 
                    key={index} 
                    onClick={()=> history.push(`/category/${genre}`)} 
                    className="cursor-pointer bg-secondary rounded text-primary mr-1 px-1 text-sm"
                    >
                        {genre}
                    </span>
                })
            }
        </div>
    );
}

export default GameInfo;
