using MediatR;

namespace AracTakip.Application.Features.Queries.CarReservationApproval.GetByUserIdCarReservationApproval
{
    public class GetByUserIdCarReservationApprovalQueryRequest : BaseQueryRequest, IRequest<GetByUserIdCarReservationApprovalQueryResponse>
    {
        public string UserId { get; set; }
        public string ReservationStatusId { get; set; }
    }
}
