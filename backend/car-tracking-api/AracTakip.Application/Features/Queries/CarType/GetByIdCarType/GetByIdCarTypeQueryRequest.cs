using MediatR;

namespace AracTakip.Application.Features.Queries.CarType.GetByIdCarType
{
    public class GetByIdCarTypeQueryRequest : IRequest<GetByIdCarTypeQueryResponse>
    {
        public string CarTypeId { get; set; }
    }
}
