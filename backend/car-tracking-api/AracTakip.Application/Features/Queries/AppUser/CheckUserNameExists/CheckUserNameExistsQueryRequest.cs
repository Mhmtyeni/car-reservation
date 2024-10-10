using MediatR;

namespace AracTakip.Application.Features.Queries.AppUser.CheckUserNameExists
{
    public class CheckUserNameExistsQueryRequest : IRequest<CheckUserNameExistsQueryResponse>
    {
        public string UserName { get; set; }
    }
}
