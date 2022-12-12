import React,{useState,useEffect} from 'react';
import {Navbar,Container,Nav} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import './navbar.css';
import useStyles from './styles';
import {  Avatar, Button } from '@material-ui/core';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { GoogleLogin } from 'react-google-login';
import { AUTH } from '../../../actions/ActionTypes';
import {signin ,signup} from '../../../actions/auth';
import decode from 'jwt-decode';
import Icon from './icon';
const initialState= {firstname:"",lastname:"",email:"",password:"",confirmPassword:""}

const Navbarr=()=>{
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const[isSignup,setISsignup]=useState(true)
    const [formData,setformData]=useState(initialState)
    const classes = useStyles();
    const location = useLocation();
    const history = useHistory();
    const dispatch = useDispatch();
    const logout = () => {
        dispatch({ type: 'LOGOUT' });
        console.log(dispatch)
        localStorage.clear();
        history.push('/');
        setUser(null);
      };
    useEffect(() => {
    const token = user?.token;
    if (token) {
        const decodedToken = decode(token);

        if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }
   
    setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location]);
    const handleSubmit=(e)=>{
        e.preventDefault();
        if (isSignup) {
            dispatch(signup(formData, history));
        } else {
            dispatch(signin(formData, history));
        }
    }
    const googleSuccess = async (res) => {
        const result = res?.profileObj;
        
        const token = res?.tokenId;
        try {
             dispatch({ type: AUTH, data: { result, token } });
             history.push('/Registration');
             history.push('/Registration');
        } catch (error) {
            console.log(error);
        }
    };
    const googleError = () => alert('Google Sign In was unsuccessful. Try again later');
    const switchMode=()=>{
        if(isSignup){
            setISsignup(false);
        }else{
            setISsignup(true);
        }
    }
    return(
        <Navbar className="shadow-lg" collapseOnSelect expand="lg" >
            <Container>
            <Navbar.Brand href="/"><b className="nav-title" >YO-G0AA</b></Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                </Nav>
                <Nav>
                {user?.result ? (
                    <>
                    
                    <Nav.Link >
                        <Avatar    alt={user?.result.name} src={user?.result.imageUrl}>{user?.result.name.charAt(0)}</Avatar>
                    </Nav.Link>
                    <Nav.Link><Button className="Loginbtn" variant="light" onClick={logout} >Log out</Button></Nav.Link>
                    </>
                ) : (
                    // <Nav.Link  href="/auth"><Button className="Loginbtn" variant="light"><ExitToAppIcon style={{padding:"3px"}} />SIGN IN</Button></Nav.Link>
                    <form className={classes.form} onSubmit={handleSubmit}>
                    <GoogleLogin
                       clientId="1014709244149-3q39c25jugjtj4urcr4rnii7ljb3uku1.apps.googleusercontent.com"
                        render={(renderProps) => (
                        <Nav.Link> 
                            <Button className="Loginbtn" variant="light"onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} >
                                Google Sign-In
                            </Button>
                        </Nav.Link>
                      )}
                      onSuccess={googleSuccess}
                      onFailure={googleError}
                      cookiePolicy="single_host_origin"
                    />
                  </form>
                )}
                </Nav>
            </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Navbarr;