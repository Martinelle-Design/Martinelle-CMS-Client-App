import { useState } from "react";
import CreatableSelect from "react-select/creatable";
import Select, { MultiValue, SingleValue } from "react-select";
type FormInputProps = {
  title: string;
  className?: string;
  inputType?: "date" | "text" | "textarea";
  required?: boolean;
  defaultValue?: string;
};
interface Option {
  readonly value: string;
  readonly label: string;
}
// interface GroupedOption {
//   readonly label: string;
//   readonly options: readonly Option[];
// }
export function isMultiValue(e: any): e is MultiValue<Option> {
  try {
    return Array.isArray(e) && e[0].value && e[0].label;
  } catch (err) {
    return false;
  }
}

export const transformToOptions = (
  opt: string | string[]
): Option | MultiValue<Option> => {
  if (typeof opt === "string") {
    return {
      value: opt,
      label: opt,
    };
  } else return opt.map((e) => ({ value: e, label: e }));
};
export const PassiveFormInput = ({
  defaultValue,
  title,
  className,
  inputType,
  required,
}: FormInputProps) => {
  return (
    <div className={`form-inputs-container ${className ? className : ""}`}>
      <label htmlFor={`${title}-input`}>{title}</label>
      {inputType === "textarea" ? (
        <textarea
          name={title}
          required={required}
          defaultValue={defaultValue}
        />
      ) : (
        <input
          name={title}
          id={`${title}-input`}
          defaultValue={defaultValue}
          type={inputType}
          required={required}
        />
      )}
    </div>
  );
};
export const ControlledFormInput = ({
  defaultValue,
  title,
  className,
  inputType,
  value,
  onChange,
  required,
}: FormInputProps & {
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}) => {
  return (
    <div className={`form-inputs-container ${className ? className : ""}`}>
      <label htmlFor={`${title}-input`}>{title}</label>
      {inputType === "textarea" ? (
        <textarea
          name={title}
          value={value}
          onChange={onChange}
          defaultValue={defaultValue}
          required={required}
        />
      ) : (
        <input
          name={title}
          id={`${title}-input`}
          defaultValue={defaultValue}
          value={value}
          type={inputType}
          onChange={onChange}
          required={required}
        />
      )}
    </div>
  );
};
export const PassiveDropDownInput = ({
  title,
  className,
  required,
  defaultValue,
  options,
  isMulti = false,
  isClearable,
}: {
  isClearable?: boolean;
  isMulti?: boolean;
  options: MultiValue<Option>;
  defaultValue?: string[] | string;
} & Omit<FormInputProps, "defaultValue">) => {
  const [value, setValue] = useState(
    Array.isArray(defaultValue)
      ? JSON.stringify(defaultValue)
      : defaultValue
      ? defaultValue
      : ""
  );
  const defaultOption: Option | MultiValue<Option> | undefined = defaultValue
    ? transformToOptions(defaultValue)
    : undefined;
  return (
    <div className={`form-dropdown-container ${className ? className : ""}`}>
      <label htmlFor={`${title}-input`}>{title}</label>
      <Select
        options={options}
        defaultValue={defaultOption}
        classNamePrefix={"dropdown-input"}
        name={`${title}-dropdown`}
        id={`${title}-input`}
        onChange={(e) => {
          if (!e) return setValue("");
          if (!isMultiValue(e)) return setValue(e.value ? e.value : "");
          const selected = e.map((e) => e.value);
          const stringValue = JSON.stringify(selected);
          return setValue(stringValue ? stringValue : "");
        }}
        isMulti={isMulti}
        isClearable={isClearable}
        required={required}
      />
      <input
        style={{
          position: "absolute",
          zIndex: -1,
          visibility: "hidden",
          padding: 0,
          margin: 0,
          fontSize: 0,
          width: 0,
          height: 0,
        }}
        name={`${title}`}
        value={value}
        onChange={(e) => {
          e.preventDefault();
        }}
      />
    </div>
  );
};
export const PassiveCreateDropDownInput = ({
  title,
  className,
  required,
  defaultValue,
  options,
  isMulti = false,
  isClearable,
}: {
  isClearable?: boolean;
  isMulti?: boolean;
  options: MultiValue<Option>;
  defaultValue?: string[] | string;
} & Omit<FormInputProps, "defaultValue">) => {
  const [value, setValue] = useState(
    Array.isArray(defaultValue)
      ? JSON.stringify(defaultValue)
      : defaultValue
      ? defaultValue
      : ""
  );
  const defaultOption: Option | MultiValue<Option> | undefined = defaultValue
    ? transformToOptions(defaultValue)
    : undefined;
  return (
    <div className={`form-dropdown-container ${className ? className : ""}`}>
      <label htmlFor={`${title}-input`}>{title}</label>
      <CreatableSelect
        options={options}
        defaultValue={defaultOption}
        classNamePrefix={"dropdown-input"}
        name={`${title}-dropdown`}
        id={`${title}-input`}
        onChange={(e) => {
          if (!e) return setValue("");
          if (!isMultiValue(e)) return setValue(e.value ? e.value : "");
          const selected = e.map((e) => e.value);
          const stringValue = JSON.stringify(selected);
          return setValue(stringValue ? stringValue : "");
        }}
        isMulti={isMulti}
        isClearable={isClearable}
        required={required}
      />
      <input
        style={{
          position: "absolute",
          zIndex: -1,
          visibility: "hidden",
          padding: 0,
          margin: 0,
          fontSize: 0,
          width: 0,
          height: 0,
        }}
        name={`${title}`}
        value={value}
        onChange={() => {}}
      />
    </div>
  );
};
export const ControlledDropDownInput = ({
  title,
  className,
  required,
  defaultValue,
  options,
  onChange,
  isMulti = false,
  isClearable,
  value,
}: {
  isClearable?: boolean;
  isMulti?: boolean;
  options: Option[];
  defaultValue?: string[] | string;
  value?: string | string[];
  onChange?: (e: SingleValue<Option> | MultiValue<Option>, action: any) => void;
} & Omit<FormInputProps, "defaultValue">) => {
  const defaultOption: Option | MultiValue<Option> | undefined = defaultValue
    ? transformToOptions(defaultValue)
    : undefined;
  return (
    <Select
      options={options}
      defaultValue={defaultOption}
      className={`form-inputs-dropdown ${className ? " " + className : ""} `}
      classNamePrefix={"dropdown-input"}
      name={title}
      id={`${title}-input`}
      onChange={onChange}
      value={value ? transformToOptions(value) : undefined}
      isMulti={isMulti}
      isClearable={isClearable}
      required={required}
    />
  );
};
export default PassiveFormInput;
