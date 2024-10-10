using MediatR;

namespace AracTakip.Application.Features.Queries.CarModel.GetAllCarModel
{
    public class GetAllCarModelQueryRequest : BaseQueryRequest, IRequest<GetAllCarModelQueryResponse>
    {
    }
}
