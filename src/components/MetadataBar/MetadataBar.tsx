import { getDate } from "../../utils";

export const MetadataBar = (props: {
  userId?: string;
  uploadedDuration: string;
}) => {
  const { userId, uploadedDuration } = props;
  const formatedDate = getDate(uploadedDuration);

  return (
    <div className="justify-start gap-6 text-gray-500 font-medium">
      {userId && <div className="truncate">{userId}</div>}
      <div>{formatedDate}</div>
    </div>
  );
};
