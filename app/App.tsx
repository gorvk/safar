import { RouterProvider } from "react-router";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { routes } from "./routes";

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={routes} />
    </Provider>
  );
}

export default App;
