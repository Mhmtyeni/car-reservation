using MediatR;

namespace AracTakip.Application.Features.Queries.CarEngineType.GetByIdCarEngineType
{
    public class GetByIdCarEngineTypeQueryRequest : IRequest<GetByIdCarEngineTypeQueryResponse>
    {
        public string CarEngineTypeId { get; set; }
    }
}
