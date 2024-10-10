using AracTakip.Application.Repositories.CarBrand;
using MediatR;
using Microsoft.Extensions.Logging;

namespace AracTakip.Application.Features.Commands.CarBrand.RemoveCarBrand
{
    public class RemoveCarBrandCommandHandler : IRequestHandler<RemoveCarBrandCommandRequest, RemoveCarBrandCommandResponse>
    {
        readonly ICarBrandWriteRepository _carBrandWriteRepository;
        readonly ICarBrandReadRepository _carBrandReadRepository;
        readonly ILogger<RemoveCarBrandCommandHandler> _logger;

        public RemoveCarBrandCommandHandler(ILogger<RemoveCarBrandCommandHandler> logger, ICarBrandReadRepository carBrandReadRepository, ICarBrandWriteRepository carBrandWriteRepository)
        {
            _logger = logger;
            _carBrandReadRepository = carBrandReadRepository;
            _carBrandWriteRepository = carBrandWriteRepository;
        }

        public async Task<RemoveCarBrandCommandResponse> Handle(RemoveCarBrandCommandRequest request, CancellationToken cancellationToken)
        {
            Domain.Entities.CarBrand carBrand = await _carBrandReadRepository.GetByIdAsync(request.CarBrandId);
            carBrand.IsDeleted = true;
            carBrand.IsActive = false;
            carBrand.ModifiedDate = DateTime.UtcNow;
            await _carBrandWriteRepository.SaveAsync();
            _logger.LogInformation("Araba markası silindi...");
            return new();
        }
    }
}
