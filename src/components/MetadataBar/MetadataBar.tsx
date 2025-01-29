import { Timestamp } from "firebase/firestore";

export const MetadataBar = (props: {
  userId: string;
  uploadedDuration: Timestamp;
}) => {
  const { userId, uploadedDuration } = props;
  const timeStamp = new Timestamp(uploadedDuration.seconds, uploadedDuration.nanoseconds);
  const date = timeStamp.toDate();
  const formatedDate = date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear()

  return (
    <div className="flex justify-start gap-6 text-gray-500 font-medium">
      <div>{userId}</div>
      <div>{formatedDate}</div>
    </div>
  );
};
