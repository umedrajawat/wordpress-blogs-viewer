import React from 'react';
import Body from './Body';
import Header from './Header';


/**
 * 
 * @param {*} props
 * This will render Header and Body for the Home page 
 */
function Home(props) {
    return (
        <div className='main'>
            <Header/>
             <Body/>
        </div>
    );
}

export default Home;