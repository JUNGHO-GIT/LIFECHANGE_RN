// widgetTaskHandler.tsx

import {
  WidgetTaskHandlerProps,
} from "@imports/ImportReacts";

import {
  axios, AsyncStorage,
} from "@imports/ImportLibs";

import {
  DetailWidget,
} from "@imports/ImportWidgets";

import {
  SERVER_URL,
} from "@env";

import {
  curDate, curTime, curDay, curCurrency, isKorean,
} from "@imports/ImportScripts";

import {
  OBJECT, Exercise, Food, Money, Sleep,
} from "@imports/ImportBases"

// -------------------------------------------------------------------------------------------------
const nameToWidget = {
  DetailWidget: DetailWidget,
};

// -------------------------------------------------------------------------------------------------
export async function widgetTaskHandler(
  props: WidgetTaskHandlerProps
) {

  const widgetInfo = props.widgetInfo;
  const Widget = nameToWidget[widgetInfo.widgetName as keyof typeof nameToWidget] as any;
  const userId = await AsyncStorage.getItem("sessionId");

  const PAGING = {
    sort: "asc",
    page: 1
  };
  const DATE = {
    dateType: "day",
    dateStart: curDate,
    dateEnd: curDate,
  };

  await (async () => {
    const params = {
      user_id: userId,
      PAGING: PAGING,
      DATE: DATE
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
    Object.assign(OBJECT, {
      exercise: exerciseResponse.data.result?.[0] || Exercise,
      food: foodResponse.data.result?.[0] || Food,
      money: moneyResponse.data.result?.[0] || Money,
      sleep: sleepResponse.data.result?.[0]?.sleep_section?.[0] || Sleep,
    });
  })();

  switch (props.widgetAction) {
    case 'WIDGET_ADDED':
      props.renderWidget(
        <Widget
          {...widgetInfo}
          curDate={curDate}
          curTime={curTime}
          curDay={curDay}
          curCurrency={curCurrency}
          isKorean={isKorean}
          exercise={OBJECT.exercise}
          food={OBJECT.food}
          money={OBJECT.money}
          sleep={OBJECT.sleep}
        />
      );
      console.log(`WIDGET_ADDED ${JSON.stringify(widgetInfo)}`);
    break;

    case 'WIDGET_RESIZED':
      props.renderWidget(
        <Widget
          {...widgetInfo}
          curDate={curDate}
          curTime={curTime}
          curDay={curDay}
          curCurrency={curCurrency}
          isKorean={isKorean}
          exercise={OBJECT.exercise}
          food={OBJECT.food}
          money={OBJECT.money}
          sleep={OBJECT.sleep}
        />
      );
      console.log(`WIDGET_RESIZED ${JSON.stringify(widgetInfo)}`);
    break;

    case 'WIDGET_UPDATE':
      props.renderWidget(
        <Widget
          {...widgetInfo}
          activeView={props.clickAction as any}
          curDate={curDate}
          curTime={curTime}
          curDay={curDay}
          curCurrency={curCurrency}
          isKorean={isKorean}
          exercise={OBJECT.exercise}
          food={OBJECT.food}
          money={OBJECT.money}
          sleep={OBJECT.sleep}
        />
      );
      console.log(`WIDGET_UPDATE ${JSON.stringify(widgetInfo)}`);
    break;

    case 'WIDGET_CLICK':
      props.renderWidget(
        <Widget
          {...widgetInfo}
          activeView={props.clickAction as any}
          curDate={curDate}
          curTime={curTime}
          curDay={curDay}
          curCurrency={curCurrency}
          isKorean={isKorean}
          exercise={OBJECT.exercise}
          food={OBJECT.food}
          money={OBJECT.money}
          sleep={OBJECT.sleep}
        />
      );
      console.log(`WIDGET_CLICK ${JSON.stringify(widgetInfo)}`);
    break;

    case 'WIDGET_DELETED':
      console.log(`WIDGET_DELETED ${JSON.stringify(widgetInfo)}`);
    break;

    default:
      break;
  }
};