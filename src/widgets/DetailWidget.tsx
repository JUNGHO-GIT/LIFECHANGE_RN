// Detail.tsx

import type { ColorProp } from "@exports/ExportReacts";
import { FlexWidget, SvgWidget, TextWidget } from "@exports/ExportReacts";

// -------------------------------------------------------------------------------------------------
declare interface DetailWidgetRecordProps {
	activeView: string;
	clientLanguage: string;
	clientCurrency: string;
	clientUnit: string;
	clientDate: string;
	clientTime: string;
	clientDay: string;
}
// -------------------------------------------------------------------------------------------------
declare interface ActiveRecordProps {
	isActive: boolean;
	iconName: string;
}
// -------------------------------------------------------------------------------------------------
declare interface ExerciseRecordProps {
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
declare interface FoodRecordProps {
	widgetHeight: number;
	clientLanguage: string;
	food: {
		food_record_total_kcal: any;
		food_record_total_carb: any;
		food_record_total_protein: any;
		food_record_total_fat: any;
	};
}
// -------------------------------------------------------------------------------------------------
declare interface MoneyRecordProps {
	widgetHeight: number;
	clientLanguage: string;
	clientCurrency: string;
	money: {
		money_record_total_income: any;
		money_record_total_expense: any;
	};
}
// -------------------------------------------------------------------------------------------------
declare interface SleepRecordProps {
	widgetHeight: number;
	clientLanguage: string;
	sleep: {
		sleep_record_bedTime: any;
		sleep_record_wakeTime: any;
		sleep_record_sleepTime: any;
	};
}

// -------------------------------------------------------------------------------------------------
const insertComma = (value: string) => {
	// 'x'인 경우 그대로 반환
	if (value === `x`) {
		return value;
	}

	// 숫자로 변환 가능한지 체크
	let numericValue = Number.parseFloat(value);

	// 변환이 실패하면 그대로 반환
	if (isNaN(numericValue)) {
		return value;
	}

	// 소수점 존재하는 경우 소수점 삭제
	numericValue = Math.floor(numericValue);

	// 3자리마다 콤마 추가하여 반환
	return numericValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, `,`);
};

// -------------------------------------------------------------------------------------------------
const SelectSection = ({ isActive, iconName }: ActiveRecordProps) => {
	let svgLink;
	if (iconName === `exercise`) {
		svgLink = require(`../assets/svg/exercise1.svg`);
	} else if (iconName === `food`) {
		svgLink = require(`../assets/svg/food1.svg`);
	} else if (iconName === `money`) {
		svgLink = require(`../assets/svg/money1.svg`);
	} else if (iconName === `sleep`) {
		svgLink = require(`../assets/svg/sleep1.svg`);
	}
	return (
		<FlexWidget
			style={{
				flex: 1,
				width: 50,
				height: 300,
				flexDirection: `column`,
				alignItems: `center`,
				justifyContent: `center`,
			}}
		>
			<FlexWidget
				clickAction={iconName}
				style={{
					width: 40,
					height: 40,
					alignItems: `center`,
					justifyContent: `center`,
					borderRadius: 12,
					borderWidth: 1,
					borderColor: `#c0c0c0`,
					backgroundColor: isActive ? `#b3e5fc` : `#ffffff`,
				}}
			>
				<SvgWidget
					svg={svgLink}
					style={{
						width: 25,
						height: 25,
					}}
				/>
			</FlexWidget>
		</FlexWidget>
	);
};

