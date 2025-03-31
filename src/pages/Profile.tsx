import { useEffect, useState } from "react";
import { getPrfoileItineraryFeedDataSF } from "../svc/feed";
import { useDispatch, useSelector } from "react-redux";
import { TAppState, TUserDTO } from "../types";
import loader from "../redux/slices/loader";
import { FeedList } from "../components/Feed/FeedList";
import feed from "../redux/slices/feed";
import { useParams } from "react-router-dom";
import { getUserMetadata, updateUserMetaData } from "../svc/auth";
import { Profile as ProfileIcon } from "../Icons/Profile";
import { addToStorageBucketSF, getBucketFileUrlSF } from "../svc/storage";
import auth from "../redux/slices/auth";

export const Profile = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [user, setUser] = useState<TUserDTO | null>(null);
  const authState = useSelector((state: TAppState) => state.auth);
  const feedState = useSelector((state: TAppState) => state.feed);
  const loaderState = useSelector((state: TAppState) => state.loader);

  const setProfilePic = async (file: FileList | null) => {
    if (file) {
      const url = URL.createObjectURL(file[0]);
      const resourceName = await addToStorageBucketSF(url, "profile-pics");
      const data = await getBucketFileUrlSF(resourceName, "profile-pics");
      if (authState.user) {
        const user = await updateUserMetaData({
          ...authState.user,
          profile_pic: data.publicUrl,
        });
        dispatch(auth.actions.setAuth({ user }));
      }
    }
  };

  const getPrfoileItineraryFeedData = async () => {
    if (id) {
      dispatch(loader.actions.setloader(true));
      const userMetadata = await getUserMetadata(id);
      if (userMetadata) {
        setUser(userMetadata);
        const { data, count } = await getPrfoileItineraryFeedDataSF(id);
        dispatch(feed.actions.setFeed({ ...feedState, count, data }));
      }
      dispatch(loader.actions.setloader(false));
    }
  };

  useEffect(() => {
    dispatch(
      feed.actions.setFeed({
        pageNumber: 0,
        count: 0,
        data: [],
        searchQuery: "",
      })
    );
    getPrfoileItineraryFeedData();
  }, []);

  if ((!feedState.data && loaderState) || !user) {
    return <></>;
  }

  return (
    <>
      <div className="text-center flex flex-col gap-4 items-center">
        <div className="relative">
          {user.profile_pic ? (
            <img src={user.profile_pic} className="h-24 w-24 rounded-full" />
          ) : (
            <ProfileIcon size="24" />
          )}
          <label className="cursor-pointer text-3xl font-extrabold text-app-secondary-color absolute bottom-0 right-0.5">
            +
            <input
              className="hidden relative"
              placeholder="none"
              type="file"
              accept="image/*"
              name="photos"
              onChange={(event) => setProfilePic(event.target.files)}
              multiple={false}
            />
          </label>
        </div>
        <span className="text-2xl font-bold text-app-color uppercase">
          {user.user_name}
        </span>
      </div>
      <hr className="mt-2 mb-4 text-app-seperator" />
      <div>
        <span className="text-lg font-medium">Posts -</span>
        <FeedList
          defaultData={{ count: feedState.count, data: feedState.data || [] }}
        />
      </div>
    </>
  );
};
