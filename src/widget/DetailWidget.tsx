// Detail.tsx

import React from 'react';
import { FlexWidget, TextWidget, ImageWidget } from "react-native-android-widget";

// -------------------------------------------------------------------------------------------------
interface ActiveProps {
  isActive: boolean;
  iconName: string;
}

// -------------------------------------------------------------------------------------------------
interface ActiveViewProps {
  activeView: "exercise" | "food" | "money" | "sleep";
  currentDate: string;
  currentDay: string;
  currentTime: string;
}

// -------------------------------------------------------------------------------------------------
interface ExerciseProps {
  exercise: {
    exercise_total_volume: any;
    exercise_total_cardio: any;
    exercise_total_weight: any;
  };
}
interface FoodProps {
  food: {
    food_total_kcal: any;
    food_total_carb:  any;
    food_total_protein: any;
    food_total_fat: any;
  };
}
interface MoneyProps {
  money: {
    money_total_income: any;
    money_total_expense: any;
  };
}
interface SleepProps {
  sleep: {
    sleep_bedTime: any;
    sleep_wakeTime: any;
    sleep_sleepTime: any;
  };
}

// -------------------------------------------------------------------------------------------------
const insertComma = (num: any) => {
  if (num === "x") {
    return "x";
  }
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// -------------------------------------------------------------------------------------------------
const SelectSection = ({isActive, iconName}: ActiveProps) => {
  let imageLink = "";
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
          // @ts-ignore
          image={imageLink}
          imageHeight={25}
          imageWidth={25}
        />
      </FlexWidget>
    </FlexWidget>
  );
};

