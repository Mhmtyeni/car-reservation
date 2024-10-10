using AracTakip.Application.Abstractions.Services;
using AracTakip.Application.Repositories.File;
using MediatR;
using Microsoft.Extensions.Logging;

namespace AracTakip.Application.Features.Commands.UserImageFile.RemoveUserImage
{
    public class RemoveUserImageCommandHandler : IRequestHandler<RemoveUserImageCommandRequest, RemoveUserImageCommandResponse>
    {

        readonly IUserService _userService;
        readonly IFileWriteRepository _fileWriteRepository;
        readonly IFileReadRepository _fileReadRepository;
        readonly ILogger<RemoveUserImageCommandHandler> _logger;

        public RemoveUserImageCommandHandler(IFileWriteRepository fileWriteRepository, IUserService userService, ILogger<RemoveUserImageCommandHandler> logger, IFileReadRepository fileReadRepository)
        {
            _fileWriteRepository = fileWriteRepository;
            _userService = userService;
            _logger = logger;
            _fileReadRepository = fileReadRepository;
        }

        public async Task<RemoveUserImageCommandResponse> Handle(RemoveUserImageCommandRequest request, CancellationToken cancellationToken)
        {
            Domain.Entities.File userImageFile = await _fileReadRepository.GetByIdAsync(request.ImageId);
            userImageFile.IsDeleted = true;
            userImageFile.IsActive = false;
            userImageFile.ModifiedDate = DateTime.UtcNow;
            await _fileWriteRepository.SaveAsync();
            _logger.LogInformation("Kullanıcı güncellendi...");
            return new();

        }
    }
}
