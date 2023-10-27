"use client";

import React, { useEffect, useState } from "react";
import * as Styled from "./tableStyle";
import axios from "axios";

const DashboardTable = () => {
  const [data, setData] = useState([]);

  const getToken = localStorage.getItem("access_token");
  const fetchData = async () => {
    try {
      const response = await axios.get("http://192.168.100.18:3001/tenant", {
        headers: {
          Authorization: "Bearer " + getToken,
        },
      });
      if (response.data && response.data.data) {
        setData(response.data.data);
        console.log("res<>>>>", response.data);
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Styled.TableContainer>
      <Styled.Table>
        <thead>
          <tr>
            <Styled.TableHeader>Name</Styled.TableHeader>
            <Styled.TableHeader>Username</Styled.TableHeader>
            <Styled.TableHeader>URL</Styled.TableHeader>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((item) => {
              return (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.username}</td>
                  <td>{item.url}</td>
                </tr>
              );
            })}
        </tbody>
      </Styled.Table>
    </Styled.TableContainer>
  );
};

export default DashboardTable;
