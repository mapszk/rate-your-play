import React, { useState } from 'react';
import Logo from '../components/Logo'
import SearchBar from '../components/SearchBar'
import Avatar from '../components/Avatar'
import headerStyles from '../styles/header.module.css'
import { Link, useHistory } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import { auth } from '../firebase/firebaseConfig';
import { IoIosCloseCircle } from 'react-icons/io'
import { IconContext } from 'react-icons'

const Header = () => {
    const { user } = useAuthContext()
    const history = useHistory()
    const [menu, setMenu] = useState(false)
    const handleMenuOn = () => {
        if(window.innerWidth >= 1024) return
        setMenu(true)
        document.body.style.overflow = 'hidden'
    }
    const handleMenuOff = () => {
        setMenu(false)
        document.body.style.overflow = 'unset'
    }
    const logout = async () => {
        await auth.signOut()
            .then(()=>{
                history.push('/welcome')
            })
    }
    return (
        <>
            {
                user &&
                <header className={`h-12 py-2 w-full px-1 ${headerStyles.header}`}>
                    <Logo fill="white" width="2" classNames={headerStyles.logo}/>
                    <SearchBar classNames={headerStyles.search}/>
                    <div className={headerStyles.avatar} onClick={handleMenuOn}>
                        <Avatar/>
                    </div>
                    {/* menu for desktop */}
                    <div className={headerStyles.menuDesktop}>
                        <Link to={`/profile/${user.uid}`} className="mr-5">Profile</Link>
                        <Link to="/settings" className="mr-5">Settings</Link>
                        <h2 onClick={logout} className="cursor-pointer">Log out</h2>
                    </div>
                </header>
            }
            {
                menu && 
                <div className={`text-primary text-lg bg-dark font-semibold ${headerStyles.menu}`}>
                    <Link onClick={handleMenuOff} to={`/profile/${user.uid}`} className="mb-5">Profile</Link>
                    <Link onClick={handleMenuOff} to="/settings" className="mb-5">Settings</Link>
                    <h2 onClick={logout}>Log out</h2>
                    <IconContext.Provider value={{size: '2rem'}}>
                        <IoIosCloseCircle onClick={handleMenuOff} className="absolute top-3 right-3"/>
                    </IconContext.Provider>

                </div>
            }
        </>
    );
}

export default Header;
