import React, { useCallback, useEffect, useState } from "react";
import BarControl from "../Common/BarControl/BarControl";
import PlayControl from "../Common/PlayControl/PlayControl";
import VolumeControl from "../Common/VolumeControl/VolumeControl";
import SpeedControls from "../Common/SpeedControls/SpeedControls";
import Loader from "../Loader/Loader";
import styles from "./AudioControls.module.scss";
import { formatTime } from "../../utils/time";
import Message from "../Common/Message/Message";
import { getMediaErrorMessage } from "../../utils/error";
import { DEFAULT_SPEED, DEFAULT_VOLUME } from "../../const";

interface AudioControlsProps {
  audioCtxContainer: React.RefObject<AudioContext>;
  gainNodeContainer: React.RefObject<GainNode>;
  audioElementContainer: React.RefObject<HTMLAudioElement>;
}

const AudioControls: React.FunctionComponent<AudioControlsProps> = ({
  audioCtxContainer,
  gainNodeContainer,
  audioElementContainer,
}) => {
  const [audioError, setAudioError] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [totalTime, setTotalTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(DEFAULT_VOLUME);
  const [currentTime, setCurrentTime] = useState(0);
  const [speed, setSpeed] = useState(DEFAULT_SPEED);

  const closeMessage = () => {
    setShowMessage(false);
  };

  const handlePlayPauseBtnClick = useCallback(async () => {
    if (audioCtxContainer.current?.state === "suspended") {
      await audioCtxContainer.current?.resume();
    }

    if (isPlaying) {
      setIsPlaying(false);
      audioElementContainer.current?.pause();
    } else {
      setIsPlaying(true);
      await audioElementContainer.current?.play();
    }
  }, [audioCtxContainer, audioElementContainer, setIsPlaying, isPlaying]);

  const handleVolumeChange = useCallback(
    (evt: React.ChangeEvent<HTMLInputElement>) => {
      if (gainNodeContainer && gainNodeContainer.current) {
        gainNodeContainer.current.gain.value = +evt.target.value;
        setVolume(+evt.target.value);
      }
    },
    [gainNodeContainer, setVolume, volume]
  );

  const handleTimeChange = useCallback(
    (evt: React.ChangeEvent<HTMLInputElement>) => {
      if (audioElementContainer.current) {
        audioElementContainer.current.currentTime = +evt.target.value;
        setCurrentTime(+evt.target.value);
      }
    },
    [audioElementContainer, currentTime, setCurrentTime]
  );

  const handleSpeedChange = useCallback(
    (evt: React.MouseEvent<HTMLButtonElement>) => {
      const { speed: btnSpeed } = evt.currentTarget.dataset;
      if (audioElementContainer.current) {
        audioElementContainer.current.playbackRate = Number(btnSpeed);
        setSpeed(Number(btnSpeed));
      }
    },
    [audioElementContainer, speed, setSpeed]
  );

  useEffect(() => {
    audioElementContainer.current?.addEventListener("loadedmetadata", () => {
      setIsLoading(false);
      setAudioError("");
      setTotalTime(
        Math.floor(audioElementContainer.current?.duration as number)
      );
    });
    audioElementContainer.current?.addEventListener("timeupdate", () => {
      setCurrentTime(audioElementContainer?.current?.currentTime as number);
    });
    audioElementContainer.current?.addEventListener("ended", () => {
      setIsPlaying(false);
      setCurrentTime(0);
    });
    audioElementContainer.current?.addEventListener(
      "error",
      (errorEvt: ErrorEvent) => {
        const target = errorEvt.target as HTMLAudioElement;
        setIsLoading(false);
        if (target.error instanceof MediaError) {
          setAudioError(getMediaErrorMessage(target.error.code));
        } else {
          setAudioError("An unknown error occurred.");
        }
        setShowMessage(true);
      }
    );
  }, [audioElementContainer]);

  const isDisabled = isLoading || !!audioError;

  return (
    <>
      {showMessage && (
        <Message title="Warning" onClose={closeMessage}>
          {audioError}
        </Message>
      )}
      <div className={styles.playerWrapper}>
        {isLoading && <Loader className={styles.loader} />}
        <PlayControl
          className={styles.playControl}
          isPlaying={isPlaying}
          onPlayClick={handlePlayPauseBtnClick}
          disabled={isDisabled}
        />
        <SpeedControls
          className={styles.speedControl}
          speed={speed}
          onSpeedChange={handleSpeedChange}
          disabled={isDisabled}
        />
        <BarControl
          className={styles.barControl}
          totalTime={totalTime}
          currentTime={currentTime}
          onTimeChange={handleTimeChange}
          disabled={isDisabled}
        />
        <VolumeControl
          className={styles.volumeControl}
          volume={volume}
          onVolumeChange={handleVolumeChange}
          disabled={isDisabled}
        />
        <p className={styles.time}>{formatTime(Math.floor(currentTime))}</p>
      </div>
    </>
  );
};

export default AudioControls;
