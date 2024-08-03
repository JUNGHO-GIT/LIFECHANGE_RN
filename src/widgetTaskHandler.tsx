// widgetTaskHandler.tsx

import React from 'react';
import axios from "axios";
import moment from "moment-timezone";
import type { WidgetTaskHandlerProps } from 'react-native-android-widget';
import { DetailWidget } from './widget/DetailWidget';

// -------------------------------------------------------------------------------------------------
const nameToWidget = {
  DetailWidget: DetailWidget,
};

// -------------------------------------------------------------------------------------------------
export async function widgetTaskHandler(props: WidgetTaskHandlerProps) {

  const widgetInfo = props.widgetInfo;
  const Widget = nameToWidget[widgetInfo.widgetName as keyof typeof nameToWidget] as any;

  const currentDate = moment().tz("Asia/Seoul").format("YYYY-MM-DD");
  const currentDay
    = moment().tz("Asia/Seoul").format("ddd") === "Mon" ? "월"
    : moment().tz("Asia/Seoul").format("ddd") === "Tue" ? "화"
    : moment().tz("Asia/Seoul").format("ddd") === "Wed" ? "수"
    : moment().tz("Asia/Seoul").format("ddd") === "Thu" ? "목"
    : moment().tz("Asia/Seoul").format("ddd") === "Fri" ? "금"
    : moment().tz("Asia/Seoul").format("ddd") === "Sat" ? "토"
    : "일";
  const currentTime = moment().tz("Asia/Seoul").format("HH:mm:ss");

  const URL = "https://www.junghomun.com";
  const userId = "junghomun00@gmail.com";
  const PAGING = {
    sort: "asc",
    page: 1
  };
  const DATE = {
    dateType: "day",
    dateStart: moment().tz("Asia/Seoul").format("YYYY-MM-DD"),
    dateEnd: moment().tz("Asia/Seoul").format("YYYY-MM-DD"),
  };

  const fetchData = async () => {
    const [exerciseResponse, foodResponse, moneyResponse, sleepResponse] = await Promise.all([
      axios.get(`${URL}/api/exercise/list`, {
        params: {
          user_id: userId,
          PAGING: PAGING,
          DATE: DATE
        }
      }),
      axios.get(`${URL}/api/food/list`, {
        params: {
          user_id: userId,
          PAGING: PAGING,
          DATE: DATE
        }
      }),
      axios.get(`${URL}/api/money/list`, {
        params: {
          user_id: userId,
          PAGING: PAGING,
          DATE: DATE
        }
      }),
      axios.get(`${URL}/api/sleep/list`, {
        params: {
          user_id: userId,
          PAGING: PAGING,
          DATE: DATE
        }
      }),
    ]);

    return {
      exercise: exerciseResponse.data.result?.[0] || {
        exercise_total_volume: "x",
        exercise_total_cardio: "x",
        exercise_total_weight: "x",
      },
      food: foodResponse.data.result?.[0] || {
        food_total_kcal: "x",
        food_total_carb: "x",
        food_total_protein: "x",
        food_total_fat: "x",
      },
      money: moneyResponse.data.result?.[0] || {
        money_total_income: "x",
        money_total_expense: "x",
      },
      sleep: sleepResponse.data.result?.[0]?.sleep_section?.[0] || {
        sleep_bedTime: "x",
        sleep_wakeTime: "x",
        sleep_sleepTime: "x",
      }
    };
  };

  const data = await fetchData();
  if (!data) {
    return;
  }
  const { exercise, food, money, sleep } = data;

  switch (props.widgetAction) {
    case 'WIDGET_ADDED':
      props.renderWidget(
        <Widget
          {...widgetInfo}
          currentDate={currentDate}
          currentDay={currentDay}
          currentTime={currentTime}
          exercise={exercise}
          food={food}
          money={money}
          sleep={sleep}
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
          exercise={exercise}
          food={food}
          money={money}
          sleep={sleep}
        />
      );
      console.log(`WIDGET_RESIZED ${JSON.stringify(widgetInfo)}`);
      break;

    case 'WIDGET_UPDATE':
      props.renderWidget(
        <Widget
          {...widgetInfo}
          currentDate={currentDate}
          currentDay={currentDay}
          currentTime={currentTime}
          exercise={exercise}
          food={food}
          money={money}
          sleep={sleep}
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
          exercise={exercise}
          food={food}
          money={money}
          sleep={sleep}
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