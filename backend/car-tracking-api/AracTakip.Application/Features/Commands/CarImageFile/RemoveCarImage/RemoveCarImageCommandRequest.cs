using MediatR;

namespace AracTakip.Application.Features.Commands.CarImageFile.RemoveCarImage
{
    public class RemoveCarImageCommandRequest : IRequest<RemoveCarImageCommandResponse>
    {
        public string CarId { get; set; }
        public string? ImageId { get; set; }
    }
}
