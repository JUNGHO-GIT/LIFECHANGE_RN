// DetailScreen.tsx

import React, { useState, useCallback, useEffect } from 'react';
import axios from "axios";
import moment from "moment-timezone";
import { StyleSheet, SafeAreaView, View, Button } from 'react-native';
import { WidgetPreview } from 'react-native-android-widget';
import { DetailWidget } from '../widget/DetailWidget.tsx';

// -------------------------------------------------------------------------------------------------
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
  },
});

// -------------------------------------------------------------------------------------------------
export const DetailScreen = () => {

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

  const [key, setKey] = useState(0);
  const [view, setView] = useState<"exercise" | "food" | "money" | "sleep">("exercise");

  const URL = "https://www.junghomun.com/JPAGE";
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

  const [exercise, setExercise] = useState({
    exercise_total_volume: "x",
    exercise_total_cardio: "x",
    exercise_total_weight: "x",
  });
  const [food, setFood] = useState({
    food_total_kcal: "x",
    food_total_carb: "x",
    food_total_protein: "x",
    food_total_fat: "x",
  });
  const [money, setMoney] = useState({
    money_total_income: "x",
    money_total_expense: "x",
  });
  const [sleep, setSleep] = useState({
    sleep_bedTime: "x",
    sleep_wakeTime: "x",
    sleep_sleepTime: "x",
  });

  const refreshWidget = useCallback(() => {
    setKey(prevKey => prevKey + 1);
  }, []);

  useEffect(() => {(async () => {
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
    setExercise(exerciseResponse.data.result?.[0] || {
      exercise_total_volume: "x",
      exercise_total_cardio: "x",
      exercise_total_weight: "x",
    });
    setFood(foodResponse.data.result?.[0] || {
      food_total_kcal: "x",
      food_total_carb: "x",
      food_total_protein: "x",
      food_total_fat: "x",
    });
    setMoney(moneyResponse.data.result?.[0] || {
      money_total_income: "x",
      money_total_expense: "x",
    });
    setSleep(sleepResponse.data.result?.[0]?.sleep_section?.[0] || {
      sleep_bedTime: "x",
      sleep_wakeTime: "x",
      sleep_sleepTime: "x",
    });
  })()}, []);

  return (
    <SafeAreaView style={styles.mainContainer}>
      <WidgetPreview
        key={key}
        width={350}
        height={350}
        renderWidget={() => (
          <DetailWidget
            activeView={view}
            currentDate={currentDate}
            currentDay={currentDay}
            currentTime={currentTime}
            exercise={exercise}
            food={food}
            money={money}
            sleep={sleep}
          />
        )}
        onClick={({ clickAction }) => (
          setView(clickAction as any)
        )}
      />
      <View style={styles.buttonContainer}>
        <Button
          title={"새로고침"}
          onPress={refreshWidget}
        />
      </View>
    </SafeAreaView>
  );
};
