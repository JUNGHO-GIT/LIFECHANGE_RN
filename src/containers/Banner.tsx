// Banner.tsx

import {
  BannerAd, BannerAdSize, StyleSheet, View,
} from "@imports/ImportReacts";

import {
  ADMOB_BANNER_ID,
} from "@env";

// -------------------------------------------------------------------------------------------------
const styles = StyleSheet.create({
  bannerContainer: {
    padding: 0,
    margin: 0,
    backgroundColor: '#ffffff',
    objectFit: 'contain',
  },
});

// -------------------------------------------------------------------------------------------------
export const Banner = () => {

  const realId = ADMOB_BANNER_ID;

  return (
    <View style={styles.bannerContainer}>
      <BannerAd
        key={`admob-banner`}
        unitId={realId}
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
      />
    </View>
  );
}