import React from "react";
import styled from "styled-components";

interface SelectOption {
  value: string;
  label: string;
}

interface FieldProps {
  type: string;
  name: string;
  label?: string;
  placeholder?: string;
  options?: SelectOption[];
  onChange?: Function;
  defaultValue?: any;
}

export const FormRow = styled.div`
  display: flex;
  margin-bottom: 20px;
  label {
    width: 140px;
    text-align: right;
    padding: 10px;
  }
  .ctrl-bar {
    display: flex;
    padding: 0 10px;
    background-color: #3b3b3b;
    border-radius: 4px 4px 0 0;
    button {
      display: flex;
      align-items: center;
      justify-content: center;
      background: none;
      border: none;
      font-size: 16px;
      padding: 0;
      width: 32px;
      height: 36px;
      color: #ffffff;
    }
  }
  .ProseMirror {
    padding: 16px;
    width: 100%;
    max-width: 532px;
    min-height: 300px;
    overflow: auto;
    background-color: #ffffff;
    color: #121212;
    p {
      margin-top: 0;
    }
    img {
      max-width: 100%;
    }
    a {
      color: #1a6cb3;
      text-decoration: underline;
    }
  }
`;

const Field: React.FC<FieldProps> = ({
  type,
  name,
  placeholder,
  options,
  onChange,
  defaultValue,
}) => {
  switch (type) {
    case "textarea":
      return (
        <textarea
          name={name}
          placeholder={placeholder}
          onChange={(event) => onChange?.(event.target.value)}
          defaultValue={defaultValue}
        />
      );
    case "select":
      return (
        <select name={name} defaultValue={defaultValue}>
          {options?.map(({ value, label }) => (
            <option key={`${name}-opt-${value}`} value={value}>
              {label}
            </option>
          ))}
        </select>
      );
    default:
      return (
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          onChange={(event) => onChange?.(event.target.value)}
          defaultValue={defaultValue}
        />
      );
  }
};

const FormField: React.FC<FieldProps> = ({
  name,
  label,
  type,
  placeholder,
  options,
  onChange,
  defaultValue,
}) => (
  <FormRow>
    <label htmlFor={name}>{label}</label>
    <Field
      type={type}
      name={name}
      placeholder={placeholder}
      options={options}
      onChange={onChange}
      defaultValue={defaultValue}
    />
  </FormRow>
);

export default FormField;
