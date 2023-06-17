import { createContext, useState, useEffect } from "react";

export const CredentialsContext = createContext(null);
const cmsAppAuthUserDomain = process.env.REACT_APP_CMS_AUTH_DOMAIN;
const userPoolId = process.env.REACT_APP_AWS_USER_POOL_ID;
const clientId = process.env.REACT_APP_AWS_USER_POOL_CLIENT_ID;
// const storedCredentials = getLocalStorage<Credentials>("credentials");
const onLogin = () => {
  const loginLink = `https://${cmsAppAuthUserDomain}/login?response_type=code&client_id=${clientId}&redirect_uri=${window.location.origin}`;
  window.location.href = loginLink;
};
const validateToken = async() => {

}
const Authentication = ({
  children,
}: {
  children: JSX.Element | JSX.Element[] | string;
}) => {
//   //grab code from url header
//   const query = new URLSearchParams(window.location.search);
//   const code = query.get("code");
//   const [credentials, setCredentials] = useState<null | Credentials>(null);
//   //store credentials in local storage so on reload we have new creds
//   useEffect(() => {
//     storeInLocalStorage("credentials", credentials);
//   }, [credentials]);
//   useEffect(() => {
//     //   setCredentials(storedCredentials);
//   }, []);
//   //   useEffect(() => {}, []);

// //   //const onLogout = () => {};
//   // const authenticationDetials = new AuthenticationDetails();
};
