import { RightArrow } from "../../Icons/RightArrow";

export const SourceDestinationBar = (props: {
  source: string;
  destination: string;
}) => {
  const { source, destination } = props;

  return (
    <div className="font-medium flex justify-start gap-6 items-center">
      <div>{source}</div>
      {destination && (
        <>
          <div>
            <RightArrow />
          </div>
          <div>{destination}</div>
        </>
      )}
    </div>
  );
};
