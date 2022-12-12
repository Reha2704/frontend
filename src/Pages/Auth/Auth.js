import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {  Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import Icon from './icon';
import { AUTH } from '../../actions/ActionTypes';
import useStyles from './styles';
import Input from '../../Components/constants/Inputs/Input';
import {signin ,signup} from '../../actions/auth';
const initialState= {firstname:"",lastname:"",email:"",password:"",confirmPassword:""}
const Authentication= ()=>{
    const[isSignup,setISsignup]=useState(true)
    const [formData,setformData]=useState(initialState)
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();
    const classes = useStyles();

    const handleShowPassword = () => setShowPassword(!showPassword);
    const handleSubmit=(e)=>{
        e.preventDefault();
        if (isSignup) {
            dispatch(signup(formData, history));
        } else {
            dispatch(signin(formData, history));
        }
    }
    const handleChange = (e) => setformData({ ...formData, [e.target.name]: e.target.value });

    const googleSuccess = async (res) => {
        const result = res?.profileObj;
        
        const token = res?.tokenId;
        try {
             dispatch({ type: AUTH, data: { result, token } });
             history.push('/');
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
        <div>
            <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Typography component="h1" variant="h5">{ isSignup ? 'Sign up' : 'Sign in' }</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            { isSignup && (
            <>
              <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
              <Input name="lastName" label="Last Name" handleChange={handleChange} half />
            </>
            )}
            <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
            <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
            { isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" /> }
          </Grid>
          <Button style={{background:"#c72583"}} type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
            { isSignup ? 'Sign Up' : 'Sign In' }
          </Button>
          <GoogleLogin
             clientId="1014709244149-3q39c25jugjtj4urcr4rnii7ljb3uku1.apps.googleusercontent.com"
            render={(renderProps) => (
              <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">
                Google Sign In
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleError}
            cookiePolicy="single_host_origin"
          />
          <Grid container justify="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                { isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign Up" }
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
        </div>
    )
}

export default Authentication;