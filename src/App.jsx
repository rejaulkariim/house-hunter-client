import { RouterProvider } from "react-router-dom";
import router from "./Routes/Routes";

function App() {
  return (
    <main className="max-w-[1080px] mx-auto">
      <RouterProvider router={router}></RouterProvider>
    </main>
  );
}

export default App;
