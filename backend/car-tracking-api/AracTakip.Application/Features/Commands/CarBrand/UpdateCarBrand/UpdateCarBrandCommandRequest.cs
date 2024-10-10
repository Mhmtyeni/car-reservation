using MediatR;

namespace AracTakip.Application.Features.Commands.CarBrand.UpdateCarBrand
{
    public class UpdateCarBrandCommandRequest : IRequest<UpdateCarBrandCommandResponse>
    {
        public string CarBrandId { get; set; }
        public string CarBrandName { get; set; }
    }
}
