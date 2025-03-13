import { useState, useEffect } from "react";
import { getUserMetadata } from "../../svc/auth";
import { getDate } from "../../utils";
import { Profile } from "../../Icons/Profile";

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
    <div className="flex items-center justify-between font-bold">
      {userId && (
        <div className="flex items-center gap-2">
          <Profile /> {userName}
        </div>
      )}
      <div className="text-gray-500">{formatedDate}</div>
    </div>
  );
};
