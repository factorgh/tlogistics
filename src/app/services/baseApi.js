import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

//TODO:gET TOKEN

const getToken = () => {
  let token = localStorage.getItem("token");
  return token;
};

const BASE_URL = "https://fleet-backend-spqg.onrender.com/api/v1";

// Define a service using a base URL and expected endpoints
export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      const token = getToken();
      console.log(token);

      if (token) {
        headers.set("authorization", token);
      }

      //headers.set("content-type", "multipart/form-data");

      return headers;
    },
  }),

  endpoints: () => ({}),
});

// Pick out data and prevent nested properties in a hook or selector
