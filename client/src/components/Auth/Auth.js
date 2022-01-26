import React, { useState } from 'react'
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import { GoogleLogin } from 'react-google-login';
import { useDispatch } from 'react-redux';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import useStyles from './styles';
import Input from './Input';
import Icon from './icon';
import { useHistory } from 'react-router-dom';

const Auth = () => {
    console.log("conete", process.env.REACT_APP_GOOGLE_CLIENT_ID)
    // const state = null; 
    const classes = useStyles();
    const [showPassword, setShowPassword] = useState(false);
    const [isSignup, setIsSignUp] = useState(false)
    const dispatch = useDispatch();
    const history = useHistory();
    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword)
    const switchMode = () => {
        setIsSignUp((prevIsSignUp) => !prevIsSignUp);
        handleShowPassword(false);
    }
    const handleSubmit = () => {

    }

    const handleChange = () => {

    }
    const googleSuccess = async (res) => {
        console.log(res)
        const result = res?.profileObj;                 // to prevent the error whe res is undefined
        const token = res?.tokenId;
        
        try {
            dispatch({
                type: 'AUTH',
                data: { result, token}
            });
            history.push('/');
        } catch (error) {
            console.log(error);
        }
    }
    const googleFailure = () => {
        console.log("Google Sign In was unsuccessful. Try again later")
    }

    return (
        <Container component='main' maxWidth='xs'>
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant='h5'>{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {   isSignup && (
                            <>
                                <Input name='firstName' label='First Name' handleChange={handleChange} autoFocus half />
                                <Input name='lastName' label='Last Name' handleChange={handleChange} half />
                            </>
                        )}
                        <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                        <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
                        { isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />}
                    </Grid>
                    <Button type="submit" fullWidth variant='contained' color='primary' className={classes.submit}>
                        { isSignup ? 'Sign Up' : 'Sign In' }
                    </Button>
                    <GoogleLogin 
                        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                        render={(renderProps) => (
                            <Button 
                                className={classes.googleButton} 
                                color='primary' 
                                fullWidth 
                                onClick={renderProps.onClick} 
                                disabled={renderProps.disabled} 
                                startIcon={<Icon />}
                                variant='contained'>
                                    Google Sign In    
                            </Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy='single_host_origin'
                    />
                    <Grid container justifyContent='flex-end'>
                            <Grid item>
                                <Button className={classes.submit} color='secondary' onClick={switchMode}>
                                    { isSignup ? 'Already have an account?  Sign in ' : 'New to Snapshots? Sign Up'}
                                </Button>
                            </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}

export default Auth
