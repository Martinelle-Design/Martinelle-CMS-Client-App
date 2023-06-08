import React from "react";
import { Route, Routes } from "react-router-dom";
import ProjectIndexPage from "./ProjectIndexPage";
const PrivateResidental = React.lazy(
  () => import("./subPages/PrivateResidental")
);
const Commerical = React.lazy(() => import("./subPages/Commerical"));
const FurnitureManufacturing = React.lazy(
  () => import("./subPages/FurnitureManufacturing")
);
const Hospitality = React.lazy(() => import("./subPages/Hospitality"));
const ProjectPage = () => {
  return (
    <Routes>
      <Route index element={<ProjectIndexPage />} />
      <Route path="/private-residential" element={<PrivateResidental />} />
      <Route path="/commercial" element={<Commerical />} />
      <Route
        path="/furniture-manufacturing"
        element={<FurnitureManufacturing />}
      />
      <Route path="/hospitality" element={<Hospitality />} />
    </Routes>
  );
};
export default ProjectPage;
