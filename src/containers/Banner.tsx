// Banner.tsx

import { ADMOB_BANNER_ID as ADMB_BNNR_ID } from "@env";
import {
	BannerAd,
	BannerAdSize,
	StyleSheet,
	View,
} from "@exports/ExportReacts";

// ――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――-
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

// ――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――-
export const Banner = () => {
	const realId = ADMB_BNNR_ID;

	return (
		<View style={styles.bannerContainer}>
			<BannerAd
				key={`banner-${realId}`}
				unitId={`${realId}`}
				size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
			/>
		</View>
	);
};
