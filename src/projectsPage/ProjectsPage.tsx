import { Route, Routes } from "react-router-dom";
import ProjectIndexPage from "./ProjectIndexPage";
import ProjectSubPage from "./subPages/projectSubPage/ProjectSubPage";
import useClientAppItems from "../hooks/use-client-app-items";
import { ProjectButtonItem } from "../utilities/types/types";
import { camelCase, kebabCase, startCase } from "lodash";
const ProjectPage = () => {
  const { items: databaseItems } = useClientAppItems<ProjectButtonItem>({
    itemType: "projectButtons",
  });
  return (
    <Routes>
      <Route index element={<ProjectIndexPage />} />
      {databaseItems.map((item) => {
        const itemUrl = item.url;
        const removeSplit = itemUrl
          .replace("/projects", "")
          .split("/")
          .reduce((a, b) => a + b);
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
    </Routes>
  );
};
export default ProjectPage;
