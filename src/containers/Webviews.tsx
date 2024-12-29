// Webviews.tsx

import {
  forwardRef, StyleSheet, Dimensions, WebView
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

    const userAgent = (
      "Mozilla/5.0 (Linux; Android 8.0.0; SM-G935S Build/R16NW) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Mobile Safari/537.36"
    );

    const injectedJavaScript = (/* javascript */`

      // Session storage overrides
      let ogSessionSetItem = window.sessionStorage.setItem;
      let ogSessionRemoveItem = window.sessionStorage.removeItem;
      let sessionTitle = window.sessionStorage.getItem('${TITLE}');
      let parsedTitle = JSON.parse(sessionTitle);
      let sessionId = parsedTitle?.setting?.id?.sessionId;

      window.sessionStorage.setItem = function (key, value) {
        ogSessionSetItem.call(window.sessionStorage, key, value);
        const updatedTitle = JSON.parse(value);
        const updatedSessionId = updatedTitle?.setting?.id?.sessionId;

        if (sessionId !== updatedSessionId) {
          sessionId = updatedSessionId;
          window.ReactNativeWebView.postMessage(JSON.stringify({
            type: 'sessionId',
            sessionId: updatedSessionId
          }));
        }
      }
      window.sessionStorage.removeItem = function(key) {
        ogSessionRemoveItem.call(window.sessionStorage, key);
        if (key === '${TITLE}') {
          sessionId = null;
          window.ReactNativeWebView.postMessage(JSON.stringify({
            type: 'sessionId',
            sessionId: null
          }));
        }
      }

      // Local storage overrides
      let ogLocalSetItem = window.localStorage.setItem;
      let ogLocalRemoveItem = window.localStorage.removeItem;
      let localTitle = window.localStorage.getItem('${TITLE}');
      let parsedLocalTitle = JSON.parse(localTitle);
      let localeSetting = parsedLocalTitle?.setting?.locale;

      window.localStorage.setItem = function(key, value) {
        ogLocalSetItem.call(window.localStorage, key, value);
        const updatedTitle = JSON.parse(value);
        const updatedLocaleSetting = updatedTitle?.setting?.locale;

        if (localeSetting !== updatedLocaleSetting) {
          localeSetting = updatedLocaleSetting;
          window.ReactNativeWebView.postMessage(JSON.stringify({
            type: 'localeSetting',
            localeSetting: updatedLocaleSetting
          }));
        }
      }
      window.localStorage.removeItem = function(key) {
        ogLocalRemoveItem.call(window.localStorage, key);
        if (key === '${TITLE}') {
          localeSetting = null;
          window.ReactNativeWebView.postMessage(JSON.stringify({
            type: 'localeSetting',
            localeSetting: null
          }));
        }
      }
    `);

    return (
      <WebView
        ref={ref}
        style={styles.webviewContainer}
        source={{ uri: SERVER_URL }}
        onMessage={onMessage}
        originWhitelist={['*']}
        userAgent={userAgent}
        allowFileAccess={true}
        cacheEnabled={true}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        injectedJavaScript={injectedJavaScript}
        allowsBackForwardNavigationGestures={true}
        onNavigationStateChange={(newState) => {
          if (navigationEnabled) {
            bannerVisible(newState);
          }
        }}
        onShouldStartLoadWithRequest={(request) => {
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
