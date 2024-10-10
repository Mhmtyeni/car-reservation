using MediatR;

namespace AracTakip.Application.Features.Commands.CarModel.CreateCarModel
{
    public class CreateCarModelCommandRequest : IRequest<CreateCarModelCommandResponse>
    {
        public string CarModelName { get; set; }
        public string CarBrandId { get; set; }
    }
}
