using MediatR;

namespace AracTakip.Application.Features.Commands.CarCaseType.UpdateCarCaseType
{
    public class UpdateCarCaseTypeCommandRequest:IRequest<UpdateCarCaseTypeCommandResponse>
    {
        public string CarCaseTypeId { get; set; }
        public string CarCaseTypeName { get; set; }
    }
}
