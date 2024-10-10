using AracTakip.Application.Features.Commands.CarCaseType.RemoveCarCaseType;
using AracTakip.Application.Repositories.CarCaseType;
using AracTakip.Application.Repositories.CarEngineType;
using MediatR;
using Microsoft.Extensions.Logging;

namespace AracTakip.Application.Features.Commands.CarCaseType.RemoveCarCaseType
{
    public class RemoveCarCaseTypeCommandHandler : IRequestHandler<RemoveCarCaseTypeCommandRequest, RemoveCarCaseTypeCommandResponse>
    {
        readonly ICarCaseTypeWriteRepository _carCaseTypeWriteRepository;
        readonly ICarCaseTypeReadRepository _carCaseTypeReadRepository;
        readonly ILogger<RemoveCarCaseTypeCommandHandler> _logger;

        public RemoveCarCaseTypeCommandHandler(ICarCaseTypeWriteRepository carCaseTypeWriteRepository, ICarCaseTypeReadRepository carCaseTypeReadRepository, ILogger<RemoveCarCaseTypeCommandHandler> logger)
        {
            _carCaseTypeWriteRepository = carCaseTypeWriteRepository;
            _carCaseTypeReadRepository = carCaseTypeReadRepository;
            _logger = logger;
        }

        public async Task<RemoveCarCaseTypeCommandResponse> Handle(RemoveCarCaseTypeCommandRequest request, CancellationToken cancellationToken)
        {
            Domain.Entities.CarCaseType carCaseType = await _carCaseTypeReadRepository.GetByIdAsync(request.CarCaseTypeId);
            carCaseType.IsDeleted = true;
            carCaseType.IsActive = false;
            carCaseType.ModifiedDate = DateTime.UtcNow;
            await _carCaseTypeWriteRepository.SaveAsync();
            _logger.LogInformation("Araba motor tipi silindi...");
            return new();
        }
    }
}
