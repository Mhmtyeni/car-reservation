using AracTakip.Application.Repositories.Location;
using MediatR;
using Microsoft.Extensions.Logging;

namespace AracTakip.Application.Features.Commands.Location.UpdateLocation
{
    public class UpdateLocationCommandHandler : IRequestHandler<UpdateLocationCommandRequest, UpdateLocationCommandResponse>
    {
        readonly ILocationReadRepository _locationReadRepository;
        readonly ILocationWriteRepository _locationWriteRepository;
        readonly ILogger<UpdateLocationCommandHandler> _logger;

        public UpdateLocationCommandHandler(ILocationReadRepository locationReadRepository, ILocationWriteRepository locationWriteRepository, ILogger<UpdateLocationCommandHandler> logger)
        {
            _locationReadRepository = locationReadRepository;
            _locationWriteRepository = locationWriteRepository;
            _logger = logger;
        }

        public async Task<UpdateLocationCommandResponse> Handle(UpdateLocationCommandRequest request, CancellationToken cancellationToken)
        {
            Domain.Entities.Location location = await _locationReadRepository.GetByIdAsync(request.LocationId);
            location.LocationName = request.LocationName;
            location.ModifiedDate = DateTime.UtcNow;
            await _locationWriteRepository.SaveAsync();
            _logger.LogInformation("lokasyon güncellendi...");
            return new();
        }
    }
}
