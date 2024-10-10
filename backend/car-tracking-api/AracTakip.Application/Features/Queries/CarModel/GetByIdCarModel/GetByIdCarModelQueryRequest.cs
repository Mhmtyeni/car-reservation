using MediatR;

namespace AracTakip.Application.Features.Queries.CarModel.GetByIdCarModel
{
    public class GetByIdCarModelQueryRequest : IRequest<GetByIdCarModelQueryResponse>
    {
        public string CarModelId { get; set; }
    }
}
