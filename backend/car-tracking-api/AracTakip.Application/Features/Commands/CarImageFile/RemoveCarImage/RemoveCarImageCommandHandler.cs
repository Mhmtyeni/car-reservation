using AracTakip.Application.Repositories.Car;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace AracTakip.Application.Features.Commands.CarImageFile.RemoveCarImage
{
    public class RemoveCarImageCommandHandler : IRequestHandler<RemoveCarImageCommandRequest, RemoveCarImageCommandResponse>
    {

        readonly ICarReadRepository _carReadRepository;
        readonly ICarWriteRepository _carWriteRepository;

        public RemoveCarImageCommandHandler(ICarReadRepository carReadRepository, ICarWriteRepository carWriteRepository)
        {
            _carReadRepository = carReadRepository;
            _carWriteRepository = carWriteRepository;
        }

        public async Task<RemoveCarImageCommandResponse> Handle(RemoveCarImageCommandRequest request, CancellationToken cancellationToken)
        {
            Domain.Entities.Car? car = await _carReadRepository.Table.Include(p => p.CarImageFiles)
                .FirstOrDefaultAsync(p => p.Id == Guid.Parse(request.CarId));

            Domain.Entities.CarImageFile? carImageFile = car?.CarImageFiles.FirstOrDefault(p => p.Id == Guid.Parse(request.ImageId));

            if (carImageFile != null)
                car?.CarImageFiles.Remove(carImageFile);

            await _carWriteRepository.SaveAsync();
            return new();
        }
    }
}
