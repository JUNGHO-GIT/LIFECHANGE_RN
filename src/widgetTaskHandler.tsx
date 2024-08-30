// widgetTaskHandler.tsx

import React from 'react';
import axios from "axios";
import moment from "moment-timezone";
import type { WidgetTaskHandlerProps  } from 'react-native-android-widget';
import {  DetailWidget  } from './widgets/DetailWidget';

// -------------------------------------------------------------------------------------------------
const nameToWidget = {
  DetailWidget: DetailWidget,
};

// -------------------------------------------------------------------------------------------------
export async function widgetTaskHandler(props: WidgetTaskHandlerProps) {

  const widgetInfo = props.widgetInfo;
  const Widget = nameToWidget[widgetInfo.widgetName as keyof typeof nameToWidget] as any;

  const URL = "https://www.junghomun.com/JPAGE";
  const userId = "junghomun00@gmail.com";

  const currentDate = moment().tz("Asia/Seoul").format("YYYY-MM-DD");
  const currentTime = moment().tz("Asia/Seoul").format("HH:mm:ss");
  const momentFormat = moment().tz("Asia/Seoul").format("ddd");
  const currentDay
    = momentFormat === "Mon" ? "월"
    : momentFormat === "Tue" ? "화"
    : momentFormat === "Wed" ? "수"
    : momentFormat === "Thu" ? "목"
    : momentFormat === "Fri" ? "금"
    : momentFormat === "Sat" ? "토"
    : "일";

  const PAGING = {
    sort: "asc",
    page: 1
  };
  const DATE = {
    dateType: "day",
    dateStart: moment().tz("Asia/Seoul").format("YYYY-MM-DD"),
    dateEnd: moment().tz("Asia/Seoul").format("YYYY-MM-DD"),
  };
  const OBJECT_DEF = {
    exercise: {
      exercise_total_volume: "x",
      exercise_total_cardio: "x",
      exercise_total_weight: "x",
    },
    food: {
      food_total_kcal: "x",
      food_total_carb: "x",
      food_total_protein: "x",
      food_total_fat: "x",
    },
    money: {
      money_total_income: "x",
      money_total_expense: "x",
    },
    sleep: {
      sleep_bedTime: "x",
      sleep_wakeTime: "x",
      sleep_sleepTime: "x",
    }
  };
  const OBJECT = { ...OBJECT_DEF };

  await (async () => {
    const params = {
      user_id: userId,
      PAGING: PAGING,
      DATE: DATE
    };
    const [exerciseResponse, foodResponse, moneyResponse, sleepResponse] = await Promise.all([
      axios.get(`${URL}/api/exercise/list`, {
        params: params
      }),
      axios.get(`${URL}/api/food/list`, {
        params: params
      }),
      axios.get(`${URL}/api/money/list`, {
        params: params
      }),
      axios.get(`${URL}/api/sleep/list`, {
        params: params
      }),
    ]);

    Object.assign(OBJECT, {
      exercise: exerciseResponse.data.result?.[0] || OBJECT_DEF.exercise,
      food: foodResponse.data.result?.[0] || OBJECT_DEF.food,
      money: moneyResponse.data.result?.[0] || OBJECT_DEF.money,
      sleep: sleepResponse.data.result?.[0]?.sleep_section?.[0] || OBJECT_DEF.sleep,
    });
  })();

  switch (props.widgetAction) {
    case 'WIDGET_ADDED':
      props.renderWidget(
        <Widget
          {...widgetInfo}
          currentDate={currentDate}
          currentDay={currentDay}
          currentTime={currentTime}
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
          currentDate={currentDate}
          currentDay={currentDay}
          currentTime={currentTime}
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
          currentDate={currentDate}
          currentDay={currentDay}
          currentTime={currentTime}
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
          currentDate={currentDate}
          currentDay={currentDay}
          currentTime={currentTime}
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