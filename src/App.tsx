// App.tsx

import React, {useState} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import Webviews from './components/Webviews.tsx';
import Alert from './components/Alert.tsx';
import Banner from './components/Banner.tsx';

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

  const handlerOnMessage = (event: any) => {
    const { message } = JSON.parse(event.nativeEvent.data);
    setAlertMessage(message);
    setAlertVisible(true);
    setNavigationEnabled(false);
  };

  const handlerCloseAlert = () => {
    setAlertVisible(false);
    setNavigationEnabled(true);
  }

  const handlerBannerVisible = (newState: any) => {
    const {url} = newState;
    if (url.includes("signup") || url.includes("login")) {
      setBannerVisible(false);
    }
    else {
      setBannerVisible(true);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Webviews
        onMessage={handlerOnMessage}
        bannerVisible={handlerBannerVisible}
        navigationEnabled={navigationEnabled}
      />
      <Alert
        alertVisible={alertVisible}
        alertMessage={alertMessage}
        alertClose={handlerCloseAlert}
      />
      {bannerVisible && <Banner />}
    </SafeAreaView>
  );
};