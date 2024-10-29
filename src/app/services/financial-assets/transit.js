import { baseApi } from "../baseApi";
import { crudService } from "../custom-crud-service";

// Define the vendor endpoints using crudService
export const TransitApi = baseApi.injectEndpoints({
  endpoints: (builder) => {
    const transitCrud = crudService("/transit");

    return {
      createTransit: builder.mutation({
        query: (vendorData) => transitCrud.create(vendorData),
        invalidatesTags: ["transit"],
      }),
      updateTransit: builder.mutation({
        query: ({ id, vendorData }) =>
          transitCrud.update({ id, data: vendorData }),
        invalidatesTags: ["transit"],
      }),
      deleteTransit: builder.mutation({
        query: (id) => transitCrud.delete(id),
        invalidatesTags: ["transit"],
      }),
      getTransits: builder.query({
        query: () => transitCrud.getAll(),
        providesTags: ["transit"],
      }),
      getSingleTransit: builder.query({
        query: (id) => transitCrud.getSingle(id),
        providesTags: ["transit"],
      }),
    };
  },
});

export const {
  useCreateTransitMutation,
  useDeleteTransitMutation,
  useGetTransitsQuery,
  useGetSingleTransitQuery,
  useUpdateTransitMutation,
} = TransitApi;
