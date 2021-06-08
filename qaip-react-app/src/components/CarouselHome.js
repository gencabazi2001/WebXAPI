import React from 'react'
import { Carousel, Button, Card } from 'react-bootstrap'

const CarouselHome = ({ src1, src2, src3, h31, h32, h33, p1, p2, p3, btxt1, btxt2, btxt3, bhref1, bhref2, bhref3 }) => {
  return (
    <div>
      <Carousel prevLabel="" pause="hover" nextLabel=""  >
        <Carousel.Item style={{ maxHeight: "80vh", background: "#13131f" }}>
          <img
            className="d-block w-100"
            src={src1}
            alt="First slide"
            style={{ opacity: "0.5" }}
          />
          <Carousel.Caption style={{ position: "absolute", display: "flex", flexDirection: 'column', justifyContent: "center", alignItems: "center", height: "100%" }}>
            <h3>{h31}</h3>
            <p>{p1}</p>

            <Button href={bhref1} variant="danger">{btxt1}</Button>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item style={{ maxHeight: "80vh", background: "#13131f" }}>
          <img
            className="d-block w-100"
            src={src2}
            alt="Second slide"
            style={{ opacity: "0.5" }}
          />

          <Carousel.Caption style={{ position: "absolute", display: "flex", flexDirection: 'column', justifyContent: "center", alignItems: "center", height: "100%" }}>
            <h3>{h32}</h3>
            <p>{p2}</p>
            <Button href={bhref2} variant="danger">{btxt2}</Button>

          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item style={{ maxHeight: "80vh", background: "#13131f" }}>
          <img
            className="d-block w-100"
            src={src3}
            alt="Third slide"
            style={{ opacity: "0.5" }}
          />

          <Carousel.Caption style={{ position: "absolute", display: "flex", flexDirection: 'column', justifyContent: "center", alignItems: "center", height: "100%" }}>
            <h3>{h33}</h3>
            <p>{p3}</p>
            <Button href={bhref3} variant="danger">{btxt3}</Button>

          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

  
    </div>
  )
}

export default CarouselHome
