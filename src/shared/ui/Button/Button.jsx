import styles from "./Button.module.scss";

export const Button = ({
  className = "",
  children,
  type = "button",
  onClick,
  isDisabled,
  ariaLabel,
  ariaDescribedBy,
  ariaExpanded,
  ariaPressed,
}) => {
  return (
    <button
      className={`${styles.button} ${className}`}
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      aria-disabled={isDisabled}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedBy}
      aria-expanded={ariaExpanded}
      aria-pressed={ariaPressed}
    >
      {children}
    </button>
  );
};
