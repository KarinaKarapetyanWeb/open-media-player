import React, { DetailedHTMLProps, HTMLAttributes } from "react";
import cn from "classnames";
import styles from "./VolumeControl.module.scss";

interface VolumeControlProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  volume: number;
  onVolumeChange: (evt: React.ChangeEvent<HTMLInputElement>) => void;
  disabled: boolean;
}

const VolumeControl: React.FunctionComponent<VolumeControlProps> = ({
  volume,
  onVolumeChange,
  disabled,
  className,
  ...props
}) => {
  return (
    <div
      className={cn(className, {
        [styles.disabled]: disabled,
      })}
      {...props}
    >
      <label className="visually-hidden" htmlFor="volume">
        Volume
      </label>
      <input
        className={styles.range}
        type="range"
        id="volume"
        min="0"
        max="2"
        value={volume}
        step="0.01"
        onChange={onVolumeChange}
      />
    </div>
  );
};

export default React.memo(VolumeControl);
