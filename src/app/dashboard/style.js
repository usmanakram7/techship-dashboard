import styled from "styled-components";

export const MainContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90vh;
`;

export const FormContainer = styled.form`
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  max-width: 340px;
`;

export const FormTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 20px;
`;

export const FormInput = styled.input`
  width: 93%;
  margin: 0 auto;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none;
`;

export const FormButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #0074d9;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #0056b3;
  }
`;

export const ErrorMessages = styled.div`
  color: #ff5555;
  font-size: 14px;
  margin-bottom: 10px;
  text-align: center;
`;
