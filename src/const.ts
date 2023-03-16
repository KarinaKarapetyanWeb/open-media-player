export enum NameSpace {
  Step = "STEP",
  Track = "TRACK",
}

export enum Step {
  Check = "CHECK",
  Audio = "AUDIO",
  Video = "VIDEO",
}

export const AUDIO_EXTENSIONS =
  /\.(m4a|m4b|mp4a|mpga|mp2|mp2a|mp3|m2a|m3a|wav|weba|aac|oga|spx)($|\?)/i;
export const VIDEO_EXTENSIONS =
  /\.(mp4|og[gv]|webm|mov|m4v)(#t=[,\d+]+)?($|\?)/i;
export const HLS_EXTENSIONS = /\.(m3u8)($|\?)/i;
export const DASH_EXTENSIONS = /\.(mpd)($|\?)/i;
export const FLV_EXTENSIONS = /\.(flv)($|\?)/i;

export const SPEED_RATES = [0.5, 1, 1.5];
export const DEFAULT_SPEED = 1;
export const DEFAULT_VOLUME = 1;
