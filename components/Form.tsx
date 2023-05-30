"use client";
import { createRef, forwardRef } from "react";
import { FormStyles } from "./styles/styles";

interface FormProps {
  children: React.ReactNode;
  className?: string;
  htmlFor?: string;
}

const FormField = ({ children, className }: FormProps) => {
  return (
    <div className={`${className} ${FormStyles.form.field}`}>{children}</div>
  );
};

const FormLabel = ({ children, className, htmlFor }: FormProps) => {
  return (
    <div className="md:w-1/4">
      <label
        className={`${className} ${FormStyles.form.label}`}
        htmlFor={htmlFor}
      >
        {children}
      </label>
    </div>
  );
};

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  type: string;
}

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ className, type, ...props }, ref) => {
    const inputRef = ref || createRef<HTMLInputElement>();

    var inputStyle = FormStyles.input.text;
    var boxStyle = FormStyles.form.box;

    if (type === "checkbox" || type === "radio") {
      inputStyle = FormStyles.input.checkbox;
      boxStyle = "";
    } else if (type === "file") {
      inputStyle = FormStyles.input.file;
    }

    return (
      <div className={boxStyle}>
        <input
          ref={inputRef}
          className={`${className} ${inputStyle}`}
          type={type}
          {...props}
        />
      </div>
    );
  }
);

interface FormTextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
}

const FormTextarea = ({ className, ...props }: FormTextAreaProps) => {
  return (
    <div className="md:w-3/4">
      <textarea {...props} className={`${FormStyles.form.textarea}`}></textarea>
    </div>
  );
};

interface FormSelectProps extends React.InputHTMLAttributes<HTMLSelectElement> {
  children: React.ReactNode;
  defaultValue?: string | number;
  className?: string;
}

const FormSelect = ({
  children,
  className,
  defaultValue,
  ...props
}: FormSelectProps) => {
  return (
    <div className="md:w-3/4">
      <select
        className={`${className} ${FormStyles.form.select}`}
        defaultValue={defaultValue}
        {...props}
      >
        {children}
      </select>
    </div>
  );
};

export type OptionProps = {
  value: string | number;
  name?: string;
};

const FormSelectOption = ({ options }: { options: OptionProps[] }) => {
  return (
    <>
      {options.length > 0 &&
        options?.map((option, index) => (
          <option
            key={index}
            className={FormStyles.form.option}
            value={option.value}
          >
            {option.name}
          </option>
        ))}
    </>
  );
};

FormField.Label = FormLabel;
FormField.Input = FormInput;
FormField.Textarea = FormTextarea;
FormField.Select = FormSelect;
FormField.Option = FormSelectOption;

export default FormField;
