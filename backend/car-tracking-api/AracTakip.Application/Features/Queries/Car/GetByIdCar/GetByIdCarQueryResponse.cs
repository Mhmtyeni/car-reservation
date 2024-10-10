using AracTakip.Domain.Entities;

namespace AracTakip.Application.Features.Queries.Car.GetByIdCar
{
    public class GetByIdCarQueryResponse : BaseQueryResponse
    {
        public string CarName { get; set; }
        public string CarLicensePlate { get; set; }
        public string CarBrandName{ get; set; }
        public string CarModelName{ get; set; }
        public int CarKM { get; set; }
        public int CarFuelStatus { get; set; }
        public int CarCapacity { get; set; }
        public bool CarGearType { get; set; }
        public bool IsPassive { get; set; }
        public string ChassisNumber { get; set; }
        public string LocationName { get; set; }
        public int CarMaintenanceKM { get; set; }
        public bool IsCarMaintenanceArrived { get; set; }
        public string CarTypeName { get; set; }
        public string CarCaseTypeName { get; set; }
        public string CarEngineTypeName { get; set; }
        public string CompanyName { get; set; }
        public string CarIMEI { get; set; }
        public bool CarStatus { get; set; }
        public bool IsCarCommercial { get; set; }
        public ICollection<CarImageFile> CarImageFiles { get; set; }
    }
}
