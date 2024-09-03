// Webviews.tsx

import React, { forwardRef  } from 'react';
import {  StyleSheet, Dimensions  } from 'react-native';
import WebView from 'react-native-webview';
import { ActivityIndicator } from 'react-native';

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
    const userAgent = "Mozilla/5.0 (Linux; Android 10; Android SDK built for x86 Build/LMY48X) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/81.0.4044.117 Mobile Safari/608.2.11"

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
        userAgent={userAgent}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        injectedJavaScript={injectedJavaScript}
        allowFileAccess={true}
        cacheEnabled={true}
        allowsBackForwardNavigationGestures={true}
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