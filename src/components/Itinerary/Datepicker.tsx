import { useState } from "react";

export const Datepicker = (props: {
  defaultValue: string | undefined;
  placeholder: string;
  name: string;
  fontSize: "text-xl" | "text-sm";
}) => {
  const { defaultValue, placeholder, name , fontSize} = props;
  const [value, setValue] = useState<string | undefined>(defaultValue);
  return (
    <div className="flex relative w-lg">
      {!value && <div className="z-10 text-xl w-full">{"Journey date"}</div>}
      <input
        type="date"
        name={name}
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder={placeholder}
        className={`z-20 text-xl w-full outline-0 ${fontSize} ${(!value && "text-transparent")}`}
      />
    </div>
  );
};
