import { useEffect, useState } from "react";
import { getPrfoileItineraryFeedDataSF } from "../svc/feed";
import { TAppState, TUserDTO } from "../types";
import { FeedList } from "../components/Feed/FeedList";
import { useParams } from "react-router-dom";
import { getUserMetadata, updateUserMetaData } from "../svc/auth";
import { Profile as ProfileIcon } from "../Icons/Profile";
import { addToStorageBucketSF, getBucketFileUrlSF } from "../svc/storage";
import auth from "../redux/slices/auth";
import feed from "../redux/slices/feed";
import loader from "../redux/slices/loader";
import { useSelector } from "react-redux";
import { store } from "../redux/store";
import { Edit } from "../Icons/Edit";

export const Profile = () => {
  const { id } = useParams();
  const [profileData, setProfileData] = useState<TUserDTO | null>(null);
  const [userNameInput, toggleUserNameInput] = useState<boolean>(false);
  const { user: authState } = useSelector((state: TAppState) => state.auth);
  const feedState = useSelector((state: TAppState) => state.feed);
  const loaderState = useSelector((state: TAppState) => state.loader);

  const updateProfilePic = async (file: FileList | null) => {
    if (file && authState && profileData?.user_id === authState.user_id) {
      store.dispatch(loader.actions.setloader(true));
      const url = URL.createObjectURL(file[0]);
      const resourceName = await addToStorageBucketSF(url, "profile-pics");
      const data = await getBucketFileUrlSF(resourceName, "profile-pics");
      const user = await updateUserMetaData({
        ...authState,
        profile_pic: data.publicUrl,
      });
      setProfileData(user);
      store.dispatch(auth.actions.setAuth({ user }));
      store.dispatch(loader.actions.setloader(false));
    }
  };

  const updateUserName = async (value: string) => {
    if (value && authState && profileData?.user_id === authState.user_id) {
      store.dispatch(loader.actions.setloader(true));
      const user = await updateUserMetaData({
        ...authState,
        user_name: value,
      });
      setProfileData(user);
      store.dispatch(auth.actions.setAuth({ user }));
      store.dispatch(loader.actions.setloader(false));
    }
    toggleUserNameInput(false);
  };

  const getPrfoileItineraryFeedData = async () => {
    if (id) {
      store.dispatch(loader.actions.setloader(true));
      const userMetadata = await getUserMetadata(id);
      if (userMetadata) {
        setProfileData(userMetadata);
        const { data, count } = await getPrfoileItineraryFeedDataSF(id);
        store.dispatch(feed.actions.setFeed({ ...feedState, count, data }));
      }
      store.dispatch(loader.actions.setloader(false));
    }
  };

  useEffect(() => {
    store.dispatch(
      feed.actions.setFeed({
        pageNumber: 0,
        count: 0,
        data: [],
        searchQuery: "",
      })
    );
    getPrfoileItineraryFeedData();
  }, []);

  if (!profileData || !feedState.data || loaderState) {
    return <></>;
  }

  return (
    <>
      <div className="text-center flex flex-col gap-4 items-center">
        <div className="relative">
          <ProfileIcon iconUrl={profileData.profile_pic} size={100} />
          {profileData.user_id === authState?.user_id && (
            <label className="cursor-pointer text-4xl font-extrabold text-app-secondary-color absolute bottom-0 right-0.5">
              +
              <input
                className="hidden relative"
                placeholder="none"
                type="file"
                accept="image/*"
                name="photos"
                onChange={(event) => updateProfilePic(event.target.files)}
                multiple={false}
              />
            </label>
          )}
        </div>
        <span
          className="w-full text-2xl flex gap-4 items-center justify-center font-bold text-app-color"
          style={{ flexDirection: userNameInput ? "column" : "row" }}
        >
          <div>
            {userNameInput ? (
              <input
                type="text"
                autoFocus
                className="text-center outline-none text-2xl"
                value={profileData.user_name}
                onChange={(event) =>
                  setProfileData({
                    ...profileData,
                    user_name: event.target.value,
                  })
                }
              />
            ) : (
              profileData.user_name
            )}
          </div>

          {userNameInput ? (
            <div className="flex gap-3 items-center">
              <button
                onClick={() => toggleUserNameInput(false)}
                className="bg-app-color h-7 p-1 px-2 text-sm min-w-15 outline-none rounded-lg font-bold text-white uppercase cursor-pointer"
              >
                cancel
              </button>
              <button
                onClick={() => updateUserName(profileData.user_name)}
                className="bg-app-color h-7 p-1 px-2 text-sm min-w-15 outline-none rounded-lg font-bold text-white uppercase cursor-pointer"
              >
                confirm
              </button>
            </div>
          ) : (
            <div
              onClick={() => toggleUserNameInput(true)}
              className="cursor-pointer"
            >
              <Edit />
            </div>
          )}
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