// -------------------------------------------------------------------------------------------------
const ExerciseSection = ({
	widgetHeight,
	clientLanguage,
	clientUnit,
	exercise,
}: ExerciseRecordProps) => {
	// 0. height
	const height = (widgetHeight - 100) / 3 > 60 ? 60 : (widgetHeight - 100) / 3;

	// 0. fontSize
	const fontSize = (text: string) => {
		return text.length < 8 ? 16 : 14;
	};

	// 1. volume
	const exerciseTotalVolume = {
		text: clientLanguage === `ko` ? `볼륨` : `Volume`,
		value: [`x`].includes(exercise.exercise_record_total_volume)
			? `x`
			: exercise.exercise_record_total_volume,
		color: [`x`, `0`].includes(exercise.exercise_record_total_volume)
			? `#9CA3AF`
			: `#000000`,
		end: [`x`].includes(exercise.exercise_record_total_volume) ? `` : `vol`,
	};

	// 2. cardio
	const exerciseTotalCardio = {
		text: clientLanguage === `ko` ? `유산소` : `Cardio`,
		value: [`x`].includes(exercise.exercise_record_total_cardio)
			? `x`
			: exercise.exercise_record_total_cardio,
		color: [`x`, `00:00`].includes(exercise.exercise_record_total_cardio)
			? `#9CA3AF`
			: `#000000`,
		end: [`x`].includes(exercise.exercise_record_total_cardio) ? `` : `h:m`,
	};

	// 3. scale
	const exerciseTotalScale = {
		text: clientLanguage === `ko` ? `체중` : `BodyWeight`,
		value: [`x`].includes(exercise.exercise_record_total_scale)
			? `x`
			: exercise.exercise_record_total_scale,
		color: [`x`, `0`].includes(exercise.exercise_record_total_scale)
			? `#9CA3AF`
			: `#000000`,
		end: [`x`].includes(exercise.exercise_record_total_scale) ? `` : clientUnit,
	};

	return (
		<FlexWidget
			style={{
				width: `match_parent`,
				height: `match_parent`,
				flexDirection: `column`,
				justifyContent: `center`,
				alignItems: `flex-start`,
			}}
		>
			{/* exercise 1 */}
			<FlexWidget
				style={{
					width: `wrap_content`,
					height: height,
					flexDirection: `row`,
					justifyContent: `center`,
					alignItems: `center`,
				}}
			>
				<SvgWidget
					svg={require(`../assets/svg/exercise3.svg`)}
					style={{
						width: 20,
						height: 20,
						marginRight: 10,
					}}
				/>
				<TextWidget
					style={{
						textAlign: `center`,
						fontSize: fontSize(exerciseTotalVolume.text),
						fontWeight: `500`,
						marginRight: 10,
						color: `#000000`,
					}}
					text={`${exerciseTotalVolume.text} : `}
				/>
				<TextWidget
					style={{
						textAlign: `center`,
						fontSize: 16,
						fontWeight: `500`,
						marginRight: 10,
						color: exerciseTotalVolume.color as ColorProp,
					}}
					text={insertComma(exerciseTotalVolume.value)}
				/>
				<TextWidget
					style={{
						textAlign: `center`,
						fontSize: 8,
						fontWeight: `400`,
						marginRight: 0,
						color: `#434343`,
					}}
					text={exerciseTotalVolume.end}
				/>
			</FlexWidget>
			{/* exercise 2 */}
			<FlexWidget
				style={{
					width: `wrap_content`,
					height: height,
					flexDirection: `row`,
					justifyContent: `center`,
					alignItems: `center`,
				}}
			>
				<SvgWidget
					svg={require(`../assets/svg/exercise4.svg`)}
					style={{
						width: 20,
						height: 20,
						marginRight: 10,
					}}
				/>
				<TextWidget
					style={{
						textAlign: `center`,
						fontSize: fontSize(exerciseTotalCardio.text),
						fontWeight: `500`,
						marginRight: 10,
						color: `#000000`,
					}}
					text={`${exerciseTotalCardio.text} : `}
				/>
				<TextWidget
					style={{
						textAlign: `center`,
						fontSize: 16,
						fontWeight: `500`,
						marginRight: 10,
						color: exerciseTotalCardio.color as ColorProp,
					}}
					text={`${exerciseTotalCardio.value}`}
				/>
				<TextWidget
					style={{
						textAlign: `center`,
						fontSize: 8,
						fontWeight: `400`,
						marginRight: 0,
						color: `#434343`,
					}}
					text={exerciseTotalCardio.end}
				/>
			</FlexWidget>
			{/* exercise 3 */}
			<FlexWidget
				style={{
					width: `wrap_content`,
					height: height,
					flexDirection: `row`,
					justifyContent: `center`,
					alignItems: `center`,
				}}
			>
				<SvgWidget
					svg={require(`../assets/svg/exercise5.svg`)}
					style={{
						width: 20,
						height: 20,
						marginRight: 10,
					}}
				/>
				<TextWidget
					style={{
						textAlign: `center`,
						fontSize: fontSize(exerciseTotalScale.text),
						fontWeight: `500`,
						marginRight: 10,
						color: `#000000`,
					}}
					text={`${exerciseTotalScale.text} : `}
				/>
				<TextWidget
					style={{
						textAlign: `center`,
						fontSize: 16,
						fontWeight: `500`,
						marginRight: 10,
						color: exerciseTotalScale.color as ColorProp,
					}}
					text={insertComma(exerciseTotalScale.value)}
				/>
				<TextWidget
					style={{
						textAlign: `center`,
						fontSize: 8,
						fontWeight: `400`,
						marginRight: 0,
						color: `#434343`,
					}}
					text={exerciseTotalScale.end}
				/>
			</FlexWidget>
		</FlexWidget>
	);
};

