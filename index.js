/**
 * @format
 */

import {AppRegistry} from 'react-native';
// import App from './App';
import {name as appName} from './app.json';
import MainApp from './App';
import AppWrapper from './src/database/AppWrapper';

AppRegistry.registerComponent(appName, () => AppWrapper);
