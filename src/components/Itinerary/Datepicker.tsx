import { useState } from "react";
import { getDate } from "../../utils";

export const Datepicker = (props: {
  defaultValue: string | undefined;
  name: string;
  fontSize: "text-xl" | "text-sm";
  labelColor: "text-gray-500" | "text-white";
  required: boolean;
  scheme: "scheme-light" | "scheme-dark";
}) => {
  const {
    defaultValue,
    name,
    fontSize,
    required,
    labelColor,
    scheme,
  } = props;
  const [value, setValue] = useState<string | undefined>(defaultValue);

  return (
    <div className="flex relative max-w-80">
      <label className={`text-xl w-2/3 truncate ${labelColor}`}>
        {"Journey date: "}
      </label>
      <input
        type="date"
        name={name}
        defaultValue={getDate((new Date()).toISOString())}
        value={value}
        required={required}
        onChange={(event) => setValue(event.target.value)}
        className={`text-xl outline-0 ${fontSize} ${scheme}`}
      />
    </div>
  );
};
