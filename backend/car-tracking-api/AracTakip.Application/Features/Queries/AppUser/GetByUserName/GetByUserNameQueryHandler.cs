using AracTakip.Application.Abstractions.Services;
using MediatR;

namespace AracTakip.Application.Features.Queries.AppUser.GetByUserName
{
    public class GetByUserNameQueryHandler : IRequestHandler<GetByUserNameQueryRequest, GetByUserNameQueryResponse>
    {
        readonly IUserService _userService;

        public GetByUserNameQueryHandler(IUserService userService)
        {
            _userService = userService;
        }

        public async Task<GetByUserNameQueryResponse> Handle(GetByUserNameQueryRequest request, CancellationToken cancellationToken)
        {
            var appUser = await _userService.GetByUserNameAsync(request.UserName);
            return new()
            {
                Email = appUser.Email,
                Id = appUser.Id,
                Name = appUser.Name,
                Sicil = appUser.Sicil,
                Surname = appUser.Surname,
                UserName = appUser.UserName,
                TwoFactorEnabled = appUser.TwoFactorEnabled,
                UserRoles = appUser.UserRoles,
                UserImages = appUser.UserImages.Select(file => new Domain.Entities.File
                {
                    FileName = file.FileName,
                    Path = file.Path,
                    FileDescription = file.FileDescription,
                    Id = file.Id,
                    CreatedDate = file.CreatedDate,
                    IsDeleted = file.IsDeleted,
                    IsActive = file.IsActive,
                    ModifiedDate = file.ModifiedDate,
                    Storage = file.Storage
                }).ToList()
            };
        }
    }
}
