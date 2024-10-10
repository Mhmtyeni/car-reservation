using MediatR;

namespace AracTakip.Application.Features.Queries.AppUser.GetByUserName
{
    public class GetByUserNameQueryRequest : IRequest<GetByUserNameQueryResponse>
    {
        public string UserName { get; set; }
    }
}
