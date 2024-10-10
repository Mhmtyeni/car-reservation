using MediatR;

namespace AracTakip.Application.Features.Queries.CarBrand.GetAllCarBrand
{
    public class GetAllCarBrandQueryRequest : BaseQueryRequest, IRequest<GetAllCarBrandQueryResponse>
    {
    }
}
