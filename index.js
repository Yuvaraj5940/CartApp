/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import Profile from './src/screens/Profile';
// import Profile from './src/screens/Profile';
// import Dishes from './src/screens/dishes';

AppRegistry.registerComponent(appName, () => Profile);
