import { useState, useEffect, MouseEvent } from "react";
import { getUserMetadata } from "../../svc/auth";
import { Profile } from "../../Icons/Profile";
import { useNavigate } from "react-router-dom";

export const MetadataBar = (props: {
  userId?: string;
  timeStamp: string;
}) => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const { userId, timeStamp } = props;

  useEffect(() => {
    (async () => {
      if (userId) {
        const _userName = await getUserMetadata(userId);
        setUserName(_userName);
      }
    })();
  }, []);

  const navitgateToProfile = (
    event: MouseEvent<HTMLDivElement, globalThis.MouseEvent>
  ) => {
    event.preventDefault();
    event.stopPropagation();
    if (userId) {
      navigate(`/${userId}/profile`);
    }
  };

  return (
    <div className="flex items-center justify-between font-bold">
      {userId && (
        <div
          onClick={navitgateToProfile}
          className="flex items-center gap-2 cursor-pointer"
        >
          <Profile /> {userName}
        </div>
      )}
      <div className="text-app-color-light">{timeStamp}</div>
    </div>
  );
};
