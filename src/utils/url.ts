import {
  AUDIO_EXTENSIONS,
  DASH_EXTENSIONS,
  FLV_EXTENSIONS,
  HLS_EXTENSIONS,
  VIDEO_EXTENSIONS,
} from "../const";

export const isValidUrl = (url: string) => {
  const urlPattern = new RegExp(
    "^(https:\\/\\/)?" + // validate protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // validate domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // validate OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // validate port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // validate query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // validate fragment locator
  return !!urlPattern.test(url);
};

const isMediaStream = (url: unknown) => {
  return (
    typeof window !== "undefined" &&
    typeof window.MediaStream !== "undefined" &&
    url instanceof window.MediaStream
  );
};

const isBlobUrl = (url: string) => {
  return /^blob:/.test(url);
};

export const isAudioUrl = (url: string) => AUDIO_EXTENSIONS.test(url);

export const isMediaUrl = (url: string) =>
  VIDEO_EXTENSIONS.test(url) ||
  HLS_EXTENSIONS.test(url) ||
  DASH_EXTENSIONS.test(url) ||
  FLV_EXTENSIONS.test(url);
