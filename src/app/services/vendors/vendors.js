import { baseApi } from "../baseApi";
import { crudService } from "../custom-crud-service";

// Define the vendor endpoints using crudService
export const customerApi = baseApi.injectEndpoints({
  endpoints: (builder) => {
    const vendorCrud = crudService("/vendor");

    return {
      createVendor: builder.mutation({
        query: (vendorData) => vendorCrud.create(vendorData),
        invalidatesTags: ["vendor"],
      }),
      updateVendor: builder.mutation({
        query: ({ id, vendorData }) =>
          vendorCrud.update({ id, data: vendorData }),
        invalidatesTags: ["vendor"],
      }),
      deleteVendor: builder.mutation({
        query: (id) => vendorCrud.delete(id),
        invalidatesTags: ["vendor"],
      }),
      getVendors: builder.query({
        query: () => vendorCrud.getAll(),
        providesTags: ["vendor"],
      }),
      getSingleVendor: builder.query({
        query: (id) => vendorCrud.getSingle(id),
        providesTags: ["vendor"],
      }),
      bulkAddVendors: builder.mutation({
        query: (vendors) => ({
          url: "/vendor/bulk", // Ensure your API endpoint matches
          method: "POST",
          body: vendors, // Send the array of vendors
        }),
        invalidatesTags: ["vendor"],
      }),
    };
  },
});

export const {
  useCreateVendorMutation,
  useGetVendorsQuery,
  useGetSingleVendorQuery,
  useDeleteVendorMutation,
  useUpdateVendorMutation,
  useBulkAddVendorsMutation, // Export the new mutation
} = customerApi;
