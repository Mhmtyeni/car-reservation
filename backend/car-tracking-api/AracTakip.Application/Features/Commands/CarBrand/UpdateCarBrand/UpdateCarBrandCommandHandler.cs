using AracTakip.Application.Abstractions.Hubs;
using AracTakip.Application.Repositories.CarBrand;
using MediatR;
using Microsoft.Extensions.Logging;

namespace AracTakip.Application.Features.Commands.CarBrand.UpdateCarBrand
{
    public class UpdateCarBrandCommandHandler : IRequestHandler<UpdateCarBrandCommandRequest, UpdateCarBrandCommandResponse>
    {
        readonly ILogger<UpdateCarBrandCommandHandler> _logger;
        readonly ICarBrandReadRepository _carBrandReadRepository;
        readonly ICarBrandWriteRepository _carBrandWriteRepository;

        public UpdateCarBrandCommandHandler(ICarBrandReadRepository carBrandReadRepository, ICarBrandWriteRepository carBrandWriteRepository, ILogger<UpdateCarBrandCommandHandler> logger)
        {
            _carBrandReadRepository = carBrandReadRepository;
            _carBrandWriteRepository = carBrandWriteRepository;
            _logger = logger;
        }

        public async Task<UpdateCarBrandCommandResponse> Handle(UpdateCarBrandCommandRequest request, CancellationToken cancellationToken)
        {
            Domain.Entities.CarBrand carBrand = await _carBrandReadRepository.GetByIdAsync(request.CarBrandId);
            carBrand.CarBrandName = request.CarBrandName;
            carBrand.ModifiedDate = DateTime.UtcNow;
            await _carBrandWriteRepository.SaveAsync();
            _logger.LogInformation("Araba markası güncellendi...");
            return new();
        }
    }
}
