// Detail.tsx

import {
  FlexWidget, TextWidget, ImageWidget, ColorProp
} from "@imports/ImportReacts";

// -------------------------------------------------------------------------------------------------
declare type DetailWidgetRecordProps = {
  activeView: string;
  clientLanguage: string;
  clientCurrency: string;
  clientUnit: string;
  clientDate: string;
  clientTime: string;
  clientDay: string;
}
// -------------------------------------------------------------------------------------------------
declare type ActiveRecordProps = {
  isActive: boolean;
  iconName: string;
}
// -------------------------------------------------------------------------------------------------
declare type ExerciseRecordProps = {
  widgetHeight: number;
  clientLanguage: string;
  clientUnit: string;
  exercise: {
    exercise_record_total_volume: any;
    exercise_record_total_cardio: any;
    exercise_record_total_scale: any;
  };
}
// -------------------------------------------------------------------------------------------------
declare type FoodRecordProps = {
  widgetHeight: number;
  clientLanguage: string;
  food: {
    food_record_total_kcal: any;
    food_record_total_carb:  any;
    food_record_total_protein: any;
    food_record_total_fat: any;
  };
}
// -------------------------------------------------------------------------------------------------
declare type MoneyRecordProps = {
  widgetHeight: number;
  clientLanguage: string;
  clientCurrency: string;
  money: {
    money_record_total_income: any;
    money_record_total_expense: any;
  };
}
// -------------------------------------------------------------------------------------------------
declare type SleepRecordProps = {
  widgetHeight: number;
  clientLanguage: string;
  sleep: {
    sleep_record_bedTime: any;
    sleep_record_wakeTime: any;
    sleep_record_sleepTime: any;
  };
}

