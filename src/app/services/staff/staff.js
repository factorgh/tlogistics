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
  }),
});

export const {
  useCreateStaffMutation,
  useGetStaffsQuery,
  useGetSingleStaffQuery,
} = staffApi;
