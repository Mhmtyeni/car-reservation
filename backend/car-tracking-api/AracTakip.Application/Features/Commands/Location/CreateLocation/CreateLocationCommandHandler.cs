using AracTakip.Application.Abstractions.Hubs;
using AracTakip.Application.Repositories.Location;
using MediatR;
using Microsoft.Extensions.Logging;

namespace AracTakip.Application.Features.Commands.Location.CreateLocation
{
    public class CreateLocationCommandHandler : IRequestHandler<CreateLocationCommandRequest, CreateLocationCommandResponse>
    {
        readonly ILocationWriteRepository _locationWriteRepository;
        readonly ILocationHubService _locationHubService;
        readonly ILogger<CreateLocationCommandHandler> _logger;

        public CreateLocationCommandHandler(ILocationWriteRepository locationWriteRepository, ILocationHubService locationHubService, ILogger<CreateLocationCommandHandler> logger)
        {
            _locationWriteRepository = locationWriteRepository;
            _locationHubService = locationHubService;
            _logger = logger;
        }

        public async Task<CreateLocationCommandResponse> Handle(CreateLocationCommandRequest request, CancellationToken cancellationToken)
        {
            await _locationWriteRepository.AddAsync(new()
            {
                LocationName = request.LocationName,
                CreatedDate = DateTime.UtcNow,
                ModifiedDate = DateTime.UtcNow,
                IsActive = true,
                IsDeleted = false,
            });
            await _locationWriteRepository.SaveAsync();
            await _locationHubService.LocationAddedMessageAsync($"{request.LocationName} lokasyonu eklendi.");
            _logger.LogInformation("Lokasyon başarıyla eklenmiştir.");
            return new();
        }
    }
}
