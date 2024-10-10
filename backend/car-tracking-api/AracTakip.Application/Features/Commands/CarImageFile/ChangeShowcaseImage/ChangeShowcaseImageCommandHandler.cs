using AracTakip.Application.Repositories.CarImageFile;
using Microsoft.EntityFrameworkCore;

namespace AracTakip.Application.Features.Commands.CarImageFile.ChangeShowcaseImage
{
    public class ChangeShowcaseImageCommandHandler : MediatR.IRequestHandler<ChangeShowcaseImageCommandRequest, ChangeShowcaseImageCommandResponse>
    {
        readonly ICarImageFileWriteRepository _carImageFileWriteRepository;

        public ChangeShowcaseImageCommandHandler(ICarImageFileWriteRepository carImageFileWriteRepository)
        {
            _carImageFileWriteRepository = carImageFileWriteRepository;
        }

        public async Task<ChangeShowcaseImageCommandResponse> Handle(ChangeShowcaseImageCommandRequest request, CancellationToken cancellationToken)
        {
            var query = _carImageFileWriteRepository.Table
                      .Include(p => p.Cars)
                      .SelectMany(p => p.Cars, (pif, p) => new
                      {
                          pif,
                          p
                      });

            var data = await query.FirstOrDefaultAsync(p => p.p.Id == Guid.Parse(request.CarId) && p.pif.Showcase);

            if (data != null)
                data.pif.Showcase = false;

            var image = await query.FirstOrDefaultAsync(p => p.pif.Id == Guid.Parse(request.ImageId));
            if (image != null)
                image.pif.Showcase = true;

            await _carImageFileWriteRepository.SaveAsync();

            return new();
        }
    }
}
