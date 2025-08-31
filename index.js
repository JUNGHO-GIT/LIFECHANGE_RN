// index.js

import 'react-native-gesture-handler';
import App from './src/App';
import { enableScreens } from 'react-native-screens';
import { AppRegistry } from 'react-native';
import { appName } from './app.json';
import { registerWidgetTaskHandler } from 'react-native-android-widget';
import { widgetTaskHandler } from './src/widgetTaskHandler.tsx';

enableScreens();
AppRegistry.registerComponent(appName, () => App);
registerWidgetTaskHandler(widgetTaskHandler);