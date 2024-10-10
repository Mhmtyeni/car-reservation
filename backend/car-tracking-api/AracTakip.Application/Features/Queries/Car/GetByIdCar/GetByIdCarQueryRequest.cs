using MediatR;

namespace AracTakip.Application.Features.Queries.Car.GetByIdCar
{
    public class GetByIdCarQueryRequest : IRequest<GetByIdCarQueryResponse>
    {
        public string CarId { get; set; }
    }
}
