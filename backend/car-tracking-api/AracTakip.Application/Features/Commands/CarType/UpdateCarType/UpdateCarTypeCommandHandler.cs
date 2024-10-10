using AracTakip.Application.Repositories.CarType;
using MediatR;
using Microsoft.Extensions.Logging;

namespace AracTakip.Application.Features.Commands.CarType.UpdateCarType
{
    public class UpdateCarTypeCommandHandler : IRequestHandler<UpdateCarTypeCommandRequest, UpdateCarTypeCommandResponse>
    {
        readonly ICarTypeReadRepository _carTypeReadRepository;
        readonly ICarTypeWriteRepository _carTypeWriteRepository;
        readonly ILogger<UpdateCarTypeCommandHandler> _logger;

        public UpdateCarTypeCommandHandler(ICarTypeReadRepository carTypeReadRepository, ICarTypeWriteRepository carTypeWriteRepository, ILogger<UpdateCarTypeCommandHandler> logger)
        {
            _carTypeReadRepository = carTypeReadRepository;
            _carTypeWriteRepository = carTypeWriteRepository;
            _logger = logger;
        }

        public async Task<UpdateCarTypeCommandResponse> Handle(UpdateCarTypeCommandRequest request, CancellationToken cancellationToken)
        {
            Domain.Entities.CarType carType = await _carTypeReadRepository.GetByIdAsync(request.CarTypeId);
            carType.CarTypeName = request.CarTypeName;
            await _carTypeWriteRepository.SaveAsync();
            _logger.LogInformation("Araba tipi başarıyla güncellenmiştir...");
            return new();
        }
    }
}