// -------------------------------------------------------------------------------------------------
const ExerciseSection  = ({ exercise }: ExerciseProps) => {

  const exercise_total_volume
    = exercise.exercise_total_volume === "x" ? "x" : parseFloat(exercise.exercise_total_volume).toFixed(0);

  const exercise_total_cardio
    = exercise.exercise_total_cardio === "x" ? "x" : exercise.exercise_total_cardio;

  const exercise_total_weight
    = exercise.exercise_total_weight === "x" ? "x" : parseFloat(exercise.exercise_total_weight).toFixed(0);

  return (
    <FlexWidget
      style={{
        width: 'match_parent',
        height: 'match_parent',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
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
          padding: 5,
          marginBottom: 20,
        }}
      >
        <ImageWidget
          image={require('../assets/images/exercise3.webp')}
          imageWidth={20}
          imageHeight={20}
        />
        <FlexWidget style={{width: 60, marginLeft: 10}}>
          <TextWidget style={{fontSize: 16, fontWeight: '500'}}
            text={`볼륨`}
          />
        </FlexWidget>
        <FlexWidget style={{width: 10}}>
          <TextWidget style={{fontSize: 16}}
            text={`:`}
          />
        </FlexWidget>
        {exercise_total_volume === "x" ? (
          <FlexWidget style={{width: 80, marginLeft: 20, flexDirection: 'row'}}>
            <TextWidget style={{fontSize: 16, fontWeight: '500'}}
              text={`${insertComma(exercise_total_volume)}`}
            />
          </FlexWidget>
        ) : (
          <FlexWidget style={{width: 80, marginLeft: 20, flexDirection: 'row'}}>
            <TextWidget style={{fontSize: 16, fontWeight: '500'}}
              text={`${insertComma(exercise_total_volume)}`}
            />
            <TextWidget style={{fontSize: 10, marginLeft: 10}}
              text={"vol"}
            />
          </FlexWidget>
        )}
      </FlexWidget>
      {/** exercise 2 */}
      <FlexWidget
        style={{
          width: 'wrap_content',
          height: 'wrap_content',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: "center",
          padding: 5,
          marginBottom: 20,
        }}
      >
        <ImageWidget
          image={require('../assets/images/exercise4.webp')}
          imageWidth={20}
          imageHeight={20}
        />
        <FlexWidget style={{width: 60, marginLeft: 10}}>
          <TextWidget style={{fontSize: 16, fontWeight: '500'}}
            text={`유산소`}
          />
        </FlexWidget>
        <FlexWidget style={{width: 10}}>
          <TextWidget style={{fontSize: 16}}
            text={`:`}
          />
        </FlexWidget>
        {exercise_total_cardio === "x" ? (
          <FlexWidget style={{width: 80, marginLeft: 20, flexDirection: 'row'}}>
            <TextWidget style={{fontSize: 16, fontWeight: '500'}}
              text={`${exercise_total_cardio}`}
            />
          </FlexWidget>
        ) : (
          <FlexWidget style={{width: 80, marginLeft: 20, flexDirection: 'row'}}>
            <TextWidget style={{fontSize: 16, fontWeight: '500'}}
              text={`${exercise_total_cardio}`}
            />
            <TextWidget style={{fontSize: 10, marginLeft: 10}}
              text={"h:m"}
            />
          </FlexWidget>
        )}
      </FlexWidget>
      {/* exercise 3 */}
      <FlexWidget
        style={{
          width: 'wrap_content',
          height: 'wrap_content',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: "center",
          padding: 5,
          marginBottom: 0,
        }}
      >
        <ImageWidget
          image={require('../assets/images/exercise5.webp')}
          imageWidth={20}
          imageHeight={20}
        />
        <FlexWidget style={{width: 60, marginLeft: 10}}>
          <TextWidget style={{fontSize: 16, fontWeight: '500'}}
            text={`체중`}
          />
        </FlexWidget>
        <FlexWidget style={{width: 10}}>
          <TextWidget style={{fontSize: 16}}
            text={`:`}
          />
        </FlexWidget>
        {exercise_total_weight === "x" ? (
          <FlexWidget style={{width: 80, marginLeft: 20, flexDirection: 'row'}}>
            <TextWidget style={{fontSize: 16, fontWeight: '500'}}
              text={`${insertComma(exercise_total_weight)}`}
            />
          </FlexWidget>
        ) : (
          <FlexWidget style={{width: 80, marginLeft: 20, flexDirection: 'row'}}>
            <TextWidget style={{fontSize: 16, fontWeight: '500'}}
              text={`${insertComma(exercise_total_weight)}`}
            />
            <TextWidget style={{fontSize: 10, marginLeft: 10}}
              text={"kg"}
            />
          </FlexWidget>
        )}
      </FlexWidget>
    </FlexWidget>
  );
};

