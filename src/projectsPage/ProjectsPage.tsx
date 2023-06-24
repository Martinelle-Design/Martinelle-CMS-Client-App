import { Route, Routes } from "react-router-dom";
import ProjectIndexPage from "./ProjectIndexPage";
import ProjectSubPage from "./subPages/projectSubPage/ProjectSubPage";
import useClientAppItems from "../hooks/use-client-app-items";
import { ProjectButtonItem } from "../utilities/types/types";
import { camelCase, kebabCase, snakeCase, startCase } from "lodash";
const ProjectPage = () => {
  const { items: databaseItems } = useClientAppItems<ProjectButtonItem>({
    itemType: "projectButtons",
  });
  return (
    <Routes>
      <Route index element={<ProjectIndexPage />} />
      {databaseItems.map((item) => {
        const itemUrl = item.url;
        const removeSplit = itemUrl.split("/").reduce((a, b) => a + b);
        const urlToWords = kebabCase(removeSplit).split("-").join(" ");
        const urlToTitle = startCase(camelCase(urlToWords));
        const title = `Featured ${urlToTitle}`;
        const subType = kebabCase(removeSplit);
        return (
          <Route
            key={item.id}
            path={item.url}
            element={
              <ProjectSubPage
                className={
                  subType === "hospitality" ? "hospitality-pg" : undefined
                }
                title={title}
                subType={subType}
              />
            }
          />
        );
      })}
      {/* <Route
        path="/residential"
        element={
          <ProjectSubPage title="Featured Residental" subType="residential" />
        }
      />
      <Route
        path="/commercial"
        element={
          <ProjectSubPage title="Featured Commercial" subType="commercial" />
        }
      />
      <Route
        path="/furniture-manufacturing"
        element={
          <ProjectSubPage
            title="Featured Furniture Manufacturing"
            subType="furniture-manufacturing"
          />
        }
      />
      <Route
        path="/hospitality"
        element={
          <ProjectSubPage
            title="Featured Hospitality"
            className="hospitality-pg"
            subType="hospitality"
          />
        }
      /> */}
    </Routes>
  );
};
export default ProjectPage;
