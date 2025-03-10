import { useState } from "react";

export const Datepicker = (props: {
  defaultValue: string | undefined;
  placeholder: string;
  name: string;
  fontSize: "text-xl" | "text-sm";
  labelBackground: "bg-app-color" | "bg-white";
  required: boolean;
}) => {
  const {
    defaultValue,
    placeholder,
    name,
    fontSize,
    required,
    labelBackground,
  } = props;
  const [value, setValue] = useState<string | undefined>(defaultValue);
  const inputTextTransparent = !value && "text-transparent";

  return (
    <div className={`flex relative w-full`}>
      {!value && (
        <div className={`absolute z-20 text-xl w-2/3 truncate ${labelBackground}`}>
          {"Journey date"}
        </div>
      )}
      <input
        type="date"
        name={name}
        value={value}
        required={required}
        onChange={(event) => setValue(event.target.value)}
        placeholder={placeholder}
        className={`z-10 select-none text-xl w-full outline-0 ${fontSize} ${inputTextTransparent}`}
      />
    </div>
  );
};
