// Calendar.tsx

import {
  FlexWidget, TextWidget, ImageWidget,
} from "@imports/ImportReacts";

// -------------------------------------------------------------------------------------------------
declare type CalendarProps = {
  clientLanguage: string;
  clientCurrency: string;
  clientDate: string;
  clientTime: string;
  clientDay: string;
}

// -------------------------------------------------------------------------------------------------
export const CalendarWidget = (
  {
    clientLanguage,
    clientDate,
    clientDay,
    clientTime,
  }: CalendarProps
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
      <TextWidget
        style={{
          fontSize: 16,
          fontWeight: '600',
          color: '#000000',
        }}
        text={`${clientDate} ${clientDay}`}
      />
    </FlexWidget>
  );
};