import { baseApi } from "../baseApi";

export const staffApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createStaff: builder.mutation({
      query: (staffData) => ({
        url: "/staff",
        method: "POST",
        body: staffData,
      }),
      invalidatesTags: ["staff"],
    }),
    getStaffs: builder.query({
      query: () => "/staff",
      providesTags: ["staff"],
    }),
    getSingleStaff: builder.query({
      query: (id) => `/staff/single/${id}`,
      providesTags: ["staff"],
    }),
    deleteStaff: builder.mutation({
      query: (id) => ({
        url: `/staff/single/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["staff"],
    }),

    updateStaff: builder.mutation({
      query: ({ id, data }) => ({
        url: `/staff/single/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["staff"],
    }),
  }),
});

export const {
  useDeleteStaffMutation,
  useUpdateStaffMutation,
  useCreateStaffMutation,
  useGetStaffsQuery,
  useGetSingleStaffQuery,
} = staffApi;
