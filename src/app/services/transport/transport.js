import { baseApi } from "../baseApi";
import { crudService } from "../custom-crud-service";

// Define the Transport endpoints using crudService
export const customerApi = baseApi.injectEndpoints({
  endpoints: (builder) => {
    const transportCrud = crudService("/transport");

    return {
      createTransport: builder.mutation({
        query: (TransportData) => transportCrud.create(TransportData),
        invalidatesTags: ["transport"],
      }),
      updateTransport: builder.mutation({
        query: ({ id, TransportData }) =>
          transportCrud.update({ id, data: TransportData }),
        invalidatesTags: ["transport"],
      }),
      deleteTransport: builder.mutation({
        query: (id) => transportCrud.delete(id),
        invalidatesTags: ["transport"],
      }),
      getPrivateTransports: builder.query({
        query: () => ({
          url: "/transport/private",
          method: "GET",
        }),
        providesTags: ["transport"],
      }),
      getMcBerryTransports: builder.query({
        query: () => ({
          url: "/transport/private",
          method: "GET",
        }),
        providesTags: ["transport"],
      }),
      getBeverageTransports: builder.query({
        query: () => ({
          url: "/transport/private",
          method: "GET",
        }),
        providesTags: ["transport"],
      }),
      getSingleTransport: builder.query({
        query: (id) => transportCrud.getSingle(id),
        providesTags: ["transport"],
      }),
    };
  },
});

export const {
  useCreateTransportMutation,
  useGetBeverageTransportsQuery,
  useGetSingleTransportQuery,
  useDeleteTransportMutation,
  useUpdateTransportMutation,
} = customerApi;
