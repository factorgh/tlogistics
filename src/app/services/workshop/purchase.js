import { baseApi } from "../baseApi";
import { crudService } from "../custom-crud-service";

// Define the purchase endpoints using crudService
export const customerApi = baseApi.injectEndpoints({
  endpoints: (builder) => {
    const purchaseCrud = crudService("/purchase");

    return {
      createPurchase: builder.mutation({
        query: (purchaseData) => purchaseCrud.create(purchaseData),
        invalidatesTags: ["purchase"],
      }),
      updatePurchase: builder.mutation({
        query: ({ id, purchaseData }) =>
          purchaseCrud.update({ id, data: purchaseData }),
        invalidatesTags: ["purchase"],
      }),
      deletePurchase: builder.mutation({
        query: (id) => purchaseCrud.delete(id),
        invalidatesTags: ["purchase"],
      }),
      getPurchases: builder.query({
        query: () => purchaseCrud.getAll(),
        providesTags: ["purchase"],
      }),
      getSinglePurchase: builder.query({
        query: (id) => purchaseCrud.getSingle(id),
        providesTags: ["purchase"],
      }),
    };
  },
});

export const {
  useCreatePurchaseMutation,
  useGetPurchasesQuery,
  useGetSinglePurchaseQuery,
  useDeletePurchaseMutation,
  useUpdatePurchaseMutation,
} = customerApi;
