using AracTakip.Application.Abstractions.Storage;
using AracTakip.Application.Repositories.Car;
using AracTakip.Application.Repositories.CarImageFile;
using MediatR;

namespace AracTakip.Application.Features.Commands.CarImageFile.UploadCarImage
{
    public class UploadCarImageCommandHandler : IRequestHandler<UploadCarImageCommandRequest, UploadCarImageCommandResponse>
    {
        readonly IStorageService _storageService;
        readonly ICarReadRepository _carReadRepository;
        readonly ICarImageFileWriteRepository _carImageFileWriteRepository;

        public UploadCarImageCommandHandler(IStorageService storageService, ICarReadRepository carReadRepository, ICarImageFileWriteRepository carImageFileWriteRepository)
        {
            _storageService = storageService;
            _carReadRepository = carReadRepository;
            _carImageFileWriteRepository = carImageFileWriteRepository;
        }

        public async Task<UploadCarImageCommandResponse> Handle(UploadCarImageCommandRequest request, CancellationToken cancellationToken)
        {
            List<(string fileName, string pathOrContainerName)> result = await _storageService.UploadAsync("resource/car-images", request.Files);


            Domain.Entities.Car car = await _carReadRepository.GetByIdAsync(request.CarId);


            await _carImageFileWriteRepository.AddRangeAsync(result.Select(r => new Domain.Entities.CarImageFile
            {
                FileName = r.fileName,
                Path = r.pathOrContainerName,
                Storage = _storageService.StorageName,
                CreatedDate = DateTime.UtcNow,
                ModifiedDate = DateTime.UtcNow,
                IsActive = true,
                IsDeleted = false,
                FileDescription=request.FileDescription,
                Cars = new List<Domain.Entities.Car>() { car }
            }).ToList());

            await _carImageFileWriteRepository.SaveAsync();

            return new();
        }
    }
}