// -------------------------------------------------------------------------------------------------
const FoodSection = ({
	widgetHeight,
	clientLanguage,
	food,
}: FoodRecordProps) => {
	// 0. height
	const height = (widgetHeight - 100) / 4 > 60 ? 60 : (widgetHeight - 100) / 4;

	// 0. fontSize
	const fontSize = (text: string) => {
		return text.length < 8 ? 16 : 14;
	};

	// 1. kcal
	const foodTotalKcal = {
		text: clientLanguage === `ko` ? `칼로리` : `Kcal`,
		value: [`x`].includes(food.food_record_total_kcal)
			? `x`
			: food.food_record_total_kcal,
		color: [`x`, `0`].includes(food.food_record_total_kcal)
			? `#9CA3AF`
			: `#000000`,
		end: [`x`].includes(food.food_record_total_kcal) ? `` : `kcal`,
	};

	// 2. carb
	const foodTotalCarb = {
		text: clientLanguage === `ko` ? `탄수화물` : `Carb`,
		value: [`x`].includes(food.food_record_total_carb)
			? `x`
			: food.food_record_total_carb,
		color: [`x`, `0`].includes(food.food_record_total_carb)
			? `#9CA3AF`
			: `#000000`,
		end: [`x`].includes(food.food_record_total_carb) ? `` : `g`,
	};

	// 3. protein
	const foodTotalProtein = {
		text: clientLanguage === `ko` ? `단백질` : `Protein`,
		value: [`x`].includes(food.food_record_total_protein)
			? `x`
			: food.food_record_total_protein,
		color: [`x`, `0`].includes(food.food_record_total_protein)
			? `#9CA3AF`
			: `#000000`,
		end: [`x`].includes(food.food_record_total_protein) ? `` : `g`,
	};

	// 4. fat
	const foodTotalFat = {
		text: clientLanguage === `ko` ? `지방` : `Fat`,
		value: [`x`].includes(food.food_record_total_fat)
			? `x`
			: food.food_record_total_fat,
		color: [`x`, `0`].includes(food.food_record_total_fat)
			? `#9CA3AF`
			: `#000000`,
		end: [`x`].includes(food.food_record_total_fat) ? `` : `g`,
	};

	return (
		<FlexWidget
			style={{
				width: `match_parent`,
				height: `match_parent`,
				flexDirection: `column`,
				justifyContent: `center`,
				alignItems: `flex-start`,
			}}
		>
			{/* food 1 */}
			<FlexWidget
				style={{
					width: `wrap_content`,
					height: height,
					flexDirection: `row`,
					justifyContent: `center`,
					alignItems: `center`,
				}}
			>
				<SvgWidget
					svg={require(`../assets/svg/food2.svg`)}
					style={{
						width: 20,
						height: 20,
						marginRight: 10,
					}}
				/>
				<TextWidget
					style={{
						textAlign: `center`,
						fontSize: fontSize(foodTotalKcal.text),
						fontWeight: `500`,
						marginRight: 10,
						color: `#000000`,
					}}
					text={`${foodTotalKcal.text} : `}
				/>
				<TextWidget
					style={{
						textAlign: `center`,
						fontSize: 16,
						fontWeight: `500`,
						marginRight: 10,
						color: foodTotalKcal.color as ColorProp,
					}}
					text={insertComma(foodTotalKcal.value)}
				/>
				<TextWidget
					style={{
						textAlign: `center`,
						fontSize: 8,
						fontWeight: `400`,
						marginRight: 0,
						color: `#434343`,
					}}
					text={foodTotalKcal.end}
				/>
			</FlexWidget>
			{/* food 2 */}
			<FlexWidget
				style={{
					width: `wrap_content`,
					height: height,
					flexDirection: `row`,
					justifyContent: `center`,
					alignItems: `center`,
				}}
			>
				<SvgWidget
					svg={require(`../assets/svg/food3.svg`)}
					style={{
						width: 20,
						height: 20,
						marginRight: 10,
					}}
				/>
				<TextWidget
					style={{
						textAlign: `center`,
						fontSize: fontSize(foodTotalCarb.text),
						fontWeight: `500`,
						marginRight: 10,
						color: `#000000`,
					}}
					text={`${foodTotalCarb.text} : `}
				/>
				<TextWidget
					style={{
						textAlign: `center`,
						fontSize: 16,
						fontWeight: `500`,
						marginRight: 10,
						color: foodTotalCarb.color as ColorProp,
					}}
					text={insertComma(foodTotalCarb.value)}
				/>
				<TextWidget
					style={{
						textAlign: `center`,
						fontSize: 8,
						fontWeight: `400`,
						marginRight: 0,
						color: `#434343`,
					}}
					text={foodTotalCarb.end}
				/>
			</FlexWidget>
			{/* food 3 */}
			<FlexWidget
				style={{
					width: `wrap_content`,
					height: height,
					flexDirection: `row`,
					justifyContent: `center`,
					alignItems: `center`,
				}}
			>
				<SvgWidget
					svg={require(`../assets/svg/food4.svg`)}
					style={{
						width: 20,
						height: 20,
						marginRight: 10,
					}}
				/>
				<TextWidget
					style={{
						textAlign: `center`,
						fontSize: fontSize(foodTotalProtein.text),
						fontWeight: `500`,
						marginRight: 10,
						color: `#000000`,
					}}
					text={`${foodTotalProtein.text} : `}
				/>
				<TextWidget
					style={{
						textAlign: `center`,
						fontSize: 16,
						fontWeight: `500`,
						marginRight: 10,
						color: foodTotalProtein.color as ColorProp,
					}}
					text={insertComma(foodTotalProtein.value)}
				/>
				<TextWidget
					style={{
						textAlign: `center`,
						fontSize: 8,
						fontWeight: `400`,
						marginRight: 0,
						color: `#434343`,
					}}
					text={foodTotalProtein.end}
				/>
			</FlexWidget>
			{/* food 4 */}
			<FlexWidget
				style={{
					width: `wrap_content`,
					height: height,
					flexDirection: `row`,
					justifyContent: `center`,
					alignItems: `center`,
				}}
			>
				<SvgWidget
					svg={require(`../assets/svg/food5.svg`)}
					style={{
						width: 20,
						height: 20,
						marginRight: 10,
					}}
				/>
				<TextWidget
					style={{
						textAlign: `center`,
						fontSize: fontSize(foodTotalFat.text),
						fontWeight: `500`,
						marginRight: 10,
						color: `#000000`,
					}}
					text={`${foodTotalFat.text} : `}
				/>
				<TextWidget
					style={{
						textAlign: `center`,
						fontSize: 16,
						fontWeight: `500`,
						marginRight: 10,
						color: foodTotalFat.color as ColorProp,
					}}
					text={insertComma(foodTotalFat.value)}
				/>
				<TextWidget
					style={{
						textAlign: `center`,
						fontSize: 8,
						fontWeight: `400`,
						marginRight: 0,
						color: `#434343`,
					}}
					text={foodTotalFat.end}
				/>
			</FlexWidget>
		</FlexWidget>
	);
};

