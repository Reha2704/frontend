import React,{ useState, useEffect }  from 'react';
import { useHistory} from 'react-router-dom';
import { Card,Row,Col ,Button} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import {createPost,getPosts,updatePost} from '../../actions/posts'
import './styles.css'
import { Container } from 'react-bootstrap';


const Registration=({ currentID, setCurrentId })=>{
    const user=(JSON.parse(localStorage.getItem('profile')))
    const [show, setShow] = useState(false);
    const [ already_registered , setregistered] = useState(false);
    const [curr_month_joined, setcurrmon]= useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    let curr_googleid = user?.result?.googleId
    const post = useSelector((state)=> state.posts);
    const curr_post = useSelector((state)=> curr_googleid ? state.posts.find((p)=>p.googleId===curr_googleid):null);
    const [postData, setPostData] = useState({ name: '', date: '', age: '',phone:'', Schedule: '' });
    const dispatch = useDispatch();
    const history = useHistory();
   
    const d = new Date();
    let currmonth = d.getMonth()+1;
    useEffect(async() => {
        if (curr_post) setPostData(curr_post);
        await post.map((person)=>{
            if((person?.googleId)===(curr_googleid)){
                let month = person?.date?.substr(5,2);
                if(Number(month) === Number(currmonth)){
                    setcurrmon(true);
                }else{
                    setregistered(true);
                }
            }
        })
    }, [post]); 
    const handlemodal = async(e)=>{
        postData.date = new Date();
        var phoneno = /^\d{10}$/;
        if(postData.name==='' || postData.date===''|| postData.age===''|| postData.phone===''||postData.Schedule==='' ){
            alert('Please fill in the details properly')
        }else  if(!(postData.phone.match(phoneno))){
            
            alert("Please enter correct phone number");
        }
        else if(postData.age< 18 || postData.age>65 ){
            alert("We are sorry, this course is only for 18-65 years old people")
        }
        else{
            handleShow();
        }
    }
    console.log(postData)
    const handleSubmit = async (e) => {
        e.preventDefault();
            if(already_registered && !curr_month_joined){
                console.log("updation")
                postData.date = new Date();
                dispatch(updatePost(curr_post._id,{...postData,creatorName:user?.result.email,googleId:user?.result.googleId})); 
                alert("Form updated sucessfully")
                history.push('/');   
            }else{
                dispatch(createPost({...postData,creatorName:user?.result.email,googleId:user?.result.googleId})); 
                alert("Form submitted sucessfully") 
                history.push('/');  
            }
    };
    if(!user){
        return(
        <div  style={{marginTop:"200px"}} >
            <h3 align="center">Please signin to register</h3>
        </div>
        )
    }else if(curr_month_joined){
        return(
            <div  style={{marginTop:"200px"}} >
                <h3 align="center">You have already registered this month.Come again next month</h3>
            </div>
            )
    }
    return(
        <div className="event-form ">
            <Container>
            <Card className="shadow p-3 mb-5 bg-white rounded" >
            <h2 align="center"> Register yourself and Turn Fit</h2>
                <br/>
            {/* <form autoComplete="off" noValidate onSubmit={handleSubmit}>   */}
            <form autoComplete="off" >  
            <Row>
                <Col sm={6}>
                <div className="form-floating mb-3">
                    <input required type="text" className="form-control" name="name" id="floatingInput" placeholder="Reha" value={postData.name} onChange={(e) => setPostData({ ...postData, name: e.target.value })} />
                    <label for="floatingInput">Name</label>
                </div>
                </Col>
                <Col>
                <div className="form-floating mb-3">
                    <input required type="num" className="form-control" name="age" id="floatingInput" value={postData.age} onChange={(e) => setPostData({ ...postData, age: e.target.value })} />
                    <label for="floatingInput">Age</label>
                </div>
                </Col>
            </Row>
           <br/>
           <Row>
           <Col>
           <div className="form-floating mb-3">
                <input required type="tel" className="form-control" name="phone" id="floatingInput" value={postData.phone} onChange={(e) => setPostData({ ...postData, phone:e.target.value })}  />
                <label for="floatingInput">Enter 10 digit Mobile number</label>
            </div>
            </Col>
            <Col>
            <select className="form-control form-control-lg" name="Schedule" value={postData.Schedule} onChange={(e) => setPostData({ ...postData, Schedule: e.target.value })}  required>
                <option value="" >Select your Batch</option>
                <option value="6">6am to 7am</option>
                <option value="7">7am to 8am</option>
                <option value="8">8am to 9am</option>
                <option value="5">5pm to 6pm</option>

            </select>
            </Col>
           </Row>
           <Row>
               <Col>
                    <Button className="btn btn-info w-100"  size="large" onClick={handlemodal} fullWidth>Submit</Button>
                    <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>Payment Form</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <p><b>Note:</b>500/- will be deducted from your account once you enter the details</p>
                    <Row>
                        <Col xs={12} md={6}>
                            <div class="form-group">
                                <label for="cardNum">Card Number</label>
                                <input type="number" class="form-control" id="cardNum" placeholder="xxxx-xxxx-xxxx"/>
                            </div>
                        </Col>
                        <Col xs={6} md={3}>
                            <div class="form-group">
                                <label for="date">Month/Year</label>
                                <input type="number" class="form-control" id="date" placeholder="MM/YY"/>
                            </div>
                        </Col>
                        <Col xs={6} md={3}>
                            <div class="form-group">
                                <label for="CVV">CVV</label>
                                <input type="number" class="form-control" id="CVV" placeholder="XXX"/>
                            </div>
                        </Col>
                    </Row>

                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        Save Changes
                    </Button>
                    </Modal.Footer>
                </Modal>
               </Col>
           </Row>
            </form>
            
            </Card>
            </Container>
        </div>
    )
}
export default Registration;