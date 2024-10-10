using AracTakip.Application.Consts;
using AracTakip.Application.CustomAttributes;
using AracTakip.Application.Enums;
using AracTakip.Application.Features.Commands.Car.ChangePassive;
using AracTakip.Application.Features.Commands.Car.CreateCar;
using AracTakip.Application.Features.Commands.Car.RemoveCar;
using AracTakip.Application.Features.Commands.Car.UpdateCar;
using AracTakip.Application.Features.Commands.CarImageFile.RemoveCarImage;
using AracTakip.Application.Features.Commands.CarImageFile.UploadCarImage;
using AracTakip.Application.Features.Queries.Car.GetAllAvailableCar;
using AracTakip.Application.Features.Queries.Car.GetAllAvailableCarWithoutLocation;
using AracTakip.Application.Features.Queries.Car.GetAllCar;
using AracTakip.Application.Features.Queries.Car.GetAllCarByPassive;
using AracTakip.Application.Features.Queries.Car.GetAllUnavailableCarWithoutLocation;
using AracTakip.Application.Features.Queries.Car.GetByIdCar;
using AracTakip.Application.Features.Queries.CarModel.GetByIdCarModel;
using AracTakip.Application.Repositories.Car;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AracTakip.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CarsController : ControllerBase
    {
        readonly private ICarWriteRepository _carWriteRepository;
        readonly private ICarReadRepository _carReadRepository;

        readonly IMediator _mediator;

        public CarsController(ICarReadRepository carReadRepository, ICarWriteRepository carWriteRepository, IMediator mediator)
        {
            _carReadRepository = carReadRepository;
            _carWriteRepository = carWriteRepository;
            _mediator = mediator;
        }
        [HttpPost("add-car")]
        [Authorize(AuthenticationSchemes = "Admin")]
        [AuthorizeDefinition(Menu = AuthorizeDefinitionConstants.Cars, ActionType = ActionType.Writing, Definition = "Araba Ekle")]
        public async Task<IActionResult> Post(CreateCarCommandRequest createCarCommandRequest)
        {
            CreateCarCommandResponse response = await _mediator.Send(createCarCommandRequest);
            return Ok(response);
        }
        [HttpGet("get-all-cars")]
        public async Task<IActionResult> Get([FromQuery] GetAllCarQueryRequest getAllCarQueryRequest)
        {
            GetAllCarQueryResponse response = await _mediator.Send(getAllCarQueryRequest);
            return Ok(response);
        }
        [HttpGet("get-all-available-cars")]
        public async Task<IActionResult> Get([FromQuery] GetAllAvailableCarQueryRequest getAllAvailableCarQueryRequest)
        {
            GetAllAvailableCarQueryResponse response = await _mediator.Send(getAllAvailableCarQueryRequest);
            return Ok(response);
        }
        [HttpGet("get-all-unavailable-car-without-location")]
        public async Task<IActionResult> Get([FromQuery] GetAllUnavailableCarWithoutLocationQueryRequest getAllUnavailableCarWithoutLocationQueryRequest)
        {
            GetAllUnavailableCarWithoutLocationQueryResponse response = await _mediator.Send(getAllUnavailableCarWithoutLocationQueryRequest);
            return Ok(response);
        }
        [HttpGet("get-all-available-car-without-location")]
        public async Task<IActionResult> Get([FromQuery] GetAllAvailableCarWithoutLocationQueryRequest getAllAvailableCarWithoutLocationQueryRequest)
        {
            GetAllAvailableCarWithoutLocationQueryResponse response = await _mediator.Send(getAllAvailableCarWithoutLocationQueryRequest);
            return Ok(response);
        }
        [HttpGet("get-by-id-car/{CarId}")]
        public async Task<IActionResult> Get([FromRoute] GetByIdCarQueryRequest getByIdCarQueryRequest)
        {
            GetByIdCarQueryResponse response = await _mediator.Send(getByIdCarQueryRequest);
            return Ok(response);
        }
        [HttpGet("get-all-car-by-passive-or-active")]
        public async Task<IActionResult> Get([FromQuery] GetAllCarByPassiveQueryRequest getAllCarByPassiveQueryRequest)
        {
            GetAllCarByPassiveQueryResponse response = await _mediator.Send(getAllCarByPassiveQueryRequest);
            return Ok(response);
        }
        [HttpPut("change-car-passive")]
        [Authorize(AuthenticationSchemes = "Admin")]
        [AuthorizeDefinition(Menu = AuthorizeDefinitionConstants.Cars, ActionType = ActionType.Updating, Definition = "Arabanın Aktifliğini Güncelle")]
        public async Task<IActionResult> Put([FromQuery] ChangePassiveCommandRequest changePassiveCommandRequest)
        {
            ChangePassiveCommandResponse response = await _mediator.Send(changePassiveCommandRequest);
            return Ok();
        }
        [HttpPut("update-car")]
        [Authorize(AuthenticationSchemes = "Admin")]
        [AuthorizeDefinition(Menu = AuthorizeDefinitionConstants.Cars, ActionType = ActionType.Updating, Definition = "Arabayı Güncelle")]
        public async Task<IActionResult> Put([FromBody] UpdateCarCommandRequest updateCarCommandRequest)
        {
            UpdateCarCommandResponse response = await _mediator.Send(updateCarCommandRequest);
            return Ok();
        }
        [HttpPost("upload-file-car")]
        [Authorize(AuthenticationSchemes = "Admin")]
        [AuthorizeDefinition(Menu = AuthorizeDefinitionConstants.Cars, ActionType = ActionType.Deleting, Definition = "Arabaya Ait Dosyanın(Image) Yüklenmesi")]
        public async Task<IActionResult> Upload([FromQuery] UploadCarImageCommandRequest uploadCarImageCommandRequest)
        {
            uploadCarImageCommandRequest.Files = Request.Form.Files;
            UploadCarImageCommandResponse response = await _mediator.Send(uploadCarImageCommandRequest);
            return Ok();
        }

        [HttpDelete("delete-car/{CarId}")]
        [Authorize(AuthenticationSchemes = "Admin")]
        [AuthorizeDefinition(Menu = AuthorizeDefinitionConstants.CarModels, ActionType = ActionType.Deleting, Definition = "Arabayı Sil")]
        public async Task<IActionResult> Delete([FromRoute] RemoveCarCommandRequest removeCarCommandRequest)
        {
            RemoveCarCommandResponse response = await _mediator.Send(removeCarCommandRequest);
            return Ok();
        }
        [HttpDelete("delete-file-car/{ImageId}")]
        [Authorize(AuthenticationSchemes = "Admin")]
        [AuthorizeDefinition(Menu = AuthorizeDefinitionConstants.Cars, ActionType = ActionType.Deleting, Definition = "Arabaya Ait Dosyanın(Image) Silinmesi")]
        public async Task<IActionResult> DeleteUserImage([FromRoute] RemoveCarImageCommandRequest removeCarImageCommandRequest)
        {
            RemoveCarImageCommandResponse response = await _mediator.Send(removeCarImageCommandRequest);
            return Ok();
        }
    }
}
