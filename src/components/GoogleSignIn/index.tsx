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
  const handleFailure = (error:any) => {
    console.log(error)
  }
  return (
    <GoogleLogin
      clientId="456127615538-je5k6c367plkld6ulva7ovdrq2mksuj2.apps.googleusercontent.com"
      buttonText="Login with Google"
      onSuccess={responseGoogle}
      onFailure={handleFailure}
    />
  );
}
