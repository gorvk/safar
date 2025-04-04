import { useState } from "react";
import { getDate } from "../../utils";

export const Datepicker = (props: {
  defaultValue: string | undefined;
  name: string;
  labelColor: "text-gray-500" | "text-white";
  required: boolean;
  scheme: "scheme-light" | "scheme-dark";
}) => {
  const {
    defaultValue,
    name,
    required,
    labelColor,
    scheme,
  } = props;
  const currentDate = getDate((new Date()).toISOString());
  const [value, setValue] = useState<string>(defaultValue || currentDate);

  return (
    <div className="flex text-md relative max-w-80">
      <label className={`w-2/3 truncate ${labelColor}`}>
        {`Date: ${required ? '*' : ''} `}
      </label>
      <input
        type="date"
        name={name}
        value={value}
        required={required}
        onChange={(event) => setValue(event.target.value)}
        className={`outline-0 ${scheme}`}
      />
    </div>
  );
};
