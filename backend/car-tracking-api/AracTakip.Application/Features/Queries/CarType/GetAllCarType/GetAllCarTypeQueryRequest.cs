using MediatR;

namespace AracTakip.Application.Features.Queries.CarType.GetAllCarType
{
    public class GetAllCarTypeQueryRequest : BaseQueryRequest, IRequest<GetAllCarTypeQueryResponse>
    {
    }
}
