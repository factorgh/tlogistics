import { baseApi } from "../baseApi";
import { crudService } from "../custom-crud-service";

// Define the vendor endpoints using crudService
export const FuelStationApi = baseApi.injectEndpoints({
  endpoints: (builder) => {
    const FuelStationCrud = crudService("/fuel_station");

    return {
      createFuelStation: builder.mutation({
        query: (vendorData) => FuelStationCrud.create(vendorData),
        invalidatesTags: ["fuel_station"],
      }),
      updateFuelStation: builder.mutation({
        query: ({ id, vendorData }) =>
          FuelStationCrud.update({ id, data: vendorData }),
        invalidatesTags: ["fuel_station"],
      }),
      deleteFuelStation: builder.mutation({
        query: (id) => FuelStationCrud.delete(id),
        invalidatesTags: ["fuel_station"],
      }),
      getFuelStations: builder.query({
        query: () => FuelStationCrud.getAll(),
        providesTags: ["fuel_station"],
      }),
      getSingleFuelStation: builder.query({
        query: (id) => FuelStationCrud.getSingle(id),
        providesTags: ["fuel_station"],
      }),
    };
  },
});

// eslint-disable-next-line react-refresh/only-export-components
export const {
  useCreateFuelStationMutation,
  useUpdateFuelStationMutation,
  useDeleteFuelStationMutation,
  useGetFuelStationsQuery,
  useGetSingleFuelStationQuery,
} = FuelStationApi;
