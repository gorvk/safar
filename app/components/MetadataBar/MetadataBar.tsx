import { useState, useEffect, MouseEvent } from "react";
import { getUserMetadata } from "../../svc/auth";
import { Profile } from "../../Icons/Profile";
import { useNavigate } from "react-router";
import { TUserDTO } from "../../types";

export const MetadataBar = (props: { userId?: string; timeStamp: string }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<TUserDTO | null>(null);
  const { userId, timeStamp } = props;

  useEffect(() => {
    (async () => {
      if (userId) {
        const user = await getUserMetadata(userId);
        if (user) {
          setUser(user);
        }
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
      {userId && user && (
        <div
          onClick={navitgateToProfile}
          className="flex items-center gap-2 cursor-pointer"
        >
          <Profile iconUrl={user.profile_pic} />
          {user.user_name}
        </div>
      )}
      <div className="text-app-color-light">{timeStamp}</div>
    </div>
  );
};
