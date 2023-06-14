import {View, Text} from 'react-native';
import React from 'react';
import Signin from './src/screens/signup/Signup';
import Login from './src/screens/login/Login';
import Nav from './src/navigations/navigating';
import {Provider} from 'react-redux';
import {Store} from './src/redux/store';

const App = () => {
  return (
    <Provider store={Store}>
      <Nav />
    </Provider>
  );
};

export default App;
