// App.tsx

import React, {useEffect, useRef, useState} from 'react';
import {BackHandler, SafeAreaView, StyleSheet} from 'react-native';
import Webviews from './components/Webviews.tsx';
import Alert from './components/Alert.tsx';
import Banner from './components/Banner.tsx';
import type WebView from "react-native-webview";

// -------------------------------------------------------------------------------------------------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

// -------------------------------------------------------------------------------------------------
export const App = () => {
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [bannerVisible, setBannerVisible] = useState(false);
  const [navigationEnabled, setNavigationEnabled] = useState(true);
  const [currentUrl, setCurrentUrl] = useState('');
  const webViewRef = useRef<WebView>(null);

  const handlerOnMessage = (event: any) => {
    const { message } = JSON.parse(event.nativeEvent.data);
    if (message) {
      setAlertMessage(message);
      setAlertVisible(true);
      setNavigationEnabled(false);
    }
  };

  const handlerAlertClose = () => {
    setAlertVisible(false);
    setNavigationEnabled(true);
  }

  const handlerBannerVisible = (newState: any) => {
    const { url } = newState;
    setCurrentUrl(url);
    if (url.includes("signup") || url.includes("login")) {
      setBannerVisible(false);
    }
    else {
      setBannerVisible(true);
    }
  }

  useEffect(() => {
    const onBackPress = () => {
      if (webViewRef.current && navigationEnabled) {
        // 로그인/회원가입 페이지로 뒤로가기 방지
        if (currentUrl.includes("/user/login") || currentUrl.includes("/user/signup")) {
          return true;
        }
        webViewRef.current.goBack();
        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      onBackPress
    );

    return () => backHandler.remove();
  }, [navigationEnabled, currentUrl]);

  return (
    <SafeAreaView style={styles.container}>
      <Webviews
        onMessage={handlerOnMessage}
        bannerVisible={handlerBannerVisible}
        navigationEnabled={navigationEnabled}
        ref={webViewRef}
      />
      <Alert
        alertVisible={alertVisible}
        alertMessage={alertMessage}
        alertClose={handlerAlertClose}
      />
      {bannerVisible && <Banner />}
    </SafeAreaView>
  );
};