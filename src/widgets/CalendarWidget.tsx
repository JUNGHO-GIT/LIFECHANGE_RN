// Calendar.tsx

import {
  FlexWidget, TextWidget, ImageWidget,
} from "@imports/ImportReacts";

// -------------------------------------------------------------------------------------------------
declare type CalendarProps = {
  activeView: "exercise";
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
            fontSize: 14,
            fontWeight: '500',
            marginRight: 10,
            color: "#000000"
          }}
          text={`${exercise_total_volume_text} : `}
        />
        <TextWidget
          style={{
            fontSize: 16,
            fontWeight: '500',
            marginRight: 10,
            color: exercise_total_volume_color,
          }}
          text={`${insertComma(exercise_total_volume_value)}`}
        />
        <TextWidget
          style={{
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
            fontSize: 14,
            fontWeight: '500',
            marginRight: 10,
            color: "#000000"
          }}
          text={`${exercise_total_cardio_text} : `}
        />
        <TextWidget
          style={{
            fontSize: 16,
            fontWeight: '500',
            marginRight: 10,
            color: exercise_total_cardio_color,
          }}
          text={`${insertComma(exercise_total_cardio_value)}`}
        />
        <TextWidget
          style={{
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
            fontSize: 14,
            fontWeight: '500',
            marginRight: 10,
            color: "#000000"
          }}
          text={`${exercise_total_weight_text} : `}
        />
        <TextWidget
          style={{
            fontSize: 16,
            fontWeight: '500',
            marginRight: 10,
            color: exercise_total_weight_color,
          }}
          text={`${insertComma(exercise_total_weight_value)}`}
        />
        <TextWidget
          style={{
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
export const CalendarWidget = (
  {
    activeView,
    clientLanguage,
    clientDate,
    clientDay,
    clientTime,
    exercise,
  }: CalendarProps & ExerciseProps
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
              fontSize: 16,
              color: '#000000',
              fontWeight: '700',
              marginRight: 10,
              letterSpacing: 1,
            }}
            text={clientDate}
          />
          <TextWidget
            style={{
              fontSize: 14,
              color: '#5e5e5e',
              fontWeight: '600',
              marginRight: 10,
              letterSpacing: 1,
            }}
            text={clientDay}
          />
          <TextWidget
            style={{
              fontSize: 10,
              color: '#000000',
              fontWeight: '500',
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
              active === "exercise" ? "exercise" : "exercise"
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
        </FlexWidget>
      </FlexWidget>
    </FlexWidget>
  );
};