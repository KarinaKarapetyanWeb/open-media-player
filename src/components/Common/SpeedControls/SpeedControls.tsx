import React, { DetailedHTMLProps, HTMLAttributes, useState } from "react";
import cn from "classnames";
import styles from "./SpeedControls.module.scss";
import { SPEED_RATES } from "../../../const";

interface SpeedControlsProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  speed: number;
  onSpeedChange: (evt: React.MouseEvent<HTMLButtonElement>) => void;
  disabled: boolean;
}

const SpeedControls: React.FunctionComponent<SpeedControlsProps> = ({
  speed,
  onSpeedChange,
  disabled,
  className,
  ...props
}) => {
  const [showBtns, setShowBtns] = useState(false);

  const handleOpenBtnClick = () => setShowBtns((prev) => !prev);

  const handleSpeedBtnClick = (evt: React.MouseEvent<HTMLButtonElement>) => {
    const { speed: btnSpeed } = evt.currentTarget.dataset;
    if (Number(btnSpeed) === speed) {
      setShowBtns(false);
    } else {
      onSpeedChange(evt);
      setShowBtns(false);
    }
  };

  return (
    <div
      className={cn(styles.speedWrapper, className, {
        [styles.disabled]: disabled,
      })}
      {...props}
    >
      <button
        className={styles.openBtn}
        aria-label="open-speed-buttons"
        onClick={handleOpenBtnClick}
        type="button"
      ></button>

      {showBtns && (
        <div className={styles.speedBtns}>
          {SPEED_RATES.map((rate) => (
            <button
              key={rate}
              className={cn(styles.speedBtn, {
                [styles.activeBtn]: speed === rate,
              })}
              type="button"
              data-speed={`${rate}`}
              onClick={handleSpeedBtnClick}
            >
              {rate}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default React.memo(SpeedControls);
