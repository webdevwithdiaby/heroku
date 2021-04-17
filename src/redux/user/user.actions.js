import {UserActionTypes} from './user.types';

export const setCurrentUser = user => ({
    type: UserActionTypes.SET_CURRENT_USER ,
    payload:user
});


//GGOGLE SIGN IN ACTIONS 
export const googleSigninStart = () => ({
    type: UserActionTypes.GOOGLE_SIGNIN_START
});

export const googleSigninSuccess = (user) => ({
    type: UserActionTypes.EMAIL_SIGNIN_SUCCESS,
    payload: user
});

export const googleSigninFail = (error) => ({
    type: UserActionTypes.GOOGLE_SIGNIN_FAIL,
    payload: error
});



//EMAIL SIGN IN ACTIONS 
export const emailSignInStart = (emailAndPassword) => ({
    type: UserActionTypes.EMAIL_SIGNIN_START,
    payload: emailAndPassword
});

export const emailSignInSuccess = (user) => ({
    type: UserActionTypes.EMAIL_SIGNIN_SUCCESS,
    payload: user
});

export const emailSignInFail = (error) => ({
    type: UserActionTypes.GOOGLE_SIGNIN_FAIL,
    payload: error
});