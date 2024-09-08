// date.ts

import {
  React, useState, useEffect,
} from "@imports/ImportReacts";

import {
  moment,
} from "@imports/ImportLibs";

// -------------------------------------------------------------------------------------------------
const [clientTimeZone, setClientTimeZone] = useState("");

// -------------------------------------------------------------------------------------------------
useEffect(() => {
  const userTimeZone = moment.tz.guess();
  setClientTimeZone(userTimeZone);
}, []);

// -------------------------------------------------------------------------------------------------
const curDate = moment().tz(clientTimeZone).format("YYYY-MM-DD");
const curTime = moment().tz(clientTimeZone).format("HH:mm:ss");
const curFormat = moment().tz(clientTimeZone).format("ddd");
const curDay
  = curFormat === "Mon" ? "월"
  : curFormat === "Tue" ? "화"
  : curFormat === "Wed" ? "수"
  : curFormat === "Thu" ? "목"
  : curFormat === "Fri" ? "금"
  : curFormat === "Sat" ? "토"
  : "일";

// -------------------------------------------------------------------------------------------------
export {
  curDate,
  curTime,
  curFormat,
  curDay,
};