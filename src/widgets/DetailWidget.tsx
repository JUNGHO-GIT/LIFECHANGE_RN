// Detail.tsx

import {
  FlexWidget, TextWidget, ImageWidget,
} from "@imports/ImportReacts";

// -------------------------------------------------------------------------------------------------
declare interface ActiveProps {
  isActive: boolean;
  iconName: string;
}
// -------------------------------------------------------------------------------------------------
declare interface ActiveViewProps {
  activeView: "exercise" | "food" | "money" | "sleep";
  curDate: string;
  curDay: string;
  curTime: string;
}
// -------------------------------------------------------------------------------------------------
declare interface ExerciseProps {
  exercise: {
    exercise_total_volume: any;
    exercise_total_cardio: any;
    exercise_total_weight: any;
  };
}
// -------------------------------------------------------------------------------------------------
declare interface FoodProps {
  food: {
    food_total_kcal: any;
    food_total_carb:  any;
    food_total_protein: any;
    food_total_fat: any;
  };
}
// -------------------------------------------------------------------------------------------------
declare interface MoneyProps {
  money: {
    money_total_income: any;
    money_total_expense: any;
  };
}
// -------------------------------------------------------------------------------------------------
declare interface SleepProps {
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
const SelectSection = ({isActive, iconName}: ActiveProps) => {
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
const ExerciseSection  = ({ exercise }: ExerciseProps) => {

  const exercise_total_volume
    = exercise.exercise_total_volume === "x" ? "x" : exercise.exercise_total_volume;

  const exercise_total_volume_color
    = (exercise_total_volume === "x" || exercise_total_volume === "0") ? "#9CA3AF" : "#000000";

  const exercise_total_cardio
    = exercise.exercise_total_cardio === "x" ? "x" : exercise.exercise_total_cardio;

  const exercise_total_cardio_color
    = (exercise_total_cardio === "x" || exercise_total_cardio === "00:00") ? "#9CA3AF" : "#000000";

  const exercise_total_weight
    = exercise.exercise_total_weight === "x" ? "x" : exercise.exercise_total_weight;

  const exercise_total_weight_color
    = (exercise_total_weight === "x" || exercise_total_weight === "0") ? "#9CA3AF" : "#000000";

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
        <FlexWidget
          style={{
            width: 60,
            marginLeft: 10
          }}
        >
          <TextWidget
            style={{
              fontSize: 16,
              fontWeight: '500'
            }}
            text={`볼륨`}
          />
        </FlexWidget>
        <FlexWidget style={{width: 10}}>
          <TextWidget style={{fontSize: 16}}
            text={`:`}
          />
        </FlexWidget>
        {exercise_total_volume === "x" ? (
          <FlexWidget
            style={{
              flexDirection: 'row',
              width: 80,
              marginLeft: 20,
            }}
          >
            <TextWidget
              style={{
                fontSize: 16,
                fontWeight: '500',
                color: exercise_total_volume_color,
              }}
              text={`${insertComma(exercise_total_volume)}`}
            />
          </FlexWidget>
        ) : (
          <FlexWidget
            style={{
              flexDirection: 'row',
              width: 80,
              marginLeft: 20,
            }}
          >
            <TextWidget
              style={{
                fontSize: 16,
                fontWeight: '500',
                color: exercise_total_volume_color,
              }}
              text={`${insertComma(exercise_total_volume)}`}
            />
            <TextWidget
              style={{
                fontSize: 10,
                marginLeft: 10,
                color: "#000000"
              }}
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
        <FlexWidget
          style={{
            width: 60,
            marginLeft: 10
          }}
        >
          <TextWidget
            style={{
              fontSize: 16,
              fontWeight: '500'
            }}
            text={`유산소`}
          />
        </FlexWidget>
        <FlexWidget style={{width: 10}}>
          <TextWidget style={{fontSize: 16}}
            text={`:`}
          />
        </FlexWidget>
        {exercise_total_cardio === "x" ? (
          <FlexWidget
            style={{
              flexDirection: 'row',
              width: 80,
              marginLeft: 20,
            }}
          >
            <TextWidget
              style={{
                fontSize: 16,
                fontWeight: '500',
                color: exercise_total_cardio_color,
              }}
              text={`${exercise_total_cardio}`}
            />
          </FlexWidget>
        ) : (
          <FlexWidget
            style={{
              flexDirection: 'row',
              width: 80,
              marginLeft: 20,
            }}
          >
            <TextWidget
            style={{
              fontSize: 16,
              fontWeight: '500',
              color: exercise_total_cardio_color,
            }}
              text={`${exercise_total_cardio}`}
            />
            <TextWidget
              style={{
                fontSize: 10,
                marginLeft: 10,
                color: "#000000"
              }}
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
        <FlexWidget
          style={{
            width: 60,
            marginLeft: 10
          }}
        >
          <TextWidget
            style={{
              fontSize: 16,
              fontWeight: '500'
            }}
            text={`체중`}
          />
        </FlexWidget>
        <FlexWidget style={{width: 10}}>
          <TextWidget style={{fontSize: 16}}
            text={`:`}
          />
        </FlexWidget>
        {exercise_total_weight === "x" ? (
          <FlexWidget
            style={{
              flexDirection: 'row',
              width: 80,
              marginLeft: 20,
            }}
          >
            <TextWidget
              style={{
                fontSize: 16,
                fontWeight: '500',
                color: exercise_total_weight_color,
              }}
              text={`${exercise_total_weight}`}
            />
          </FlexWidget>
        ) : (
          <FlexWidget
            style={{
              flexDirection: 'row',
              width: 80,
              marginLeft: 20,
            }}
          >
            <TextWidget
              style={{
                fontSize: 16,
                fontWeight: '500',
                color: exercise_total_weight_color,
              }}
              text={`${exercise_total_weight}`}
            />
            <TextWidget
              style={{
                fontSize: 10,
                marginLeft: 10,
                color: "#000000"
              }}
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
    = food.food_total_kcal === "x" ? "x" : food.food_total_kcal;

  const food_total_kcal_color
    = (food_total_kcal === "x" || food_total_kcal === "0") ? "#9CA3AF" : "#000000";

  const food_total_carb
    = food.food_total_carb === "x" ? "x" : food.food_total_carb;

  const food_total_carb_color
    = (food_total_carb === "x" || food_total_carb === "0") ? "#9CA3AF" : "#000000";

  const food_total_protein
    = food.food_total_protein === "x" ? "x" : food.food_total_protein;

  const food_total_protein_color
    = (food_total_protein === "x" || food_total_protein === "0") ? "#9CA3AF" : "#000000";

  const food_total_fat
    = food.food_total_fat === "x" ? "x" : food.food_total_fat;

  const food_total_fat_color
    = (food_total_fat === "x" || food_total_fat === "0") ? "#9CA3AF" : "#000000";

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
        <FlexWidget
          style={{
            width: 60,
            marginLeft: 10
          }}
        >
          <TextWidget
            style={{
              fontSize: 16,
              fontWeight: '500'
            }}
            text={`칼로리`}
          />
        </FlexWidget>
        <FlexWidget style={{width: 10}}>
          <TextWidget style={{fontSize: 16}}
            text={`:`}
          />
        </FlexWidget>
        {food_total_kcal === "x" ? (
          <FlexWidget
            style={{
              flexDirection: 'row',
              width: 80,
              marginLeft: 20,
            }}
          >
            <TextWidget
              style={{
                fontSize: 16,
                fontWeight: '500',
                color: food_total_kcal_color,
              }}
              text={`${insertComma(food_total_kcal)}`}
            />
          </FlexWidget>
        ) : (
          <FlexWidget
            style={{
              flexDirection: 'row',
              width: 80,
              marginLeft: 20,
            }}
          >
            <TextWidget
            style={{
              fontSize: 16,
              fontWeight: '500',
              color: food_total_kcal_color,
            }}
              text={`${insertComma(food_total_kcal)}`}
            />
            <TextWidget
              style={{
                fontSize: 10,
                marginLeft: 10,
                color: "#000000"
              }}
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
        <FlexWidget
          style={{
            width: 60,
            marginLeft: 10
          }}
        >
          <TextWidget
            style={{
              fontSize: 16,
              fontWeight: '500'
            }}
            text={`탄수화물`}
          />
        </FlexWidget>
        <FlexWidget style={{width: 10}}>
          <TextWidget style={{fontSize: 16}}
            text={`:`}
          />
        </FlexWidget>
        {food_total_carb === "x" ? (
          <FlexWidget
            style={{
              flexDirection: 'row',
              width: 80,
              marginLeft: 20,
            }}
          >
            <TextWidget
              style={{
                fontSize: 16,
                fontWeight: '500',
                color: food_total_carb_color,
              }}
              text={`${insertComma(food_total_carb)}`}
            />
          </FlexWidget>
        ) : (
          <FlexWidget
            style={{
              flexDirection: 'row',
              width: 80,
              marginLeft: 20,
            }}
          >
            <TextWidget
            style={{
              fontSize: 16,
              fontWeight: '500',
              color: food_total_carb_color,
            }}
              text={`${insertComma(food_total_carb)}`}
            />
            <TextWidget
              style={{
                fontSize: 10,
                marginLeft: 10,
                color: "#000000"
              }}
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
        <FlexWidget
          style={{
            width: 60,
            marginLeft: 10
          }}
        >
          <TextWidget
            style={{
              fontSize: 16,
              fontWeight: '500'
            }}
            text={`단백질`}
          />
        </FlexWidget>
        <FlexWidget style={{width: 10}}>
          <TextWidget style={{fontSize: 16}}
            text={`:`}
          />
        </FlexWidget>
        {food_total_protein === "x" ? (
          <FlexWidget
            style={{
              flexDirection: 'row',
              width: 80,
              marginLeft: 20,
            }}
          >
            <TextWidget
              style={{
                fontSize: 16,
                fontWeight: '500',
                color: food_total_protein_color,
              }}
              text={`${insertComma(food_total_protein)}`}
            />
          </FlexWidget>
        ) : (
          <FlexWidget
            style={{
              flexDirection: 'row',
              width: 80,
              marginLeft: 20,
            }}
          >
            <TextWidget
            style={{
              fontSize: 16,
              fontWeight: '500',
              color: food_total_protein_color,
            }}
              text={`${insertComma(food_total_protein)}`}
            />
            <TextWidget
              style={{
                fontSize: 10,
                marginLeft: 10,
                color: "#000000"
              }}
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
        <FlexWidget
          style={{
            width: 60,
            marginLeft: 10
          }}
        >
          <TextWidget
            style={{
              fontSize: 16,
              fontWeight: '500'
            }}
            text={`지방`}
          />
        </FlexWidget>
        <FlexWidget style={{width: 10}}>
          <TextWidget style={{fontSize: 16}}
            text={`:`}
          />
        </FlexWidget>
        {food_total_fat === "x" ? (
          <FlexWidget
            style={{
              flexDirection: 'row',
              width: 80,
              marginLeft: 20,
            }}
          >
            <TextWidget
              style={{
                fontSize: 16,
                fontWeight: '500',
                color: food_total_fat_color,
              }}
              text={`${insertComma(food_total_fat)}`}
            />
          </FlexWidget>
        ) : (
          <FlexWidget
            style={{
              flexDirection: 'row',
              width: 80,
              marginLeft: 20,
            }}
          >
            <TextWidget
            style={{
              fontSize: 16,
              fontWeight: '500',
              color: food_total_fat_color,
            }}
              text={`${insertComma(food_total_fat)}`}
            />
            <TextWidget
              style={{
                fontSize: 10,
                marginLeft: 10,
                color: "#000000"
              }}
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
    = money.money_total_income === "x" ? "x" : money.money_total_income;

  const money_total_income_color
    = (money_total_income === "x" || money_total_income === "0") ? "#9CA3AF" : "#000000";

  const money_total_expense
    = money.money_total_expense === "x" ? "x" : money.money_total_expense;

  const money_total_expense_color
    = (money_total_expense === "x" || money_total_expense === "0") ? "#9CA3AF" : "#000000";

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
        <FlexWidget
          style={{
            width: 60,
            marginLeft: 10
          }}
        >
          <TextWidget
            style={{
              fontSize: 16,
              fontWeight: '500'
            }}
            text={`수입`}
          />
        </FlexWidget>
        <FlexWidget style={{width: 10}}>
          <TextWidget style={{fontSize: 16}}
            text={`:`}
          />
        </FlexWidget>
        {money_total_income === "x" ? (
          <FlexWidget
            style={{
              flexDirection: 'row',
              width: 80,
              marginLeft: 20,
            }}
          >
            <TextWidget
              style={{
                fontSize: 16,
                fontWeight: '500',
                color: money_total_income_color,
              }}
              text={`${insertComma(money_total_income)}`}
            />
          </FlexWidget>
        ) : (
          <FlexWidget
            style={{
              flexDirection: 'row',
              width: 80,
              marginLeft: 20,
            }}
          >
            <TextWidget
              style={{
                fontSize: 16,
                fontWeight: '500',
                color: money_total_income_color,
              }}
              text={`${insertComma(money_total_income)}`}
            />
            <TextWidget
              style={{
                fontSize: 10,
                marginLeft: 10,
                color: "#000000"
              }}
              text={"₩"}
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
        <FlexWidget
          style={{
            width: 60,
            marginLeft: 10
          }}
        >
          <TextWidget
            style={{
              fontSize: 16,
              fontWeight: '500'
            }}
            text={`지출`}
          />
        </FlexWidget>
        <FlexWidget style={{width: 10}}>
          <TextWidget style={{fontSize: 16}}
            text={`:`}
          />
        </FlexWidget>
        {money_total_expense === "x" ? (
          <FlexWidget
            style={{
              flexDirection: 'row',
              width: 80,
              marginLeft: 20,
            }}
          >
            <TextWidget
              style={{
                fontSize: 16,
                fontWeight: '500',
                color: money_total_expense_color,
              }}
              text={`${insertComma(money_total_expense)}`}
            />
          </FlexWidget>
        ) : (
          <FlexWidget
            style={{
              flexDirection: 'row',
              width: 80,
              marginLeft: 20,
            }}
          >
            <TextWidget
              style={{
                fontSize: 16,
                fontWeight: '500',
                color: money_total_expense_color,
              }}
              text={`${insertComma(money_total_expense)}`}
            />
            <TextWidget
              style={{
                fontSize: 10,
                marginLeft: 10,
                color: "#000000"
              }}
              text={"₩"}
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

  const sleep_bedTime_color
    = (sleep_bedTime === "x" || sleep_bedTime === "00:00") ? "#9CA3AF" : "#000000";

  const sleep_wakeTime
    = sleep.sleep_wakeTime === "x" ? "x" : sleep.sleep_wakeTime;

  const sleep_wakeTime_color
    = (sleep_wakeTime === "x" || sleep_wakeTime === "00:00") ? "#9CA3AF" : "#000000";

  const sleep_sleepTime
    = sleep.sleep_sleepTime === "x" ? "x" : sleep.sleep_sleepTime;

  const sleep_sleepTime_color
    = (sleep_sleepTime === "x" || sleep_sleepTime === "00:00") ? "#9CA3AF" : "#000000";

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
        <FlexWidget
          style={{
            width: 60,
            marginLeft: 10
          }}
        >
          <TextWidget
            style={{
              fontSize: 16,
              fontWeight: '500'
            }}
            text={`취침`}
          />
        </FlexWidget>
        <FlexWidget style={{width: 10}}>
          <TextWidget style={{fontSize: 16}}
            text={`:`}
          />
        </FlexWidget>
        {sleep_bedTime === "x" ? (
          <FlexWidget
            style={{
              flexDirection: 'row',
              width: 80,
              marginLeft: 20,
            }}
          >
            <TextWidget
              style={{
                fontSize: 16,
                fontWeight: '500',
                color: sleep_bedTime_color,
              }}
              text={`${sleep_bedTime}`}
            />
          </FlexWidget>
        ) : (
          <FlexWidget
            style={{
              flexDirection: 'row',
              width: 80,
              marginLeft: 20,
            }}
          >
            <TextWidget
            style={{
              fontSize: 16,
              fontWeight: '500',
              color: sleep_bedTime_color,
            }}
              text={`${sleep_bedTime}`}
            />
            <TextWidget
              style={{
                fontSize: 10,
                marginLeft: 10,
                color: "#000000"
              }}
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
        <FlexWidget
          style={{
            width: 60,
            marginLeft: 10
          }}
        >
          <TextWidget
            style={{
              fontSize: 16,
              fontWeight: '500'
            }}
            text={`기상`}
          />
        </FlexWidget>
        <FlexWidget style={{width: 10}}>
          <TextWidget style={{fontSize: 16}}
            text={`:`}
          />
        </FlexWidget>
        {sleep_wakeTime === "x" ? (
          <FlexWidget
            style={{
              flexDirection: 'row',
              width: 80,
              marginLeft: 20,
            }}
          >
            <TextWidget
              style={{
                fontSize: 16,
                fontWeight: '500',
                color: sleep_wakeTime_color,
              }}
              text={`${sleep_wakeTime}`}
            />
          </FlexWidget>
        ) : (
          <FlexWidget
            style={{
              flexDirection: 'row',
              width: 80,
              marginLeft: 20,
            }}
          >
            <TextWidget
              style={{
                fontSize: 16,
                fontWeight: '500',
                color: sleep_wakeTime_color,
              }}
              text={`${sleep_wakeTime}`}
            />
            <TextWidget
              style={{
                fontSize: 10,
                marginLeft: 10,
                color: "#000000"
              }}
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
        <FlexWidget
          style={{
            width: 60,
            marginLeft: 10
          }}
        >
          <TextWidget
            style={{
              fontSize: 16,
              fontWeight: '500'
            }}
            text={`수면`}
          />
        </FlexWidget>
        <FlexWidget style={{width: 10}}>
          <TextWidget style={{fontSize: 16}}
            text={`:`}
          />
        </FlexWidget>
        {sleep_sleepTime === "x" ? (
          <FlexWidget
            style={{
              flexDirection: 'row',
              width: 80,
              marginLeft: 20,
            }}
          >
            <TextWidget
              style={{
                fontSize: 16,
                fontWeight: '500',
                color: sleep_sleepTime_color,
              }}
              text={`${sleep_sleepTime}`}
            />
          </FlexWidget>
        ) : (
          <FlexWidget
            style={{
              flexDirection: 'row',
              width: 80,
              marginLeft: 20,
            }}
          >
            <TextWidget
              style={{
                fontSize: 16,
                fontWeight: '500',
                color: sleep_sleepTime_color,
              }}
              text={`${sleep_sleepTime}`}
            />
            <TextWidget
              style={{
                fontSize: 10,
                marginLeft: 10,
                color: "#000000"
              }}
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
  { activeView, curDate, curDay, curTime, exercise, food, money, sleep } : ActiveViewProps & ExerciseProps & FoodProps & MoneyProps & SleepProps
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
            text={curDate}
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
            text={curDay}
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
            text={curTime}
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