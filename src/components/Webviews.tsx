// Webview.tsx

import React from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import WebView from 'react-native-webview';

// -------------------------------------------------------------------------------------------------
type Props = {
  onMessage: (event: any) => void;
  bannerVisible: (newState: any) => void;
  navigationEnabled: boolean;
};

// -------------------------------------------------------------------------------------------------
const styles = StyleSheet.create({
  webviewContainer: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height - 60,
  },
});

// -------------------------------------------------------------------------------------------------
const Webviews = (
  {onMessage, bannerVisible, navigationEnabled}: Props
) => {
  const url = 'https://www.junghomun.com';
  const injectedJavaScript = `
    window.alert = function(msg) {
      window.ReactNativeWebView.postMessage(JSON.stringify({ message: msg }));
    };
  `;

  return (
    <WebView
      style={styles.webviewContainer}
      source={{uri: url}}
      injectedJavaScript={injectedJavaScript}
      onMessage={onMessage}
      onNavigationStateChange={(newState: any) => {
        if (navigationEnabled) {
          bannerVisible(newState);
        }
      }}
      onShouldStartLoadWithRequest={(request: any) => {
        if (navigationEnabled) {
          bannerVisible(request);
          return true;
        }
        return false;
      }}
    />
  );
};

export default Webviews;
