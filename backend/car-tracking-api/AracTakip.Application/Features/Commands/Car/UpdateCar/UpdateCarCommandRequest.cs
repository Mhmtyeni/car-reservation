using MediatR;

namespace AracTakip.Application.Features.Commands.Car.UpdateCar
{
    public class UpdateCarCommandRequest : IRequest<UpdateCarCommandResponse>
    {
        public string CarId { get; set; }
        public string CarName { get; set; }
        public string CarLicensePlate { get; set; }
        public string CarModelId { get; set; }
        public int CarKM { get; set; }
        public int CarFuelStatus { get; set; }
        public int CarCapacity { get; set; }
        public bool CarGearType { get; set; }
        public string ChassisNumber { get; set; }
        public int CarMaintenanceKM { get; set; }
        public bool IsCarMaintenanceArrived { get; set; }
        public string CarTypeId { get; set; }
        public string CarCaseTypeId { get; set; }
        public string CarEngineTypeId { get; set; }
        public string CompanyId { get; set; }
        public string CarIMEI { get; set; }
        public bool CarStatus { get; set; }
        public bool IsCarCommercial { get; set; }
        public bool IsPassive { get; set; }
        public string LocationId { get; set; }
    }
}
