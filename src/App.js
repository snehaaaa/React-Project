import React from "react";
import ReactDOM from "react-dom/client";
import CustomersDashboard from "./components/CustomersDashboard";

const styleCard = {
  backgroundColor: "#f0f0f0",
};

const AppLayout = () => {
  return (
    <div className="app">
      <CustomersDashboard />
    </div>
  );
};
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<AppLayout />);
