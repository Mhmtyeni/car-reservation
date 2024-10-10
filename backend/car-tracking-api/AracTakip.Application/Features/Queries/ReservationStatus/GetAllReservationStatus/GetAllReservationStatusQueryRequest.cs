using MediatR;

namespace AracTakip.Application.Features.Queries.ReservationStatus.GetAllReservationStatus
{
    public class GetAllReservationStatusQueryRequest : BaseQueryRequest, IRequest<GetAllReservationStatusQueryResponse>
    {
    }
}
