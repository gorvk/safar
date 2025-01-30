import { Timestamp } from "firebase/firestore";
import { getDate } from "../../utils";

export const MetadataBar = (props: {
  userId: string;
  uploadedDuration: Timestamp;
}) => {
  const { userId, uploadedDuration } = props;
  const formatedDate = getDate(uploadedDuration);

  return (
    <div className="flex justify-start gap-6 text-gray-500 font-medium">
      <div>{userId}</div>
      <div>{formatedDate}</div>
    </div>
  );
};
