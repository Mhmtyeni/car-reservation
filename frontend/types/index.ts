export interface CarProps {
  id: string;
  carName: string;
  carLicensePlate: string;
  carBrandName: string;
  carModelName: string;
  carKM: number;
  endDateTime: string;
  carFuelStatus: number;
  carCapacity: number;
  carIMEI: string;
  locationName: string;
  companyName: string;
}

export interface CarReservationProps {
  carId: string;
  startDateTime: string;
  endDateTime: string;
  reasonForRequest: string;
  subReasonForRequest: string;
  reasonForRequestDetails: string;
  routeStart: string;
  routeEnd: string;
  peopleCount: number;
  driverCount: number;
  appUserId: string;
  reservationUsers: [
    {
      nameSurname: string;
      tc: string;
      sicil: string;
      isDriver: boolean;
      fileDescription: string;
      files: [string];
    }
  ];
}

export interface CarImageFile {
  showcase: boolean;
  cars: any | null;
  fileName: string;
  path: string;
  storage: string;
  fileDescription: string;
  id: string;
  createdDate: string;
  modifiedDate: string;
  isActive: boolean;
  isDeleted: boolean;
}

export interface Car {
  id: string;
  carLicensePlate: string;
  carBrandName: string;
  carModelName: string;
  carKM: number;
  carFuelStatus: number;
  carCapacity: number;
  locationName: string;
  companyName: string;
  carTypeName: string;
  carEngineTypeName: string;
  carGearType: string;
}

export interface CarResponse {
  totalCarCount: number;
  cars: Car[];
}
