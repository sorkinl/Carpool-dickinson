import React, {useRef} from 'react';
import Header from './Header';
import Navbar from './Navbar';
import Features from './Features';

const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop-70)

const MainPage = () => {

    const myRef = useRef(null)
   const executeScroll = () => scrollToRef(myRef)
    return(
        <>
         <Navbar/> 
        <Header executeScroll={executeScroll}/>
        <Features refProp={myRef}/>
        </>
    )
}


export default MainPage;