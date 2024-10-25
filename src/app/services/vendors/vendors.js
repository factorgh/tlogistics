import { baseApi } from "../baseApi";
import { crudService } from "../custom-crud-service";

export const vendorApi = baseApi.injectEndpoints({
  endpoints: (builder) => {
    const vendorService = crudService("/vendor");

    return {
      createVendor: builder.mutation({
        query: vendorService.create,
        invalidatesTags: ["vendor"],
      }),
      updateVendor: builder.mutation({
        query: vendorService.update,
        invalidatesTags: ["vendor"],
      }),
      deleteVendor: builder.mutation({
        query: vendorService.delete,
        invalidatesTags: ["vendor"],
      }),
      getVendors: builder.query({
        query: vendorService.getAll,
        providesTags: ["vendor"],
      }),
      getSingleVendor: builder.query({
        query: (id) => vendorService.getSingle(id),
        providesTags: ["vendor"],
      }),
    };
  },
});

export const {
  useCreateVendorMutation,
  useUpdateVendorMutation,
  useDeleteVendorMutation,
  useGetVendorsQuery,
  useGetSingleVendorQuery,
} = vendorApi;
