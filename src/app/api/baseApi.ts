import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseQuery = fetchBaseQuery({
  baseUrl: "https://aquatrack-api-gkhwf9c9hxehfvfn.northeurope-01.azurewebsites.net/api/",
  credentials: "include",
  responseHandler: async (response) => {
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return response.json();
    } else {
      return response.text();
    }
  },
});
