import { takeLatest, put, all, call } from "redux-saga/effects";

import {
  auth,
  googleProvider,
  createUserProfileDocument,
} from "../../firebase/firebase.utils";

import { UserActionTypes } from "./user.types";

import {
  googleSigninSuccess,
  googleSigninFail,
  emailSignInFail,
  emailSignInSuccess,
} from "./user.actions";

export function* signInWithGoogle() {
  yield console.log("Google sign in saga called...");
  try {
    const { user } = yield auth.signInWithPopup(googleProvider);
    const userRef = yield call(createUserProfileDocument, user);
    const userSnapshot = yield userRef.get();
    yield put(
      googleSigninSuccess({ id: userSnapshot.id, ...userSnapshot.data() })
    );
  } catch (error) {
    yield put(googleSigninFail(error.message));
  }
}

export function* onGoogleSignInStart() {
  yield takeLatest(UserActionTypes.GOOGLE_SIGNIN_START, signInWithGoogle);
}

function* emailSignInAsync({ payload: { email, password } }) {
  yield console.log("Email Sign In Saga triggered...");
  try {
    const { user } = yield auth.signInWithEmailAndPassword(email, password);
    const userRef = yield call(createUserProfileDocument, user);
    const snapshot = yield userRef.get();
    yield put(
      emailSignInSuccess({
        id: snapshot.id,
        ...snapshot.data(),
      })
    );
  } catch (error) {
    yield put(emailSignInFail(error.message));
  }
}

function* onEmailSignInStart() {
  yield takeLatest(UserActionTypes.EMAIL_SIGNIN_START, emailSignInAsync);
}

export function* userSaga() {
  yield all([call(onGoogleSignInStart), call(onEmailSignInStart)]);
}
