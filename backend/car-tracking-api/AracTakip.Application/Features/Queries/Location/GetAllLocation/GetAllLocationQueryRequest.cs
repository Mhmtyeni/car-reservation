using MediatR;

namespace AracTakip.Application.Features.Queries.Location.GetAllLocation
{
    public class GetAllLocationQueryRequest : BaseQueryRequest, IRequest<GetAllLocationQueryResponse>
    {
    }
}
