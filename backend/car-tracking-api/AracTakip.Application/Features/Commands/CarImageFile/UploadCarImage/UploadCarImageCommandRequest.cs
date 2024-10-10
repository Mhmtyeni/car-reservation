using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace AracTakip.Application.Features.Commands.CarImageFile.UploadCarImage
{
    public class UploadCarImageCommandRequest : IRequest<UploadCarImageCommandResponse>
    {
        public string CarId { get; set; }
        public string FileDescription { get; set; }
        public IFormFileCollection? Files { get; set; }
    }
}
