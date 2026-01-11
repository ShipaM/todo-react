import styles from "./Button.module.scss";

export const Button = ({
  className = "",
  children,
  type = "button",
  onClick,
  isDisabled,
}) => {
  return (
    <button
      className={`${styles.button} ${className}`}
      type={type}
      onClick={onClick}
      disabled={isDisabled}
    >
      {children}
    </button>
  );
};
