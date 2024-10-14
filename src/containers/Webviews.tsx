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

    const userAgent = "Mozilla/5.0 (Linux; Android 8.0.0; SM-G935S Build/R16NW) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.105 Mobile Safari/537.36";

    const injectedJavaScript = /* javascript */`
      // 세션 스토리지 변경 감시 설정
      const ogSessionSetItem = window.sessionStorage.setItem;
      const ogSessionRemoveItem = window.sessionStorage.removeItem;

      // 세션 스토리지 setItem 오버라이드
      window.sessionStorage.setItem = function(key, value) {
        ogSessionSetItem.call(window.sessionStorage, key, value);
        if (key === '${TITLE}_sessionId') {
          window.ReactNativeWebView.postMessage(JSON.stringify({
            type: 'sessionId',
            sessionId: value
          }));
        }
      };

      // 세션 스토리지 removeItem 오버라이드
      window.sessionStorage.removeItem = function(key) {
        ogSessionRemoveItem.call(window.sessionStorage, key);
        if (key === '${TITLE}_sessionId') {
          window.ReactNativeWebView.postMessage(JSON.stringify({
            type: 'sessionId',
            sessionId: null
          }));
        }
      };

      // 로컬 스토리지 변경 감시 설정
      const ogLocalSetItem = window.localStorage.setItem;
      const ogLocalRemoveItem = window.localStorage.removeItem;

      // 로컬 스토리지 setItem 오버라이드
      window.localStorage.setItem = function(key, value) {
        ogLocalSetItem.call(window.localStorage, key, value);
        if (key === '${TITLE}_localeSetting') {
          window.ReactNativeWebView.postMessage(JSON.stringify({
            type: 'localeSetting',
            localeSetting: JSON.parse(value)
          }));
        }
      };

      // 로컬 스토리지 removeItem 오버라이드
      window.localStorage.removeItem = function(key) {
        ogLocalRemoveItem.call(window.localStorage, key);
        if (key === '${TITLE}_localeSetting') {
          window.ReactNativeWebView.postMessage(JSON.stringify({
            type: 'localeSetting',
            localeSetting: null
          }));
        }
      };
    `;

    // 10. return ----------------------------------------------------------------------------------
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