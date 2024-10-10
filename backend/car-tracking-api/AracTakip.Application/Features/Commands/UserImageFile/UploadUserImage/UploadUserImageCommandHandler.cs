using AracTakip.Application.Abstractions.Services;
using AracTakip.Application.Abstractions.Storage;
using AracTakip.Application.Repositories.UserImageFile;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace AracTakip.Application.Features.Commands.UserImageFile.UploadUserImage
{
    public class UploadUserImageCommandHandler : IRequestHandler<UploadUserImageCommandRequest, UploadUserImageCommandResponse>
    {
        readonly IStorageService _storageService;
        readonly IUserService _userService;
        readonly IUserImageFileWriteRepository _userImageFileWriteRepository;
        readonly UserManager<Domain.Entities.Identity.AppUser> _userManager;
        public UploadUserImageCommandHandler(IUserService userService, IStorageService storageService, IUserImageFileWriteRepository userImageFileWriteRepository, UserManager<Domain.Entities.Identity.AppUser> userManager)
        {
            _userService = userService;
            _storageService = storageService;
            _userImageFileWriteRepository = userImageFileWriteRepository;
            _userManager = userManager;
        }

        public async Task<UploadUserImageCommandResponse> Handle(UploadUserImageCommandRequest request, CancellationToken cancellationToken)
        {
            List<(string fileName, string pathOrContainerName)> result = await _storageService.UploadAsync("resource/user-images", request.Files);

            //var appUser = await _userService.GetByIdUserAsync(request.Id);
            var appUser = await _userManager.FindByIdAsync(request.UserId);

            await _userImageFileWriteRepository.AddRangeAsync(result.Select(r => new Domain.Entities.UserImageFile
            {
                FileName = r.fileName,
                Path = r.pathOrContainerName,
                Storage = _storageService.StorageName,
                CreatedDate = DateTime.UtcNow,
                ModifiedDate = DateTime.UtcNow,
                IsActive = true,
                IsDeleted = false,
                FileDescription = request.FileDescription,
                AppUsers = new List<Domain.Entities.Identity.AppUser>() { appUser }
            }).ToList());

            await _userImageFileWriteRepository.SaveAsync();

            return new();
        }
    }
}
