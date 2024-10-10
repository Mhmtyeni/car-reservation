using MediatR;

namespace AracTakip.Application.Features.Commands.CarModel.UpdateCarModel
{
    public class UpdateCarModelCommandRequest : IRequest<UpdateCarModelCommandResponse>
    {
        public string CarModelId { get; set; }
        public string CarModelName { get; set; }
        public string CarBrandId { get; set; }
    }
}
