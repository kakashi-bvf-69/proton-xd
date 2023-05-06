

export default interface Args {
  title?: string;
  url?: string;
  width?: number;
  height?: number;
  theme?: Theme;
  icon?: string;
}

export enum Theme {
  DARK=1,
  LIGHT=0
}

export declare type Flags="title"|"url"|"width"|"height"|"theme"|"icon";
const FLAGS: Flags[]=["title","url","width","height","theme","icon"];
export {FLAGS};
