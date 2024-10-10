using MediatR;

namespace AracTakip.Application.Features.Queries.Car.GetAllAvailableCar
{
    public class GetAllAvailableCarQueryRequest : BaseQueryRequest, IRequest<GetAllAvailableCarQueryResponse>
    {
        public string LocationId { get; set; }
        public string CarTypeId { get; set; }
        public DateTime StartDateTime { get; set; }
        public DateTime EndDateTime { get; set; }
    }
}
