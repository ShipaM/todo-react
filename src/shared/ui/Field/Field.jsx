import { forwardRef } from "react";
import styles from "./Field.module.scss";

export const Field = forwardRef(
  (
    { className, id, value, label, error, type, onInput, required = false },
    ref,
  ) => {
    const errorId = error ? `${id}-error` : undefined;

    return (
      <div className={`${styles.field} ${className}`}>
        <label className={styles.label} htmlFor={id}>
          {label}
          {required && <span aria-hidden="true"> *</span>}
        </label>
        <input
          ref={ref}
          className={`${styles.input} ${error ? styles.isInvalid : ""}`}
          id={id}
          placeholder=" "
          autoComplete="off"
          type={type}
          onInput={onInput}
          value={value}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={errorId}
          aria-required={required}
        />
        {error && (
          <span
            id={errorId}
            className={styles.error}
            title={error}
            role="alert"
            aria-live="assertive"
          >
            {error}
          </span>
        )}
      </div>
    );
  },
);

Field.displayName = "Field";
