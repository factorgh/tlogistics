import { baseApi } from "../baseApi";
import { crudService } from "../custom-crud-service";

// Define the vendor endpoints using crudService
export const LogisticsApi = baseApi.injectEndpoints({
  endpoints: (builder) => {
    const logisticsCrud = crudService("/logistics");

    return {
      createLogistic: builder.mutation({
        query: (vendorData) => logisticsCrud.create(vendorData),
        invalidatesTags: ["logistics"],
      }),
      updateLogistic: builder.mutation({
        query: ({ id, vendorData }) =>
          logisticsCrud.update({ id, data: vendorData }),
        invalidatesTags: ["logistics"],
      }),
      deleteLogistic: builder.mutation({
        query: (id) => logisticsCrud.delete(id),
        invalidatesTags: ["logistics"],
      }),
      getLogistics: builder.query({
        query: () => logisticsCrud.getAll(),
        providesTags: ["logistics"],
      }),
      getSingleLogistic: builder.query({
        query: (id) => logisticsCrud.getSingle(id),
        providesTags: ["logistics"],
      }),
    };
  },
});

export const {
  useCreateLogisticMutation,
  useDeleteLogisticMutation,
  useGetLogisticsQuery,
  useGetSingleLogisticQuery,
  useUpdateLogisticMutation,
} = LogisticsApi;
