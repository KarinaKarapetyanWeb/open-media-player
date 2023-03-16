import React from "react";
import { Step } from "../../../const";
import { useActions } from "../../../hooks/useActions";
import styles from "./BackButton.module.scss";

interface BackButtonProps {}

const BackButton: React.FunctionComponent<BackButtonProps> = () => {
  const { setStep } = useActions();

  const handleBackBtnClick = () => {
    setStep(Step.Check);
  };
  return (
    <button
      className={styles.backBtn}
      type="button"
      onClick={handleBackBtnClick}
    >
      ← Back
    </button>
  );
};

export default BackButton;
