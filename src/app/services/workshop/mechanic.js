import { baseApi } from "../baseApi";
import { crudService } from "../custom-crud-service";

// Define the vendor endpoints using crudService
export const customerApi = baseApi.injectEndpoints({
  endpoints: (builder) => {
    const mechanicCrud = crudService("/mechanic");

    return {
      createMechanic: builder.mutation({
        query: (mechanicData) => mechanicCrud.create(mechanicData),
        invalidatesTags: ["mechanic"],
      }),
      updateMechanic: builder.mutation({
        query: ({ id, mechanicData }) =>
          mechanicCrud.update({ id, data: mechanicData }),
        invalidatesTags: ["mechanic"],
      }),
      deleteMechanic: builder.mutation({
        query: (id) => mechanicCrud.delete(id),
        invalidatesTags: ["mechanic"],
      }),
      getMechanics: builder.query({
        query: () => mechanicCrud.getAll(),
        providesTags: ["mechanic"],
      }),
      getSingleMechanic: builder.query({
        query: (id) => mechanicCrud.getSingle(id),
        providesTags: ["mechanic"],
      }),
    };
  },
});

export const {
  useCreateMechanicMutation,
  useGetMechanicsQuery,
  useGetSingleMechanicQuery,
  useDeleteMechanicMutation,
  useUpdateMechanicMutation,
} = customerApi;
