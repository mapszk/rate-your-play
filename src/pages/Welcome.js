import React from 'react';
import { Redirect, useHistory } from 'react-router';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay, Pagination, Navigation } from 'swiper/core'
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css"
import "swiper/components/navigation/navigation.min.css"
import { GiStarsStack } from 'react-icons/gi'
import { MdRateReview } from 'react-icons/md'
import { AiFillSchedule } from 'react-icons/ai'
import { IconContext } from 'react-icons'
import Button from '../components/Button'
import Container from '../components/Container'
import Logo from '../components/Logo'
import mario from '../images/mario.png'
import { useAuthContext } from '../hooks/useAuthContext';
import { Helmet } from 'react-helmet'

SwiperCore.use([Autoplay, Pagination, Navigation])

const Welcome = () => {
    const { user } = useAuthContext()
    const history = useHistory()
    if(user) return <Redirect to="/"/>
    return (
        <>
            <Helmet>
                <title>Welcome to Rate Your Play!</title>
            </Helmet>
            <Container>
                <section className="h-screen py-10 flex flex-col justify-center relative overflow-hidden"> 
                    <div className="grid-row-start-1 grid-row-end-1 flex flex-col justify-center items-center text-center mb-12">
                        <Logo fill="white" width="9" classNames="mb-4" />
                        <div className="flex flex-col">
                            <Button handleClick={()=>history.push('/register')} full mb="2" primary>Get started</Button>
                            <Button handleClick={()=>history.push('/login')} full secondary>Log in</Button>
                        </div>
                    </div>
                    <div>
                        <Swiper
                            slidesPerView={1}
                            autoplay={{delay: 6000, disableOnInteraction: false}}
                        >
                            <SwiperSlide>
                                <div className="text-center flex flex-col justify-center items-center">
                                    <IconContext.Provider value={{color: '#ED6D5C', size: '4rem'}}>
                                        <GiStarsStack className="mb-4" />
                                    </IconContext.Provider>
                                    <h2 className="text-white font-bold mb-2 text-xl">Rate all you've played</h2>
                                    <p className="text-white px-5">You can rate every game you have played, choosing between 1 to 5 stars.</p>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className="text-center flex flex-col justify-center items-center">
                                    <IconContext.Provider value={{color: '#ED6D5C', size: '4rem'}}>
                                        <MdRateReview className="mb-4" />
                                    </IconContext.Provider>
                                    <h2 className="text-white font-bold mb-2 text-xl">Make a review</h2>
                                    <p className="text-white px-5">People might see your opinion useful for trying a new game.</p>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className="text-center flex flex-col justify-center items-center">
                                    <IconContext.Provider value={{color: '#ED6D5C', size: '4rem'}}>
                                        <AiFillSchedule className="mb-4" />
                                    </IconContext.Provider>
                                    <h2 className="text-white font-bold mb-2 text-xl">Make a journal</h2>
                                    <p className="text-white px-5">All games you rate will be recorded in a diary.</p>
                                </div>
                            </SwiperSlide>
                        </Swiper>
                    </div>
                </section>
            </Container>
            <div className="inset-0 absolute z-n opacity-5 overflow-hidden flex justify-center items-center">
                <img style={{objectFit: 'cover', height: '100%'}} src={mario} alt="mario" />
            </div>
        </>
    );
}

export default Welcome;
