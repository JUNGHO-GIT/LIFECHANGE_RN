// App.tsx

import {
  useEffect, useRef, useState, BackHandler, SafeAreaView, StyleSheet,
} from "@imports/ImportReacts";

import {
  Banner, Webviews,
} from "@imports/ImportContainers";

import {
  AsyncStorage,
} from "@imports/ImportUtils";

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
  const [bannerVisible, setBannerVisible] = useState(false);
  const [navigationEnabled, _setNavigationEnabled] = useState(true);
  const webViewRef = useRef<any>(null);

  // -----------------------------------------------------------------------------------------------
  // 뒤로가기 버튼 이벤트
  useEffect(() => {
    try {
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
    }
    catch (err: any) {
      console.error("backHandler error:", err);
    }
  }, [navigationEnabled]);

  // -----------------------------------------------------------------------------------------------
  const handlerOnMessage = (event: any) => {
    try {
      const parsedData = JSON.parse(event.nativeEvent.data);

      // 세션아이디는 단일 string
      if (parsedData.type === 'sessionId') {
        AsyncStorage.setItem("sessionId", parsedData.sessionId);
      }

      // 로케일은 객체
      else if (parsedData.type === 'localeSetting') {
        AsyncStorage.setItem("localeSetting", JSON.stringify(parsedData.localeSetting));
      }
    }
    catch (err: any) {
      console.error("onMessage event error:", err);
    }
  };

  // -----------------------------------------------------------------------------------------------
  const handlerBannerVisible = ({ url }: any) => {
    try {
      const hideBannerUrls = [
        "user/signup", "user/login", "user/resetPw", "accounts.google.com"
      ];
      const shouldHideBanner = hideBannerUrls.some((hideUrl) => (
        url.includes(hideUrl)
      ));
      setBannerVisible(!shouldHideBanner);
    }
    catch (err: any) {
      console.error("bannerVisible event error:", err);
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
      {bannerVisible && <Banner />}
    </SafeAreaView>
  );
};
