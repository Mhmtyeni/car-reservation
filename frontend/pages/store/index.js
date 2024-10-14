import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../slices/authSlice";
import reservationReducer from "../slices/reservationSlice";
import { carsDetails } from "../slices/carsDetails";
import { userApi } from "../slices/userApi";
import { carBrands } from "../slices/carBrands";
import { endpoints } from "../slices/endpoints";
import { userRoles } from "../slices/userRoles";
import { carReservationDetails } from "../slices/carReservationDetails";
import userRoleSliceReducer from "../slices/userRoleSlice";
import userReducer from "../slices/authUserSlice";
import { carEngineType } from "../slices/carEngineType";
import { carModel } from "../slices/carModel";
import { carType } from "../slices/carType";
import { companies } from "../slices/companies";
import { carLocations } from "../slices/carLocations";
import { reservationStatuses } from "../slices/reservationStatuses";
import { carReservationApprovals } from "../slices/carReservationApprovals";
import { carCaseType } from "../slices/carCaseType";

const store = configureStore({
  reducer: {
    auth: authReducer,
    reservation: reservationReducer,
    userRolesSlice: userRoleSliceReducer,
    user: userReducer,
    [carsDetails.reducerPath]: carsDetails.reducer,
    [carReservationDetails.reducerPath]: carReservationDetails.reducer,

    [userApi.reducerPath]: userApi.reducer,
    [endpoints.reducerPath]: endpoints.reducer,
    [userRoles.reducerPath]: userRoles.reducer,
    [carBrands.reducerPath]: carBrands.reducer,
    [carEngineType.reducerPath]: carEngineType.reducer,
    [carModel.reducerPath]: carModel.reducer,
    [carType.reducerPath]: carType.reducer,
    [companies.reducerPath]: companies.reducer,
    [carLocations.reducerPath]: carLocations.reducer,
    [reservationStatuses.reducerPath]: reservationStatuses.reducer,
    [carReservationApprovals.reducerPath]: carReservationApprovals.reducer,
    [carCaseType.reducerPath]: carCaseType.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      carsDetails.middleware,
      carReservationDetails.middleware,
      carEngineType.middleware,
      carModel.middleware,
      userApi.middleware,
      carBrands.middleware,
      endpoints.middleware,
      userRoles.middleware,
      carType.middleware,
      companies.middleware,
      carLocations.middleware,
      reservationStatuses.middleware,
      carReservationApprovals.middleware,
      carCaseType.middleware
    ),
});
export default store;
