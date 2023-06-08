import { useState } from "react";
interface signInError{
    err: boolean;
    message: JSX.Element;
}

const useLoginError = ({
  loginType
}: { loginType: "googleLogin" | "guestLogin" }): [signInError, ()=>void] => {
    const [signInErr, setSignInErr] = useState({
      err: false,
      message: <div></div>,
    }); 

  const onSignInError = ():void => {
    if (loginType === "googleLogin") {
        setSignInErr({
          err: true,
          message: (
            <div>
              We could not log you in. To create an account, request to
              contribute using the following methods.
              <ol>
                <li>Fill out this form</li>
                <li>
                  {`Email us at`}
                  <a
                    href={`mailto:${process.env.REACT_APP_SUPPORT_EMAIL}`}
                  >
                    {process.env.REACT_APP_SUPPORT_EMAIL}
                  </a>
                </li>
              </ol>
            </div>
          ),
        });
    }
    else {
      setSignInErr({
        err: true, 
        message: <div>

        </div>
      })
    }

  };
  return [signInErr, onSignInError ]
}
export default useLoginError