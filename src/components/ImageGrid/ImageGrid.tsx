import { useState } from "react";
import { LeftCaret } from "../../Icons/LeftCaret";
import { RightCaret } from "../../Icons/RightCaret";

export const ImageGrid = (props: { photoUrls: string[] }) => {
  const { photoUrls } = props;
  const pivot = photoUrls.length <= 1 ? 0 : 1;
  const [count, setCount] = useState<number>(pivot);

  const nextImage = () =>
    photoUrls.length - 1 == count ? setCount(pivot) : setCount(count + 1);
  const prevImage = () =>
    count === pivot ? setCount(photoUrls.length - 1) : setCount(count - 1);

  return (
    <div
      className={
        "w-full relative m-auto rounded-xl h-90 bg-black flex items-center " +
        count
      }
    >
      {photoUrls.map((url, index) => {
        const display = index === count ? "block" : "hidden";
        return (
          <img key={index} src={url} className={"max-h-full m-auto " + display} />
        );
      })}
      <button
        onClick={prevImage}
        className="absolute cursor-pointer top-35 w-auto"
      >
        <LeftCaret />
      </button>
      <button
        onClick={nextImage}
        className="absolute cursor-pointer top-35 w-auto right-0"
      >
        <RightCaret />
      </button>
    </div>
  );
};
