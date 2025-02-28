import { Close } from "../../Icons/Close";

export const ImageItem = (props: { src: string; deletePhoto: () => void }) => {
  const { src, deletePhoto } = props;
  return (
    <div className="relative max-w-50 min-w-50">
      <div
        className="absolute top-1 right-1 cursor-pointer hover:bg-black rounded-sm"
        onClick={deletePhoto}
      >
        <Close />
      </div>
      <div>
        <img src={src} />
      </div>
    </div>
  );
};
