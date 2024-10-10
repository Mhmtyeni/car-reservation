using AracTakip.Application.Features.Commands.CarCaseType.RemoveCarCaseType;
using AracTakip.Application.Repositories.CarCaseType;
using MediatR;
using Microsoft.Extensions.Logging;

namespace AracTakip.Application.Features.Commands.CarCaseType.UpdateCarCaseType
{
    public class UpdateCarCaseTypeCommandHandler : IRequestHandler<UpdateCarCaseTypeCommandRequest, UpdateCarCaseTypeCommandResponse>
    {
        readonly ICarCaseTypeWriteRepository _carCaseTypeWriteRepository;
        readonly ICarCaseTypeReadRepository _carCaseTypeReadRepository;
        readonly ILogger<RemoveCarCaseTypeCommandHandler> _logger;

        public UpdateCarCaseTypeCommandHandler(ICarCaseTypeWriteRepository carCaseTypeWriteRepository, ICarCaseTypeReadRepository carCaseTypeReadRepository, ILogger<RemoveCarCaseTypeCommandHandler> logger)
        {
            _carCaseTypeWriteRepository = carCaseTypeWriteRepository;
            _carCaseTypeReadRepository = carCaseTypeReadRepository;
            _logger = logger;
        }

        public async Task<UpdateCarCaseTypeCommandResponse> Handle(UpdateCarCaseTypeCommandRequest request, CancellationToken cancellationToken)
        {
            Domain.Entities.CarCaseType carCaseType = await _carCaseTypeReadRepository.GetByIdAsync(request.CarCaseTypeId);
            carCaseType.CarCaseTypeName = request.CarCaseTypeName;
            carCaseType.ModifiedDate = DateTime.UtcNow;
            await _carCaseTypeWriteRepository.SaveAsync();
            _logger.LogInformation("Araba kasa tipi güncellendi...");
            return new();
        }
    }
}
