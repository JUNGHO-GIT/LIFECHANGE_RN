// alias.d.ts

declare module "@env" {
  export const TITLE: string;
  export const SERVER_URL: string;
  export const ADMOB_APP_ID: string;
  export const ADMOB_BANNER_ID: string;
}

declare module "@assets/*" {
  const value: any;
  export default value;
}
declare module "@images/*" {
  const value: any;
  export default value;
}
declare module "@types/*" {
  const value: any;
  export default value;
}

declare module "@schemas/*" {
  const value: any;
  export default value;
}
declare module "@components/*" {
  const value: any;
  export default value;
}
declare module "@containers/*" {
  const value: any;
  export default value;
}
declare module "@hooks/*" {
  const value: any;
  export default value;
}
declare module "@imports/*" {
  const value: any;
  export default value;
}
declare module "@layouts/*" {
  const value: any;
  export default value;
}
declare module "@pages/*" {
  const value: any;
  export default value;
}