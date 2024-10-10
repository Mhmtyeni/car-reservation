using AracTakip.Application.Repositories.Car;
using MediatR;
using Microsoft.Extensions.Logging;

namespace AracTakip.Application.Features.Commands.Car.RemoveCar
{
    public class RemoveCarCommandHandler : IRequestHandler<RemoveCarCommandRequest, RemoveCarCommandResponse>
    {
        readonly ICarWriteRepository _carWriteRepository;
        readonly ICarReadRepository _carReadRepository;
        readonly ILogger<RemoveCarCommandHandler> _logger;

        public RemoveCarCommandHandler(ICarReadRepository carReadRepository, ILogger<RemoveCarCommandHandler> logger, ICarWriteRepository carWriteRepository)
        {
            _carReadRepository = carReadRepository;
            _logger = logger;
            _carWriteRepository = carWriteRepository;
        }

        public async Task<RemoveCarCommandResponse> Handle(RemoveCarCommandRequest request, CancellationToken cancellationToken)
        {
            Domain.Entities.Car car = await _carReadRepository.GetByIdAsync(request.CarId);
            car.IsActive = false;
            car.IsDeleted = true;
            car.ModifiedDate = DateTime.UtcNow;
            await _carWriteRepository.SaveAsync();
            _logger.LogInformation("Araba silindi...");
            return new();
        }
    }
}
