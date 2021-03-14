import React, {useState} from 'react';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import {auth,createUserProfileDocument} from '../../firebase/firebase.utils';

import './sign-up.styles.scss';

function SignUp() {
    const [state, setState] = useState({
        displayName:'',
        email:'',
        password:'',
        confirmPassword:''
    });

    const handleSubmit = async e => {
        e.preventDefault();

        const {displayName,email,password,confirmPassword} = state;

        if (password !== confirmPassword) {
            alert("Passwords don't match!");
            return;
        }

        try {
            const {user} = await auth.createUserWithEmailAndPassword(email,password);
            await createUserProfileDocument(user,{displayName});
            //clear our form
            setState({
                displayName:'',
                email:'',
                password:'',
                confirmPassword:''
            });
        } catch (error) {
            console.error(error);
        }

    }

    const handleChange = e => {
        const {name,value} = e.target;
        setState(prev => ({...prev,[name]:value}) );
    }

    return (
        <div className='sign-up' >
            <h2 className="title">I do not have an account.</h2>
            <span>Sign up with your email and password.</span>
            <form className="sign-up-form" onSubmit={handleSubmit} >
                <FormInput
                    type='text'
                    id='displayName'
                    name='displayName'
                    value={state.displayName}
                    handleChange={handleChange}
                    label='Display Name'
                    required
                />
                 <FormInput
                    type='email'
                    id='email'
                    name='email'
                    value={state.email}
                    handleChange={handleChange}
                    label='Email'
                    required
                />
                 <FormInput
                    type='password'
                    id='password'
                    name='password'
                    value={state.password}
                    handleChange={handleChange}
                    label='Password'
                />
                 <FormInput
                    type='password'
                    id='confirmPassword'
                    name='confirmPassword'
                    value={state.confirmPassword}
                    handleChange={handleChange}
                    label='Confirm Password'
                    required
                />
                <CustomButton type='submit' >SIGN UP</CustomButton>
            </form>
        </div>
    )
}

export default SignUp
