import SecondaryNavbar from "./utilities/secondaryNavbar/SecondaryNavbar";
import { ScrollRestoration } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useAuthProvider } from "./authentication/Authentication";
import { Button } from "@mui/material";
const Navbar = () => {
  return <SecondaryNavbar />;
};
const Root = () => {
  const auth = useAuthProvider();
  if (!auth) return <></>;
  const defaultEls = (
    <>
      <ScrollRestoration />
      {auth.credentials && (
        <Button
          variant="contained"
          onClick={auth.logout}
          style={{
            marginTop: "2em",
            marginLeft: "2em",
            marginRight: "2em",
            width: "calc(100% - 4em)",
          }}
        >
          Log out
        </Button>
      )}
      <Navbar />
    </>
  );
  if (!auth.credentials) return defaultEls;
  return (
    <>
      {defaultEls}
      <div id={"general-app-container"}>
        <Outlet />
      </div>
    </>
  );
};
export default Root;
