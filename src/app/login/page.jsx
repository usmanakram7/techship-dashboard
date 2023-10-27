"use client";

import React, { useEffect, useRef, useState } from "react";
import * as Styled from "./style";
import axios from "axios";
import Base64 from "./Base64";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const router = useRouter();

  const userNameRef = useRef(null);
  const passwordRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [handleInputs, sethandleInputs] = useState("");

  const loginUsername = "abc";
  const loginPassword = "12345";

  const basicCreds = Base64.btoa(loginUsername + ":" + loginPassword);
  const config = {
    headers: {
      "Content-type": "Application/json",
      Authorization: "Basic " + basicCreds,
    },
  };

  const handleRefs = async (e) => {
    e.preventDefault();
    const username = userNameRef.current.value;
    const password = passwordRef.current.value;

    if (username === "" && password === "") {
      sethandleInputs("Please fill this fields before login");
      return null;
    } else {
      sethandleInputs("");
    }

    console.log("login button called");
    try {
      setIsLoading(true);
      const response = await axios.post(
        "http://192.168.100.18:3001/auth/signIn",
        {
          username,
          password,
        },
        config
      );

      if (response.status === 200) {
        localStorage.setItem("access_token", response.data.token);
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      sethandleInputs(error.response.data.message);
      console.log("error", error);
    }
  };

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("access_token");

    if (isLoggedIn) {
      router.push("/dashboard");
    }
  }, [handleRefs]);

  return (
    <>
      {isLoading && (
        <div className="create-company-container">
          <div className="loader-container">
            <div className="loader"></div>
          </div>
        </div>
      )}

      <Styled.MainContainer>
        <Styled.FormContainer onSubmit={handleRefs}>
          <Styled.FormTitle>Login</Styled.FormTitle>
          <Styled.FormInput
            ref={userNameRef}
            type="text"
            placeholder="Username"
          />
          <Styled.FormInput
            ref={passwordRef}
            type="password"
            placeholder="Password"
          />
          <Styled.ErrorMessages>{handleInputs}</Styled.ErrorMessages>
          <Styled.FormButton type="submit">Login</Styled.FormButton>
        </Styled.FormContainer>
      </Styled.MainContainer>
    </>
  );
};

export default LoginPage;
