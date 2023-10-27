"use client";

import React, { useEffect, useState } from "react";
import * as Styled from "./style";
import axios from "axios";
import Base64 from "../login/Base64";
import DashboardTable from "./table";

const FormForDashboard = () => {
  const [formData, setFormData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [handleInputs, sethandleInputs] = useState("");

  const loginUsername = "abc";
  const loginPassword = "12345";

  const basicCreds = Base64.btoa(loginUsername + ":" + loginPassword);
  const config = {
    headers: {
      Authorization: "Basic " + basicCreds,
    },
  };

  const handleDocumentChange = async (e) => {
    e.preventDefault();
    const pdfFile = new FormData();
    pdfFile.append("file", e.target.files[0]);
    try {
      setIsLoading(true);
      const response = await axios.post(
        "http://192.168.100.18:3001/tenant/uploadFile",
        pdfFile,
        config
      );
      if (response.status === 200) {
        console.log("response", response);
        setFormData({
          ...formData,
          [e.target.name]: response.data.url,
        });
        setIsLoading(false);
      }
    } catch (error) {
      sethandleInputs(error.message);
      console.log(error);
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handelSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const response = await axios.post(
        "http://192.168.100.18:3001/tenant",
        {
          name: formData !== "" || (formData && formData.name),
          pdfUrl: formData !== "" || (formData && formData.pdfUrl),
          iconUrl: formData !== "" || (formData && formData.iconUrl),
          baseLogo: formData !== "" || (formData && formData.baseLogo),
          orderPrefix: formData !== "" || (formData && formData.orderPrefix),
          userName: formData !== "" || (formData && formData.userName),
          userPassword: formData !== "" || (formData && formData.userPassword),
        },
        config
      );
      if (response.status === 200) {
        setIsLoading(false);
        console.log("create company data===> ", response);
      }
    } catch (error) {
      setIsLoading(false);
      sethandleInputs(error.message);
      console.log("error", error);
    }

    setIsLoading(false);
    e.target.reset();
  };
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
        <Styled.FormContainer onSubmit={handelSubmit}>
          <Styled.FormTitle>Dashboard Form</Styled.FormTitle>
          <Styled.FormInput
            onChange={(e) => handleChange(e)}
            type="text"
            placeholder="Name"
            name="name"
          />
          <label htmlFor="pdfUrl">PDF</label>

          <Styled.FormInput
            onChange={(e) => handleDocumentChange(e)}
            type="file"
            id="pdfUrl"
            name="pdfUrl"
            //   accept=".pdf"
          />
          <label htmlFor="iconUrl">Icon</label>

          <Styled.FormInput
            onChange={(e) => handleDocumentChange(e)}
            type="file"
            id="iconUrl"
            name="iconUrl"
            //   accept=".jpg, .png"
          />
          <label htmlFor="baseLogo">Logo</label>
          <Styled.FormInput
            onChange={(e) => handleDocumentChange(e)}
            type="file"
            id="baseLogo"
            name="baseLogo"
            //   accept=".jpg, .png"
          />

          <Styled.FormInput
            onChange={(e) => handleChange(e)}
            type="text"
            placeholder="Order Prefix"
            name="orderPrefix"
          />
          <Styled.FormInput
            onChange={(e) => handleChange(e)}
            type="text"
            placeholder="Username"
            name="userName"
          />
          <Styled.FormInput
            onChange={(e) => handleChange(e)}
            type="password"
            placeholder="Password"
            name="userPassword"
          />
          <Styled.ErrorMessages>{handleInputs}</Styled.ErrorMessages>
          <Styled.FormButton type="submit">Submit</Styled.FormButton>
        </Styled.FormContainer>
      </Styled.MainContainer>
      <DashboardTable />
    </>
  );
};

export default FormForDashboard;
