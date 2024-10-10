using AracTakip.Application.Repositories.CarType;
using MediatR;
using Microsoft.Extensions.Logging;

namespace AracTakip.Application.Features.Commands.CarType.RemoveCarType
{
    public class RemoveCarTypeCommandHandler : IRequestHandler<RemoveCarTypeCommandRequest, RemoveCarTypeCommandResponse>
    {
        readonly ICarTypeReadRepository _carTypeReadRepository;
        readonly ICarTypeWriteRepository _carTypeWriteRepository;
        readonly ILogger<RemoveCarTypeCommandHandler> _logger;

        public RemoveCarTypeCommandHandler(ICarTypeReadRepository carTypeReadRepository, ICarTypeWriteRepository carTypeWriteRepository, ILogger<RemoveCarTypeCommandHandler> logger)
        {
            _carTypeReadRepository = carTypeReadRepository;
            _carTypeWriteRepository = carTypeWriteRepository;
            _logger = logger;
        }

        public async Task<RemoveCarTypeCommandResponse> Handle(RemoveCarTypeCommandRequest request, CancellationToken cancellationToken)
        {
            Domain.Entities.CarType carType = await _carTypeReadRepository.GetByIdAsync(request.CarTypeId);
            carType.ModifiedDate = DateTime.UtcNow;
            carType.IsActive = false;
            carType.IsDeleted = true;
            await _carTypeWriteRepository.SaveAsync();
            _logger.LogInformation($"{carType.CarTypeName} başarıyla silinmiştir...");
            return new();
        }
    }
}
