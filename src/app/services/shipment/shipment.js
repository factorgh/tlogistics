import { baseApi } from "../baseApi";
import { crudService } from "../custom-crud-service";

// Define the vendor endpoints using crudService
export const customerApi = baseApi.injectEndpoints({
  endpoints: (builder) => {
    const shipmentCrud = crudService("/shipment");

    return {
      createShipment: builder.mutation({
        query: (shipmentData) => shipmentCrud.create(shipmentData),
        invalidatesTags: ["shipment"],
      }),
      updateShipment: builder.mutation({
        query: ({ id, shipmentData }) =>
          shipmentCrud.update({ id, data: shipmentData }),
        invalidatesTags: ["shipment"],
      }),
      deleteShipment: builder.mutation({
        query: (id) => shipmentCrud.delete(id),
        invalidatesTags: ["shipment"],
      }),
      getShipments: builder.query({
        query: () => shipmentCrud.getAll(),
        providesTags: ["shipment"],
      }),
      getSingleShipment: builder.query({
        query: (id) => shipmentCrud.getSingle(id),
        providesTags: ["shipment"],
      }),
    };
  },
});

export const {
  useCreateShipmentMutation,
  useGetShipmentsQuery,
  useGetSingleShipmentQuery,
  useDeleteShipmentMutation,
  useUpdateShipmentMutation,
} = customerApi;
