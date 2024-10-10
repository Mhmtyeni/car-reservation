using AracTakip.Application.Consts;
using AracTakip.Application.CustomAttributes;
using AracTakip.Application.Enums;
using AracTakip.Application.Features.Commands.CarType.CreateCarType;
using AracTakip.Application.Features.Commands.CarType.RemoveCarType;
using AracTakip.Application.Features.Commands.CarType.UpdateCarType;
using AracTakip.Application.Features.Queries.CarType.GetAllCarType;
using AracTakip.Application.Features.Queries.CarType.GetByIdCarType;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AracTakip.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CarTypesController : ControllerBase
    {
        readonly IMediator _mediator;
        readonly ILogger<CarTypesController> _logger;

        public CarTypesController(IMediator mediator, ILogger<CarTypesController> logger)
        {
            _mediator = mediator;
            _logger = logger;
        }
        [HttpGet("get-all-car-types")]
        public async Task<IActionResult> Get([FromQuery] GetAllCarTypeQueryRequest getAllCarTypeQueryRequest)
        {
            GetAllCarTypeQueryResponse response = await _mediator.Send(getAllCarTypeQueryRequest);
            return Ok(response);
        }
        [HttpGet("get-by-id-car-type/{CarTypeId}")]
        public async Task<IActionResult> Get([FromRoute] GetByIdCarTypeQueryRequest getByIdCarTypeQueryRequest)
        {
            GetByIdCarTypeQueryResponse response = await _mediator.Send(getByIdCarTypeQueryRequest);
            return Ok(response);
        }
        [HttpPost("add-car-type")]
        [Authorize(AuthenticationSchemes = "Admin")]
        [AuthorizeDefinition(Menu = AuthorizeDefinitionConstants.CarTypes, ActionType = ActionType.Writing, Definition = "Araba Tipi Ekle")]
        public async Task<IActionResult> Post(CreateCarTypeCommandRequest createCarTypeCommandRequest)
        {
            CreateCarTypeCommandResponse response = await _mediator.Send(createCarTypeCommandRequest);
            return Ok();
        }
        [HttpPut("update-car-type")]
        [Authorize(AuthenticationSchemes = "Admin")]
        [AuthorizeDefinition(Menu = AuthorizeDefinitionConstants.CarTypes, ActionType = ActionType.Updating, Definition = "Araba Tipi Güncelle")]
        public async Task<IActionResult> Put([FromBody] UpdateCarTypeCommandRequest updateCarTypeCommandRequest)
        {
            UpdateCarTypeCommandResponse response = await _mediator.Send(updateCarTypeCommandRequest);
            return Ok();
        }
        [HttpDelete("delete-car-type/{CarTypeId}")]
        [Authorize(AuthenticationSchemes = "Admin")]
        [AuthorizeDefinition(Menu = AuthorizeDefinitionConstants.CarTypes, ActionType = ActionType.Deleting, Definition = "Araba Tipi Sil")]
        public async Task<IActionResult> Delete([FromRoute] RemoveCarTypeCommandRequest removeCarTypeCommandRequest)
        {
            RemoveCarTypeCommandResponse response = await _mediator.Send(removeCarTypeCommandRequest);
            return Ok();
        }

    }
}
