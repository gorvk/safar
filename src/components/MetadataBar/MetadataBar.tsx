import { useState, useEffect } from "react";
import { getUserMetadata } from "../../svc/auth";
import { getDate } from "../../utils";

export const MetadataBar = (props: {
  userId?: string;
  uploadedDuration: string;
}) => {
  const [userName, setUserName] = useState("");
  const { userId, uploadedDuration } = props;
  const formatedDate = getDate(uploadedDuration);

  useEffect(() => {
    (async () => {
      if (userId) {
        const _userName = await getUserMetadata(userId);
        setUserName(_userName);
      }
    })();
  }, []);

  return (
    <div className="justify-start gap-6 text-gray-500 font-medium">
      {userId && <div className="truncate">{userName}</div>}
      <div>{formatedDate}</div>
    </div>
  );
};
