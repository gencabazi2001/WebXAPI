import React,{useState,useEffect} from 'react'
import {FaBars} from 'react-icons/fa'
import { IconContext } from 'react-icons/lib';
import { animateScroll as scroll } from 'react-scroll';
import { Nav,NavbarContainer,NavLogo,MobileIcon,NavMenu,NavItem,NavLinks,NavBtn,NavBtnLink } from './NavbarElements';
const Navbar = ({toggle}) => {
    const [scrollNav,setScrollNav] =useState(false)

    const changeNav = () =>{
        if(window.scrollY >= 80){
            setScrollNav(true)
        } else{
            setScrollNav(false)
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', changeNav)
    }, []);

    const toggleHome = ()=>{
        scroll.scrollToTop();
    }

    return (
        <>
        <IconContext.Provider value={{color:'#fff'}}>
        <Nav scrollNav={scrollNav}>
            <NavbarContainer>
                <NavLogo to="/" onClick={toggleHome}>Q.A.I.P</NavLogo>
                <MobileIcon onClick={toggle}>
                    <FaBars/>
                </MobileIcon>
                <NavMenu>
                    <NavItem>
                        <NavLinks to="about"
                        smooth={true}
                        //speed
                        duration={500}
                        //which one you are clicking on
                        spy={true}
                        //nese the route path osht nje exact match per url-ne e caktume
                        exact='true'
                        //ku me bo transition..sepse te navbar e kemi lon -80px
                        offset={-80}
                        >About</NavLinks>
                    </NavItem>
                    <NavItem>
                        <NavLinks to="discover"
                         smooth={true}
                         //speed
                         duration={500}
                         //which one you are clicking on
                         spy={true}
                         //nese the route path osht nje exact match per url-ne e caktume
                         exact='true'
                         //ku me bo transition..sepse te navbar e kemi lon -80px
                         offset={-80}
                        >Discover</NavLinks>
                    </NavItem>
                    <NavItem>
                        <NavLinks to="services"
                         smooth={true}
                         //speed
                         duration={500}
                         //which one you are clicking on
                         spy={true}
                         //nese the route path osht nje exact match per url-ne e caktume
                         exact='true'
                         //ku me bo transition..sepse te navbar e kemi lon -80px
                         offset={-80}
                        >Services</NavLinks>
                    </NavItem>
                    <NavItem>
                        <NavLinks to="signup"
                         smooth={true}
                         //speed
                         duration={500}
                         //which one you are clicking on
                         spy={true}
                         //nese the route path osht nje exact match per url-ne e caktume
                         exact='true'
                         //ku me bo transition..sepse te navbar e kemi lon -80px
                         offset={-80}
                        >Sign Up</NavLinks>
                    </NavItem>

                </NavMenu>
                <NavBtn>
                    <NavBtnLink to="/landingPage">Sign In</NavBtnLink>
                </NavBtn>
                
            </NavbarContainer>
        </Nav>
        </IconContext.Provider>
        </>
    )
}

export default Navbar;
