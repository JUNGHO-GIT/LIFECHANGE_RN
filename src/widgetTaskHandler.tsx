// widgetTaskHandler.tsx

import {
  WidgetTaskHandlerProps,
} from "@imports/ImportReacts";

import {
  axios, AsyncStorage, moment,
} from "@imports/ImportUtils";

import {
  DetailWidget, CalendarWidget,
} from "@imports/ImportWidgets";

import {
  SERVER_URL,
} from "@env";

import {
  OBJECT, Calendar, Exercise, Food, Money, Sleep,
} from "@imports/ImportSchemas";

// -------------------------------------------------------------------------------------------------
const nameToWidget = {
  DetailWidget: DetailWidget,
  CalendarWidget: CalendarWidget,
};

// -------------------------------------------------------------------------------------------------
export async function widgetTaskHandler(
  props: WidgetTaskHandlerProps
) {
  try {
    // 위젯 정보 -----------------------------------------------------------------------------------
    const widgetInfo = props.widgetInfo;
    const Widget = nameToWidget[widgetInfo.widgetName as keyof typeof nameToWidget] as any;
    const existedActiveView = await AsyncStorage.getItem("activeView") || "exercise";

    // 세션 아이디 및 로케일 -----------------------------------------------------------------------
    const sessionId: string = await AsyncStorage.getItem("sessionId") || "";
    const localeSetting: string = await AsyncStorage.getItem("localeSetting") || "";

    // 타임존, 언어, 통화 --------------------------------------------------------------------------
    const clientTimeZone: string = JSON.parse(localeSetting).timeZone;
    const clientLanguage: string = JSON.parse(localeSetting).lang;
    const clientCurrency: string = JSON.parse(localeSetting).currency;
    const clientUnit: string = JSON.parse(localeSetting).unit;

    // 현재 시간 및 날짜, 요일 ---------------------------------------------------------------------
    let clientDate = moment().tz(clientTimeZone).format("YYYY-MM-DD");
    let clientMonthStart = moment().tz(clientTimeZone).startOf('month').format("YYYY-MM-DD");
    let clientMonthEnd = moment().tz(clientTimeZone).endOf('month').format("YYYY-MM-DD");

    const clientTime = moment().tz(clientTimeZone).format("HH:mm:ss");
    const clientFormat = moment().tz(clientTimeZone).format("ddd");
    const clientDay = clientTimeZone === "Asia/Seoul" ? (
      clientFormat === "Mon" ? "월"
      : clientFormat === "Tue" ? "화"
      : clientFormat === "Wed" ? "수"
      : clientFormat === "Thu" ? "목"
      : clientFormat === "Fri" ? "금"
      : clientFormat === "Sat" ? "토"
      : "일"
    ) : clientFormat;

    // 위젯 클릭 섹션 ------------------------------------------------------------------------------
    const setActiveView = async (section: string) => {
      await AsyncStorage.setItem("activeView", section);

      return section;
    };

    // 상세 위젯인 경우 ----------------------------------------------------------------------------
    if (widgetInfo.widgetName === "DetailWidget") {

      // fetch 데이터
      await (async () => {
        const params = {
          user_id: sessionId,
          PAGING: {
            sort: "asc",
            page: 1
          },
          DATE: {
            dateType: "day",
            dateStart: clientDate,
            dateEnd: clientDate,
          },
        };
        const [exerciseResponse, foodResponse, moneyResponse, sleepResponse] = await Promise.all([
          axios.get(`${SERVER_URL}/api/exercise/list`, {
            params: params
          }),
          axios.get(`${SERVER_URL}/api/food/list`, {
            params: params
          }),
          axios.get(`${SERVER_URL}/api/money/list`, {
            params: params
          }),
          axios.get(`${SERVER_URL}/api/sleep/list`, {
            params: params
          }),
        ]);
        OBJECT.exercise = exerciseResponse.data.result?.[0] || Exercise;
        OBJECT.food = foodResponse.data.result?.[0] || Food;
        OBJECT.money = moneyResponse.data.result?.[0] || Money;
        OBJECT.sleep = sleepResponse.data.result?.[0]?.sleep_section?.[0] || Sleep;
      })();

      // 위젯 액션에 따른 렌더링
      if (
        props.widgetAction === 'WIDGET_ADDED' || props.widgetAction === 'WIDGET_UPDATE' ||
        props.widgetAction === 'WIDGET_RESIZED' || props.widgetAction === 'WIDGET_DELETED'
      ) {
        props.renderWidget(
          <Widget
            {...widgetInfo}
            widgetHeight={widgetInfo.height as number}
            activeView={await setActiveView(props.clickAction as string || existedActiveView)}
            clientLanguage={clientLanguage}
            clientCurrency={clientCurrency}
            clientUnit={clientUnit}
            clientDate={clientDate}
            clientDay={clientDay}
            clientTime={clientTime}
            exercise={OBJECT.exercise}
            food={OBJECT.food}
            money={OBJECT.money}
            sleep={OBJECT.sleep}
          />
        );
      }
      else if (props.widgetAction === 'WIDGET_CLICK') {
        props.renderWidget(
          <Widget
            {...widgetInfo}
            widgetHeight={widgetInfo.height as number}
            activeView={await setActiveView(props.clickAction as string || existedActiveView)}
            clientLanguage={clientLanguage}
            clientCurrency={clientCurrency}
            clientUnit={clientUnit}
            clientDate={clientDate}
            clientDay={clientDay}
            clientTime={clientTime}
            exercise={OBJECT.exercise}
            food={OBJECT.food}
            money={OBJECT.money}
            sleep={OBJECT.sleep}
          />
        );
      }
    }

    // 일정 위젯인 경우 ----------------------------------------------------------------------------
    else if (widgetInfo.widgetName === "CalendarWidget") {

      // fetch 데이터
      await (async () => {
        const params = {
          user_id: sessionId,
          PAGING: {
            sort: "asc",
            page: 1
          },
          DATE: {
            dateType: "",
            dateStart: clientMonthStart,
            dateEnd: clientMonthEnd,
          },
        };
        const [calendarResponse] = await Promise.all([
          axios.get(`${SERVER_URL}/api/calendar/list`, {
            params: params
          })
        ])
        OBJECT.calendar = calendarResponse.data.result || Calendar;
      })();

      // 위젯 액션에 따른 렌더링
      if (
        props.widgetAction === 'WIDGET_ADDED' || props.widgetAction === 'WIDGET_UPDATE' ||
        props.widgetAction === 'WIDGET_RESIZED' || props.widgetAction === 'WIDGET_DELETED'
      ) {
        props.renderWidget(
          <Widget
            {...widgetInfo}
            widgetHeight={widgetInfo.height as number}
            widgetWidth={widgetInfo.width as number}
            clientLanguage={clientLanguage}
            clientDate={clientDate}
            clientMonthStart={clientMonthStart}
            clientMonthEnd={clientMonthEnd}
            clientTime={clientTime}
            calendar={OBJECT.calendar}
          />
        );
      }
      else if (props.widgetAction === 'WIDGET_CLICK') {
        // 이전 달로 이동
        if (props.clickAction === "PREV_MONTH") {
          clientMonthStart = moment(clientMonthStart).subtract(1, 'month').startOf('month').format("YYYY-MM-DD");
          clientMonthEnd = moment(clientMonthStart).endOf('month').format("YYYY-MM-DD");
        }
        // 다음 달로 이동
        else if (props.clickAction === "NEXT_MONTH") {
          clientMonthStart = moment(clientMonthStart).add(1, 'month').startOf('month').format("YYYY-MM-DD");
          clientMonthEnd = moment(clientMonthStart).endOf('month').format("YYYY-MM-DD");
        }
        props.renderWidget(
          <Widget
            {...widgetInfo}
            widgetHeight={widgetInfo.height as number}
            widgetWidth={widgetInfo.width as number}
            clientLanguage={clientLanguage}
            clientDate={clientDate}
            clientMonthStart={clientMonthStart}
            clientMonthEnd={clientMonthEnd}
            clientTime={clientTime}
            calendar={OBJECT.calendar}
          />
        );
      }
    }

    // 콘솔 로그 -----------------------------------------------------------------------------------
    console.log(`
      sessionId: ${sessionId},
      clientTimeZone: ${clientTimeZone},
      clientLanguage: ${clientLanguage},
      clientCurrency: ${clientCurrency},
      clientDate: ${clientDate},
      clientMonthStart: ${clientMonthStart},
      clientMonthEnd: ${clientMonthEnd},
      clientDay: ${clientDay},
      clientTime: ${clientTime},
      ${props.widgetAction}: ${JSON.stringify(widgetInfo)}
    `);
  }
  catch (err: any) {
    console.error("widgetTaskHandler error:", err);
  }
};