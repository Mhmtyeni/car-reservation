using MediatR;

namespace AracTakip.Application.Features.Commands.CarEngineType.CreateCarEngineType
{
    public class CreateCarEngineTypeCommandRequest : IRequest<CreateCarEngineTypeCommandResponse>
    {
        public string CarEngineTypeName { get; set; }
    }
}
