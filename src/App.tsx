// App.tsx

import {
  useEffect, useRef, useState, BackHandler, SafeAreaView, StyleSheet,
} from "@imports/ImportReacts";

import {
  Alert, Banner, Webviews,
} from "@imports/ImportContainers";

import {
  AsyncStorage,
} from "@imports/ImportLibs";

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
  const [alertVisible, setAlertVisible] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [bannerVisible, setBannerVisible] = useState<boolean>(false);
  const [navigationEnabled, setNavigationEnabled] = useState<boolean>(true);
  const webViewRef = useRef<any>(null);

  // -----------------------------------------------------------------------------------------------
  // 뒤로가기 버튼 이벤트
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
    const sessionId: string = parsedData.sessionId;

    if (type === 'alert') {
      setAlertVisible(true);
      setAlertMessage(message);
      setNavigationEnabled(false);
    }
    if (type === 'sessionId') {
      AsyncStorage.setItem("sessionId", sessionId);
    }
  };

  // -----------------------------------------------------------------------------------------------
  const handlerAlertClose = () => {
    setAlertVisible(false);
    setNavigationEnabled(true);
  };

  // -----------------------------------------------------------------------------------------------
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