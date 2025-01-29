import rightArrow from "../../assets/icons/right-arrow.svg";

export const SourceDestinationBar = (props: {
  source_destination: string[];
}) => {
  const { source_destination } = props;

  return (
    <div className="font-medium flex justify-start gap-6">
      <div>{source_destination[0]}</div>
      <div>
        <img height="20" width="20" src={rightArrow} />
      </div>
      <div>{source_destination[1]}</div>
    </div>
  );
};
