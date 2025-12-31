import styles from "./Field.module.scss";

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
    <div className={`${styles.field} ${className}`}>
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
      <input
        className={`${styles.input} ${error ? styles.isInvalid : ""}`}
        id={id}
        placeholder=" "
        autoComplete="off"
        type={type}
        onInput={onInput}
        value={value}
      />
      {error && (
        <span className={styles.error} title={error}>
          {error}
        </span>
      )}
    </div>
  );
};
