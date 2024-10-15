// Calendar.tsx

import {
  FlexWidget, TextWidget, ImageWidget,
} from "@imports/ImportReacts";

// -------------------------------------------------------------------------------------------------
declare type CalendarWidgetProps = {
  clientLanguage: string;
  clientDate: string;
  clientTime: string;
  clientDay: string;
};
declare type CalendarProps = {
  clientLanguage: string;
  clientDate: string;
  clientDay: string;
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
  { clientLanguage, clientDate, clientDay, calendar }: CalendarProps
) => {

  const date = new Date();
  const month = date.getMonth();
  const year = date.getFullYear();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();
  const lastDay = new Date(year, month, daysInMonth).getDay();
  const weeks = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const calendarArray = [];
  let week = [];
  for (let i = 0; i < firstDay; i++) {
    week.push('');
  }
  for (let i = 1; i <= daysInMonth; i++) {
    week.push(i);
    if (week.length === 7) {
      calendarArray.push(week);
      week = [];
    }
  }
  for (let i = lastDay; i < 6; i++) {
    week.push('');
  }
  calendarArray.push(week);

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
      {/** week days */}
      <FlexWidget
        style={{
          width: 'match_parent',
          height: 'wrap_content',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {weeks.map((day, index) => (
          <TextWidget
            key={index}
            style={{
              width: 50,
              height: 40,
              textAlign: "center",
              fontSize: 14,
              fontWeight: '600',
              color: '#000000',
              borderRightColor: '#c0c0c0',
              borderRightWidth: 1,
              letterSpacing: 1,
            }}
            text={clientLanguage === 'ko' ? (
              day === 'Sun' ? '일'
              : day === 'Mon' ? '월'
              : day === 'Tue' ? '화'
              : day === 'Wed' ? '수'
              : day === 'Thu' ? '목'
              : day === 'Fri' ? '금'
              : '토'
            ) : day}
          />
        ))}
      </FlexWidget>
      {/** calendar days */}
      <FlexWidget
        style={{
          width: 'match_parent',
          height: 'wrap_content',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          paddingVertical: 10,
          paddingHorizontal: 10,
        }}
      >
        {calendarArray.map((week, index) => (
          week.map((day, index) => (
            <TextWidget
              key={index}
              style={{
                width: 30,
                height: 30,
                textAlign: "center",
                fontSize: 14,
                fontWeight: '600',
                color: day === '' ? '#ffffff' : '#000000',
                backgroundColor: day === '' ? '#ffffff' : '#f0f0f0',
                borderRadius: 15,
                letterSpacing: 1,
              }}
              text={`${day}`}
            />
          ))
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
    clientDay,
    clientTime,
    calendar,
  }: CalendarWidgetProps & CalendarProps
) => {

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
          <TextWidget
            style={{
              textAlign: "center",
              fontSize: 20,
              fontWeight: '700',
              color: '#000000',
              marginRight: 0,
              letterSpacing: 1,
            }}
            text={clientDate.slice(0, 7)}
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
          clientLanguage={clientLanguage}
          clientDate={clientDate}
          clientDay={clientDay}
          calendar={calendar}
        />
      </FlexWidget>
    </FlexWidget>
  );
};