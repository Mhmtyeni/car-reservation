using AracTakip.Application.Repositories.CarEngineType;
using MediatR;
using Microsoft.Extensions.Logging;

namespace AracTakip.Application.Features.Commands.CarEngineType.RemoveCarEngineType
{
    public class RemoveCarEngineTypeCommandHandler : IRequestHandler<RemoveCarEngineTypeCommandRequest, RemoveCarEngineTypeCommandResponse>
    {
        readonly ICarEngineTypeWriteRepository _carEngineTypeWriteRepository;
        readonly ICarEngineTypeReadRepository _carEngineTypeReadRepository;
        readonly ILogger<RemoveCarEngineTypeCommandHandler> _logger;

        public RemoveCarEngineTypeCommandHandler(ICarEngineTypeWriteRepository carEngineTypeWriteRepository, ICarEngineTypeReadRepository carEngineTypeReadRepository, ILogger<RemoveCarEngineTypeCommandHandler> logger)
        {
            _carEngineTypeWriteRepository = carEngineTypeWriteRepository;
            _carEngineTypeReadRepository = carEngineTypeReadRepository;
            _logger = logger;
        }

        public async Task<RemoveCarEngineTypeCommandResponse> Handle(RemoveCarEngineTypeCommandRequest request, CancellationToken cancellationToken)
        {
            Domain.Entities.CarEngineType carEngineType = await _carEngineTypeReadRepository.GetByIdAsync(request.CarEngineTypeId);
            carEngineType.IsDeleted = true;
            carEngineType.IsActive = false;
            carEngineType.ModifiedDate = DateTime.UtcNow;
            await _carEngineTypeWriteRepository.SaveAsync();
            _logger.LogInformation("Araba motor tipi silindi...");
            return new();
        }
    }
}
