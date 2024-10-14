// Detail.tsx

import {
  FlexWidget, TextWidget, ImageWidget,
} from "@imports/ImportReacts";

// -------------------------------------------------------------------------------------------------
declare type DetailProps = {
  activeView: "exercise" | "food" | "money" | "sleep";
  clientLanguage: string;
  clientCurrency: string;
  clientDate: string;
  clientTime: string;
  clientDay: string;
}
// -------------------------------------------------------------------------------------------------
declare type ActiveProps = {
  isActive: boolean;
  iconName: string;
}
// -------------------------------------------------------------------------------------------------
declare type ExerciseProps = {
  clientLanguage: string;
  exercise: {
    exercise_total_volume: any;
    exercise_total_cardio: any;
    exercise_total_weight: any;
  };
}
// -------------------------------------------------------------------------------------------------
declare type FoodProps = {
  clientLanguage: string;
  food: {
    food_total_kcal: any;
    food_total_carb:  any;
    food_total_protein: any;
    food_total_fat: any;
  };
}
// -------------------------------------------------------------------------------------------------
declare type MoneyProps = {
  clientLanguage: string;
  clientCurrency: string;
  money: {
    money_total_income: any;
    money_total_expense: any;
  };
}
// -------------------------------------------------------------------------------------------------
declare type SleepProps = {
  clientLanguage: string;
  sleep: {
    sleep_bedTime: any;
    sleep_wakeTime: any;
    sleep_sleepTime: any;
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
  {isActive, iconName}: ActiveProps
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
  { clientLanguage, exercise }: ExerciseProps
) => {

  // 1. volume
  const exercise_total_volume_text = (
    clientLanguage === "ko" ? "볼륨" : "Volume"
  );
  const exercise_total_volume_value = (
    exercise.exercise_total_volume === "x" ? "x" : exercise.exercise_total_volume
  );
  const exercise_total_volume_color = (
    (exercise_total_volume_value === "x" || exercise_total_volume_value === "0")
    ? "#9CA3AF"
    : "#000000"
  );
  const exercise_total_volume_end = (
    exercise_total_volume_value === "x" ? "" : "vol"
  );

  // 2. cardio
  const exercise_total_cardio_text = (
    clientLanguage === "ko" ? "유산소" : "Cardio"
  );
  const exercise_total_cardio_value = (
    exercise.exercise_total_cardio === "x" ? "x" : exercise.exercise_total_cardio
  );
  const exercise_total_cardio_color = (
    (exercise_total_cardio_value === "x" || exercise_total_cardio_value === "00:00")
    ? "#9CA3AF"
    : "#000000"
  );
  const exercise_total_cardio_end = (
    exercise_total_cardio_value === "x" ? "" : "h:m"
  );

  // 3. weight
  const exercise_total_weight_text = (
    clientLanguage === "ko" ? "체중" : "Weight"
  );
  const exercise_total_weight_value = (
    exercise.exercise_total_weight === "x" ? "x" : exercise.exercise_total_weight
  );
  const exercise_total_weight_color = (
    (exercise_total_weight_value === "x" || exercise_total_weight_value === "0")
    ? "#9CA3AF"
    : "#000000"
  );
  const exercise_total_weight_end = (
    exercise_total_weight_value === "x" ? "" : "kg"
  );

  return (
    <FlexWidget
      style={{
        width: 'match_parent',
        height: 'match_parent',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
      }}
    >
      {/* exercise 1 */}
      <FlexWidget
        style={{
          width: 'wrap_content',
          height: 'wrap_content',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: "center",
          marginBottom: 30,
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
            fontSize: 14,
            fontWeight: '500',
            marginRight: 10,
            color: "#000000"
          }}
          text={`${exercise_total_volume_text} : `}
        />
        <TextWidget
          style={{
            textAlign: "center",
            fontSize: 16,
            fontWeight: '500',
            marginRight: 10,
            color: exercise_total_volume_color,
          }}
          text={`${insertComma(exercise_total_volume_value)}`}
        />
        <TextWidget
          style={{
            textAlign: "center",
            fontSize: 8,
            fontWeight: '400',
            marginRight: 0,
            color: "#434343"
          }}
          text={`${exercise_total_volume_end}`}
        />
      </FlexWidget>
      {/* exercise 2 */}
      <FlexWidget
        style={{
          width: 'wrap_content',
          height: 'wrap_content',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: "center",
          marginBottom: 30,
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
            fontSize: 14,
            fontWeight: '500',
            marginRight: 10,
            color: "#000000"
          }}
          text={`${exercise_total_cardio_text} : `}
        />
        <TextWidget
          style={{
            textAlign: "center",
            fontSize: 16,
            fontWeight: '500',
            marginRight: 10,
            color: exercise_total_cardio_color,
          }}
          text={`${insertComma(exercise_total_cardio_value)}`}
        />
        <TextWidget
          style={{
            textAlign: "center",
            fontSize: 8,
            fontWeight: '400',
            marginRight: 0,
            color: "#434343"
          }}
          text={`${exercise_total_cardio_end}`}
        />
      </FlexWidget>
      {/* exercise 3 */}
      <FlexWidget
        style={{
          width: 'wrap_content',
          height: 'wrap_content',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: "center",
          marginBottom: 0,
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
            fontSize: 14,
            fontWeight: '500',
            marginRight: 10,
            color: "#000000"
          }}
          text={`${exercise_total_weight_text} : `}
        />
        <TextWidget
          style={{
            textAlign: "center",
            fontSize: 16,
            fontWeight: '500',
            marginRight: 10,
            color: exercise_total_weight_color,
          }}
          text={`${insertComma(exercise_total_weight_value)}`}
        />
        <TextWidget
          style={{
            textAlign: "center",
            fontSize: 8,
            fontWeight: '400',
            marginRight: 0,
            color: "#434343"
          }}
          text={`${exercise_total_weight_end}`}
        />
      </FlexWidget>
    </FlexWidget>
  );
};

// -------------------------------------------------------------------------------------------------
const FoodSection = (
  { clientLanguage, food }: FoodProps
) => {

  // 1. kcal
  const food_total_kcal_text = (
    clientLanguage === "ko" ? "칼로리" : "Kcal"
  );
  const food_total_kcal_value = (
    food.food_total_kcal === "x" ? "x" : food.food_total_kcal
  );
  const food_total_kcal_color = (
    (food_total_kcal_value === "x" || food_total_kcal_value === "0")
    ? "#9CA3AF"
    : "#000000"
  );
  const food_total_kcal_end = (
    food_total_kcal_value === "x" ? "" : "kcal"
  );

  // 2. carb
  const food_total_carb_text = (
    clientLanguage === "ko" ? "탄수화물" : "Carb"
  );
  const food_total_carb_value = (
    food.food_total_carb === "x" ? "x" : food.food_total_carb
  );
  const food_total_carb_color = (
    (food_total_carb_value === "x" || food_total_carb_value === "0")
    ? "#9CA3AF"
    : "#000000"
  );
  const food_total_carb_end = (
    food_total_carb_value === "x" ? "" : "g"
  );

  // 3. protein
  const food_total_protein_text = (
    clientLanguage === "ko" ? "단백질" : "Protein"
  );
  const food_total_protein_value = (
    food.food_total_protein === "x" ? "x" : food.food_total_protein
  );
  const food_total_protein_color = (
    (food_total_protein_value === "x" || food_total_protein_value === "0")
    ? "#9CA3AF"
    : "#000000"
  );
  const food_total_protein_end = (
    food_total_protein_value === "x" ? "" : "g"
  );

  // 4. fat
  const food_total_fat_text = (
    clientLanguage === "ko" ? "지방" : "Fat"
  );
  const food_total_fat_value = (
    food.food_total_fat === "x" ? "x" : food.food_total_fat
  );
  const food_total_fat_color = (
    (food_total_fat_value === "x" || food_total_fat_value === "0")
    ? "#9CA3AF"
    : "#000000"
  );
  const food_total_fat_end = (
    food_total_fat_value === "x" ? "" : "g"
  );

  return (
    <FlexWidget
      style={{
        width: 'match_parent',
        height: 'match_parent',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
      }}
    >
      {/* food 1 */}
      <FlexWidget
        style={{
          width: 'wrap_content',
          height: 'wrap_content',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: "center",
          marginBottom: 30,
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
            fontSize: 14,
            fontWeight: '500',
            marginRight: 10,
            color: "#000000"
          }}
          text={`${food_total_kcal_text} : `}
        />
        <TextWidget
          style={{
            textAlign: "center",
            fontSize: 16,
            fontWeight: '500',
            marginRight: 10,
            color: food_total_kcal_color,
          }}
          text={`${insertComma(food_total_kcal_value)}`}
        />
        <TextWidget
          style={{
            textAlign: "center",
            fontSize: 8,
            fontWeight: '400',
            marginRight: 0,
            color: "#434343"
          }}
          text={`${food_total_kcal_end}`}
        />
      </FlexWidget>
      {/* food 2 */}
      <FlexWidget
        style={{
          width: 'wrap_content',
          height: 'wrap_content',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: "center",
          marginBottom: 30,
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
            fontSize: 14,
            fontWeight: '500',
            marginRight: 10,
            color: "#000000"
          }}
          text={`${food_total_carb_text} : `}
        />
        <TextWidget
          style={{
            textAlign: "center",
            fontSize: 16,
            fontWeight: '500',
            marginRight: 10,
            color: food_total_carb_color,
          }}
          text={`${insertComma(food_total_carb_value)}`}
        />
        <TextWidget
          style={{
            textAlign: "center",
            fontSize: 8,
            fontWeight: '400',
            marginRight: 0,
            color: "#434343"
          }}
          text={`${food_total_carb_end}`}
        />
      </FlexWidget>
      {/* food 3 */}
      <FlexWidget
        style={{
          width: 'wrap_content',
          height: 'wrap_content',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: "center",
          marginBottom: 30,
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
            fontSize: 14,
            fontWeight: '500',
            marginRight: 10,
            color: "#000000"
          }}
          text={`${food_total_protein_text} : `}
        />
        <TextWidget
          style={{
            textAlign: "center",
            fontSize: 16,
            fontWeight: '500',
            marginRight: 10,
            color: food_total_protein_color,
          }}
          text={`${insertComma(food_total_protein_value)}`}
        />
        <TextWidget
          style={{
            textAlign: "center",
            fontSize: 8,
            fontWeight: '400',
            marginRight: 0,
            color: "#434343"
          }}
          text={`${food_total_protein_end}`}
        />
      </FlexWidget>
      {/* food 4 */}
      <FlexWidget
        style={{
          width: 'wrap_content',
          height: 'wrap_content',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: "center",
          marginBottom: 0,
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
            fontSize: 14,
            fontWeight: '500',
            marginRight: 10,
            color: "#000000"
          }}
          text={`${food_total_fat_text} : `}
        />
        <TextWidget
          style={{
            textAlign: "center",
            fontSize: 16,
            fontWeight: '500',
            marginRight: 10,
            color: food_total_fat_color,
          }}
          text={`${insertComma(food_total_fat_value)}`}
        />
        <TextWidget
          style={{
            textAlign: "center",
            fontSize: 8,
            fontWeight: '400',
            marginRight: 0,
            color: "#434343"
          }}
          text={`${food_total_fat_end}`}
        />
      </FlexWidget>
    </FlexWidget>
  );
};

// -------------------------------------------------------------------------------------------------
const MoneySection = (
  { clientLanguage, clientCurrency, money }: MoneyProps
) => {

  // 1. income
  const money_total_income_text = (
    clientLanguage === "ko" ? "수입" : "Income"
  );
  const money_total_income_value = (
    money.money_total_income === "x" ? "x" : money.money_total_income
  );
  const money_total_income_color = (
    (money_total_income_value === "x" || money_total_income_value === "0")
    ? "#9CA3AF"
    : "#000000"
  );
  const money_total_income_end = (
    money_total_income_value === "x" ? "" : clientCurrency
  );

  // 2. expense
  const money_total_expense_text = (
    clientLanguage === "ko" ? "지출" : "Expense"
  );
  const money_total_expense_value = (
    money.money_total_expense === "x" ? "x" : money.money_total_expense
  );
  const money_total_expense_color = (
    (money_total_expense_value === "x" || money_total_expense_value === "0")
    ? "#9CA3AF"
    : "#000000"
  );
  const money_total_expense_end = (
    money_total_expense_value === "x" ? "" : clientCurrency
  );

  return (
    <FlexWidget
      style={{
        width: 'match_parent',
        height: 'match_parent',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
      }}
    >
      {/* money 1 */}
      <FlexWidget
        style={{
          width: 'wrap_content',
          height: 'wrap_content',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: "center",
          marginBottom: 30,
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
            fontSize: 14,
            fontWeight: '500',
            marginRight: 10,
            color: "#000000"
          }}
          text={`${money_total_income_text} : `}
        />
        <TextWidget
          style={{
            textAlign: "center",
            fontSize: 16,
            fontWeight: '500',
            marginRight: 10,
            color: money_total_income_color,
          }}
          text={`${insertComma(money_total_income_value)}`}
        />
        <TextWidget
          style={{
            textAlign: "center",
            fontSize: 8,
            fontWeight: '400',
            marginRight: 0,
            color: "#434343"
          }}
          text={`${money_total_income_end}`}
        />
      </FlexWidget>
      {/* money 2 */}
      <FlexWidget
        style={{
          width: 'wrap_content',
          height: 'wrap_content',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: "center",
          marginBottom: 0,
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
            fontSize: 14,
            fontWeight: '500',
            marginRight: 10,
            color: "#000000"
          }}
          text={`${money_total_expense_text} : `}
        />
        <TextWidget
          style={{
            textAlign: "center",
            fontSize: 16,
            fontWeight: '500',
            marginRight: 10,
            color: money_total_expense_color,
          }}
          text={`${insertComma(money_total_expense_value)}`}
        />
        <TextWidget
          style={{
            textAlign: "center",
            fontSize: 8,
            fontWeight: '400',
            marginRight: 0,
            color: "#434343"
          }}
          text={`${money_total_expense_end}`}
        />
      </FlexWidget>
    </FlexWidget>
  );
};

// -------------------------------------------------------------------------------------------------
const SleepSection = (
  { clientLanguage, sleep }: SleepProps
) => {

  // 1. bedTime
  const sleep_bedTime_text = (
    clientLanguage === "ko" ? "취침" : "Bed"
  );
  const sleep_bedTime_value = (
    sleep.sleep_bedTime === "x" ? "x" : sleep.sleep_bedTime
  );
  const sleep_bedTime_color = (
    (sleep_bedTime_value === "x" || sleep_bedTime_value === "00:00")
    ? "#9CA3AF"
    : "#000000"
  );
  const sleep_bedTime_end = (
    sleep_bedTime_value === "x" ? "" : "h:m"
  );

  // 2. wakeTime
  const sleep_wakeTime_text = (
    clientLanguage === "ko" ? "기상" : "Wake"
  );
  const sleep_wakeTime_value = (
    sleep.sleep_wakeTime === "x" ? "x" : sleep.sleep_wakeTime
  );
  const sleep_wakeTime_color = (
    (sleep_wakeTime_value === "x" || sleep_wakeTime_value === "00:00")
    ? "#9CA3AF"
    : "#000000"
  );
  const sleep_wakeTime_end = (
    sleep_wakeTime_value === "x" ? "" : "h:m"
  );

  // 3. sleepTime
  const sleep_sleepTime_text = (
    clientLanguage === "ko" ? "수면" : "Sleep"
  );
  const sleep_sleepTime_value = (
    sleep.sleep_sleepTime === "x" ? "x" : sleep.sleep_sleepTime
  );
  const sleep_sleepTime_color = (
    (sleep_sleepTime_value === "x" || sleep_sleepTime_value === "00:00")
    ? "#9CA3AF"
    : "#000000"
  );
  const sleep_sleepTime_end = (
    sleep_sleepTime_value === "x" ? "" : "h:m"
  );

  return (
    <FlexWidget
      style={{
        width: 'match_parent',
        height: 'match_parent',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
      }}
    >
      {/* sleep 1 */}
      <FlexWidget
        style={{
          width: 'wrap_content',
          height: 'wrap_content',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: "center",
          marginBottom: 30,
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
            fontSize: 14,
            fontWeight: '500',
            marginRight: 10,
            color: "#000000"
          }}
          text={`${sleep_bedTime_text} : `}
        />
        <TextWidget
          style={{
            textAlign: "center",
            fontSize: 16,
            fontWeight: '500',
            marginRight: 10,
            color: sleep_bedTime_color,
          }}
          text={`${sleep_bedTime_value}`}
        />
        <TextWidget
          style={{
            textAlign: "center",
            fontSize: 8,
            fontWeight: '400',
            marginRight: 0,
            color: "#434343"
          }}
          text={`${sleep_bedTime_end}`}
        />
      </FlexWidget>
      {/* sleep 2 */}
      <FlexWidget
        style={{
          width: 'wrap_content',
          height: 'wrap_content',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: "center",
          marginBottom: 30,
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
            fontSize: 14,
            fontWeight: '500',
            marginRight: 10,
            color: "#000000"
          }}
          text={`${sleep_wakeTime_text} : `}
        />
        <TextWidget
          style={{
            textAlign: "center",
            fontSize: 16,
            fontWeight: '500',
            marginRight: 10,
            color: sleep_wakeTime_color,
          }}
          text={`${sleep_wakeTime_value}`}
        />
        <TextWidget
          style={{
            textAlign: "center",
            fontSize: 8,
            fontWeight: '400',
            marginRight: 0,
            color: "#434343"
          }}
          text={`${sleep_wakeTime_end}`}
        />
      </FlexWidget>
      {/* sleep 3 */}
      <FlexWidget
        style={{
          width: 'wrap_content',
          height: 'wrap_content',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: "center",
          marginBottom: 0,
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
            fontSize: 14,
            fontWeight: '500',
            marginRight: 10,
            color: "#000000"
          }}
          text={`${sleep_sleepTime_text} : `}
        />
        <TextWidget
          style={{
            textAlign: "center",
            fontSize: 16,
            fontWeight: '500',
            marginRight: 10,
            color: sleep_sleepTime_color,
          }}
          text={`${sleep_sleepTime_value}`}
        />
        <TextWidget
          style={{
            textAlign: "center",
            fontSize: 8,
            fontWeight: '400',
            marginRight: 0,
            color: "#434343"
          }}
          text={`${sleep_sleepTime_end}`}
        />
      </FlexWidget>
    </FlexWidget>
  );
};

// -------------------------------------------------------------------------------------------------
export const DetailWidget = (
  {
    activeView,
    clientCurrency,
    clientLanguage,
    clientDate,
    clientDay,
    clientTime,
    exercise,
    food,
    money,
    sleep
  }: DetailProps & ExerciseProps & FoodProps & MoneyProps & SleepProps
) => {

  const active = activeView || "exercise";

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
          key={active}
          iconName={"exercise"}
          isActive={active === "exercise"}
        />
        <SelectSection
          key={active}
          iconName={"food"}
          isActive={active === "food"}
        />
        <SelectSection
          key={active}
          iconName={"money"}
          isActive={active === "money"}
        />
        <SelectSection
          key={active}
          iconName={"sleep"}
          isActive={active === "sleep"}
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
              active === "exercise" ? "exercise" :
              active === "food" ? "food" :
              active === "money" ? "money" :
              active === "sleep" ? "sleep" : "exercise"
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
            paddingVertical: 20,
            paddingHorizontal: 50,
          }}
        >
          {active === "exercise" && (
            <ExerciseSection
              clientLanguage={clientLanguage}
              exercise={exercise}
            />
          )}
          {active === "food" && (
            <FoodSection
              clientLanguage={clientLanguage}
              food={food}
            />
          )}
          {active === "money" && (
            <MoneySection
              clientLanguage={clientLanguage}
              clientCurrency={clientCurrency}
              money={money}
            />
          )}
          {active === "sleep" && (
            <SleepSection
              clientLanguage={clientLanguage}
              sleep={sleep}
            />
          )}
        </FlexWidget>
      </FlexWidget>
    </FlexWidget>
  );
};