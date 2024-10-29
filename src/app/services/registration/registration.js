import { baseApi } from "../baseApi";
import { crudService } from "../custom-crud-service";

// Define the vendor endpoints using crudService
export const RegistrationApi = baseApi.injectEndpoints({
  endpoints: (builder) => {
    const registrationCrud = crudService("/vehicle_registration");

    return {
      createRegistration: builder.mutation({
        query: (vendorData) => registrationCrud.create(vendorData),
        invalidatesTags: ["vehicle_registration"],
      }),
      updateRegistration: builder.mutation({
        query: ({ id, vendorData }) =>
          registrationCrud.update({ id, data: vendorData }),
        invalidatesTags: ["vehicle_registration"],
      }),
      deleteRegistration: builder.mutation({
        query: (id) => registrationCrud.delete(id),
        invalidatesTags: ["vehicle_registration"],
      }),
      getRegistrations: builder.query({
        query: () => registrationCrud.getAll(),
        providesTags: ["vehicle_registration"],
      }),
      getSingleRegistration: builder.query({
        query: (id) => registrationCrud.getSingle(id),
        providesTags: ["vehicle_registration"],
      }),
    };
  },
});

export const {
  useCreateRegistrationMutation,
  useDeleteRegistrationMutation,
  useGetRegistrationsQuery,
  useGetSingleRegistrationQuery,
  useUpdateRegistrationMutation,
} = RegistrationApi;
