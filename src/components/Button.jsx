export const Button = ({
  className = "",
  children,
  type = "button",
  onClick,
  isDisabled,
}) => {
  return (
    <button
      className={`button ${className}`}
      type={type}
      onClick={onClick}
      disabled={isDisabled}
    >
      {children}
    </button>
  );
};
