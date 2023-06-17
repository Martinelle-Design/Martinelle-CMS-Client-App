import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom";
import LoadingIcon from "./utilities/loadingIcon/LoadingIcon";
import { Authentication } from "./authentication/Authentication";
import Root from "./root";
const HomePage = lazy(() => import("./homePage/HomePage"));
const ServicesPage = lazy(() => import("./servicesPage/ServicesPage"));
const ProjectsPage = lazy(() => import("./projectsPage/ProjectsPage"));
const ProjectsClickableBannerEditable = lazy(() =>
  import("./utilities/projectsClickableBanner/ProjectsClickableBanner").then(
    (module) => ({ default: module.ProjectClickableBannerEditable })
  )
);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route index element={<HomePage />} />
      <Route path="home/*" element={<HomePage />} />
      <Route path="services/*" element={<ServicesPage />} />
      <Route path="projects/*" element={<ProjectsPage />} />
      <Route
        path="project-categories/*"
        element={<ProjectsClickableBannerEditable />}
      />
    </Route>
  )
);
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Suspense
      fallback={
        <LoadingIcon
          entireViewPort
          strokeColor="#37673F"
          backgroundColor="#fdfdfd"
        />
      }
    >
      <Authentication>
        <RouterProvider router={router} />
      </Authentication>
    </Suspense>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
