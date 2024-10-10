using MediatR;

namespace AracTakip.Application.Features.Queries.ReservationStatus.GetByIdReservationStatus
{
    public class GetByIdReservationStatusQueryRequest : IRequest<GetByIdReservationStatusQueryResponse>
    {
        public string StatusId { get; set; }
    }
}
