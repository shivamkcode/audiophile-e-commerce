import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AlertContextType {
  alert: string | null;
  alertType: 'success' | 'error' | null;
  setAlert: (message: string | null, type: 'success' | 'error') => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const AlertProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [alert, setAlertMessage] = useState<string | null>(null);
  const [alertType, setAlertType] = useState<'success' | 'error' | null>(null);

  const setAlert = (message: string | null, type: 'success' | 'error') => {
    setAlertMessage(message);
    setAlertType(type);
  };

  return (
    <AlertContext.Provider value={{ alert, alertType, setAlert }}>
      {children}
    </AlertContext.Provider>
  );
};

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error("useAlert must be used within an AlertProvider");
  }
  return context;
};
