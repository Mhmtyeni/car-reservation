using AracTakip.Application.Features.Commands.CarModel.RemoveCarModel;
using AracTakip.Application.Repositories.CarModel;
using MediatR;
using Microsoft.Extensions.Logging;

namespace AracTakip.Application.Features.Commands.CarModel.UpdateCarModel
{
    public class UpdateCarModelCommandHandler : IRequestHandler<UpdateCarModelCommandRequest, UpdateCarModelCommandResponse>
    {
        readonly ICarModelReadRepository _carModelReadRepository;
        readonly ICarModelWriteRepository _carModelWriteRepository;
        readonly ILogger<RemoveCarModelCommandHandler> _logger;

        public UpdateCarModelCommandHandler(ICarModelReadRepository carModelReadRepository, ICarModelWriteRepository carModelWriteRepository, ILogger<RemoveCarModelCommandHandler> logger)
        {
            _carModelReadRepository = carModelReadRepository;
            _carModelWriteRepository = carModelWriteRepository;
            _logger = logger;
        }

        public async Task<UpdateCarModelCommandResponse> Handle(UpdateCarModelCommandRequest request, CancellationToken cancellationToken)
        {
            Domain.Entities.CarModel carModel = await _carModelReadRepository.GetByIdAsync(request.CarModelId);
            carModel.CarModelName = request.CarModelName;
            carModel.CarBrandId = Guid.Parse(request.CarBrandId);
            carModel.ModifiedDate = DateTime.UtcNow;
            await _carModelWriteRepository.SaveAsync();
            _logger.LogInformation("Model güncellenmiştir...");
            return new();

        }
    }
}
