import React, { useState, useEffect } from "react";
import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import Header from "./components/header/header.component";
import { Route, Switch, Redirect } from "react-router-dom";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import { connect } from "react-redux";

import { createStructuredSelector } from "reselect";

import { selectCurrentUser } from "./redux/user/user.selectors";

import { setCurrentUser } from "./redux/user/user.actions";
import "./App.css";

import CheckoutPage from "./pages/checkout/checkout.component";

function App({ currentUser, setCurrentUser }) {
  //const [currentUser,setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        //user is signed in
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot((snapshot) => {
          setCurrentUser({
            id: snapshot.id,
            ...snapshot.data(),
          });
        });
      } else {
        // User is signed out
        setCurrentUser(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/shop" component={ShopPage} />
        <Route
          exact
          path="/signin"
          render={(props) =>
            currentUser ? (
              <Redirect to="/" />
            ) : (
              <SignInAndSignUpPage {...props} />
            )
          }
        />
        <Route exact path="/checkout" component={CheckoutPage} />
      </Switch>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
