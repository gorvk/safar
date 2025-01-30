import { RightArrow } from "../../Icons/RightArrow";

export const SourceDestinationBar = (props: {
  source_destination: string[];
}) => {
  const { source_destination } = props;

  return (
    <div className="font-medium flex justify-start gap-6 items-center">
      <div>{source_destination[0]}</div>
      <div>
        <RightArrow />
      </div>
      <div>{source_destination[1]}</div>
    </div>
  );
};
