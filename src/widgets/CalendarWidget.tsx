// Calendar.tsx

import {
  FlexWidget, TextWidget, ImageWidget
} from "@imports/ImportReacts";

// -------------------------------------------------------------------------------------------------
declare type CalendarWidgetProps = {
  clientLanguage: string;
  clientDate: string;
  clientMonthStart: string;
  clientMonthEnd: string;
  clientTime: string;
  clientDay: string;
};

// -------------------------------------------------------------------------------------------------
declare type CalendarProps = {
  widgetHeight: number;
  widgetWidth: number;
  clientLanguage: string;
  clientDate: string;
  clientMonthStart: string;
  clientMonthEnd: string;
  calendar: [{
    calendar_dateStart: string;
    calendar_dateEnd: string;
    calendar_section: [{
      calendar_part_idx: number;
      calendar_part_val: string;
      calendar_color: string;
      calendar_title: string;
      calendar_content: string;
    }];
  }];
};

// -------------------------------------------------------------------------------------------------
const CalendarSection = (
  { widgetHeight, widgetWidth, clientLanguage, clientDate, clientMonthStart, clientMonthEnd, calendar }: CalendarProps
) => {

  let currentDate = new Date(clientMonthStart);
  let currentMonth = currentDate.getMonth();
  let currentYear = currentDate.getFullYear();

  // 달력 배열 생성
  const updateCalendar = (month: number, year: number) => {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();
    const calendarArray = [];
    let week = [];

    // 첫 주 빈 칸 추가
    for (let i = 0; i < firstDay; i++) {
      week.push('');
    }

    // 날짜 추가
    for (let i = 1; i <= daysInMonth; i++) {
      week.push(i);
      if (week.length === 7) {
        calendarArray.push(week);
        week = [];
      }
    }

    // 마지막 주 빈 칸 처리
    while (week.length < 7) {
      week.push('');
    }
    calendarArray.push(week);

    return calendarArray;
  };

  let calendarArray = updateCalendar(currentMonth, currentYear);

  return (
    <FlexWidget
      style={{
        width: 'match_parent',
        height: 'match_parent',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
      }}
    >
      {/* 요일 표시 */}
      <FlexWidget
        style={{
          width: 'match_parent',
          height: 'wrap_content',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {[
          clientLanguage === 'ko' ? '일' : 'S',
          clientLanguage === 'ko' ? '월' : 'M',
          clientLanguage === 'ko' ? '화' : 'T',
          clientLanguage === 'ko' ? '수' : 'W',
          clientLanguage === 'ko' ? '목' : 'T',
          clientLanguage === 'ko' ? '금' : 'F',
          clientLanguage === 'ko' ? '토' : 'S'
        ].map((day, index) => (
          <TextWidget
            key={index}
            style={{
              width: widgetWidth / 7,
              height: 50,
              textAlign: 'center',
              fontSize: 14,
              fontWeight: '600',
              color: '#000000',
              backgroundColor: '#f0f0f0',
              letterSpacing: 1,
            }}
            text={day}
          />
        ))}
      </FlexWidget>

      {/* 날짜 표시 */}
      <FlexWidget
        style={{
          width: 'match_parent',
          height: 'wrap_content',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {calendarArray.map((week, weekIndex) => (
          <FlexWidget
            key={weekIndex}
            style={{
              width: 'match_parent',
              height: 'wrap_content',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {week.map((day, dayIndex) => (
              <TextWidget
                key={dayIndex}
                style={{
                  width: widgetWidth / 7,
                  height: (widgetHeight - 100) / 6,
                  textAlign: 'center',
                  fontSize: 14,
                  fontWeight: '600',
                  color: '#000000',
                  backgroundColor: '#ffffff',
                  letterSpacing: 1,
                  borderWidth: 1,
                  borderColor: '#c0c0c0',
                }}
                text={day === '' ? '' : `${day}`}
              />
            ))}
          </FlexWidget>
        ))}
      </FlexWidget>
    </FlexWidget>
  );
};

// -------------------------------------------------------------------------------------------------
export const CalendarWidget = (
  {
    clientLanguage,
    clientDate,
    clientMonthStart,
    clientMonthEnd,
    clientTime,
    calendar,
    widgetHeight,
    widgetWidth,
  }: CalendarWidgetProps & CalendarProps
) => {
  try {
    return (
      <FlexWidget
        style={{
          height: 'match_parent',
          width: 'match_parent',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#ffffff',
          borderRadius: 16,
          borderWidth: 1,
          borderColor: '#000',
        }}
      >
        {/** header section */}
        <FlexWidget
          style={{
            width: 'match_parent',
            height: 'wrap_content',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottomWidth: 1,
            borderBottomColor: '#c0c0c0',
            paddingVertical: 20,
            paddingHorizontal: 30,
          }}
        >
          <FlexWidget
            style={{
              width: 'wrap_content',
              height: 'wrap_content',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <ImageWidget
              image={require('../assets/images/arrowLeft.webp')}
              imageWidth={20}
              imageHeight={20}
              clickAction={'PREV_MONTH'}
            />
            <TextWidget
              style={{
                textAlign: "center",
                fontSize: 20,
                fontWeight: '700',
                color: '#000000',
                marginLeft: 15,
                marginRight: 15,
                letterSpacing: 1,
              }}
              text={clientDate.slice(0, 7)}
            />
            <ImageWidget
              image={require('../assets/images/arrowRight.webp')}
              imageWidth={20}
              imageHeight={20}
              clickAction={'NEXT_MONTH'}
            />
          </FlexWidget>
          <FlexWidget
            style={{
              width: 'wrap_content',
              height: 'wrap_content',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
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
              clickAction={'REFRESH'}
            />
          </FlexWidget>
        </FlexWidget>
        {/** content section */}
        <FlexWidget
          style={{
            width: 'match_parent',
            height: 'match_parent',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 0,
            paddingHorizontal: 0,
          }}
        >
          <CalendarSection
            widgetHeight={widgetHeight}
            widgetWidth={widgetWidth}
            clientLanguage={clientLanguage}
            clientDate={clientDate}
            clientMonthStart={clientMonthStart}
            clientMonthEnd={clientMonthEnd}
            calendar={calendar}
          />
        </FlexWidget>
      </FlexWidget>
    );
  }
  catch (err) {
    console.error("CalendarWidget error:", err);
  }
};