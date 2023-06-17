import axios from "axios";
import {
  storeInLocalStorage,
  getLocalStorage,
  deleteFromLocalStorage,
} from "../utilities/helpers/localStorageFunc";
export type Only<T, U> = {
  [P in keyof T]: T[P];
} & {
  [P in keyof U]?: never;
};
export type Either<T, U> = Only<T, U> | Only<U, T>;
export type CognitioCredentials = {
  access_token: string;
  id_token: string;
  refresh_token: string;
  token_type: "Bearer";
  expires_in: number;
};
export type CognitioLoginProps = {
  client_id?: string;
  redirect_uri?: string;
  response_type?: "code" | "token";
  state?: string;
  scope?: string;
  code_challenge_method?: "S256" | "plain";
  code_challenge?: string;
};
export type CognitoAuthenticationProps = {
  userPoolId: string;
  clientId: string;
  customHostedUIDomain?: string;
} & Either<{ code: string }, { credentials: CognitioCredentials }>;
export default class CognitoAuthentication {
  public userPoolId: string;
  public clientId: string;
  public customHostedUIDomain?: string;
  public code?: string;
  public credentials?: CognitioCredentials;
  constructor(props: CognitoAuthenticationProps) {
    this.userPoolId = props.userPoolId;
    this.clientId = props.clientId;
    this.customHostedUIDomain = props.customHostedUIDomain;
    this.code = props.code;
    this.credentials = props.credentials;
  }
  login = async () => {
    const storedCredentials =
      getLocalStorage<CognitioCredentials>("credentials");
    if (!storedCredentials) return this.navigateToHostedUI();
    this.refreshAccessToken(storedCredentials);
    return storedCredentials;
  };
  logout = async (
    e?: Omit<
      CognitoAuthenticationProps,
      "code_challenge" | "code_challenge_method"
    >
  ) => {
    //delete stored credentials
    deleteFromLocalStorage("credentials");
    //revoke token
    await this.revokeCurrentTokens();
    this.credentials = undefined;
    //revoke session
    this.revokeSession(e);
  };
  revokeSession = (
    e?: Omit<
      CognitoAuthenticationProps,
      "code_challenge" | "code_challenge_method"
    >
  ) => {
    const request = axios.getUri({
      url: `https://${this.customHostedUIDomain}/logout`,
      method: "GET",
      params: {
        response_type: "code",
        client_id: this.clientId,
        redirect_uri: window.location.origin,
        ...e,
      },
    });
    window.location.href = request;
  };
  revokeCurrentTokens = async () => {
    if (!this.credentials) return;
    //revoke token
    try {
      const revokeToken = await axios({
        url: `https://${this.customHostedUIDomain}/oauth2/revoke`,
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        data: {
          token: this.credentials.refresh_token,
          client_id: this.clientId,
        },
      });
      return revokeToken.data;
    } catch (err) {
      console.log(err);
      return;
    }
  };
  navigateToHostedUI = (e?: CognitoAuthenticationProps) => {
    const request = axios.getUri({
      url: `https://${this.customHostedUIDomain}/login`,
      method: "GET",
      params: {
        response_type: "code",
        client_id: this.clientId,
        redirect_uri: window.location.origin,
        ...e,
      },
    });
    window.location.href = request;
  };
  refreshAccessToken = async (credentials: CognitioCredentials) => {
    const refreshToken = credentials.refresh_token;
    try {
      const { data } = await axios({
        url: `https://${this.customHostedUIDomain}/oauth2/token`,
        method: "POST",
        data: {
          grant_type: "refresh_token",
          client_id: this.clientId,
          refresh_token: refreshToken,
        },
      });
      this.credentials = {
        id_token: credentials.id_token,
        refresh_token: refreshToken,
        ...data,
      };
      storeInLocalStorage("credentials", this.credentials);
      return this.credentials;
    } catch (err) {
      //this means token is invalid or corrupted
      //so we need to re-login
      deleteFromLocalStorage("credentials");
      this.navigateToHostedUI();
    }
  };
}