// -------------------------------------------------------------------------------------------------
const MoneySection = ({
	widgetHeight,
	clientLanguage,
	clientCurrency,
	money,
}: MoneyRecordProps) => {
	// 0. height
	const height = (widgetHeight - 100) / 2 > 60 ? 60 : (widgetHeight - 100) / 2;

	// 0. fontSize
	const fontSize = (text: string) => {
		return text.length < 8 ? 16 : 14;
	};

	// 1. income
	const moneyTotalIncome = {
		text: clientLanguage === `ko` ? `수입` : `Income`,
		value: [`x`].includes(money.money_record_total_income)
			? `x`
			: money.money_record_total_income,
		color: [`x`, `0`].includes(money.money_record_total_income)
			? `#9CA3AF`
			: `#000000`,
		end: [`x`].includes(money.money_record_total_income) ? `` : clientCurrency,
	};

	// 2. expense
	const moneyTotalExpense = {
		text: clientLanguage === `ko` ? `지출` : `Expense`,
		value: [`x`].includes(money.money_record_total_expense)
			? `x`
			: money.money_record_total_expense,
		color: [`x`, `0`].includes(money.money_record_total_expense)
			? `#9CA3AF`
			: `#000000`,
		end: [`x`].includes(money.money_record_total_expense) ? `` : clientCurrency,
	};

	return (
		<FlexWidget
			style={{
				width: `match_parent`,
				height: `match_parent`,
				flexDirection: `column`,
				justifyContent: `center`,
				alignItems: `flex-start`,
			}}
		>
			{/* money 1 */}
			<FlexWidget
				style={{
					width: `wrap_content`,
					height: height,
					flexDirection: `row`,
					justifyContent: `center`,
					alignItems: `center`,
				}}
			>
				<SvgWidget
					svg={require(`../assets/svg/money2.svg`)}
					style={{
						width: 20,
						height: 20,
						marginRight: 10,
					}}
				/>
				<TextWidget
					style={{
						textAlign: `center`,
						fontSize: fontSize(moneyTotalIncome.text),
						fontWeight: `500`,
						marginRight: 10,
						color: `#000000`,
					}}
					text={`${moneyTotalIncome.text} : `}
				/>
				<TextWidget
					style={{
						textAlign: `center`,
						fontSize: 16,
						fontWeight: `500`,
						marginRight: 10,
						color: moneyTotalIncome.color as ColorProp,
					}}
					text={insertComma(moneyTotalIncome.value)}
				/>
				<TextWidget
					style={{
						textAlign: `center`,
						fontSize: 8,
						fontWeight: `400`,
						marginRight: 0,
						color: `#434343`,
					}}
					text={moneyTotalIncome.end}
				/>
			</FlexWidget>
			{/* money 2 */}
			<FlexWidget
				style={{
					width: `wrap_content`,
					height: height,
					flexDirection: `row`,
					justifyContent: `center`,
					alignItems: `center`,
				}}
			>
				<SvgWidget
					svg={require(`../assets/svg/money2.svg`)}
					style={{
						width: 20,
						height: 20,
						marginRight: 10,
					}}
				/>
				<TextWidget
					style={{
						textAlign: `center`,
						fontSize: fontSize(moneyTotalExpense.text),
						fontWeight: `500`,
						marginRight: 10,
						color: `#000000`,
					}}
					text={`${moneyTotalExpense.text} : `}
				/>
				<TextWidget
					style={{
						textAlign: `center`,
						fontSize: 16,
						fontWeight: `500`,
						marginRight: 10,
						color: moneyTotalExpense.color as ColorProp,
					}}
					text={insertComma(moneyTotalExpense.value)}
				/>
				<TextWidget
					style={{
						textAlign: `center`,
						fontSize: 8,
						fontWeight: `400`,
						marginRight: 0,
						color: `#434343`,
					}}
					text={moneyTotalExpense.end}
				/>
			</FlexWidget>
		</FlexWidget>
	);
};

