using MediatR;

namespace AracTakip.Application.Features.Queries.Car.GetAllCarByPassive
{
    public class GetAllCarByPassiveQueryRequest : BaseQueryRequest, IRequest<GetAllCarByPassiveQueryResponse>
    {
        public bool IsPassive { get; set; }
    }
}
