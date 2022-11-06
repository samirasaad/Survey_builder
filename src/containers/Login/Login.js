import React, { useState } from "react";
import InputField from "../../controls/InputField/InputField";
import Btn from "../../controls/Btn/Btn";
import { signInFirestore } from "../../firebase/authMethods";
import { Link } from "react-router-dom";
import { getOwnerSurveyTemplte } from "../../utils/shared";

const Login = () => {
  const [userInfo, setUserInfo] = useState({ email: null, password: null });

  const handleInputChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.id]: e.target.value });
  };

  const handleSignIn = async (e, providerType) => {
    e.preventDefault();
    switch (providerType) {
      case "email&password":
        // setGoogleLoading(true);
        await signInFirestore(
          "email&password",
          userInfo.email,
          userInfo.password
        )
          .then((res) => {
            console.log(res.user);
            localStorage.setItem("uid", res.user.uid);
            localStorage.setItem("email", res.user.email);
            localStorage.setItem("isRegistered", "true");
            getOwnerSurveyTemplte(res.user.uid);

            // navigate("/");

            // setUser(res.user);
            // checkUserExistenece(res.user.providerData[0]);
            // setIsSnackbarOpen(false);
          })
          .catch((err) => {
            // setGoogleLoading(false);
            // setIsSnackbarOpen(true);
            // setErrMsg(err.code);
            console.log(err);
          });
        break;
      case "google":
        // setGoogleLoading(true);
        await signInFirestore("google")
          .then((res) => {
            console.log(res.user);
            console.log(res.user);
            localStorage.setItem("uid", res.user.uid);
            localStorage.setItem("email", res.user.email);
            localStorage.setItem("isRegistered", "true");
            getOwnerSurveyTemplte(res.user.uid);
            // setUser(res.user);
            // checkUserExistenece(res.user.providerData[0]);
            // setIsSnackbarOpen(false);
          })
          .catch((err) => {
            // setGoogleLoading(false);
            // setIsSnackbarOpen(true);
            // setErrMsg(err.code);
            console.log(err);
          });
        break;
      case "github":
        // setGithubLoading(true);
        await signInFirestore("github")
          .then((res) => {
            console.log(res.user);
            localStorage.setItem("uid", res.user.uid);
            localStorage.setItem("email", res.user.email);
            localStorage.setItem("isRegistered", "true");
            getOwnerSurveyTemplte(res.user.uid);
            // setUser(res.user);
            // checkUserExistenece(res.user.providerData[0]);
            // setIsSnackbarOpen(false);
          })
          .catch((err) => {
            // setGithubLoading(false);
            // setIsSnackbarOpen(true);
            // setErrMsg(err.code);
            console.log(err);
          });
        break;
      default:
        return;
    }
  };

  return (
    <>
      <InputField
        id="email"
        label="Enter your email"
        type="text"
        variant="outlined"
        defaultValue={userInfo.email}
        handleChange={handleInputChange}
      />
      <InputField
        id="password"
        label="Enter your password"
        type="password"
        variant="outlined"
        defaultValue={userInfo.password}
        handleChange={handleInputChange}
      />
      <Btn
        content="Sign in"
        handleClick={(e) =>
          handleSignIn(e, "email&password", userInfo.email, userInfo.password)
        }
        type="submit"
      />
      <Btn
        content="Sign in with google"
        handleClick={(e) => handleSignIn(e, "google")}
        type="submit"
      />
      <Btn
        content="Sign in with github"
        handleClick={(e) => handleSignIn(e, "github")}
        type="submit"
      />
      <Link to="/signUp">Sign Up </Link>
    </>
  );
};

export default Login;
