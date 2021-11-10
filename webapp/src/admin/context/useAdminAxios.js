import React from "react";
import axios from "axios";

const useAdminAxios = (props) => {
  const [error, setError] = React.useState("");

  const axiosinstance = React.useMemo(
    () => () => {
      return axios.create({
        baseURL: "/api",
        headers: {
          Authorization: "Bearer ",
        },
      });
    },
    []
  );

  const getData = React.useMemo(
    () =>
      async ({ url = "", params = {} }) => {
        try {
          const { data } = await axiosinstance().get({
            url: url,
            params: {
              ...params,
            },
          });
          return data;
        } catch (error) {
          const reponse = error.response || {};
          const data = reponse.data || {};
          setError(data.message || error.toString());
        }
      },
    [axiosinstance]
  );

  const postData = React.useMemo(
    () =>
      async ({ url = "", params = {} }) => {
        try {
          const { data } = await axiosinstance().post({
            url,
            params,
          });
          return data;
        } catch (error) {
          const reponse = error.response || {};
          const data = reponse.data || {};
          setError(data.message || error.toString());
        }
      },
    [axiosinstance]
  );

  return {
    postData,
    getData,
    axiosinstance,
    error,
  };
};

export default useAdminAxios;