// -------------------------------------------------------------------------------------------------
const SleepSection = ({
	widgetHeight,
	clientLanguage,
	sleep,
}: SleepRecordProps) => {
	// 0. height
	const height = (widgetHeight - 100) / 3 > 60 ? 60 : (widgetHeight - 100) / 3;

	// 0. fontSize
	const fontSize = (text: string) => {
		return text.length < 8 ? 16 : 14;
	};

	// 1. bedTime
	const sleepBedTime = {
		text: clientLanguage === `ko` ? `취침` : `Bed`,
		value: [`x`].includes(sleep.sleep_record_bedTime)
			? `x`
			: sleep.sleep_record_bedTime,
		color: [`x`, `00:00`].includes(sleep.sleep_record_bedTime)
			? `#9CA3AF`
			: `#000000`,
		end: [`x`].includes(sleep.sleep_record_bedTime) ? `` : `h:m`,
	};

	// 2. wakeTime
	const sleepWakeTime = {
		text: clientLanguage === `ko` ? `기상` : `Wake`,
		value: [`x`].includes(sleep.sleep_record_wakeTime)
			? `x`
			: sleep.sleep_record_wakeTime,
		color: [`x`, `00:00`].includes(sleep.sleep_record_wakeTime)
			? `#9CA3AF`
			: `#000000`,
		end: [`x`].includes(sleep.sleep_record_wakeTime) ? `` : `h:m`,
	};

	// 3. sleepTime
	const sleepDuration = {
		text: clientLanguage === `ko` ? `수면` : `Sleep`,
		value: [`x`].includes(sleep.sleep_record_sleepTime)
			? `x`
			: sleep.sleep_record_sleepTime,
		color: [`x`, `00:00`].includes(sleep.sleep_record_sleepTime)
			? `#9CA3AF`
			: `#000000`,
		end: [`x`].includes(sleep.sleep_record_sleepTime) ? `` : `h:m`,
	};

	return (
		<FlexWidget
			style={{
				width: `match_parent`,
				height: `match_parent`,
				flexDirection: `column`,
				justifyContent: `center`,
				alignItems: `flex-start`,
			}}
		>
			{/* sleep 1 */}
			<FlexWidget
				style={{
					width: `wrap_content`,
					height: height,
					flexDirection: `row`,
					justifyContent: `center`,
					alignItems: `center`,
				}}
			>
				<SvgWidget
					svg={require(`../assets/svg/sleep2.svg`)}
					style={{
						width: 20,
						height: 20,
						marginRight: 10,
					}}
				/>
				<TextWidget
					style={{
						textAlign: `center`,
						fontSize: fontSize(sleepBedTime.text),
						fontWeight: `500`,
						marginRight: 10,
						color: `#000000`,
					}}
					text={`${sleepBedTime.text} : `}
				/>
				<TextWidget
					style={{
						textAlign: `center`,
						fontSize: 16,
						fontWeight: `500`,
						marginRight: 10,
						color: sleepBedTime.color as ColorProp,
					}}
					text={`${sleepBedTime.value}`}
				/>
				<TextWidget
					style={{
						textAlign: `center`,
						fontSize: 8,
						fontWeight: `400`,
						marginRight: 0,
						color: `#434343`,
					}}
					text={sleepBedTime.end}
				/>
			</FlexWidget>
			{/* sleep 2 */}
			<FlexWidget
				style={{
					width: `wrap_content`,
					height: height,
					flexDirection: `row`,
					justifyContent: `center`,
					alignItems: `center`,
				}}
			>
				<SvgWidget
					svg={require(`../assets/svg/sleep3.svg`)}
					style={{
						width: 20,
						height: 20,
						marginRight: 10,
					}}
				/>
				<TextWidget
					style={{
						textAlign: `center`,
						fontSize: fontSize(sleepWakeTime.text),
						fontWeight: `500`,
						marginRight: 10,
						color: `#000000`,
					}}
					text={`${sleepWakeTime.text} : `}
				/>
				<TextWidget
					style={{
						textAlign: `center`,
						fontSize: 16,
						fontWeight: `500`,
						marginRight: 10,
						color: sleepWakeTime.color as ColorProp,
					}}
					text={`${sleepWakeTime.value}`}
				/>
				<TextWidget
					style={{
						textAlign: `center`,
						fontSize: 8,
						fontWeight: `400`,
						marginRight: 0,
						color: `#434343`,
					}}
					text={sleepWakeTime.end}
				/>
			</FlexWidget>
			{/* sleep 3 */}
			<FlexWidget
				style={{
					width: `wrap_content`,
					height: height,
					flexDirection: `row`,
					justifyContent: `center`,
					alignItems: `center`,
				}}
			>
				<SvgWidget
					svg={require(`../assets/svg/sleep4.svg`)}
					style={{
						width: 20,
						height: 20,
						marginRight: 10,
					}}
				/>
				<TextWidget
					style={{
						textAlign: `center`,
						fontSize: fontSize(sleepDuration.text),
						fontWeight: `500`,
						marginRight: 10,
						color: `#000000`,
					}}
					text={`${sleepDuration.text} : `}
				/>
				<TextWidget
					style={{
						textAlign: `center`,
						fontSize: 16,
						fontWeight: `500`,
						marginRight: 10,
						color: sleepDuration.color as ColorProp,
					}}
					text={`${sleepDuration.value}`}
				/>
				<TextWidget
					style={{
						textAlign: `center`,
						fontSize: 8,
						fontWeight: `400`,
						marginRight: 0,
						color: `#434343`,
					}}
					text={sleepDuration.end}
				/>
			</FlexWidget>
		</FlexWidget>
	);
};

