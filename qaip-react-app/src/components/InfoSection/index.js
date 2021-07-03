import React from 'react'
import {Button} from '../ButtonElement'
import { useHistory } from 'react-router-dom'
import { InfoContainer,InfoWrapper, InfoRow,Column1,Column2,TextWrapper,TopLine,Heading,Subtitle,
BtnWrap,ImgWrap,Img } from './infoElements'
// import ImgMess from '../../images/svg-1.svg';



const InfoSection = ({lightBg,id,imgStart,topLine,lightText,headLine,darkText,description,buttonLabel,img,alt,primary,dark,dark2}) => {
   
    const history = useHistory();
  
    const handleRoute = () =>{ 
      history.push("/signin");
    }
    
   
    return (
        //fragments
      <>
      <InfoContainer lightBg={lightBg} id={id}>
          <InfoWrapper>
              <InfoRow imgStart={imgStart}>
                  <Column1>
                  <TextWrapper>
                    <TopLine>{topLine}</TopLine>
                    <Heading lightText={lightText}>{headLine}</Heading>
                    <Subtitle darkText={darkText}>{description}</Subtitle>
                    <BtnWrap>
                        <Button onClick={handleRoute}
                        smooth={true}
                        //500 ms
                        duration={500}
                        //it doesnt know how to actually add the active class to it
                        spy={true}
                        excact="true"
                        //kur te ndryshohet faqja, mu bo trigger underline
                        offset={-80}
                        primary={primary? 1 : 0}
                        dark={dark? 1 : 0}
                        dark2={dark2? 1 : 0}
                        
                        >{buttonLabel}
                        </Button>
                    </BtnWrap>
                  </TextWrapper>
                  </Column1>
                  <Column2>
                  <ImgWrap>
                        <Img src={img} alt={alt}/>
                  </ImgWrap>
                  </Column2>
              </InfoRow>
          </InfoWrapper>
      </InfoContainer>
      </>
    )
}

export default InfoSection
