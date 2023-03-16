import React, { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import cn from "classnames";
import styles from "./PlayControl.module.scss";
import { pauseIcon, playIcon } from "./icons";

interface PlayControlProps
  extends Omit<
    DetailedHTMLProps<
      ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >,
    "type" | "onClick"
  > {
  isPlaying: boolean;
  onPlayClick: () => void;
}

const PlayControl: React.FunctionComponent<PlayControlProps> = ({
  isPlaying,
  onPlayClick,
  className,
  ...props
}) => {
  return (
    <button
      className={cn(styles.playBtn, className)}
      onClick={onPlayClick}
      type="button"
      {...props}
    >
      {isPlaying ? pauseIcon : playIcon}
    </button>
  );
};

export default React.memo(PlayControl);
