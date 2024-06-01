import ReactDOM from "react-dom/client";
import { MantineProvider, createTheme } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import MainAppRouter from "./MainAppRouter.jsx";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "./global.css";

const theme = createTheme({});

ReactDOM.createRoot(document.getElementById("root")).render(
  <MantineProvider theme={theme}>
    <Notifications position="top-center" />
    <MainAppRouter />
  </MantineProvider>
);
