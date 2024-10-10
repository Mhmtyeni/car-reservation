using MediatR;

namespace AracTakip.Application.Features.Queries.CarModel.GetAllCarModelByBrandId
{
    public class GetAllCarModelByBrandIdQueryRequest : BaseQueryRequest, IRequest<GetAllCarModelByBrandIdQueryResponse>
    {
        public string CarBrandId { get; set; }
    }
}
