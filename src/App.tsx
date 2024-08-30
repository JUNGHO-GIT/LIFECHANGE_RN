// App.tsx

import React, {useEffect, useRef, useState } from 'react';
import { BackHandler, SafeAreaView, StyleSheet } from 'react-native';
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

  // -----------------------------------------------------------------------------------------------
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [bannerVisible, setBannerVisible] = useState(false);
  const [navigationEnabled, setNavigationEnabled] = useState(true);
  const webViewRef = useRef<WebView>(null);

  // -----------------------------------------------------------------------------------------------
  useEffect(() => {
    const onBackPress = () => {
      if (webViewRef.current && navigationEnabled) {
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
  }, [navigationEnabled]);

  // -----------------------------------------------------------------------------------------------
  const handlerOnMessage = (event: any) => {
    const parsedData = JSON.parse(event.nativeEvent.data);
    const type: string = parsedData.type;
    const message: string = parsedData.message;
    if (type === 'alert') {
      setAlertVisible(true);
      setAlertMessage(message);
      setNavigationEnabled(false);
    }
  };

  const handlerAlertClose = () => {
    setAlertVisible(false);
    setNavigationEnabled(true);
  };

  const handlerBannerVisible = (newState: any) => {
    const { url } = newState;
    if (url.includes("/user/signup") || url.includes("/user/login")) {
      setBannerVisible(false);
    }
    else {
      setBannerVisible(true);
    }
  };

  // -----------------------------------------------------------------------------------------------
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