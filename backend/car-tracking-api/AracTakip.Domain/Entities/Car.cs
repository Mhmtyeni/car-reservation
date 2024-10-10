using AracTakip.Domain.Entities.Common;

namespace AracTakip.Domain.Entities
{
    public class Car : BaseEntity
    {
        public string CarName { get; set; }
        public string CarLicensePlate { get; set; }
        public Guid CarModelId { get; set; }
        public int CarKM { get; set; }
        public int CarFuelStatus { get; set; }
        public int CarCapacity { get; set; }
        public bool CarGearType { get; set; }
        public bool IsPassive { get; set; }
        public string ChassisNumber { get; set; }
        public Guid LocationId { get; set; }
        public int CarMaintenanceKM { get; set; }
        public bool IsCarMaintenanceArrived { get; set; }
        public Guid CarTypeId { get; set; }
        public Guid CarCaseTypeId { get; set; }
        public Guid CarEngineTypeId { get; set; }
        public Guid CompanyId { get; set; }
        public string CarIMEI { get; set; }
        public bool CarStatus { get; set; } = true;
        public bool IsCarCommercial { get; set; }
        public Company Company { get; set; }
        public Location Location { get; set; }
        public CarEngineType CarEngineType { get; set; }
        public CarType CarType { get; set; }
        public CarCaseType CarCaseType { get; set; }
        public CarModel CarModel { get; set; }
        public ICollection<CarImageFile> CarImageFiles { get; set; }
    }
}
