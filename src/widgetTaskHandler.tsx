// widgetTaskHandler.tsx

import { SERVER_URL } from "@env";

import { AsyncStorage, axios, moment } from "@exports/ExportLibs";
import type { WidgetTaskHandlerProps as WdgTsHdPr } from "@exports/ExportReacts";
import {
	ExerciseRecord as ExerRec,
	FoodRecord,
	MoneyRecord,
	OBJECT,
	SleepRecord,
} from "@exports/ExportSchemas";
import { DetailWidget } from "@exports/ExportWidgets";

// ――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――-
const nameToWidget = {
	DetailWidget: DetailWidget,
};

// ――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――-
export async function widgetTaskHandler(props: WdgTsHdPr) {
	try {
		// 위젯 정보 ―――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――--
		const widgetInfo = props.widgetInfo;
		const Widget = nameToWidget[
			widgetInfo.widgetName as keyof typeof nameToWidget
		] as any;
		const exstActvVw =
			(await AsyncStorage.getItem(`activeView`)) || `exercise`;

		// 세션 아이디 및 로케일 ―――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――--
		const sessionId: string = (await AsyncStorage.getItem(`sessionId`)) || ``;
		const lclSttn: string =
			(await AsyncStorage.getItem(`localeSetting`)) || ``;

		// 타임존, 언어, 통화 ――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――--
		const clntTmZn: string = JSON.parse(lclSttn).timeZone;
		const clntLang: string = JSON.parse(lclSttn).lang;
		const clntCrrn: string = JSON.parse(lclSttn).currency;
		const clientUnit: string = JSON.parse(lclSttn).unit;

		// 현재 시간 및 날짜, 요일 ―――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――
		const clientDate = moment().tz(clntTmZn).format(`YYYY-MM-DD`);
		const clntMnthStrt = moment()
			.tz(clntTmZn)
			.startOf(`month`)
			.format(`YYYY-MM-DD`);
		const clntMnthEnd = moment()
			.tz(clntTmZn)
			.endOf(`month`)
			.format(`YYYY-MM-DD`);

		const clientTime = moment().tz(clntTmZn).format(`HH:mm:ss`);
		const clientFormat = moment().tz(clntTmZn).format(`ddd`);
		const clientDay =
			clntTmZn === `Asia/Seoul`
				? clientFormat === `Mon`
				? `월`
				: clientFormat === `Tue`
				? `화`
				: clientFormat === `Wed`
				? `수`
				: clientFormat === `Thu`
				? `목`
				: clientFormat === `Fri`
				? `금`
				: clientFormat === `Sat`
				? `토`
				: `일`
				: clientFormat;

		// 위젯 클릭 섹션 ――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――
		const stActvVw = async (section: string) => {
			await AsyncStorage.setItem(`activeView`, section);
			return section;
		};

		// 상세 위젯인 경우 ―――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――-
		if (widgetInfo.widgetName === `DetailWidget`) {
			// fetch 데이터
			await (async () => {
				const params = {
					user_id: sessionId,
					PAGING: {
						sort: `asc`,
						page: 1,
					},
					DATE: {
						dateType: `day`,
						dateStart: clientDate,
						dateEnd: clientDate,
					},
				};
				const [exerRes, foodResponse, mnyRes, slpRes] =
					await Promise.all([
						axios.get(`${SERVER_URL}/api/exercise/record/list`, {
							params: params,
						}),
						axios.get(`${SERVER_URL}/api/food/record/list`, {
							params: params,
						}),
						axios.get(`${SERVER_URL}/api/money/record/list`, {
							params: params,
						}),
						axios.get(`${SERVER_URL}/api/sleep/record/list`, {
							params: params,
						}),
					]);
				OBJECT.exerciseRecord =
					exerRes.data.result?.[0] || ExerRec;
				OBJECT.foodRecord = foodResponse.data.result?.[0] || FoodRecord;
				OBJECT.moneyRecord = mnyRes.data.result?.[0] || MoneyRecord;
				OBJECT.sleepRecord =
					slpRes.data.result?.[0]?.sleep_section?.[0] || SleepRecord;
			})();

			// 위젯 액션에 따른 렌더링
			if (
				props.widgetAction === `WIDGET_ADDED` ||
				props.widgetAction === `WIDGET_UPDATE` ||
				props.widgetAction === `WIDGET_RESIZED` ||
				props.widgetAction === `WIDGET_DELETED`
			) {
				props.renderWidget(
					<Widget
						{...widgetInfo}
						widgetHeight={widgetInfo.height as number}
						activeView={
							await stActvVw(
								(props.clickAction as string) || exstActvVw,
							)
						}
						clientLanguage={clntLang}
						clientCurrency={clntCrrn}
						clientUnit={clientUnit}
						clientDate={clientDate}
						clientDay={clientDay}
						clientTime={clientTime}
						exercise={OBJECT.exerciseRecord}
						food={OBJECT.foodRecord}
						money={OBJECT.moneyRecord}
						sleep={OBJECT.sleepRecord}
					/>,
				);
			} else if (props.widgetAction === `WIDGET_CLICK`) {
				props.renderWidget(
					<Widget
						{...widgetInfo}
						widgetHeight={widgetInfo.height as number}
						activeView={
							await stActvVw(
								(props.clickAction as string) || exstActvVw,
							)
						}
						clientLanguage={clntLang}
						clientCurrency={clntCrrn}
						clientUnit={clientUnit}
						clientDate={clientDate}
						clientDay={clientDay}
						clientTime={clientTime}
						exercise={OBJECT.exerciseRecord}
						food={OBJECT.foodRecord}
						money={OBJECT.moneyRecord}
						sleep={OBJECT.sleepRecord}
					/>,
				);
			}
		}

		// 콘솔 로그 ―――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――--
		console.log(`
      sessionId: ${sessionId},
      clientTimeZone: ${clntTmZn},
      clientLanguage: ${clntLang},
      clientCurrency: ${clntCrrn},
      clientDate: ${clientDate},
      clientMonthStart: ${clntMnthStrt},
      clientMonthEnd: ${clntMnthEnd},
      clientDay: ${clientDay},
      clientTime: ${clientTime},
      ${props.widgetAction}: ${JSON.stringify(widgetInfo)}
    `);
	} catch (err: any) {
		console.error(`widgetTaskHandler error:`, err);
	}
}
