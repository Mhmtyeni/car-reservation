using MediatR;

namespace AracTakip.Application.Features.Commands.CarEngineType.UpdateCarEngineType
{
    public class UpdateCarEngineTypeCommandRequest : IRequest<UpdateCarEngineTypeCommandResponse>
    {
        public string CarEngineTypeId { get; set; }
        public string CarEngineTypeName { get; set; }
    }
}
