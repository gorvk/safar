import { useState } from "react";
import { hours, minutes } from "../../constants";
import { TTimepickerState } from "../../types";

export const Timepicker = (props: {
  name: string;
  defaultValue?: { hour: string; minute: string; meridiem: string };
}) => {
  const { name, defaultValue } = props;

  const [state, setState] = useState(
    defaultValue || { hour: "05", minute: "00", meridiem: "am" }
  );

  const handleChange = (
    key: keyof TTimepickerState,
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setState((prevState) => ({
      ...prevState,
      [key]: e.target.value,
    }));
  };

  return (
    <div className="flex relative max-w-80 gap-4 text-md">
      <label className="text-md w-2/3 truncate text-white">{`Time: * `}</label>
      <div className="flex">
        <div>
          <select
            name={`${name}/visited_hour`}
            value={state.hour}
            onChange={(e) => handleChange("hour", e)}
            className="appearance-none text-center w-8"
          >
            {hours.map((hour) => (
              <option className="text-black" key={hour}>
                {hour}
              </option>
            ))}
          </select>
        </div>
        <div>:</div>
        <div>
          <select
            name={`${name}/visited_minute`}
            value={state.minute}
            onChange={(e) => handleChange("minute", e)}
            className="appearance-none text-center w-8"
          >
            {minutes.map((minute) => (
              <option className="text-black" key={minute}>
                {minute}
              </option>
            ))}
          </select>
        </div>
        <div>
          <select
            name={`${name}/visited_meridiem`}
            value={state.meridiem}
            onChange={(e) => handleChange("meridiem", e)}
            className="appearance-none text-center w-8"
          >
            <option className="text-black" key="am">
              am
            </option>
            <option className="text-black" key="pm">
              pm
            </option>
          </select>
        </div>
      </div>
    </div>
  );
};
