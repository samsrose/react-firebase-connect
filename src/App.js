import React, { Component } from "react";
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { Container, Navbar } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyDgqn5SUkRlMTSv_vvXlO6wUym94xWud9s",
    authDomain: "auth-test-96771.firebaseapp.com"
  });
} else {
  firebase.app(); // if already initialized, use that one
}

export default class App extends Component {
  state = { isSignedIn: false };
  uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      firebase.auth.TwitterAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      signInSuccess: () => false
    }
  };

  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(async (user) => {
      this.setState({ isSignedIn: !!user });
      console.clear();
      console.log(user);
    });
  };
  componentWillUnmount = () => {
    this.setState = (state, callback) => {
      return;
    };
  };

  render() {
    return (
      <div className="App">
        {this.state.isSignedIn ? (
          <section className="profile">
            <br />
            <Container>
              <Navbar>
                <Navbar.Brand href="#home">10 Athletes</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-between">
                  <Navbar.Text>
                    <button
                      className="profileButton"
                      onClick={() => firebase.auth().signOut()}
                    >
                      Sign out!
                    </button>
                  </Navbar.Text>
                </Navbar.Collapse>
              </Navbar>
            </Container>
            <h1>Welcome </h1>
            <img
              className="profilePhoto"
              alt="profile"
              src={firebase.auth().currentUser.photoURL}
            />
          </section>
        ) : (
          <Container>
            <main>
              <h4>Please Sign In</h4>
              <StyledFirebaseAuth
                uiConfig={this.uiConfig}
                firebaseAuth={firebase.auth()}
              />
            </main>
          </Container>
        )}
      </div>
    );
  }
}
