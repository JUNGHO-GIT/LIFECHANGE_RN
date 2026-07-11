// Banner.tsx

import { ADMOB_BANNER_ID } from "@env";
import {
	BannerAd,
	BannerAdSize,
	StyleSheet,
	View,
} from "@exports/ExportReacts";

// -------------------------------------------------------------------------------------------------
const styles = StyleSheet.create({
	bannerContainer: {
		padding: 0,
		margin: 0,
		backgroundColor: "#ffffff",
		objectFit: "contain",
		borderTopWidth: 1,
		borderTopColor: "#c4c2c2",
	},
});

// -------------------------------------------------------------------------------------------------
export const Banner = () => {
	const adUnitId = ADMOB_BANNER_ID;

	return (
		<View style={styles.bannerContainer}>
			<BannerAd
				key={`banner-${adUnitId}`}
				unitId={`${adUnitId}`}
				size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
			/>
		</View>
	);
};
