using AracTakip.Application.Abstractions.Hubs;
using AracTakip.Application.Repositories.CarCaseType;
using AracTakip.Application.Repositories.CarEngineType;
using MediatR;
using Microsoft.Extensions.Logging;

namespace AracTakip.Application.Features.Commands.CarCaseType.CreateCarCaseType
{
    public class CreateCarCaseTypeCommandHandler : IRequestHandler<CreateCarCaseTypeCommandRequest, CreateCarCaseTypeCommandResponse>
    {
        readonly ICarCaseTypeWriteRepository _carCaseTypeWriteRepository;
        readonly ILogger<CreateCarCaseTypeCommandHandler> _logger;

        public CreateCarCaseTypeCommandHandler(ILogger<CreateCarCaseTypeCommandHandler> logger, ICarCaseTypeWriteRepository carCaseTypeWriteRepository)
        {
            _logger = logger;
            _carCaseTypeWriteRepository = carCaseTypeWriteRepository;
        }

        public async Task<CreateCarCaseTypeCommandResponse> Handle(CreateCarCaseTypeCommandRequest request, CancellationToken cancellationToken)
        {
            await _carCaseTypeWriteRepository.AddAsync(new()
            {
                CarCaseTypeName = request.CarCaseTypeName,
                CreatedDate = DateTime.UtcNow,
                ModifiedDate = DateTime.UtcNow,
                IsActive = true,
                IsDeleted = false
            });
            await _carCaseTypeWriteRepository.SaveAsync();
            _logger.LogInformation("Araba kasa tipi eklendi...");
            return new();
        }
    }
}
