import { createContext, useState, useEffect, useContext } from "react";
import CognitoAuthentication, {
  CognitioCredentials,
} from "./CognitoAuthentication";
type CredentialsContextType = {
  credentials: CognitioCredentials | null;
  logout: () => Promise<void>;
  refreshAccessToken: () => Promise<CognitioCredentials | undefined>;
};
export const CredentialsContext = createContext<CredentialsContextType | null>(
  null
);
const cmsAppAuthUserDomain = process.env.REACT_APP_CMS_AUTH_DOMAIN;
const userPoolId = process.env.REACT_APP_AWS_USER_POOL_ID;
const clientId = process.env.REACT_APP_AWS_USER_POOL_CLIENT_ID;
const cognitoClient = new CognitoAuthentication({
  userPoolId: userPoolId,
  clientId,
  customHostedUIDomain: cmsAppAuthUserDomain,
});
export const useAuthProvider = () => useContext(CredentialsContext);
export const Authentication = ({
  children,
}: {
  children: JSX.Element | JSX.Element[] | string;
}) => {
  const [credentials, setCredentials] = useState<null | CognitioCredentials>(
    null
  );
  useEffect(() => {
    let mounted = false;
    const login = async () => {
      if (mounted) return null;
      const result = await cognitoClient.login();
      if (!result) return null;
      setCredentials(result);
      return result;
    };
    login();
    return () => {
      mounted = true;
    };
  }, []);
  const logout = () => cognitoClient.logout();
  const refreshAccessToken = async () => {
    if (!credentials) return;
    const result = await cognitoClient.refreshAccessToken(credentials);
    if (!result) return;
    setCredentials(result);
    return result;
  };
  return (
    <CredentialsContext.Provider
      value={{ credentials, logout, refreshAccessToken }}
    >
      {children}
    </CredentialsContext.Provider>
  );
};
