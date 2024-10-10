using MediatR;

namespace AracTakip.Application.Features.Commands.CarBrand.CreateCarBrand
{
    public class CreateCarBrandCommandRequest : IRequest<CreateCarBrandCommandResponse>
    {
        public string CarBrandName { get; set; }
    }
}
