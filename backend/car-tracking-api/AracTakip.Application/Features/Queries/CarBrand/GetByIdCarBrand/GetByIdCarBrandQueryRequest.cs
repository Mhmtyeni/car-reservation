using MediatR;

namespace AracTakip.Application.Features.Queries.CarBrand.GetByIdCarBrand
{
    public class GetByIdCarBrandQueryRequest : IRequest<GetByIdCarBrandQueryResponse>
    {
        public string CarBrandId { get; set; }
    }
}
