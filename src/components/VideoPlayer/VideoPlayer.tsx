import React from "react";
import useAppSelector from "../../hooks/useAppSelector";
import { getTrackUrl } from "../../store/reducers/track/selectors";
import BackButton from "../Common/BackButton/BackButton";
import styles from "./VideoPlayer.module.scss";

interface VideoPlayerProps {}

const VideoPlayer: React.FunctionComponent<VideoPlayerProps> = () => {
  const trackUrl = useAppSelector(getTrackUrl);

  return (
    <div>
      <BackButton />
      <video
        src={trackUrl}
        controls
        width={296}
        height={166}
        className={styles.video}
      ></video>
    </div>
  );
};

export default VideoPlayer;
