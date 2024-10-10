using AracTakip.Application.Repositories.CarEngineType;
using MediatR;
using Microsoft.Extensions.Logging;

namespace AracTakip.Application.Features.Commands.CarEngineType.UpdateCarEngineType
{
    public class UpdateCarEngineTypeCommandHandler : IRequestHandler<UpdateCarEngineTypeCommandRequest, UpdateCarEngineTypeCommandResponse>
    {
        readonly ICarEngineTypeReadRepository _carEngineTypeReadRepository;
        readonly ICarEngineTypeWriteRepository _carEngineTypeWriteRepository;
        readonly ILogger<UpdateCarEngineTypeCommandHandler> _logger;

        public UpdateCarEngineTypeCommandHandler(ICarEngineTypeReadRepository carEngineTypeReadRepository, ICarEngineTypeWriteRepository carEngineTypeWriteRepository, ILogger<UpdateCarEngineTypeCommandHandler> logger)
        {
            _carEngineTypeReadRepository = carEngineTypeReadRepository;
            _carEngineTypeWriteRepository = carEngineTypeWriteRepository;
            _logger = logger;
        }

        public async Task<UpdateCarEngineTypeCommandResponse> Handle(UpdateCarEngineTypeCommandRequest request, CancellationToken cancellationToken)
        {
            Domain.Entities.CarEngineType carEngineType = await _carEngineTypeReadRepository.GetByIdAsync(request.CarEngineTypeId);
            carEngineType.CarEngineTypeName = request.CarEngineTypeName;
            carEngineType.ModifiedDate = DateTime.UtcNow;
            await _carEngineTypeWriteRepository.SaveAsync();
            _logger.LogInformation("Araba motor tipi güncellendi...");
            return new();
        }
    }
}
