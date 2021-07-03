import React,{useState} from 'react'
import Video from '../../../videos/video.mp4'
import { HeroContainer,HeroBg,VideoBg,HeroContent,HeroH1,HeroBtnWrapper,HeroP,ArrowForward,ArrowRight } from './heroElements'
import {Button}  from '../../ButtonElement';
const HeroSection = () => {

    const[hover,setHover]=useState(false);

    const onHover = () =>{
        setHover(!hover);
    }
    return (
       <HeroContainer>
           <HeroBg>
               <VideoBg autoPlay loop muted src={Video} type='video/mp4'/>
           </HeroBg>
           <HeroContent>
            <HeroH1>Question and Answer Interaction Platform</HeroH1>
            <HeroP>Sign up for a new account today and be a part of a huge comunity!</HeroP>
            <HeroBtnWrapper>
                <Button to="signup" onMouseEnter={onHover} onMouseLeave={onHover} primary="true" dark="true"
                
                smooth={true}
                //speed
                duration={500}
                //which one you are clicking on
                spy={true}
                //nese the route path osht nje exact match per url-ne e caktume
                exact='true'>
                    Get started {hover ? <ArrowForward/> : <ArrowRight/>}
                </Button>
            </HeroBtnWrapper>
       </HeroContent>
       </HeroContainer>
       
    )
} 

export default HeroSection
