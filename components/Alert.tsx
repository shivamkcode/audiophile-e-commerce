import { useAlert } from "@/app/alertContext";
import React, { useEffect } from "react";

const Alert: React.FC = () => {
  const { alert, alertType, setAlert } = useAlert();

  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => setAlert(null, "success"), 2000);
      return () => clearTimeout(timer);
    }
  }, [alert, setAlert]);

  if (!alert) return null;

  const alertColor = alertType === "success" ? "bg-green-500" : "bg-red-500";

  return (
    <div
      className={`fixed bottom-4 right-4 bg-opacity-90 text-white py-2 px-4 rounded shadow-md ${alertColor} z-[1000] animate-fadeInOut`}
    >
      {alert}
      <button className="ml-4" onClick={() => setAlert(null, "success")}>
        X
      </button>
    </div>
  );
};

export default Alert;
