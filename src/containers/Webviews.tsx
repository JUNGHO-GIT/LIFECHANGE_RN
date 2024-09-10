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
      (function() {
        // window.alert 오버라이드
        window.alert = function(msg) {
          window.ReactNativeWebView.postMessage(JSON.stringify({
            type: 'alert',
            message: msg
          }));
        };

        // 세션 스토리지 변경 감시 설정
        const originalSetItem = sessionStorage.setItem;
        const originalRemoveItem = sessionStorage.removeItem;

        // sessionStorage setItem 오버라이드 (특정 키 'sessionId'만 감지)
        sessionStorage.setItem = function(key, value) {
          originalSetItem.apply(this, arguments);
          if (key === '${TITLE}_sessionId') {
            window.ReactNativeWebView.postMessage(JSON.stringify({
              type: 'sessionId',
              sessionId: value
            }));
          }
        };

        // sessionStorage removeItem 오버라이드 (특정 키 'sessionId'만 감지)
        sessionStorage.removeItem = function(key) {
          originalRemoveItem.apply(this, arguments);
          if (key === '${TITLE}_sessionId') {
            window.ReactNativeWebView.postMessage(JSON.stringify({
              type: 'sessionId',
              sessionId: null
            }));
          }
        };
      })();
    `;

    // 10. return ----------------------------------------------------------------------------------
    return (
      <WebView
        ref={ref}
        style={styles.webviewContainer}
        source={{ uri: SERVER_URL }}
        onMessage={onMessage}
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