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
  /* CalendarWidget: CalendarWidget, */
};

// -------------------------------------------------------------------------------------------------
export async function widgetTaskHandler(
  props: WidgetTaskHandlerProps
) {

  // 위젯 정보 -------------------------------------------------------------------------------------
  const widgetInfo = props.widgetInfo;
  const Widget = nameToWidget[widgetInfo.widgetName as keyof typeof nameToWidget] as any;

  // 세션 아이디 및 로케일 -------------------------------------------------------------------------
  const sessionId: string = await AsyncStorage.getItem("sessionId") || "";
  const localeSetting: string = await AsyncStorage.getItem("localeSetting") || "";

  // 타임존, 언어, 통화 ----------------------------------------------------------------------------
  const clientTimeZone: string = JSON.parse(localeSetting).timeZone;
  const clientLanguage: string = JSON.parse(localeSetting).locale;
  const clientCurrency: string = JSON.parse(localeSetting).currency;

  // 현재 시간 및 날짜, 요일 -----------------------------------------------------------------------
  const clientDate = moment().tz(clientTimeZone).format("YYYY-MM-DD");
  const clientMonthStart = moment().tz(clientTimeZone).startOf('month').format("YYYY-MM-DD");
  const clientMonthEnd = moment().tz(clientTimeZone).endOf('month').format("YYYY-MM-DD");
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

  // 콘솔 로그 -------------------------------------------------------------------------------------
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
  `);

  // 상세 위젯인 경우 ------------------------------------------------------------------------------
  if (widgetInfo.widgetName === "DetailWidget") {

    // fetch 데이터 (운동, 식사, 지출, 수면)
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
    switch (props.widgetAction) {
      case 'WIDGET_ADDED':
      case 'WIDGET_RESIZED':
      case 'WIDGET_UPDATE':
      case 'WIDGET_CLICK':
      case 'WIDGET_DELETED':
        props.renderWidget(
          <Widget
            {...widgetInfo}
            widgetHeight={widgetInfo.height as number}
            activeView={props.clickAction as string}
            clientLanguage={clientLanguage}
            clientCurrency={clientCurrency}
            clientDate={clientDate}
            clientDay={clientDay}
            clientTime={clientTime}
            exercise={OBJECT.exercise}
            food={OBJECT.food}
            money={OBJECT.money}
            sleep={OBJECT.sleep}
          />
        );
      break;
    }
    console.log(`${props.widgetAction} ${JSON.stringify(widgetInfo)}`);
  }

  // 일정 위젯인 경우 ------------------------------------------------------------------------------
  else if (widgetInfo.widgetName === "CalendarWidget") {

    // fetch 데이터 (일정)
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
    switch (props.widgetAction) {
      case 'WIDGET_ADDED':
      case 'WIDGET_RESIZED':
      case 'WIDGET_UPDATE':
      case 'WIDGET_CLICK':
      case 'WIDGET_DELETED':
        props.renderWidget(
          <Widget
            {...widgetInfo}
            clientLanguage={clientLanguage}
            clientDate={clientDate}
            clientDay={clientDay}
            clientTime={clientTime}
            calendar={OBJECT.calendar}
          />
        );
      break;
    }
    console.log(`${props.widgetAction} ${JSON.stringify(widgetInfo)}`);
  }
};