// -------------------------------------------------------------------------------------------------
const FoodSection = ({ food }: FoodProps) => {

  const food_total_kcal
    = food.food_total_kcal === "x" ? "x" : parseFloat(food.food_total_kcal).toFixed(0);

  const food_total_carb
    = food.food_total_carb === "x" ? "x" : parseFloat(food.food_total_carb).toFixed(0);

  const food_total_protein
    = food.food_total_protein === "x" ? "x" : parseFloat(food.food_total_protein).toFixed(0);

  const food_total_fat
    = food.food_total_fat === "x" ? "x" : parseFloat(food.food_total_fat).toFixed(0);

  return (
    <FlexWidget
      style={{
        width: 'match_parent',
        height: 'match_parent',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
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
          padding: 5,
          marginBottom: 5,
        }}
      >
        <ImageWidget
          image={require('../assets/images/food2.webp')}
          imageWidth={20}
          imageHeight={20}
        />
        <FlexWidget style={{width: 60, marginLeft: 10}}>
          <TextWidget style={{fontSize: 16, fontWeight: '500'}}
            text={`칼로리`}
          />
        </FlexWidget>
        <FlexWidget style={{width: 10}}>
          <TextWidget style={{fontSize: 16}}
            text={`:`}
          />
        </FlexWidget>
        {food_total_kcal === "x" ? (
          <FlexWidget style={{width: 80, marginLeft: 20, flexDirection: 'row'}}>
            <TextWidget style={{fontSize: 16, fontWeight: '500'}}
              text={`${insertComma(food_total_kcal)}`}
            />
          </FlexWidget>
        ) : (
          <FlexWidget style={{width: 80, marginLeft: 20, flexDirection: 'row'}}>
            <TextWidget style={{fontSize: 16, fontWeight: '500'}}
              text={`${insertComma(food_total_kcal)}`}
            />
            <TextWidget style={{fontSize: 10, marginLeft: 10}}
              text={"kcal"}
            />
          </FlexWidget>
        )}
      </FlexWidget>
      {/* food 2 */}
      <FlexWidget
        style={{
          width: 'wrap_content',
          height: 'wrap_content',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: "center",
          padding: 5,
          marginBottom: 5,
        }}
      >
        <ImageWidget
          image={require('../assets/images/food3.webp')}
          imageWidth={20}
          imageHeight={20}
        />
        <FlexWidget style={{width: 60, marginLeft: 10}}>
          <TextWidget style={{fontSize: 16, fontWeight: '500'}}
            text={`탄수화물`}
          />
        </FlexWidget>
        <FlexWidget style={{width: 10}}>
          <TextWidget style={{fontSize: 16}}
            text={`:`}
          />
        </FlexWidget>
        {food_total_carb === "x" ? (
          <FlexWidget style={{width: 80, marginLeft: 20, flexDirection: 'row'}}>
            <TextWidget style={{fontSize: 16, fontWeight: '500'}}
              text={`${insertComma(food_total_carb)}`}
            />
          </FlexWidget>
        ) : (
          <FlexWidget style={{width: 80, marginLeft: 20, flexDirection: 'row'}}>
            <TextWidget style={{fontSize: 16, fontWeight: '500'}}
              text={`${insertComma(food_total_carb)}`}
            />
            <TextWidget style={{fontSize: 10, marginLeft: 10}}
              text={"g"}
            />
          </FlexWidget>
        )}
      </FlexWidget>
      {/* food 3 */}
      <FlexWidget
        style={{
          width: 'wrap_content',
          height: 'wrap_content',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: "center",
          padding: 5,
          marginBottom: 5,
        }}
      >
        <ImageWidget
          image={require('../assets/images/food4.webp')}
          imageWidth={20}
          imageHeight={20}
        />
        <FlexWidget style={{width: 60, marginLeft: 10}}>
          <TextWidget style={{fontSize: 16, fontWeight: '500'}}
            text={`단백질`}
          />
        </FlexWidget>
        <FlexWidget style={{width: 10}}>
          <TextWidget style={{fontSize: 16}}
            text={`:`}
          />
        </FlexWidget>
        {food_total_protein === "x" ? (
          <FlexWidget style={{width: 80, marginLeft: 20, flexDirection: 'row'}}>
            <TextWidget style={{fontSize: 16, fontWeight: '500'}}
              text={`${insertComma(food_total_protein)}`}
            />
          </FlexWidget>
        ) : (
          <FlexWidget style={{width: 80, marginLeft: 20, flexDirection: 'row'}}>
            <TextWidget style={{fontSize: 16, fontWeight: '500'}}
              text={`${insertComma(food_total_protein)}`}
            />
            <TextWidget style={{fontSize: 10, marginLeft: 10}}
              text={"g"}
            />
          </FlexWidget>
        )}
      </FlexWidget>
      {/* food 4 */}
      <FlexWidget
        style={{
          width: 'wrap_content',
          height: 'wrap_content',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: "center",
          padding: 5,
          marginBottom: 0,
        }}
      >
        <ImageWidget
          image={require('../assets/images/food5.webp')}
          imageWidth={20}
          imageHeight={20}
        />
        <FlexWidget style={{width: 60, marginLeft: 10}}>
          <TextWidget style={{fontSize: 16, fontWeight: '500'}}
            text={`지방`}
          />
        </FlexWidget>
        <FlexWidget style={{width: 10}}>
          <TextWidget style={{fontSize: 16}}
            text={`:`}
          />
        </FlexWidget>
        {food_total_fat === "x" ? (
          <FlexWidget style={{width: 80, marginLeft: 20, flexDirection: 'row'}}>
            <TextWidget style={{fontSize: 16, fontWeight: '500'}}
              text={`${insertComma(food_total_fat)}`}
            />
          </FlexWidget>
        ) : (
          <FlexWidget style={{width: 80, marginLeft: 20, flexDirection: 'row'}}>
            <TextWidget style={{fontSize: 16, fontWeight: '500'}}
              text={`${insertComma(food_total_fat)}`}
            />
            <TextWidget style={{fontSize: 10, marginLeft: 10}}
              text={"g"}
            />
          </FlexWidget>
        )}
      </FlexWidget>
    </FlexWidget>
  );
};

