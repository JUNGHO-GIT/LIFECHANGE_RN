// timeZone.ts

import {
  moment, Localization,
} from "@imports/ImportLibs";

// -------------------------------------------------------------------------------------------------
const clientTimeZone = Localization.getTimeZone();
const clientCurrency = Localization.getCurrencies()?.[0];

const curDate = moment().tz(clientTimeZone).format("YYYY-MM-DD");
const curTime = moment().tz(clientTimeZone).format("HH:mm:ss");
const curFormat = moment().tz(clientTimeZone).format("ddd");
const curCurrency = clientCurrency;

let isKorean: boolean = false;
let curDay: string = "";

if (clientTimeZone === "Asia/Seoul") {
  isKorean = true;
  curDay
  = curFormat === "Mon" ? "월"
  : curFormat === "Tue" ? "화"
  : curFormat === "Wed" ? "수"
  : curFormat === "Thu" ? "목"
  : curFormat === "Fri" ? "금"
  : curFormat === "Sat" ? "토"
  : "일";
}
else {
  isKorean = false;
  curDay = curFormat;
}

// -------------------------------------------------------------------------------------------------
export {
  curDate,
  curTime,
  curFormat,
  curDay,
  curCurrency,
  isKorean,
};