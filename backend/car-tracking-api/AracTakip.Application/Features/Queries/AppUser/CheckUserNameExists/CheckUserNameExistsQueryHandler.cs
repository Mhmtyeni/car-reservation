using AracTakip.Application.Abstractions.Services;
using MediatR;

namespace AracTakip.Application.Features.Queries.AppUser.CheckUserNameExists
{
    public class CheckUserNameExistsQueryHandler : IRequestHandler<CheckUserNameExistsQueryRequest, CheckUserNameExistsQueryResponse>
    {
        readonly IUserService _userService;

        public CheckUserNameExistsQueryHandler(IUserService userService)
        {
            _userService = userService;
        }

        public async Task<CheckUserNameExistsQueryResponse> Handle(CheckUserNameExistsQueryRequest request, CancellationToken cancellationToken)
        {
            var appUser = await _userService.GetByUserNameAsync(request.UserName);
            bool userNameExists = appUser.UserName != null ? true : false;
            return new()
            {
                UserNameExists = userNameExists,
            };

        }
    }
}
