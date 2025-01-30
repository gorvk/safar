import { TCheckpoint } from "../../types";
import { getTime } from "../../utils";
export const CheckpointItem = (props: { checkpoint: TCheckpoint }) => {
  const { checkpoint } = props;
  const time = getTime(checkpoint.visited_at);

  return (
    <li>
      <div className="border-r-3 h-4 w-6 border-dashed"/>
      <div onClick={() => window.open(checkpoint.location_url, "_blank")} className="my-1 bg-teal-600 py-2 px-3 rounded-lg text-white font-medium flex justify-between cursor-pointer">
        <div className="flex gap-4 items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 384 512"
            className="w-5 h-5 text-white outline-none dark:text-black fill-white"
          >
            <path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z" />
          </svg>
          <div className="text-lg">{checkpoint.title}</div>
        </div>
        <div className="text-lg">{time}</div>
      </div>
    </li>
  );
};
