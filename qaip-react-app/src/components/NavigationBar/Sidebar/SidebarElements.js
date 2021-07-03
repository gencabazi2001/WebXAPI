import styled from 'styled-components';
import {Link as LinkScroll} from 'react-scroll';
import {Link as LinkR} from 'react-router-dom';
import {FaTimes} from 'react-icons/fa';

export const SidebarContainer = styled.aside`
    position:fixed;
    z-index:999;
    width:100%;
    height: 100%;
    background:#0d0d0d;
    display: grid;
    align-items:center;
    top: 0;
    left: 0;
    transition: 0.3s ease-in-out;
    //mundesh ne nje styled component- me perdore if else statements, per me display true ose false
    //0- Nuk shihet, 100%-shihet
     opacity:${({isOpen}) =>(isOpen ? '100%' : '0')};
    //per me bo dropdown, 0-pozicioni i top eshte 0
    top:${({isOpen}) => (isOpen ? '0' :'-100%')};
    
`

export const CloseIcon = styled(FaTimes)`
    color:#fff;

`

export const Icon = styled.div`
    position:absolute;
    top:1.2rem;
    right:1.5rem;
    background:transparent;
    font-size:2rem;
    outline:none;
`
export const SidebarWrapper = styled.div`
    color:#fff;
`

export const SidebarMenu =styled.ul`
    display: grid;
    //nr i kolonave ne grid dhe dimensionin e tyre, 1 fraction
    grid-template-columns: 1fr;
    //rreshtat ne forme me kompakte per nje "modul" qe perseritet
    grid-template-rows: repeat(6,80px);
    text-align: center;

    @media screen and (max-width:480px){
        //lartesia me e vogel ne mobil
        grid-template-rows: repeat(6,60px);
    }
`
export const SidebarLink = styled(LinkScroll)`
    display:flex;
    align-items: center;
    justify-content: center;
    font-size:1.5rem;
    text-decoration: none;
    list-style:none;
    transition: 0ms.2s ease-in-out;
    text-decoration: none;
    color:#fff;
    cursor:pointer;

    &:hover{
        color:#0dd6d3;
        transition: 0ms.2s ease-in-out;
    }
`
export const SideBtnWrap = styled.div`
    display:flex;
    justify-content: center;

`
export const SidebarRoute = styled(LinkR)`
    border-radius:50px;
    background:#0dd6d3;
    white-space: nowrap;
    padding: 16px 64px;
    color:#010606;
    font-size: 16px;
    outline: none;
    border:none;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    text-decoration: none;

    &:hover{
        transition: all 0.2s ease-in-out;
        background:#fff;
        color:#010606;
    }
`
