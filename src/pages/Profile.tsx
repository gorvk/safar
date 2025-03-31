import { getPrfoileItineraryFeedDataSF } from "../svc/feed";
import { LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import { useSelector } from "react-redux";
import { TAppState, TUserDTO } from "../types";
import { FeedList } from "../components/Feed/FeedList";
import { getUserMetadata, updateUserMetaData } from "../svc/auth";
import { Profile as ProfileIcon } from "../Icons/Profile";
import { addToStorageBucketSF, getBucketFileUrlSF } from "../svc/storage";
import auth from "../redux/slices/auth";
import { useState } from "react";
import feed from "../redux/slices/feed";
import loader from "../redux/slices/loader";
import { store } from "../redux/store";

export async function clientLoader({
  params,
}: LoaderFunctionArgs): Promise<TUserDTO | null> {
  const { id } = params;
  store.dispatch(
    feed.actions.setFeed({
      pageNumber: 0,
      count: 0,
      data: [],
      searchQuery: "",
    })
  );
  if (id) {
    store.dispatch(loader.actions.setloader(true));
    const userName = await getUserMetadata(id);
    const { data, count } = await getPrfoileItineraryFeedDataSF(id);
    const feedState = store.getState().feed;
    store.dispatch(feed.actions.setFeed({ ...feedState, count, data }));
    store.dispatch(loader.actions.setloader(false));
    return userName;
  }
  return null;
}

const Profile = () => {
  const userName = useLoaderData() as TUserDTO | null;
  const [profileData, setProfileData] = useState<TUserDTO | null>(userName);
  const { user: authState } = useSelector((state: TAppState) => state.auth);
  const feedState = useSelector((state: TAppState) => state.feed);
  const loaderState = useSelector((state: TAppState) => state.loader);

  const setProfilePic = async (file: FileList | null) => {
    if (file && authState && profileData?.user_id === authState.user_id) {
      const url = URL.createObjectURL(file[0]);
      const resourceName = await addToStorageBucketSF(url, "profile-pics");
      const data = await getBucketFileUrlSF(resourceName, "profile-pics");
      const user = await updateUserMetaData({
        ...authState,
        profile_pic: data.publicUrl,
      });
      store.dispatch(auth.actions.setAuth({ user }));
    }
  };

  if ((!feedState.data && loaderState) || !profileData) {
    return <></>;
  }

  return (
    <>
      <div className="text-center flex flex-col gap-4 items-center">
        <div className="relative">
          <ProfileIcon iconUrl={profileData.profile_pic} size={96} />
          {profileData.user_id === authState?.user_id && (
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
          )}
        </div>
        <span className="text-2xl font-bold text-app-color uppercase">
          {profileData.user_name}
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

export default Profile;