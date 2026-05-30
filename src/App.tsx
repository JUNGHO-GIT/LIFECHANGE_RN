// App.tsx

import { Banner, Webviews } from "@exports/ExportContainers";
import { AsyncStorage } from "@exports/ExportLibs";
import {
	BackHandler,
	SafeAreaProvider as SfArProv,
	StyleSheet,
	useEffect,
	useRef,
	useState,
} from "@exports/ExportReacts";

// ――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――-
const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: `center`,
		justifyContent: `center`,
	},
});

// ――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――-
export const App = () => {
	// ―――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――--
	const [bnnrVis, stBnnrVis] = useState<boolean>(false);
	const [navOn, _stNavOn] = useState<boolean>(true);
	const webViewRef = useRef<any>(null);

	// 뒤로가기 버튼 이벤트 ――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――--
	useEffect(() => {
		try {
			const onBackPress = () => {
				if (webViewRef.current && navOn) {
					webViewRef.current.goBack();
					return true;
				}
				return false;
			};

			const backHandler = BackHandler.addEventListener(
				`hardwareBackPress`,
				onBackPress,
			);

			return () => backHandler.remove();
		} catch (err: any) {
			console.error(`backHandler error:`, err);
		}
	}, [navOn]);

	// ―――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――--
	const hdlOnMsg = (event: any) => {
		try {
			const parsedData = JSON.parse(event.nativeEvent.data);

			// 세션아이디는 단일 string
			if (parsedData.type === `sessionId`) {
				AsyncStorage.setItem(`sessionId`, parsedData.sessionId);
			}

			// 로케일은 객체
			else if (parsedData.type === `localeSetting`) {
				AsyncStorage.setItem(
					`localeSetting`,
					JSON.stringify(parsedData.localeSetting),
				);
			}
		} catch (err: any) {
			console.error(`onMessage event error:`, err);
		}
	};

	// ―――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――--
	const hdlBnnrVis = ({ url }: any) => {
		try {
			const hdBnnrUrls = [
				`user/signup`,
				`user/login`,
				`user/resetPw`,
				`accounts.google.com`,
			];
			const shldHdBnnr = hdBnnrUrls.some((hideUrl) =>
				url.includes(hideUrl),
			);
			stBnnrVis(!shldHdBnnr);
		} catch (err: any) {
			console.error(`bannerVisible event error:`, err);
		}
	};

	// ―――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――--
	return (
		<SfArProv style={styles.container}>
			<Webviews
				onMessage={hdlOnMsg}
				bannerVisible={hdlBnnrVis}
				navigationEnabled={navOn}
				ref={webViewRef}
			/>
			{bnnrVis && <Banner />}
		</SfArProv>
	);
};
