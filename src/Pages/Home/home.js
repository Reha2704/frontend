import React from 'react'
import { Carousel } from 'react-responsive-carousel';
import Fade from 'react-reveal/Fade';
import { Row,Container,Col} from 'react-bootstrap';
import './home.css'
import yoga1 from './images/yoga1.png';
import yoga2 from './images/yoga2.png';
import yoga3 from './images/yoga3.jpg';
import about from './images/about.svg'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

const Home=()=>{
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
      };
   

    return(
        <div align="center">
            <Carousel >
                <div style={{height:"75vh"}} >
                    <img style={{height:"95%"}} src={yoga1} alt="img"/>
                </div>
                <div style={{height:"75vh"}}>
                    <img style={{height:"100%"}} src={yoga2} alt="img"/>
                </div>
                <div style={{height:"75vh"}}>
                    <img style={{height:"100%"}} src={yoga3} alt="img"/>
                </div>
            </Carousel>
           
            <div className="about">
                <Container>
                    <Fade clear>  
                        <Row>
                            <Col>
                            
                            <div style={{height:"75vh"}}>
                                <img style={{height:"100%"}} src={about} alt="img"/>
                            </div>
                            </Col>
                            <Col>
                            <h2 >About Us</h2>
                            <div>
                                <p>These classes invite you into a deeper experience of your own body and mind, as you align with the rhythms of nature.Each class reflects the distinct personality and strengths of the teacher.You can expect to root, align, and flow with intention.
                                <br/>
                                <b>T&C:</b>
                                <ul>
                                    <li>Age limit: 18-65</li>
                                    <li>Monthly basis.</li>
                                    <li><b>Registration fee:</b> 500/- per month</li>
                                </ul>
                                <b style={{color:'red'}}> Register here to Join our classes : <a href="#/Registration">click here</a></b>
                                </p>
                            </div>
                            </Col>
                        </Row>
                    </Fade>
                </Container>
            </div>

        </div>
    )
}

export default Home;
