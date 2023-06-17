import SecondaryNavbar from "./utilities/secondaryNavbar/SecondaryNavbar";
import { ScrollRestoration } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useAuthProvider } from "./authentication/Authentication";
const Navbar = () => {
  return <SecondaryNavbar />;
};
const Root = () => {
  const defaultEls = (
    <>
      <ScrollRestoration />
      <Navbar />
      <div id={"general-app-container"}></div>
    </>
  );
  const auth = useAuthProvider();
  if (!auth) return defaultEls;
  if (!auth.credentials) return defaultEls;
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
