using MediatR;

namespace AracTakip.Application.Features.Queries.CarReservationApproval.GetAllPassiveCarReservationApproval
{
    public class GetAllPassiveCarReservationApprovalQueryRequest : BaseQueryRequest, IRequest<GetAllPassiveCarReservationApprovalQueryResponse>
    {
    }
}
