import React from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  useLocation,
} from "react-router-dom";

// Uncommenting these two lines breaks the production minified build
// import { LinkContainer } from "react-router-bootstrap";
// console.log("LinkContainer", LinkContainer);

const root = createRoot(document.getElementById("root"));

let router = createBrowserRouter([
  {
    path: "*",
    Component() {
      let location = useLocation();
      return React.createElement("div", null, [
        React.createElement(
          "button",
          { onClick: () => router.navigate("/") },
          "Home"
        ),
        React.createElement(
          "button",
          { onClick: () => router.navigate("/page") },
          "Page"
        ),
        React.createElement(
          "p",
          null,
          `current location: ${location.pathname}`
        ),
      ]);
    },
  },
]);

router.subscribe(({ location }) => {
  console.log("router received new location:", location.pathname);
});

root.render(
  React.createElement(React.StrictMode, null, [
    React.createElement(RouterProvider, { router }),
  ])
);
