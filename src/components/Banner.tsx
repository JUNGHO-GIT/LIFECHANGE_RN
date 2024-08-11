// Banner.tsx

import {View, StyleSheet} from "react-native";
import {Dimensions} from 'react-native';
import {BannerAd, BannerAdSize, TestIds} from "react-native-google-mobile-ads";

// -------------------------------------------------------------------------------------------------
const styles = StyleSheet.create({
  adContainer: {
    position: "absolute",
    alignItems: 'center',
    width: Dimensions.get('window').width,
    height: 60,
    bottom: 0
  },
});

// -------------------------------------------------------------------------------------------------
const Banner = () => {
  return (
    <View style={styles.adContainer}>
      <BannerAd
        unitId={TestIds.BANNER}
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
      />
    </View>
  );
}

export default Banner;