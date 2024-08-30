// Webviews.tsx

import React, { forwardRef  } from 'react';
import {  StyleSheet, Dimensions  } from 'react-native';
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
const Webviews = forwardRef<WebView, Props>(
  ({ onMessage, bannerVisible, navigationEnabled }, ref) => {
    const url = 'https://www.junghomun.com/JPAGE';
    const injectedJavaScript = `
      window.alert = function(msg) {
        window.ReactNativeWebView.postMessage(JSON.stringify({
          type: 'alert',
          message: msg
        }));
      };
    `;

    return (
      <WebView
        ref={ref}
        style={styles.webviewContainer}
        source={{ uri: url }}
        onMessage={onMessage}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        injectedJavaScript={injectedJavaScript}
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
  }
);

export default Webviews;