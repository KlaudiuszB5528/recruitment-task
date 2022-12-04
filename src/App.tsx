import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Registration from "./pages/Registration";
import { PeopleContextProvider } from "./context/people";

const router = createBrowserRouter([
  {
    path: "/recruitment-task/",
    element: <Home />,
  },
  {
    path: "/recruitment-task/registration",
    element: <Registration />,
  },
]);

const App = () => {
  return (
    <PeopleContextProvider>
      <RouterProvider router={router} />
    </PeopleContextProvider>
  );
};

export default App;