// -------------------------------------------------------------------------------------------------
export const DetailWidget = ({
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
	sleep,
}: DetailWidgetRecordProps &
	ExerciseRecordProps &
	FoodRecordProps &
	MoneyRecordProps &
	SleepRecordProps) => {
	return (
		<FlexWidget
			style={{
				height: `match_parent`,
				width: `match_parent`,
				flexDirection: `row`,
				justifyContent: `center`,
				alignItems: `center`,
				backgroundColor: `#ffffff`,
				borderRadius: 16,
				borderWidth: 1,
				borderColor: `#000`,
			}}
		>
			{/** select section */}
			<FlexWidget
				style={{
					width: `wrap_content`,
					height: `match_parent`,
					flexDirection: `column`,
					justifyContent: `center`,
					alignItems: `center`,
					borderRightWidth: 1,
					borderRightColor: `#5e5e5e`,
					paddingVertical: 10,
					paddingHorizontal: 10,
				}}
			>
				<SelectSection
					key={activeView}
					iconName={`exercise`}
					isActive={activeView === `exercise`}
				/>
				<SelectSection
					key={activeView}
					iconName={`food`}
					isActive={activeView === `food`}
				/>
				<SelectSection
					key={activeView}
					iconName={`money`}
					isActive={activeView === `money`}
				/>
				<SelectSection
					key={activeView}
					iconName={`sleep`}
					isActive={activeView === `sleep`}
				/>
			</FlexWidget>
			{/** detail section */}
			<FlexWidget
				style={{
					width: `match_parent`,
					height: `match_parent`,
					flexDirection: `column`,
					justifyContent: `center`,
					alignItems: `center`,
				}}
			>
				{/** header section */}
				<FlexWidget
					style={{
						width: `match_parent`,
						height: `wrap_content`,
						flexDirection: `row`,
						justifyContent: `center`,
						alignItems: `center`,
						borderBottomWidth: 1,
						borderBottomColor: `#c0c0c0`,
						paddingVertical: 20,
						paddingHorizontal: 20,
					}}
				>
					<SvgWidget
						svg={require(`../assets/svg/search.svg`)}
						clickAction={`OPEN_APP`}
						style={{
							width: 20,
							height: 20,
							marginRight: 15,
						}}
					/>
					<TextWidget
						style={{
							textAlign: `center`,
							fontSize: 16,
							fontWeight: `700`,
							color: `#000000`,
							marginRight: 10,
							letterSpacing: 1,
						}}
						text={clientDate}
					/>
					<TextWidget
						style={{
							textAlign: `center`,
							fontSize: 14,
							fontWeight: `600`,
							color: `#5e5e5e`,
							marginRight: 10,
							letterSpacing: 1,
						}}
						text={clientDay}
					/>
					<TextWidget
						style={{
							textAlign: `center`,
							fontSize: 10,
							fontWeight: `500`,
							color: `#000000`,
							marginRight: 15,
							letterSpacing: 1,
						}}
						text={clientTime}
					/>
					<SvgWidget
						svg={require(`../assets/svg/refresh.svg`)}
						style={{
							width: 16,
							height: 16,
						}}
						clickAction={
							activeView === `exercise`
								? `exercise`
								: activeView === `food`
									? `food`
									: activeView === `money`
										? `money`
										: activeView === `sleep`
											? `sleep`
											: ``
						}
					/>
				</FlexWidget>
				{/** detail section */}
				<FlexWidget
					style={{
						width: `match_parent`,
						height: `match_parent`,
						flexDirection: `column`,
						justifyContent: `center`,
						alignItems: `center`,
						paddingTop: 10,
						paddingBottom: 10,
						paddingLeft: 50,
						paddingRight: 10,
					}}
				>
					{activeView === `exercise` && (
						<ExerciseSection
							widgetHeight={widgetHeight}
							clientLanguage={clientLanguage}
							clientUnit={clientUnit}
							exercise={exercise}
						/>
					)}
					{activeView === `food` && (
						<FoodSection
							widgetHeight={widgetHeight}
							clientLanguage={clientLanguage}
							food={food}
						/>
					)}
					{activeView === `money` && (
						<MoneySection
							widgetHeight={widgetHeight}
							clientLanguage={clientLanguage}
							clientCurrency={clientCurrency}
							money={money}
						/>
					)}
					{activeView === `sleep` && (
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
