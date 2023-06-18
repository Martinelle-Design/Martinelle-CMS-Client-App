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
  popUpWindow?: boolean;
  userPoolId?: string;
  clientId?: string;
  customHostedUIDomain?: string;
  callbackUrl?: string;
};
function changeurl(url: string, title: string) {
  var new_url = url;
  window.history.pushState("data", title, new_url);
}
function delayAsyncFunc(delay: number, promiseFunc: () => Promise<any>) {
  return new Promise(function (resolve, reject) {
    setTimeout(async function () {
      const result = await promiseFunc();
      resolve(result);
    }, delay);
  });
}
export default class CognitoAuthentication {
  public userPoolId: string;
  public clientId: string;
  public customHostedUIDomain?: string;
  public code?: string;
  public credentials?: CognitioCredentials;
  public callbackUrl: string;
  public popUpWindow?: boolean;
  private isLoggingIn?: boolean;
  constructor(props: CognitoAuthenticationProps) {
    this.userPoolId = props.userPoolId ? props.userPoolId : "";
    this.clientId = props.clientId ? props.clientId : "";
    this.customHostedUIDomain = props.customHostedUIDomain;
    this.popUpWindow = props.popUpWindow ? props.popUpWindow : false;
    this.callbackUrl = props.callbackUrl
      ? props.callbackUrl
      : window.location.origin;
  }
  login = async () => {
    if (this.isLoggingIn) return null;
    this.isLoggingIn = true;
    const credentialsFromCode = await this.handleCode(window);
    if (credentialsFromCode) {
      this.isLoggingIn = false;
      return credentialsFromCode;
    }
    const storedCredentials = getLocalStorage<CognitioCredentials>(
      `${this.customHostedUIDomain}.credentials`
    );
    const credentials = storedCredentials
      ? storedCredentials
      : this.credentials;
    if (!credentials) {
      this.isLoggingIn = false;
      return await this.navigateToHostedUI();
    }
    const result = await this.refreshAccessToken(credentials);
    this.isLoggingIn = false;
    return result;
  };
  logout = async (
    e?: Omit<
      CognitoAuthenticationProps,
      "code_challenge" | "code_challenge_method"
    >
  ) => {
    //delete stored credentials
    deleteFromLocalStorage(`${this.customHostedUIDomain}.credentials`);
    //revoke token
    await this.revokeCurrentTokens();
    this.credentials = undefined;
    //revoke session
    this.revokeSession(e);
  };
  handleCode = async (window: Window) => {
    const query = new URLSearchParams(window.location.search);
    const code = query.get("code");
    if (!code) return null;
    const exchangeCodeForCreds = async () => {
      try {
        const { data } = await axios({
          url: `https://${this.customHostedUIDomain}/oauth2/token`,
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          data: {
            grant_type: "authorization_code",
            client_id: this.clientId,
            code: code,
            redirect_uri: this.callbackUrl,
          },
        });
        this.credentials = data;
        storeInLocalStorage(
          `${this.customHostedUIDomain}.credentials`,
          this.credentials
        );
        query.delete("code");
        changeurl(this.callbackUrl, document.title);
        return data as CognitioCredentials;
      } catch (err) {
        console.log(query.toString());
        query.delete("code");
        changeurl(this.callbackUrl, document.title);
        console.log(err, "could not fetch creds from code");
        return null;
      }
    };
    const result = await delayAsyncFunc(500, exchangeCodeForCreds);
    return result as CognitioCredentials | null;
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
        redirect_uri: this.callbackUrl,
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
  navigateToHostedUI = async (e?: CognitoAuthenticationProps) => {
    const request = axios.getUri({
      url: `https://${this.customHostedUIDomain}/login`,
      method: "GET",
      params: {
        response_type: "code",
        client_id: this.clientId,
        redirect_uri: this.callbackUrl,
        ...e,
      },
    });
    if (!this.popUpWindow) {
      window.location.href = request;
      return null;
    }
    const promise = this.handlePopUpLogin(request);
    return await promise;
  };
  handlePopUpLogin = (request: string) => {
    const promise = new Promise(async (resolve, reject) => {
      const hostedUIWindow = window.open(request, "", "width=500,height=650");
      if (!hostedUIWindow) return resolve(null);
      let processCode = false;
      const interval = setInterval(async () => {
        if (!hostedUIWindow) return;
        try {
          const query = new URLSearchParams(hostedUIWindow.location.search);
          const code = query.get("code");
          if (!code) return;
          if (processCode) return;
          processCode = true;
        } catch (err) {
          //we will trigger a cross-origin error
          //when trying to read the url of the hosted ui page
          //however, this is necessary because we need to detect
          //when the page redirects back to our origin
          //so that we can grab the authorization code from the search params
          //in the redirected url
          return;
        }
        const newCreds = await this.handleCode(hostedUIWindow);
        hostedUIWindow.close();
        clearInterval(interval);
        resolve(newCreds);
      }, 100);
      hostedUIWindow.addEventListener("close", () => {
        clearInterval(interval);
        resolve(null);
      });
    }) as Promise<CognitioCredentials | null>;
    return promise;
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
      storeInLocalStorage(
        `${this.customHostedUIDomain}.credentials`,
        this.credentials
      );
      return this.credentials;
    } catch (err) {
      console.log(err);
      //this means token is invalid or corrupted
      //so we need to re-login
      deleteFromLocalStorage(`${this.customHostedUIDomain}.credentials`);
      return await this.navigateToHostedUI();
    }
  };
  isAuthenticated = () => {
    return !!this.credentials;
  };
}
