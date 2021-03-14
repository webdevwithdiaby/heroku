import React, {useState} from 'react';
import CustomButton from '../custom-button/custom-button.component';
import FormInput from '../form-input/form-input.component';
import {signInWithGoogle,auth} from '../../firebase/firebase.utils';
import './sign-in.styles.scss';

function SignIn() {
    const [state,setState] = useState({email:'',password:''});

    const handleChange = e => {
        const {name,value} = e.target;
        setState(prevState => ({...prevState,[name]:value}));
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const {email,password} = state;

        try {
            await auth.signInWithEmailAndPassword(email,password);
        } catch (error) {
            console.log(error);
        }

        setState({email:'',password:''});
    }
    return (
        <div className='sign-in' >
            <h2> I already have an account </h2>
            <span> Sign in with your email and password </span>
            <form onSubmit={handleSubmit} >
               
                <FormInput
                    type='text'
                    name='email'
                    value={state.email}
                    id='email'
                    required
                    label='Email'
                    handleChange={handleChange}
                />
                <FormInput 
                    type="password" 
                    name='password' 
                    value={state.password} 
                    id='password' 
                    required
                    label='Password'
                    handleChange={handleChange}
                />
                <div className="buttons">
                    <CustomButton type='submit' >SIGN IN</CustomButton>
                    <CustomButton onClick={signInWithGoogle} isGoogleSignIn={true} >SIGN IN WITH GOOGLE</CustomButton>
                </div>
            </form>
        </div>
    )
}

export default SignIn
