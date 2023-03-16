import React, { useState } from "react";
import cn from "classnames";
import { Step } from "../../const";
import { useActions } from "../../hooks/useActions";
import { isAudioUrl, isMediaUrl, isValidUrl } from "../../utils/url";
import styles from "./Form.module.scss";

interface FormProps {}

const Form: React.FunctionComponent<FormProps> = () => {
  const [url, setUrl] = useState("");
  const [urlError, setUrlError] = useState("");
  const { setStep, setTrackUrl } = useActions();

  const handleInputChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(evt.target.value);
  };

  // Обработка ошибки есть внутри компонента AudioPlayer, если формат невозможно воспроизвести
  const showFallback = () => setStep(Step.Audio);

  const setNextStep = (url: string) => {
    if (isAudioUrl(url)) {
      return setStep(Step.Audio);
    } else if (isMediaUrl(url)) {
      return setStep(Step.Video);
    }
    return showFallback();
  };

  const handleFormSubmit = (evt: React.FormEvent) => {
    evt.preventDefault();

    if (isValidUrl(url)) {
      setUrlError("");
      setTrackUrl(url);
      setNextStep(url);
    } else {
      setUrlError("Enter valid url");
    }
  };

  return (
    <form className={styles.form} action="">
      <label htmlFor="media-url" className={styles.label}>
        Insert the link
      </label>
      <div className={styles.wrapper}>
        <div
          className={cn(styles.inputWrapper, {
            [styles.inputWrapperError]: urlError,
          })}
        >
          <input
            className={cn(styles.input, {
              [styles.inputError]: urlError,
            })}
            type="url"
            id="media-url"
            name="media-url"
            value={url}
            onChange={handleInputChange}
            placeholder="https://"
          />
        </div>
        <button
          className={styles.submitBtn}
          type="submit"
          onClick={handleFormSubmit}
          aria-label="Submit"
        ></button>
      </div>
      {urlError && <p className={styles.errorText}>{urlError}</p>}
    </form>
  );
};

export default Form;
