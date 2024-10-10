using AracTakip.Application.Repositories.Location;
using MediatR;
using Microsoft.Extensions.Logging;

namespace AracTakip.Application.Features.Commands.Location.RemoveLocation
{
    public class RemoveLocationCommandHandler : IRequestHandler<RemoveLocationCommandRequest, RemoveLocationCommandResponse>
    {
        readonly ILocationReadRepository _locationReadRepository;
        readonly ILocationWriteRepository _locationWriteRepository;
        readonly ILogger<RemoveLocationCommandHandler> _logger;

        public RemoveLocationCommandHandler(ILocationReadRepository locationReadRepository, ILocationWriteRepository locationWriteRepository, ILogger<RemoveLocationCommandHandler> logger)
        {
            _locationReadRepository = locationReadRepository;
            _locationWriteRepository = locationWriteRepository;
            _logger = logger;
        }

        public async Task<RemoveLocationCommandResponse> Handle(RemoveLocationCommandRequest request, CancellationToken cancellationToken)
        {
            Domain.Entities.Location location = await _locationReadRepository.GetByIdAsync(request.LocationId);
            location.ModifiedDate = DateTime.UtcNow;
            location.IsActive = false;
            location.IsDeleted = true;
            await _locationWriteRepository.SaveAsync();
            _logger.LogInformation($"{location.LocationName} lokasyon silindi...");
            return new();
        }
    }
}
