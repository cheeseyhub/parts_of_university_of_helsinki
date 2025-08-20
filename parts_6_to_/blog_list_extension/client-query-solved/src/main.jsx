import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NotificationContextProvider } from "./contexts/notificationContext";
import { UserContextProvider } from "./contexts/userContext";
import { BrowserRouter } from "react-router-dom";
import App from "../src/App";

const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <NotificationContextProvider>
        <UserContextProvider>
          <App />
        </UserContextProvider>
      </NotificationContextProvider>
    </QueryClientProvider>
  </BrowserRouter>
);
