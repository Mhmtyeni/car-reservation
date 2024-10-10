using MediatR;

namespace AracTakip.Application.Features.Queries.AppUser.GetByIdUser
{
    public class GetByIdUserQueryRequest: IRequest<GetByIdUserQueryResponse>
    {
        public string UserId { get; set; }
    }
}
