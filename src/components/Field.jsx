export const Field = ({
  className,
  id,
  value,
  label,
  error,
  type,
  onInput,
}) => {
  return (
    <div className={`field ${className}`}>
      <label className="field__label" htmlFor={id}>
        {label}
      </label>
      <input
        className={`field__input ${error ? "is-invalid" : ""}`}
        id={id}
        placeholder=" "
        autoComplete="off"
        type={type}
        onInput={onInput}
        value={value}
      />
      {error && (
        <span className="field__error" title={error}>
          {error}
        </span>
      )}
    </div>
  );
};
