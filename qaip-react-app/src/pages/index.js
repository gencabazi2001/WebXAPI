import React,{useState} from 'react'
import NavigationBar from '../components/NavigationBar'
import HeroSection from '../components/NavigationBar/HeroSection';
import Sidebar from '../components/NavigationBar/Sidebar'
import InfoSection from '../components/InfoSection';
import Services from '../components/Services';
import { HomeObjOne, HomeObjThree, HomeObjTwo } from '../components/InfoSection/Data';

const Home = () => {
    const [isOpen,setIsOpen]=useState(false);

    const toggle = () =>{
        //true-false-true
        setIsOpen(!isOpen);
    }
    return (
      <>
      <Sidebar isOpen={isOpen} toggle={toggle}/>
      <NavigationBar toggle={toggle}/>
      <HeroSection/>
      <InfoSection {...HomeObjOne}/>
      <InfoSection {...HomeObjTwo}/>
      <Services/>
      <InfoSection {...HomeObjThree}/>

      </>
    )
}

export default Home
