using AracTakip.Application.Repositories.CarModel;
using MediatR;
using Microsoft.Extensions.Logging;

namespace AracTakip.Application.Features.Commands.CarModel.RemoveCarModel
{
    public class RemoveCarModelCommandHandler : IRequestHandler<RemoveCarModelCommandRequest, RemoveCarModelCommandResponse>
    {
        readonly ICarModelReadRepository _carModelReadRepository;
        readonly ICarModelWriteRepository _carModelWriteRepository;
        readonly ILogger<RemoveCarModelCommandHandler> _logger;

        public RemoveCarModelCommandHandler(ICarModelReadRepository carModelReadRepository, ICarModelWriteRepository carModelWriteRepository, ILogger<RemoveCarModelCommandHandler> logger)
        {
            _carModelReadRepository = carModelReadRepository;
            _carModelWriteRepository = carModelWriteRepository;
            _logger = logger;
        }

        public async Task<RemoveCarModelCommandResponse> Handle(RemoveCarModelCommandRequest request, CancellationToken cancellationToken)
        {
            Domain.Entities.CarModel carModel = await _carModelReadRepository.GetByIdAsync(request.CarModelId);
            carModel.ModifiedDate = DateTime.UtcNow;
            carModel.IsDeleted = true;
            carModel.IsActive = false;
            await _carModelWriteRepository.SaveAsync();
            _logger.LogInformation("Model silinmiştir...");
            return new();
        }
    }
}
