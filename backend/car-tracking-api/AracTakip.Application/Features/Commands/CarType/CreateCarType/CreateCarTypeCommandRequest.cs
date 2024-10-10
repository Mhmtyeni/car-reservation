
using MediatR;

namespace AracTakip.Application.Features.Commands.CarType.CreateCarType
{
    public class CreateCarTypeCommandRequest :  IRequest<CreateCarTypeCommandResponse>
    {
        public string CarTypeName { get; set; }
    }
}