// -------------------------------------------------------------------------------------------------
const MoneySection = ({ money }: MoneyProps) => {

  const money_total_income
    = money.money_total_income === "x" ? "x" : parseFloat(money.money_total_income).toFixed(0);

  const money_total_expense
    = money.money_total_expense === "x" ? "x" : parseFloat(money.money_total_expense).toFixed(0);

  return (
    <FlexWidget
      style={{
        width: 'match_parent',
        height: 'match_parent',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
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
          padding: 5,
          marginBottom: 30,
        }}
      >
        <ImageWidget
          image={require('../assets/images/money2.webp')}
          imageWidth={20}
          imageHeight={20}
        />
        <FlexWidget style={{width: 60, marginLeft: 10}}>
          <TextWidget style={{fontSize: 16, fontWeight: '500'}}
            text={`수입`}
          />
        </FlexWidget>
        <FlexWidget style={{width: 10}}>
          <TextWidget style={{fontSize: 16}}
            text={`:`}
          />
        </FlexWidget>
        {money_total_income === "x" ? (
          <FlexWidget style={{width: 80, marginLeft: 20, flexDirection: 'row'}}>
            <TextWidget style={{fontSize: 16, fontWeight: '500'}}
              text={`${insertComma(money_total_income)}`}
            />
          </FlexWidget>
        ) : (
          <FlexWidget style={{width: 80, marginLeft: 20, flexDirection: 'row'}}>
            <TextWidget style={{fontSize: 10, marginRight: 10}}
              text={"₩"}
            />
            <TextWidget style={{fontSize: 16, fontWeight: '500'}}
              text={`${insertComma(money_total_income)}`}
            />
          </FlexWidget>
        )}
      </FlexWidget>
      {/* money 2 */}
      <FlexWidget
        style={{
          width: 'wrap_content',
          height: 'wrap_content',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: "center",
          padding: 5,
          marginBottom: 0,
        }}
      >
        <ImageWidget
          image={require('../assets/images/money2.webp')}
          imageWidth={20}
          imageHeight={20}
        />
        <FlexWidget style={{width: 60, marginLeft: 10}}>
          <TextWidget style={{fontSize: 16, fontWeight: '500'}}
            text={`지출`}
          />
        </FlexWidget>
        <FlexWidget style={{width: 10}}>
          <TextWidget style={{fontSize: 16}}
            text={`:`}
          />
        </FlexWidget>
        {money_total_expense === "x" ? (
          <FlexWidget style={{width: 80, marginLeft: 20, flexDirection: 'row'}}>
            <TextWidget style={{fontSize: 16, fontWeight: '500'}}
              text={`${insertComma(money_total_expense)}`}
            />
          </FlexWidget>
        ) : (
          <FlexWidget style={{width: 80, marginLeft: 20, flexDirection: 'row'}}>
            <TextWidget style={{fontSize: 10, marginRight: 10}}
              text={"₩"}
            />
            <TextWidget style={{fontSize: 16, fontWeight: '500'}}
              text={`${insertComma(money_total_expense)}`}
            />
          </FlexWidget>
        )}
      </FlexWidget>
    </FlexWidget>
  );
};

