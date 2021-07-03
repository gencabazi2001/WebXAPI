import React from 'react';
import Icon1 from '../../images/svg-1.svg';
import Icon2 from '../../images/svg-2.svg';
import Icon3 from '../../images/svg-3.svg';
 
import { ServicesContainer, ServicesH1, ServicesWrapper, ServicesCard, ServicesIcon, ServicesH2, ServicesP} from './servicesElements'

const Services = () => {
    return (
        <ServicesContainer id='services'> 
            <ServicesH1>Our Services</ServicesH1>
            <ServicesWrapper>
                <ServicesCard>
                    <ServicesIcon src={Icon1}/>
                    <ServicesH2>Reduce Time by being eficient!</ServicesH2> 
                    <ServicesP>The Platform Helps you to be more efficient</ServicesP>
                </ServicesCard>
                <ServicesCard>
                    <ServicesIcon src={Icon2}/>
                    <ServicesH2>Answers Right Away!</ServicesH2> 
                    <ServicesP>Find the best answer to your technical question, help others answer theirs</ServicesP>
                </ServicesCard>
                <ServicesCard>
                    <ServicesIcon src={Icon3}/>
                    <ServicesH2>Expand your Knowledge</ServicesH2> 
                    <ServicesP>Knowledge sharing and collaboration without distractions</ServicesP>
                </ServicesCard>
            </ServicesWrapper>
        </ServicesContainer>
    )
}

export default Services
