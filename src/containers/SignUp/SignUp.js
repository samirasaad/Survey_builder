import React, { useState } from "react";
import InputField from "../../controls/InputField/InputField";
import Btn from "../../controls/Btn/Btn";
import { signInFirestore, signUpFirestore } from "../../firebase/authMethods";
import { useNavigate } from "react-router-dom";
import { getOwnerSurveyTemplte } from "../../utils/shared";

const Signup = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({ email: null, password: null });

  const handleInputChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.id]: e.target.value });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    // setGoogleLoading(true);
    await signUpFirestore(userInfo.email, userInfo.password)
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
        // setGoogleLoading(false);
        // setIsSnackbarOpen(true);
        // setErrMsg(err.code);
        console.log(err);
      });
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
        content="Sign Up"
        handleClick={(e) =>
          handleSignUp(e, "email&password", userInfo.email, userInfo.password)
        }
        type="submit"
      />
    </>
  );
};

export default Signup;
