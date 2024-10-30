import { baseApi } from "../baseApi";
import { crudService } from "../custom-crud-service";

// Define the vendor endpoints using crudService
export const forkliftApi = baseApi.injectEndpoints({
  endpoints: (builder) => {
    const forkliftCrud = crudService("/forklift");

    return {
      createForklift: builder.mutation({
        query: (forkliftData) => forkliftCrud.create(forkliftData),
        invalidatesTags: ["forklift"],
      }),
      updateForklift: builder.mutation({
        query: ({ id, forkliftData }) =>
          forkliftCrud.update({ id, data: forkliftData }),
        invalidatesTags: ["forklift"],
      }),
      deleteForklift: builder.mutation({
        query: (id) => forkliftCrud.delete(id),
        invalidatesTags: ["forklift"],
      }),
      getForklifts: builder.query({
        query: () => forkliftCrud.getAll(),
        providesTags: ["forklift"],
      }),
      getSingleForklift: builder.query({
        query: (id) => forkliftCrud.getSingle(id),
        providesTags: ["forklift"],
      }),
    };
  },
});

export const {
  useCreateForkliftMutation,
  useGetForkliftsQuery,
  useGetSingleForkliftQuery,
  useDeleteForkliftMutation,
  useUpdateForkliftMutation,
} = forkliftApi;
