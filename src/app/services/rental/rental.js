import { baseApi } from "../baseApi";
import { crudService } from "../custom-crud-service";

// Define the vendor endpoints using crudService
export const RentalApi = baseApi.injectEndpoints({
  endpoints: (builder) => {
    const rentalCrud = crudService("/vehicle_rental");

    return {
      createRental: builder.mutation({
        query: (vendorData) => rentalCrud.create(vendorData),
        invalidatesTags: ["rental"],
      }),
      updateRental: builder.mutation({
        query: ({ id, rentalData }) =>
          rentalCrud.update({ id, data: rentalData }),
        invalidatesTags: ["rental"],
      }),
      deleteRental: builder.mutation({
        query: (id) => rentalCrud.delete(id),
        invalidatesTags: ["rental"],
      }),
      getRentals: builder.query({
        query: () => rentalCrud.getAll(),
        providesTags: ["rental"],
      }),
      getSingleRental: builder.query({
        query: (id) => rentalCrud.getSingle(id),
        providesTags: ["rental"],
      }),
    };
  },
});

export const {
  useCreateRentalMutation,
  useDeleteRentalMutation,
  useGetRentalsQuery,
  useGetSingleRentalQuery,
  useUpdateRentalMutation,
} = RentalApi;
