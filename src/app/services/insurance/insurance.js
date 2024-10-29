import { baseApi } from "../baseApi";
import { crudService } from "../custom-crud-service";

// Define the vendor endpoints using crudService
export const insuranceApi = baseApi.injectEndpoints({
  endpoints: (builder) => {
    const insuranceCrud = crudService("/insurance");

    return {
      createInsurance: builder.mutation({
        query: (vendorData) => insuranceCrud.create(vendorData),
        invalidatesTags: ["insurance"],
      }),
      updateInsurance: builder.mutation({
        query: ({ id, vendorData }) =>
          insuranceCrud.update({ id, data: vendorData }),
        invalidatesTags: ["insurance"],
      }),
      deleteInsurance: builder.mutation({
        query: (id) => insuranceCrud.delete(id),
        invalidatesTags: ["insurance"],
      }),
      getInsurances: builder.query({
        query: () => insuranceCrud.getAll(),
        providesTags: ["insurance"],
      }),
      getSingleInsurance: builder.query({
        query: (id) => insuranceCrud.getSingle(id),
        providesTags: ["insurance"],
      }),
    };
  },
});

export const {
  useCreateInsuranceMutation,
  useDeleteInsuranceMutation,
  useGetInsurancesQuery,
  useGetSingleInsuranceQuery,
  useUpdateInsuranceMutation,
} = insuranceApi;
