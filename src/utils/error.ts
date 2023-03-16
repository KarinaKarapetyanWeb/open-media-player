export const getMediaErrorMessage = (code: number) => {
  switch (code) {
    case MediaError.MEDIA_ERR_ABORTED:
      return "The user canceled the audio";
    case MediaError.MEDIA_ERR_NETWORK:
      return "A network error occurred while fetching the audio.";
    case MediaError.MEDIA_ERR_DECODE:
      return "An error occurred while decoding the audio.";
    case MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED:
      return "The audio is missing or is in a format not supported by your browser.";
    default:
      return "An unknown error occurred.";
  }
};
