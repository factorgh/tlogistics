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
      getPetrolStations: builder.query({
        query: () => ({
          url: "/fuel_station/petrol",
          method: "GET",
        }),
        providesTags: ["fuel_station"],
      }),
      getDieselStations: builder.query({
        query: () => ({
          url: "/fuel_station/diesel",
          method: "GET",
        }),
        providesTags: ["fuel_station"],
      }),
      getGasStations: builder.query({
        query: () => ({
          url: "/fuel_station/gas",
          method: "GET",
        }),
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
  useGetGasStationsQuery,
  useGetPetrolStationsQuery,
  useGetDieselStationsQuery,
  useGetSingleFuelStationQuery,
} = FuelStationApi;
