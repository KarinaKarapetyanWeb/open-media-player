import React, { DetailedHTMLProps, HTMLAttributes } from "react";
import cn from "classnames";
import styles from "./BarControl.module.scss";

interface BarControlProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  totalTime: number;
  currentTime: number;
  onTimeChange: (evt: React.ChangeEvent<HTMLInputElement>) => void;
  disabled: boolean;
}

const BarControl: React.FunctionComponent<BarControlProps> = ({
  totalTime,
  currentTime,
  onTimeChange,
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
      <label className="visually-hidden" htmlFor="currentTime">
        Current Time
      </label>
      <input
        className={styles.range}
        type="range"
        id="currentTime"
        min={0}
        max={totalTime}
        value={currentTime}
        step="0.01"
        onChange={onTimeChange}
      />
    </div>
  );
};

export default BarControl;
