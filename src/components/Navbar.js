import React from 'react';

import Avatar from './Avatar'
import SearchBar from './SearchBar'
import Container from './Container'

const index = () => {
    const headerStyles = [
        'flex',
        'h-9'
    ].join(' ')
    const avatarStyles = [
        'w-1/5',
    ].join(' ')
    const searchBarStyles = [
        'w-4/5',
        'ml-4',
        'h-full'
    ].join(' ')
    return (
        <>
            <Container>
                <header className={headerStyles}>
                    <div className={avatarStyles}>
                        <Avatar />
                    </div>
                    <div className={searchBarStyles}>
                        <SearchBar />
                    </div>
                </header>
            </Container>
        </>
    )
}

export default index;
