// Banner.tsx

import { BannerAd, BannerAdSize, TestIds } from "react-native-google-mobile-ads";
import { ADMOB_BANNER_ID } from "env";

// -------------------------------------------------------------------------------------------------
const Banner = () => {

  const realId = ADMOB_BANNER_ID;
  const testId = TestIds.BANNER;

  return (
    <BannerAd
      key={`admob-banner`}
      unitId={testId}
      size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
    />
  );
}

export default Banner;