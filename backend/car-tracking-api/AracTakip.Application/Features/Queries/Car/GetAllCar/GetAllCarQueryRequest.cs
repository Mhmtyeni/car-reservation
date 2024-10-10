using MediatR;

namespace AracTakip.Application.Features.Queries.Car.GetAllCar
{
    public class GetAllCarQueryRequest : BaseQueryRequest, IRequest<GetAllCarQueryResponse>
    {
    }
}
