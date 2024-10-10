using MediatR;

namespace AracTakip.Application.Features.Queries.Car.GetAllAvailableCarWithoutLocation
{
    public class GetAllAvailableCarWithoutLocationQueryRequest : BaseQueryRequest, IRequest<GetAllAvailableCarWithoutLocationQueryResponse>
    {
        public string CarTypeId { get; set; }
    }
}
