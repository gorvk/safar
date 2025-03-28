import { getPrfoileItineraryFeedDataSF } from "../svc/feed";
import { useSelector } from "react-redux";
import { TAppState } from "../types";
import loader from "../redux/slices/loader";
import { FeedList } from "../components/Feed/FeedList";
import feed from "../redux/slices/feed";
import { LoaderFunctionArgs, useLoaderData, useParams } from "react-router-dom";
import { getUserMetadata } from "../svc/auth";
import { store } from "../redux/store";

export async function clientLoader({
  params,
}: LoaderFunctionArgs): Promise<string | undefined> {
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
}

const Profile = () => {
  const { id } = useParams();
  const {
    feed: feedState,
    loader: loaderState,
    auth,
  } = useSelector((state: TAppState) => state);

  const userName = useLoaderData() as string | undefined;

  return !feedState.data && loaderState ? (
    <></>
  ) : (
    <>
      <div>
        {auth.user?.id === id && `Hey, `}
        <span className="text-2xl font-bold text-app-color uppercase">
          {userName}
        </span>
      </div>
      <hr className="mt-2 mb-4" />
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