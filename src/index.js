import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
// import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { createBrowserRouter, Router, RouterProvider } from "react-router-dom";

import Root from "./routes/root";
import ErrorPage from "./errorPage";
import AddDestinationForm from "./routes/AddDestinationForm";
import { loader as rootLoader, action as rootAction } from "./routes/root";
import { action as formAction } from "./routes/AddDestinationForm";
import DestinationInfo from "./routes/destination";
import Index from "./routes";
import { loader as destinationInfoLoader } from "./routes/destination";
import { action as deleteDestinationAction } from "./routes/delete";
import EditDestination, { action as editAction } from "./routes/edit";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction,
    children: [
      {
        index: true,
        element: <Index />,
      },
      {
        path: "/add_destination",
        element: <AddDestinationForm />,
        action: formAction,
      },
      {
        path: "/destinations/:destinationID",
        element: <DestinationInfo />,
        loader: destinationInfoLoader,
      },
      {
        path: "/destinations/:destinationID/khaatma",

        action: deleteDestinationAction,
      },
      {
        path: "/destinations/:destinationID/edit",
        element: <EditDestination />,
        loader: destinationInfoLoader,
        action: editAction,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
