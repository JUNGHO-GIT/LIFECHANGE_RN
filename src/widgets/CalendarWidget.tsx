// Calendar.tsx

import {
  FlexWidget, TextWidget, ImageWidget,
} from "@imports/ImportReacts";

// -------------------------------------------------------------------------------------------------
declare type CalendarWidgetProps = {
  clientLanguage: string;
  clientCurrency: string;
  clientDate: string;
  clientTime: string;
  clientDay: string;
};
declare type CalendarProps = {
  clientLanguage: string;
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
  { clientLanguage, calendar }: CalendarProps
) => {

  const date = new Date();
  const month = date.getMonth();
  const year = date.getFullYear();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();
  const lastDay = new Date(year, month, daysInMonth).getDay();

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
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
        height: 'wrap_content',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 20,
        paddingHorizontal: 50,
      }}
    >
      {calendarArray.map((week, index) => (
        <FlexWidget
          key={index}
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
          {week.map((day, index) => (
            <TextWidget
              key={index}
              style={{
                textAlign: "center",
                fontSize: 14,
                fontWeight: '600',
                color: day === date.getDate() ? '#000000' : '#5e5e5e',
                marginRight: 10,
                letterSpacing: 1,
              }}
              text={`${day}`}
            />
          ))}
        </FlexWidget>
      ))}
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
          justifyContent: 'center',
          alignItems: 'center',
          borderBottomWidth: 1,
          borderBottomColor: '#c0c0c0',
          paddingVertical: 20,
          paddingHorizontal: 20,
        }}
      >
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
          clickAction={'REFRESH'}
        />
      </FlexWidget>
      {/** content section */}
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
        <CalendarSection
          clientLanguage={clientLanguage}
          calendar={calendar}
        />
      </FlexWidget>
    </FlexWidget>
  );
};