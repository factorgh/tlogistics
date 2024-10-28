import { baseApi } from "../baseApi";
import { crudService } from "../custom-crud-service";

// Define the vendor endpoints using crudService
export const vendorExpenseApi = baseApi.injectEndpoints({
    endpoints: (builder) => {
        const vendorCrud = crudService("/vendor_expense");

        return {
            createVendorExpense: builder.mutation({
                query: (vendorData) => vendorCrud.create(vendorData),
                invalidatesTags: ["vendor"],
            }),
            updateVendorExpense: builder.mutation({
                query: ({ id, vendorData }) => vendorCrud.update({ id, data: vendorData }),
                invalidatesTags: ["vendor"],
            }),
            deleteVendorExpense: builder.mutation({
                query: (id) => vendorCrud.delete(id),
                invalidatesTags: ["vendor"],
            }),
            getVendorsExpense: builder.query({
                query: () => vendorCrud.getAll(),
                providesTags: ["vendor"],
            }),
            getSingleVendorExpense: builder.query({
                query: (id) => vendorCrud.getSingle(id),
                providesTags: ["vendor"],
            }),
        };
    },
});

export const {
    useCreateVendorExpenseMutation,
    useDeleteVendorExpenseMutation,
    useGetVendorsExpenseQuery,
    useGetSingleVendorExpenseQuery,
    useUpdateVendorExpenseMutation,
} = vendorExpenseApi;
