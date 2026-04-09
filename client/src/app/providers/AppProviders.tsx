import { type ReactNode } from "react";
import { Toaster } from "react-hot-toast";
import { AppProvider } from "../../features/workspace/context/AppContext";

type AppProvidersProps = {
  children: ReactNode;
};

const AppProviders = ({ children }: AppProvidersProps) => {
  return (
    <AppProvider>
      {children}
      <Toaster position="top-right" />
    </AppProvider>
  );
};

export default AppProviders;
