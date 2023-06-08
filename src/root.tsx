import SecondaryNavbar from "./utilities/secondaryNavbar/SecondaryNavbar";
import { ScrollRestoration } from "react-router-dom";
import { Outlet } from "react-router-dom";
const Navbar = () => {
  return <SecondaryNavbar />;
};
const Root = () => {
  return (
    <>
      <ScrollRestoration />
      <Navbar />
      <div id={"general-app-container"}>
        <Outlet />
      </div>
    </>
  );
};
export default Root;
