import React, { useEffect, useRef } from "react";
import useAppSelector from "../../hooks/useAppSelector";
import { getTrackUrl } from "../../store/reducers/track/selectors";
import BackButton from "../Common/BackButton/BackButton";
import AudioControls from "../AudioControls/AudioControls";
import styles from "./AudioPlayer.module.scss";

interface AudioPlayerProps {}

const AudioPlayer: React.FunctionComponent<AudioPlayerProps> = () => {
  const audioCtxContainer = useRef<null | AudioContext>(null);
  const gainNodeContainer = useRef<null | GainNode>(null);
  const audioElementContainer = useRef<null | HTMLAudioElement>(null);

  const trackUrl = useAppSelector(getTrackUrl);

  const initPlayer = () => {
    if (audioElementContainer && audioElementContainer.current) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioCtxContainer.current = new AudioContext();
      gainNodeContainer.current = audioCtxContainer.current.createGain();

      const track = audioCtxContainer.current.createMediaElementSource(
        audioElementContainer.current
      );

      track
        .connect(gainNodeContainer.current)
        .connect(audioCtxContainer.current.destination);
      audioElementContainer.current.crossOrigin = "anonymous";
    }
  };

  const killPlayer = () => {
    audioCtxContainer.current = null;
    gainNodeContainer.current = null;
    audioElementContainer.current = null;
  };

  useEffect(() => {
    initPlayer();

    return () => {
      killPlayer();
    };
  }, []);

  return (
    <div>
      <audio src={trackUrl} ref={audioElementContainer}></audio>
      <BackButton />
      <AudioControls
        audioCtxContainer={audioCtxContainer}
        gainNodeContainer={gainNodeContainer}
        audioElementContainer={audioElementContainer}
      />
    </div>
  );
};

export default AudioPlayer;
