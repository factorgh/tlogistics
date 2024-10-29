import { baseApi } from "../baseApi";
import { crudService } from "../custom-crud-service";

// Define the vendor endpoints using crudService
export const GeneralEXpenseApi = baseApi.injectEndpoints({
  endpoints: (builder) => {
    const generalExpenseCrud = crudService("/general_expense");

    return {
      createGeneralExpense: builder.mutation({
        query: (vendorData) => generalExpenseCrud.create(vendorData),
        invalidatesTags: ["general_expense"],
      }),
      updateGeneralExpense: builder.mutation({
        query: ({ id, vendorData }) =>
          generalExpenseCrud.update({ id, data: vendorData }),
        invalidatesTags: ["general_expense"],
      }),
      deleteGeneralExpense: builder.mutation({
        query: (id) => generalExpenseCrud.delete(id),
        invalidatesTags: ["general_expense"],
      }),
      getGeneralExpenses: builder.query({
        query: () => generalExpenseCrud.getAll(),
        providesTags: ["general_expense"],
      }),
      getSinglegeneralExpense: builder.query({
        query: (id) => generalExpenseCrud.getSingle(id),
        providesTags: ["general_expense"],
      }),
    };
  },
});

export const {
  useCreateGeneralExpenseMutation,
  useDeleteGeneralExpenseMutation,
  useGetGeneralExpensesQuery,
  useGetSinglegeneralExpenseQuery,
  useUpdateGeneralExpenseMutation,
} = GeneralEXpenseApi;
