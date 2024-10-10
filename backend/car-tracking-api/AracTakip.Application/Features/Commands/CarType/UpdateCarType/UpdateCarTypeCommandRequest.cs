using MediatR;

namespace AracTakip.Application.Features.Commands.CarType.UpdateCarType
{
    public class UpdateCarTypeCommandRequest : IRequest<UpdateCarTypeCommandResponse>
    {
        public string CarTypeId { get; set; }
        public string CarTypeName { get; set; }
    }
}