// -------------------------------------------------------------------------------------------------
const insertComma = (str: string) => {
  // 'x'인 경우 그대로 반환
  if (str === "x") {
    return str;
  }

  // 숫자로 변환 가능한지 체크
  let num = parseFloat(str);

  // 변환이 실패하면 그대로 반환
  if (isNaN(num)) {
    return str;
  }

  // 소수점 존재하는 경우 소수점 삭제
  num = Math.floor(num);

  // 3자리마다 콤마 추가하여 반환
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

// -------------------------------------------------------------------------------------------------
const SelectSection = (
  { isActive, iconName }: ActiveRecordProps
) => {
  let imageLink;
  if (iconName === "exercise") {
    imageLink = require('../assets/images/exercise1.webp');
  }
  else if (iconName === "food") {
    imageLink = require('../assets/images/food1.webp');
  }
  else if (iconName === "money") {
    imageLink = require('../assets/images/money1.webp');
  }
  else if (iconName === "sleep") {
    imageLink = require('../assets/images/sleep1.webp');
  }
  return (
    <FlexWidget
      style={{
        flex: 1,
        width: 50,
        height: 300,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <FlexWidget
        clickAction={iconName}
        style={{
          width: 40,
          height: 40,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 12,
          borderWidth: 1,
          borderColor: "#c0c0c0",
          backgroundColor: isActive ? "#b3e5fc" : "#ffffff",
        }}
      >
        <ImageWidget
          image={imageLink}
          imageHeight={25}
          imageWidth={25}
        />
      </FlexWidget>
    </FlexWidget>
  );
};

// -------------------------------------------------------------------------------------------------
const ExerciseSection  = (
  { widgetHeight, clientLanguage, clientUnit, exercise }: ExerciseRecordProps
) => {

  // 0. height
  const height = (widgetHeight - 100) / 3 > 60 ? 60 : (widgetHeight - 100) / 3;

  // 0. fontSize
  const fontSize = (text: string) => {
    return text.length < 8 ? 16 : 14
  }

  // 1. volume
  const exercise_record_total_volume = {
    text: clientLanguage === "ko" ? "볼륨" : "Volume",
    value: ["x"].includes(exercise.exercise_record_total_volume) ? "x" : exercise.exercise_record_total_volume,
    color: ["x", "0"].includes(exercise.exercise_record_total_volume) ? "#9CA3AF" : "#000000",
    end: ["x"].includes(exercise.exercise_record_total_volume) ? "" : "vol",
  };

  // 2. cardio
  const exercise_record_total_cardio = {
    text: clientLanguage === "ko" ? "유산소" : "Cardio",
    value: ["x"].includes(exercise.exercise_record_total_cardio) ? "x" : exercise.exercise_record_total_cardio,
    color: ["x", "00:00"].includes(exercise.exercise_record_total_cardio) ? "#9CA3AF" : "#000000",
    end: ["x"].includes(exercise.exercise_record_total_cardio) ? "" : "h:m",
  };

  // 3. scale
  const exercise_record_total_scale = {
    text: clientLanguage === "ko" ? "체중" : "BodyWeight",
    value: ["x"].includes(exercise.exercise_record_total_scale) ? "x" : exercise.exercise_record_total_scale,
    color: ["x", "0"].includes(exercise.exercise_record_total_scale) ? "#9CA3AF" : "#000000",
    end: ["x"].includes(exercise.exercise_record_total_scale) ? "" : clientUnit,
  };

  return (
    <FlexWidget
      style={{
        width: 'match_parent',
        height: 'match_parent',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: "flex-start",
      }}
    >
      {/* exercise 1 */}
      <FlexWidget
        style={{
          width: 'wrap_content',
          height: height,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: "center",
        }}
      >
        <ImageWidget
          image={require('../assets/images/exercise3.webp')}
          imageWidth={20}
          imageHeight={20}
          style={{
            marginRight: 10,
          }}
        />
        <TextWidget
          style={{
            textAlign: "center",
            fontSize: fontSize(exercise_record_total_volume.text),
            fontWeight: '500',
            marginRight: 10,
            color: "#000000"
          }}
          text={`${exercise_record_total_volume.text} : `}
        />
        <TextWidget
          style={{
            textAlign: "center",
            fontSize: 16,
            fontWeight: '500',
            marginRight: 10,
            color: exercise_record_total_volume.color as ColorProp,
          }}
          text={`${insertComma(exercise_record_total_volume.value)}`}
        />
        <TextWidget
          style={{
            textAlign: "center",
            fontSize: 8,
            fontWeight: '400',
            marginRight: 0,
            color: "#434343"
          }}
          text={`${exercise_record_total_volume.end}`}
        />
      </FlexWidget>
      {/* exercise 2 */}
      <FlexWidget
        style={{
          width: 'wrap_content',
          height: height,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: "center",
        }}
      >
        <ImageWidget
          image={require('../assets/images/exercise4.webp')}
          imageWidth={20}
          imageHeight={20}
          style={{
            marginRight: 10,
          }}
        />
        <TextWidget
          style={{
            textAlign: "center",
            fontSize: fontSize(exercise_record_total_cardio.text),
            fontWeight: '500',
            marginRight: 10,
            color: "#000000"
          }}
          text={`${exercise_record_total_cardio.text} : `}
        />
        <TextWidget
          style={{
            textAlign: "center",
            fontSize: 16,
            fontWeight: '500',
            marginRight: 10,
            color: exercise_record_total_cardio.color as ColorProp,
          }}
          text={`${exercise_record_total_cardio.value}`}
        />
        <TextWidget
          style={{
            textAlign: "center",
            fontSize: 8,
            fontWeight: '400',
            marginRight: 0,
            color: "#434343"
          }}
          text={`${exercise_record_total_cardio.end}`}
        />
      </FlexWidget>
      {/* exercise 3 */}
      <FlexWidget
        style={{
          width: 'wrap_content',
          height: height,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: "center",
        }}
      >
        <ImageWidget
          image={require('../assets/images/exercise5.webp')}
          imageWidth={20}
          imageHeight={20}
          style={{
            marginRight: 10,
          }}
        />
        <TextWidget
          style={{
            textAlign: "center",
            fontSize: fontSize(exercise_record_total_scale.text),
            fontWeight: '500',
            marginRight: 10,
            color: "#000000"
          }}
          text={`${exercise_record_total_scale.text} : `}
        />
        <TextWidget
          style={{
            textAlign: "center",
            fontSize: 16,
            fontWeight: '500',
            marginRight: 10,
            color: exercise_record_total_scale.color as ColorProp,
          }}
          text={`${insertComma(exercise_record_total_scale.value)}`}
        />
        <TextWidget
          style={{
            textAlign: "center",
            fontSize: 8,
            fontWeight: '400',
            marginRight: 0,
            color: "#434343"
          }}
          text={`${exercise_record_total_scale.end}`}
        />
      </FlexWidget>
    </FlexWidget>
  );
};

// -------------------------------------------------------------------------------------------------
const FoodSection = (
  { widgetHeight, clientLanguage, food }: FoodRecordProps
) => {

  // 0. height
  const height = (widgetHeight - 100) / 4 > 60 ? 60 : (widgetHeight - 100) / 4;

  // 0. fontSize
  const fontSize = (text: string) => {
    return text.length < 8 ? 16 : 14
  }

  // 1. kcal
  const food_record_total_kcal = {
    text: clientLanguage === "ko" ? "칼로리" : "Kcal",
    value: ["x"].includes(food.food_record_total_kcal) ? "x" : food.food_record_total_kcal,
    color: ["x", "0"].includes(food.food_record_total_kcal) ? "#9CA3AF" : "#000000",
    end: ["x"].includes(food.food_record_total_kcal) ? "" : "kcal",
  };

  // 2. carb
  const food_record_total_carb = {
    text: clientLanguage === "ko" ? "탄수화물" : "Carb",
    value: ["x"].includes(food.food_record_total_carb) ? "x" : food.food_record_total_carb,
    color: ["x", "0"].includes(food.food_record_total_carb) ? "#9CA3AF" : "#000000",
    end: ["x"].includes(food.food_record_total_carb) ? "" : "g",
  };

  // 3. protein
  const food_record_total_protein = {
    text: clientLanguage === "ko" ? "단백질" : "Protein",
    value: ["x"].includes(food.food_record_total_protein) ? "x" : food.food_record_total_protein,
    color: ["x", "0"].includes(food.food_record_total_protein) ? "#9CA3AF" : "#000000",
    end: ["x"].includes(food.food_record_total_protein) ? "" : "g",
  };

  // 4. fat
  const food_record_total_fat = {
    text: clientLanguage === "ko" ? "지방" : "Fat",
    value: ["x"].includes(food.food_record_total_fat) ? "x" : food.food_record_total_fat,
    color: ["x", "0"].includes(food.food_record_total_fat) ? "#9CA3AF" : "#000000",
    end: ["x"].includes(food.food_record_total_fat) ? "" : "g",
  };

  return (
    <FlexWidget
      style={{
        width: 'match_parent',
        height: 'match_parent',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: "flex-start",
      }}
    >
      {/* food 1 */}
      <FlexWidget
        style={{
          width: 'wrap_content',
          height: height,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: "center",
        }}
      >
        <ImageWidget
          image={require('../assets/images/food2.webp')}
          imageWidth={20}
          imageHeight={20}
          style={{
            marginRight: 10,
          }}
        />
        <TextWidget
          style={{
            textAlign: "center",
            fontSize: fontSize(food_record_total_kcal.text),
            fontWeight: '500',
            marginRight: 10,
            color: "#000000"
          }}
          text={`${food_record_total_kcal.text} : `}
        />
        <TextWidget
          style={{
            textAlign: "center",
            fontSize: 16,
            fontWeight: '500',
            marginRight: 10,
            color: food_record_total_kcal.color as ColorProp,
          }}
          text={`${insertComma(food_record_total_kcal.value)}`}
        />
        <TextWidget
          style={{
            textAlign: "center",
            fontSize: 8,
            fontWeight: '400',
            marginRight: 0,
            color: "#434343"
          }}
          text={`${food_record_total_kcal.end}`}
        />
      </FlexWidget>
      {/* food 2 */}
      <FlexWidget
        style={{
          width: 'wrap_content',
          height: height,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: "center",
        }}
      >
        <ImageWidget
          image={require('../assets/images/food3.webp')}
          imageWidth={20}
          imageHeight={20}
          style={{
            marginRight: 10,
          }}
        />
        <TextWidget
          style={{
            textAlign: "center",
            fontSize: fontSize(food_record_total_carb.text),
            fontWeight: '500',
            marginRight: 10,
            color: "#000000"
          }}
          text={`${food_record_total_carb.text} : `}
        />
        <TextWidget
          style={{
            textAlign: "center",
            fontSize: 16,
            fontWeight: '500',
            marginRight: 10,
            color: food_record_total_carb.color as ColorProp,
          }}
          text={`${insertComma(food_record_total_carb.value)}`}
        />
        <TextWidget
          style={{
            textAlign: "center",
            fontSize: 8,
            fontWeight: '400',
            marginRight: 0,
            color: "#434343"
          }}
          text={`${food_record_total_carb.end}`}
        />
      </FlexWidget>
      {/* food 3 */}
      <FlexWidget
        style={{
          width: 'wrap_content',
          height: height,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: "center",
        }}
      >
        <ImageWidget
          image={require('../assets/images/food4.webp')}
          imageWidth={20}
          imageHeight={20}
          style={{
            marginRight: 10,
          }}
        />
        <TextWidget
          style={{
            textAlign: "center",
            fontSize: fontSize(food_record_total_protein.text),
            fontWeight: '500',
            marginRight: 10,
            color: "#000000"
          }}
          text={`${food_record_total_protein.text} : `}
        />
        <TextWidget
          style={{
            textAlign: "center",
            fontSize: 16,
            fontWeight: '500',
            marginRight: 10,
            color: food_record_total_protein.color as ColorProp,
          }}
          text={`${insertComma(food_record_total_protein.value)}`}
        />
        <TextWidget
          style={{
            textAlign: "center",
            fontSize: 8,
            fontWeight: '400',
            marginRight: 0,
            color: "#434343"
          }}
          text={`${food_record_total_protein.end}`}
        />
      </FlexWidget>
      {/* food 4 */}
      <FlexWidget
        style={{
          width: 'wrap_content',
          height: height,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: "center",
        }}
      >
        <ImageWidget
          image={require('../assets/images/food5.webp')}
          imageWidth={20}
          imageHeight={20}
          style={{
            marginRight: 10,
          }}
        />
        <TextWidget
          style={{
            textAlign: "center",
            fontSize: fontSize(food_record_total_fat.text),
            fontWeight: '500',
            marginRight: 10,
            color: "#000000"
          }}
          text={`${food_record_total_fat.text} : `}
        />
        <TextWidget
          style={{
            textAlign: "center",
            fontSize: 16,
            fontWeight: '500',
            marginRight: 10,
            color: food_record_total_fat.color as ColorProp,
          }}
          text={`${insertComma(food_record_total_fat.value)}`}
        />
        <TextWidget
          style={{
            textAlign: "center",
            fontSize: 8,
            fontWeight: '400',
            marginRight: 0,
            color: "#434343"
          }}
          text={`${food_record_total_fat.end}`}
        />
      </FlexWidget>
    </FlexWidget>
  );
};

// -------------------------------------------------------------------------------------------------
const MoneySection = (
  { widgetHeight, clientLanguage, clientCurrency, money}: MoneyRecordProps
) => {

  // 0. height
  const height = (widgetHeight - 100) / 2 > 60 ? 60 : (widgetHeight - 100) / 2;

  // 0. fontSize
  const fontSize = (text: string) => {
    return text.length < 8 ? 16 : 14
  }

  // 1. income
  const money_record_total_income = {
    text: clientLanguage === "ko" ? "수입" : "Income",
    value: ["x"].includes(money.money_record_total_income) ? "x" : money.money_record_total_income,
    color: ["x", "0"].includes(money.money_record_total_income) ? "#9CA3AF" : "#000000",
    end: ["x"].includes(money.money_record_total_income) ? "" : clientCurrency,
  };

  // 2. expense
  const money_record_total_expense = {
    text: clientLanguage === "ko" ? "지출" : "Expense",
    value: ["x"].includes(money.money_record_total_expense) ? "x" : money.money_record_total_expense,
    color: ["x", "0"].includes(money.money_record_total_expense) ? "#9CA3AF" : "#000000",
    end: ["x"].includes(money.money_record_total_expense) ? "" : clientCurrency,
  };

  return (
    <FlexWidget
      style={{
        width: 'match_parent',
        height: 'match_parent',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: "flex-start",
      }}
    >
      {/* money 1 */}
      <FlexWidget
        style={{
          width: 'wrap_content',
          height: height,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: "center",
        }}
      >
        <ImageWidget
          image={require('../assets/images/money2.webp')}
          imageWidth={20}
          imageHeight={20}
          style={{
            marginRight: 10,
          }}
        />
        <TextWidget
          style={{
            textAlign: "center",
            fontSize: fontSize(money_record_total_income.text),
            fontWeight: '500',
            marginRight: 10,
            color: "#000000"
          }}
          text={`${money_record_total_income.text} : `}
        />
        <TextWidget
          style={{
            textAlign: "center",
            fontSize: 16,
            fontWeight: '500',
            marginRight: 10,
            color: money_record_total_income.color as ColorProp,
          }}
          text={`${insertComma(money_record_total_income.value)}`}
        />
        <TextWidget
          style={{
            textAlign: "center",
            fontSize: 8,
            fontWeight: '400',
            marginRight: 0,
            color: "#434343"
          }}
          text={`${money_record_total_income.end}`}
        />
      </FlexWidget>
      {/* money 2 */}
      <FlexWidget
        style={{
          width: 'wrap_content',
          height: height,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: "center",
        }}
      >
        <ImageWidget
          image={require('../assets/images/money2.webp')}
          imageWidth={20}
          imageHeight={20}
          style={{
            marginRight: 10,
          }}
        />
        <TextWidget
          style={{
            textAlign: "center",
            fontSize: fontSize(money_record_total_expense.text),
            fontWeight: '500',
            marginRight: 10,
            color: "#000000"
          }}
          text={`${money_record_total_expense.text} : `}
        />
        <TextWidget
          style={{
            textAlign: "center",
            fontSize: 16,
            fontWeight: '500',
            marginRight: 10,
            color: money_record_total_expense.color as ColorProp,
          }}
          text={`${insertComma(money_record_total_expense.value)}`}
        />
        <TextWidget
          style={{
            textAlign: "center",
            fontSize: 8,
            fontWeight: '400',
            marginRight: 0,
            color: "#434343"
          }}
          text={`${money_record_total_expense.end}`}
        />
      </FlexWidget>
    </FlexWidget>
  );
};

// -------------------------------------------------------------------------------------------------
const SleepSection = (
  { widgetHeight, clientLanguage, sleep }: SleepRecordProps
) => {

  // 0. height
  const height = (widgetHeight - 100) / 3 > 60 ? 60 : (widgetHeight - 100) / 3;

  // 0. fontSize
  const fontSize = (text: string) => {
    return text.length < 8 ? 16 : 14
  }

  // 1. bedTime
  const sleep_record_bedTime = {
    text: clientLanguage === "ko" ? "취침" : "Bed",
    value: ["x"].includes(sleep.sleep_record_bedTime) ? "x" : sleep.sleep_record_bedTime,
    color: ["x", "00:00"].includes(sleep.sleep_record_bedTime) ? "#9CA3AF" : "#000000",
    end: ["x"].includes(sleep.sleep_record_bedTime) ? "" : "h:m",
  };

  // 2. wakeTime
  const sleep_record_wakeTime = {
    text: clientLanguage === "ko" ? "기상" : "Wake",
    value: ["x"].includes(sleep.sleep_record_wakeTime) ? "x" : sleep.sleep_record_wakeTime,
    color: ["x", "00:00"].includes(sleep.sleep_record_wakeTime) ? "#9CA3AF" : "#000000",
    end: ["x"].includes(sleep.sleep_record_wakeTime) ? "" : "h:m",
  };

  // 3. sleepTime
  const sleep_record_sleepTime = {
    text: clientLanguage === "ko" ? "수면" : "Sleep",
    value: ["x"].includes(sleep.sleep_record_sleepTime) ? "x" : sleep.sleep_record_sleepTime,
    color: ["x", "00:00"].includes(sleep.sleep_record_sleepTime) ? "#9CA3AF" : "#000000",
    end: ["x"].includes(sleep.sleep_record_sleepTime) ? "" : "h:m",
  };

  return (
    <FlexWidget
      style={{
        width: 'match_parent',
        height: 'match_parent',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: "flex-start",
      }}
    >
      {/* sleep 1 */}
      <FlexWidget
        style={{
          width: 'wrap_content',
          height: height,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: "center",
        }}
      >
        <ImageWidget
          image={require('../assets/images/sleep2.webp')}
          imageWidth={20}
          imageHeight={20}
          style={{
            marginRight: 10,
          }}
        />
        <TextWidget
          style={{
            textAlign: "center",
            fontSize: fontSize(sleep_record_bedTime.text),
            fontWeight: '500',
            marginRight: 10,
            color: "#000000"
          }}
          text={`${sleep_record_bedTime.text} : `}
        />
        <TextWidget
          style={{
            textAlign: "center",
            fontSize: 16,
            fontWeight: '500',
            marginRight: 10,
            color: sleep_record_bedTime.color as ColorProp,
          }}
          text={`${sleep_record_bedTime.value}`}
        />
        <TextWidget
          style={{
            textAlign: "center",
            fontSize: 8,
            fontWeight: '400',
            marginRight: 0,
            color: "#434343"
          }}
          text={`${sleep_record_bedTime.end}`}
        />
      </FlexWidget>
      {/* sleep 2 */}
      <FlexWidget
        style={{
          width: 'wrap_content',
          height: height,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: "center",
        }}
      >
        <ImageWidget
          image={require('../assets/images/sleep3.webp')}
          imageWidth={20}
          imageHeight={20}
          style={{
            marginRight: 10,
          }}
        />
        <TextWidget
          style={{
            textAlign: "center",
            fontSize: fontSize(sleep_record_wakeTime.text),
            fontWeight: '500',
            marginRight: 10,
            color: "#000000"
          }}
          text={`${sleep_record_wakeTime.text} : `}
        />
        <TextWidget
          style={{
            textAlign: "center",
            fontSize: 16,
            fontWeight: '500',
            marginRight: 10,
            color: sleep_record_wakeTime.color as ColorProp,
          }}
          text={`${sleep_record_wakeTime.value}`}
        />
        <TextWidget
          style={{
            textAlign: "center",
            fontSize: 8,
            fontWeight: '400',
            marginRight: 0,
            color: "#434343"
          }}
          text={`${sleep_record_wakeTime.end}`}
        />
      </FlexWidget>
      {/* sleep 3 */}
      <FlexWidget
        style={{
          width: 'wrap_content',
          height: height,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: "center",
        }}
      >
        <ImageWidget
          image={require('../assets/images/sleep4.webp')}
          imageWidth={20}
          imageHeight={20}
          style={{
            marginRight: 10,
          }}
        />
        <TextWidget
          style={{
            textAlign: "center",
            fontSize: fontSize(sleep_record_sleepTime.text),
            fontWeight: '500',
            marginRight: 10,
            color: "#000000"
          }}
          text={`${sleep_record_sleepTime.text} : `}
        />
        <TextWidget
          style={{
            textAlign: "center",
            fontSize: 16,
            fontWeight: '500',
            marginRight: 10,
            color: sleep_record_sleepTime.color as ColorProp,
          }}
          text={`${sleep_record_sleepTime.value}`}
        />
        <TextWidget
          style={{
            textAlign: "center",
            fontSize: 8,
            fontWeight: '400',
            marginRight: 0,
            color: "#434343"
          }}
          text={`${sleep_record_sleepTime.end}`}
        />
      </FlexWidget>
    </FlexWidget>
  );
};

// -------------------------------------------------------------------------------------------------
export const DetailWidget = (
  {
    widgetHeight,
    activeView,
    clientLanguage,
    clientCurrency,
    clientUnit,
    clientDate,
    clientDay,
    clientTime,
    exercise,
    food,
    money,
    sleep
  }: DetailWidgetRecordProps & ExerciseRecordProps & FoodRecordProps & MoneyRecordProps & SleepRecordProps
) => {
    return (
      <FlexWidget
        style={{
          height: 'match_parent',
          width: 'match_parent',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#ffffff',
          borderRadius: 16,
          borderWidth: 1,
          borderColor: '#000',
        }}
      >
        {/** select section */}
        <FlexWidget
          style={{
            width: "wrap_content",
            height: 'match_parent',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            borderRightWidth: 1,
            borderRightColor: "#5e5e5e",
            paddingVertical: 10,
            paddingHorizontal: 10,
          }}
        >
          <SelectSection
            key={activeView}
            iconName={"exercise"}
            isActive={activeView === "exercise"}
          />
          <SelectSection
            key={activeView}
            iconName={"food"}
            isActive={activeView === "food"}
          />
          <SelectSection
            key={activeView}
            iconName={"money"}
            isActive={activeView === "money"}
          />
          <SelectSection
            key={activeView}
            iconName={"sleep"}
            isActive={activeView === "sleep"}
          />
        </FlexWidget>
        {/** detail section */}
        <FlexWidget
          style={{
            width: 'match_parent',
            height: 'match_parent',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {/** header section */}
          <FlexWidget
            style={{
              width: 'match_parent',
              height: 'wrap_content',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              borderBottomWidth: 1,
              borderBottomColor: '#c0c0c0',
              paddingVertical: 20,
              paddingHorizontal: 20,
            }}
          >
            <ImageWidget
              image={require('../assets/images/search.webp')}
              imageWidth={20}
              imageHeight={20}
              clickAction={"OPEN_APP"}
              style={{
                marginRight: 15,
              }}
            />
            <TextWidget
              style={{
                textAlign: "center",
                fontSize: 16,
                fontWeight: '700',
                color: '#000000',
                marginRight: 10,
                letterSpacing: 1,
              }}
              text={clientDate}
            />
            <TextWidget
              style={{
                textAlign: "center",
                fontSize: 14,
                fontWeight: '600',
                color: '#5e5e5e',
                marginRight: 10,
                letterSpacing: 1,
              }}
              text={clientDay}
            />
            <TextWidget
              style={{
                textAlign: "center",
                fontSize: 10,
                fontWeight: '500',
                color: '#000000',
                marginRight: 15,
                letterSpacing: 1,
              }}
              text={clientTime}
            />
            <ImageWidget
              image={require('../assets/images/refresh.webp')}
              imageWidth={16}
              imageHeight={16}
              clickAction={
                activeView === "exercise" ? "exercise" :
                activeView === "food" ? "food" :
                activeView === "money" ? "money" :
                activeView === "sleep" ? "sleep" : ""
              }
            />
          </FlexWidget>
          {/** detail section */}
          <FlexWidget
            style={{
              width: 'match_parent',
              height: 'match_parent',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              paddingTop: 10,
              paddingBottom: 10,
              paddingLeft: 50,
              paddingRight: 10,
            }}
          >
            {activeView === "exercise" && (
              <ExerciseSection
                widgetHeight={widgetHeight}
                clientLanguage={clientLanguage}
                clientUnit={clientUnit}
                exercise={exercise}
              />
            )}
            {activeView === "food" && (
              <FoodSection
                widgetHeight={widgetHeight}
                clientLanguage={clientLanguage}
                food={food}
              />
            )}
            {activeView === "money" && (
              <MoneySection
                widgetHeight={widgetHeight}
                clientLanguage={clientLanguage}
                clientCurrency={clientCurrency}
                money={money}
              />
            )}
            {activeView === "sleep" && (
              <SleepSection
                widgetHeight={widgetHeight}
                clientLanguage={clientLanguage}
                sleep={sleep}
              />
            )}
          </FlexWidget>
        </FlexWidget>
      </FlexWidget>
    );
};