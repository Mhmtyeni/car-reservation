using MediatR;

namespace AracTakip.Application.Features.Queries.Car.GetAllUnavailableCarWithoutLocation
{
    public class GetAllUnavailableCarWithoutLocationQueryRequest : BaseQueryRequest, IRequest<GetAllUnavailableCarWithoutLocationQueryResponse>
    {
        public string CarTypeId { get; set; }
    }
}
