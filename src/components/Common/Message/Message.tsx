import React, {
  DetailedHTMLProps,
  HTMLAttributes,
  useEffect,
  useRef,
} from "react";
import styles from "./Message.module.scss";

interface MessageProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  title: string;
  onClose: () => void;
}

const Message: React.FunctionComponent<MessageProps> = ({
  title,
  children,
  onClose,
  ...props
}) => {
  const closeBtnRef = useRef<null | HTMLButtonElement>(null);

  useEffect(() => {
    if (closeBtnRef.current !== null) {
      closeBtnRef.current.focus();
    }
  }, [closeBtnRef]);

  return (
    <div className={styles.message} {...props}>
      <button
        className={styles.closeBtn}
        aria-label="Close message"
        onClick={onClose}
        ref={closeBtnRef}
      ></button>
      <h2 className={styles.title}>{title}</h2>
      {children}
    </div>
  );
};

export default Message;