// -------------------------------------------------------------------------------------------------
const SleepSection = ({ sleep }: SleepProps) => {

  const sleep_bedTime
    = sleep.sleep_bedTime === "x" ? "x" : sleep.sleep_bedTime;

  const sleep_wakeTime
    = sleep.sleep_wakeTime === "x" ? "x" : sleep.sleep_wakeTime;

  const sleep_sleepTime
    = sleep.sleep_sleepTime === "x" ? "x" : sleep.sleep_sleepTime;

  return (
    <FlexWidget
      style={{
        width: 'match_parent',
        height: 'match_parent',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
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
          padding: 5,
          marginBottom: 20,
        }}
      >
        <ImageWidget
          image={require('../assets/images/sleep2.webp')}
          imageWidth={20}
          imageHeight={20}
        />
        <FlexWidget style={{width: 60, marginLeft: 10}}>
          <TextWidget style={{fontSize: 16, fontWeight: '500'}}
            text={`취침`}
          />
        </FlexWidget>
        <FlexWidget style={{width: 10}}>
          <TextWidget style={{fontSize: 16}}
            text={`:`}
          />
        </FlexWidget>
        {sleep_bedTime === "x" ? (
          <FlexWidget style={{width: 80, marginLeft: 20, flexDirection: 'row'}}>
            <TextWidget style={{fontSize: 16, fontWeight: '500'}}
              text={`${sleep_bedTime}`}
            />
          </FlexWidget>
        ) : (
          <FlexWidget style={{width: 80, marginLeft: 20, flexDirection: 'row'}}>
            <TextWidget style={{fontSize: 16, fontWeight: '500'}}
              text={`${sleep_bedTime}`}
            />
            <TextWidget style={{fontSize: 10, marginLeft: 10}}
              text={"h:m"}
            />
          </FlexWidget>
        )}
      </FlexWidget>
      {/* sleep 2 */}
      <FlexWidget
        style={{
          width: 'wrap_content',
          height: 'wrap_content',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: "center",
          padding: 5,
          marginBottom: 20,
        }}
      >
        <ImageWidget
          image={require('../assets/images/sleep3.webp')}
          imageWidth={20}
          imageHeight={20}
        />
        <FlexWidget style={{width: 60, marginLeft: 10}}>
          <TextWidget style={{fontSize: 16, fontWeight: '500'}}
            text={`기상`}
          />
        </FlexWidget>
        <FlexWidget style={{width: 10}}>
          <TextWidget style={{fontSize: 16}}
            text={`:`}
          />
        </FlexWidget>
        {sleep_wakeTime === "x" ? (
          <FlexWidget style={{width: 80, marginLeft: 20, flexDirection: 'row'}}>
            <TextWidget style={{fontSize: 16, fontWeight: '500'}}
              text={`${sleep_wakeTime}`}
            />
          </FlexWidget>
        ) : (
          <FlexWidget style={{width: 80, marginLeft: 20, flexDirection: 'row'}}>
            <TextWidget style={{fontSize: 16, fontWeight: '500'}}
              text={`${sleep_wakeTime}`}
            />
            <TextWidget style={{fontSize: 10, marginLeft: 10}}
              text={"h:m"}
            />
          </FlexWidget>
        )}
      </FlexWidget>
      {/* sleep 3 */}
      <FlexWidget
        style={{
          width: 'wrap_content',
          height: 'wrap_content',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: "center",
          padding: 5,
          marginBottom: 0,
        }}
      >
        <ImageWidget
          image={require('../assets/images/sleep4.webp')}
          imageWidth={20}
          imageHeight={20}
        />
        <FlexWidget style={{width: 60, marginLeft: 10}}>
          <TextWidget style={{fontSize: 16, fontWeight: '500'}}
            text={`수면`}
          />
        </FlexWidget>
        <FlexWidget style={{width: 10}}>
          <TextWidget style={{fontSize: 16}}
            text={`:`}
          />
        </FlexWidget>
        {sleep_sleepTime === "x" ? (
          <FlexWidget style={{width: 80, marginLeft: 20, flexDirection: 'row'}}>
            <TextWidget style={{fontSize: 16, fontWeight: '500'}}
              text={`${sleep_sleepTime}`}
            />
          </FlexWidget>
        ) : (
          <FlexWidget style={{width: 80, marginLeft: 20, flexDirection: 'row'}}>
            <TextWidget style={{fontSize: 16, fontWeight: '500'}}
              text={`${sleep_sleepTime}`}
            />
            <TextWidget style={{fontSize: 10, marginLeft: 10}}
              text={"h:m"}
            />
          </FlexWidget>
        )}
      </FlexWidget>
    </FlexWidget>
  );
};

