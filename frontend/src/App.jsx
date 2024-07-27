import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navigation from "./pages/Auth/Navigation";
import { ScrollRestoration } from "react-router-dom";

function App() {
  return (
    <>
      <ToastContainer />
      <Navigation />
      <main className="py-0">
        <ScrollRestoration />
        <Outlet />
      </main>
    </>
  );
}

export default App;
