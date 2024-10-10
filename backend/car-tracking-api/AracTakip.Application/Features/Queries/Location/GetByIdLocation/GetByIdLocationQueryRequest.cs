using MediatR;

namespace AracTakip.Application.Features.Queries.Location.GetByIdLocation
{
    public class GetByIdLocationQueryRequest : IRequest<GetByIdLocationQueryResponse>
    {
        public string LocationId { get; set; }
    }
}