// -------------------------------------------------------------------------------------------------
export const DetailWidget = (
  { activeView, currentDate, currentDay, currentTime, exercise, food, money, sleep } : ActiveViewProps & ExerciseProps & FoodProps & MoneyProps & SleepProps
) => {

  const active = activeView || "exercise";

  return (
    <FlexWidget
      style={{
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        height: 'match_parent',
        width: 'match_parent',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#000',
      }}
    >
      <FlexWidget
        style={{
          width: "wrap_content",
          height: 'match_parent',
          flexDirection: 'column',
          borderRightWidth: 1,
          borderRightColor: "#5e5e5e",
          padding: 12,
        }}
      >
        <SelectSection
          key={activeView}
          iconName={"exercise"}
          isActive={active === "exercise"}
        />
        <SelectSection
          key={activeView}
          iconName={"food"}
          isActive={active === "food"}
        />
        <SelectSection
          key={activeView}
          iconName={"money"}
          isActive={active === "money"}
        />
        <SelectSection
          key={activeView}
          iconName={"sleep"}
          isActive={active === "sleep"}
        />
      </FlexWidget>
      <FlexWidget
        style={{
          flex: 1,
          padding: 12,
          width: 'wrap_content',
          height: 'match_parent',
          flexDirection: 'column',
        }}
      >
        <FlexWidget
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            width: 'match_parent',
            height: 'wrap_content',
            padding: 10,
            borderBottomWidth: 1,
            borderBottomColor: '#c0c0c0',
          }}
        >
          <ImageWidget
            image={require('../assets/images/search.webp')}
            imageWidth={20}
            imageHeight={20}
            style={{
              marginRight: 20,
              marginBottom: 3,
            }}
            clickAction={"OPEN_APP"}
          />
          <TextWidget
            style={{
              fontSize: 16,
              color: '#000000',
              fontWeight: '700',
              marginBottom: 5,
              marginRight: 10,
              letterSpacing: 1,
            }}
            text={currentDate}
          />
          <TextWidget
            style={{
              fontSize: 16,
              color: '#5e5e5e',
              fontWeight: '700',
              marginBottom: 5,
              marginRight: 10,
              letterSpacing: 1,
            }}
            text={currentDay}
          />
          <TextWidget
            style={{
              fontSize: 10,
              color: '#000000',
              fontWeight: '500',
              marginBottom: 5,
              marginLeft: 5,
              letterSpacing: 1,
            }}
            text={currentTime}
          />
          <ImageWidget
            image={require('../assets/images/refresh.webp')}
            imageWidth={23}
            imageHeight={23}
            style={{
              marginLeft: 20,
              marginBottom: 3,
            }}
            clickAction={
              active === "exercise" ? "exercise" :
              active === "food" ? "food" :
              active === "money" ? "money" :
              active === "sleep" ? "sleep" : "exercise"
            }
          />
        </FlexWidget>
        {active === "exercise" && <ExerciseSection exercise={exercise} />}
        {active === "food" && <FoodSection food={food} />}
        {active === "money" && <MoneySection money={money} />}
        {active === "sleep" && <SleepSection sleep={sleep} />}
      </FlexWidget>
    </FlexWidget>
  );
};