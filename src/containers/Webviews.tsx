// Webviews.tsx

import {
  forwardRef, StyleSheet, Dimensions, WebView,
} from "@imports/ImportReacts";

import {
  TITLE, SERVER_URL,
} from "@env";

// -------------------------------------------------------------------------------------------------
declare type Props = {
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
export const Webviews = forwardRef<WebView, Props>(
  ({ onMessage, bannerVisible, navigationEnabled }, ref) => {

    const userAgent = "Mozilla/5.0 (Linux; Android 10; Android SDK built for x86 Build/LMY48X) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/81.0.4044.117 Mobile Safari/608.2.11";

    const injectedJavaScript = /* javascript */`
      window.alert = function(msg) {
        window.ReactNativeWebView.postMessage(JSON.stringify({
          type: 'alert',
          message: msg
        }));
      };


    `;

    // 10. return ----------------------------------------------------------------------------------
    return (
      <WebView
        ref={ref}
        style={styles.webviewContainer}
        source={{ uri: SERVER_URL }}
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