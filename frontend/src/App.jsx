import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navigation from "./pages/Auth/Navigation";
import { ScrollRestoration } from "react-router-dom";

function App() {
  const [showMessage, setShowMessage] = useState(true);
  const [showAlert, setShowAlert] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowMessage(false), 15000); // Auto-hide after 15 seconds
    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, []);

  return (
    <>
      {showAlert && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "#f9f9f9",
            border: "1px solid #ccc",
            borderRadius: "10px",
            padding: "20px",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            zIndex: 1000,
          }}
        >
          <h2 style={{ color: "#333" }}>Important Notice</h2>
          <p style={{ color: "#555" }}>
            Please note: The application is hosted on a free server (OnRender).
            It may take up to 30-40 seconds to load data when it is not in use.
            Thank you for your patience!
          </p>
          <button
            onClick={() => setShowAlert(false)}
            style={{
              marginTop: "10px",
              padding: "10px 20px",
              backgroundColor: "#007BFF",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Okay
          </button>
        </div>
      )}
      {showMessage && (
        <div
          style={{
            backgroundColor: "#007BFF",
            padding: "10px",
            textAlign: "center",
          }}
        >
          <p>
            Note: The app is hosted on a free server (OnRender). If the app has
            not been used recently, it may take 30-40 seconds to load data.
            Thank you for your patience!
          </p>
        </div>
      )}
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
