import { baseApi } from "../baseApi";
import { crudService } from "../custom-crud-service";

// Define the Transport endpoints using crudService
export const customerApi = baseApi.injectEndpoints({
  endpoints: (builder) => {
    const transportCrud = crudService("/transport/private");

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
        query: (id) => transportCrud.delete({ id }),
        invalidatesTags: ["transport"],
      }),
      getTransports: builder.query({
        query: () => transportCrud.getAll(),
        providesTags: ["transport"],
      }),
      getSingleTransport: builder.query({
        query: (id) => transportCrud.getSingle(id),
        providesTags: ["transport"],
      }),
    };
  },
});

// Export hooks for usage in functional components
export const {
  useCreateTransportMutation,
  useGetTransportsQuery, // Query for getting private transports
  useGetSingleTransportQuery,
  useDeleteTransportMutation,
  useUpdateTransportMutation,
} = customerApi;
