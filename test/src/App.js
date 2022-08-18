import logo from "./logo.svg";
import "./App.css";
import { GoogleLogin } from "@react-oauth/google";
import FacebookLogin from "react-facebook-login";
import jwtDecode from "jwt-decode";
import axios from "axios";
import { findAllByDisplayValue } from "@testing-library/react";

import { useEffect } from "react";


function App() {
  const googleLoginSuccess = async (data) => {
    console.log(jwtDecode(data.credential));
    const { email, email_verified } = jwtDecode(data.credential);

    if (email_verified) {
      const response = await axios.post(
        "http://localhost:8000/auth/google",
        {
          credentials: data.credential,
          role: "patient",
          password: "hehe1234",
        },
        { headers: { "Content-Type": "application/json" } }
      );
      console.log(response);
    }
  };

  const googleLoginFailure = async (err) => {
    console.log(err);
  };

  const responseFacebook = (response) => {
    console.log(response);
  };


  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.post(
        "http://localhost:8000/api/v1/patient/login",
        { email: "test@test.com", password: "Test@123" }
      );
      console.log(response.data);
    };

    fetchData();
  });


  return (
    <div className="App">
      <GoogleLogin
        onSuccess={(data) => {
          googleLoginSuccess(data);
        }}
        onError={() => {
          console.log("Login Failed");
        }}
      />
      <FacebookLogin
        appId="2143874102457540"
        autoLoad={false}
        fields="name,email,picture"
        callback={responseFacebook}
        cssClass="my-facebook-button-class"
        icon="fa-facebook"
      />
    </div>
  );
}

export default App;
