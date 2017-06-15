import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Header, Button, Spinner } from './components/common';
import LoginForm from './components/LoginForm';

class App extends Component {
  state = { loggedIn: null };

  componentWillMount() {
    firebase.initializeApp({
		apiKey: 'AIzaSyBOLSlVgvWNxwVJEXIOe0Amx4-3C-z3h6E',
		authDomain: 'auth-9874c.firebaseapp.com',
		databaseURL: 'https://auth-9874c.firebaseio.com',
		projectId: 'auth-9874c',
		storageBucket: 'auth-9874c.appspot.com',
		messagingSenderId: '304730308071'
    });
	
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }

  renderContent() {
    switch (this.state.loggedIn) {
      case true:
        return (
          <Button onPress={() => firebase.auth().signOut()}>
            Log Out
          </Button>
        );
      case false:
        return <LoginForm />;
      default:
        return <Spinner size="large" />;
    }
  }

  render() {
    return (
      <View>
        <Header headerText="Authentication" />
        {this.renderContent()}
      </View>
    );
  }
}

export default App;
