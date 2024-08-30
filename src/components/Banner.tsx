// Banner.tsx

import {View, StyleSheet} from "react-native";
import {Dimensions} from 'react-native';
import {BannerAd, BannerAdSize, TestIds} from "react-native-google-mobile-ads";
import { ADMOB_BANNER_ID } from "env";

// -------------------------------------------------------------------------------------------------
const styles = StyleSheet.create({
  adContainer: {
    position: "absolute",
    alignItems: 'center',
    width: Dimensions.get('window').width,
    bottom: 0
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
        size={BannerAdSize.INLINE_ADAPTIVE_BANNER}
      />
    </View>
  );
}

export default Banner;