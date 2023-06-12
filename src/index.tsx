import React from "react";
import { createRoot } from "react-dom/client";
import {
  RouterProvider,
  createBrowserRouter,
  useLocation,
} from "react-router-dom";

// Uncommenting these two lines breaks the production minified build
import { LinkContainer } from "react-router-bootstrap";
console.log("LinkContainer", LinkContainer);

const root = createRoot(document.getElementById("root")!);

let router = createBrowserRouter([
  {
    path: "/*",
    Component() {
      return (
        <>
          <button onClick={() => router.navigate("/")}>Home</button>{" "}
          <button onClick={() => router.navigate("/page")}>Page</button>
          <p>current location: {useLocation().pathname}</p>
        </>
      );
    },
  },
]);

router.subscribe(({ location }) => {
  console.log("router received new location:", location.pathname);
});

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
