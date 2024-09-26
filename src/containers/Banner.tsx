// Banner.tsx

import {
  BannerAd, BannerAdSize, TestIds, StyleSheet, View,
} from "@imports/ImportReacts";

import {
  ADMOB_BANNER_ID,
} from "@env";

// -------------------------------------------------------------------------------------------------
const styles = StyleSheet.create({
  bannerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
});

// -------------------------------------------------------------------------------------------------
export const Banner = () => {

  const realId = ADMOB_BANNER_ID;
  const testId = TestIds.BANNER;

  return (
    <View style={styles.bannerContainer}>
      <BannerAd
        key={`admob-banner`}
        unitId={testId}
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
      />
    </View>
  );
}