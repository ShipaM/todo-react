export const Button = ({ className = "", children, type = "button" }) => {
  return (
    <button className={`button ${className}`} type={type}>
      {children}
    </button>
  );
};
