import React from "react";
import { useDispatch } from "react-redux";
import GoogleLogin from "react-google-login";

//redux
import { googleSignIn } from "../../redux/actions";

export default function GoogleSignIn() {
  const dispatch = useDispatch();
  const responseGoogle = (response: any) => {
    dispatch(googleSignIn(response.tokenId));
  };
  return (
    <GoogleLogin
      clientId="456127615538-nluujdn800184ps5cg7su6jh2vujvh2t.apps.googleusercontent.com"
      buttonText="Login with Google"
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
    />
  );
}
