// index.js

import 'react-native-gesture-handler';
import { App } from './src/App';
import { enableScreens as enblScrn } from 'react-native-screens';
import { AppRegistry } from 'react-native';
import { appName } from './app.json';
import { registerWidgetTaskHandler as rgsWdTsHd } from 'react-native-android-widget';
import { widgetTaskHandler as wdgtTskHdl } from './src/widgetTaskHandler.tsx';

enblScrn();
AppRegistry.registerComponent(appName, () => App);
rgsWdTsHd(wdgtTskHdl);