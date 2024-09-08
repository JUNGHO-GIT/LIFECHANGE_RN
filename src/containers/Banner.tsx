// Banner.tsx

import {
  BannerAd, BannerAdSize, TestIds,
} from "@imports/ImportReacts";

import {
  ADMOB_BANNER_ID,
} from "@imports/ImportEnvs";

// -------------------------------------------------------------------------------------------------
export const Banner = () => {

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