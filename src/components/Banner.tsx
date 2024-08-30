// Banner.tsx

import { View, StyleSheet } from "react-native";
import { Dimensions } from 'react-native';
import { BannerAd, BannerAdSize, TestIds } from "react-native-google-mobile-ads";
import { ADMOB_BANNER_ID } from "env";

// -------------------------------------------------------------------------------------------------
const styles = StyleSheet.create({
  adContainer: {
    width: Dimensions.get('window').width,
    height: 60,
    backgroundColor: "white",
    position: "absolute",
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'transparent',
    bottom: 0,
    borderWidth: 0,
    padding: 0,
  },
});

// -------------------------------------------------------------------------------------------------
const Banner = () => {

  const realId = ADMOB_BANNER_ID;
  const testId = TestIds.BANNER;

  return (
    <View style={styles.adContainer}>
      <BannerAd
        key={`admob-banner`}
        unitId={testId}
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
      />
    </View>
  );
}

export default Banner;