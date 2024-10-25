import { baseApi } from "../baseApi";

export const customerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createCustomer: builder.mutation({
      query: (customerData) => ({
        url: "/customer",
        method: "POST",
        body: customerData,
      }),
      invalidatesTags: ["customer"],
    }),
    updateCustomer: builder.mutation({
      query: ({ id, ...customerData }) => ({
        url: `/customer/single/${id}`,
        method: "PUT",
        body: customerData,
      }),
      invalidatesTags: ["customer"],
    }),
    deleteCustomer: builder.mutation({
      query: (id) => ({
        url: `/customer/single/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["customer"],
    }),
    getCustomers: builder.query({
      query: () => "/customer",
      providesTags: ["customer"],
    }),
    getSingleCustomer: builder.query({
      query: (id) => `/customer/single/${id}`,
      providesTags: ["customer"],
    }),
  }),
});

export const {
  useCreateCustomerMutation,
  useGetCustomersQuery,
  useGetSingleCustomerQuery,
  useDeleteCustomerMutation,
  useUpdateCustomerMutation,
} = customerApi;
