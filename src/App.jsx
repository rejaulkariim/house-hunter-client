import { RouterProvider } from "react-router-dom";
import router from "./Routes/Routes";

function App() {
  return (
    <main className="max-w-[1180px] mx-auto px-4 ">
      <RouterProvider router={router}></RouterProvider>
    </main>
  );
}

export default App;
