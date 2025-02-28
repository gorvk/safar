import { Close } from "../../Icons/Close";

export const ImageItem = (props: { src: string }) => (
  <div className="relative max-w-50 min-w-50">
    <div className="absolute top-1 right-1">
      <Close />
    </div>
    <div>
      <img src={props.src} />
    </div>
  </div>
);
