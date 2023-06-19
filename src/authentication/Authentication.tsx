import { createContext, useState, useEffect, useContext } from "react";
import {
  CognitoAuthentication,
  CognitioCredentials,
} from "aws-cognito-hosted-ui-provider";
type CredentialsContextType = {
  credentials: CognitioCredentials | null;
  logout: () => Promise<void>;
  refreshAccessToken: () => Promise<CognitioCredentials | undefined>;
};
export const CredentialsContext = createContext<CredentialsContextType | null>(
  null
);
export const useAuthProvider = () => useContext(CredentialsContext);
export const Authentication = ({
  children,
  cognitoClient,
}: {
  children: JSX.Element | JSX.Element[] | string;
  cognitoClient: CognitoAuthentication;
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
  }, [cognitoClient]);
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
