using AracTakip.Application.Consts;
using AracTakip.Application.CustomAttributes;
using AracTakip.Application.Enums;
using AracTakip.Application.Features.Commands.CarEngineType.CreateCarEngineType;
using AracTakip.Application.Features.Commands.CarEngineType.RemoveCarEngineType;
using AracTakip.Application.Features.Commands.CarEngineType.UpdateCarEngineType;
using AracTakip.Application.Features.Queries.CarEngineType.GetAllCarEngineType;
using AracTakip.Application.Features.Queries.CarEngineType.GetByIdCarEngineType;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace AracTakip.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CarEngineTypesController : ControllerBase
    {
        readonly IMediator _mediator;
        readonly ILogger<CarEngineTypesController> _logger;

        public CarEngineTypesController(IMediator mediator, ILogger<CarEngineTypesController> logger)
        {
            _mediator = mediator;
            _logger = logger;
        }
        [HttpGet("get-all-car-engine-types")]
        public async Task<IActionResult> Get([FromQuery] GetAllCarEngineTypeQueryRequest getAllCarEngineTypeQueryRequest)
        {
            GetAllCarEngineTypeQueryResponse response = await _mediator.Send(getAllCarEngineTypeQueryRequest);
            return Ok(response);
        }

        [HttpGet("get-by-id-car-engine-type/{CarEngineTypeId}")]
        public async Task<IActionResult> Get([FromRoute] GetByIdCarEngineTypeQueryRequest getByIdCarEngineTypeQueryRequest)
        {
            GetByIdCarEngineTypeQueryResponse response = await _mediator.Send(getByIdCarEngineTypeQueryRequest);
            return Ok(response);
        }

        [HttpPost("add-car-engine-type")]
        [Authorize(AuthenticationSchemes = "Admin")]
        [AuthorizeDefinition(Menu = AuthorizeDefinitionConstants.CarEngineTypes, ActionType = ActionType.Writing, Definition = "Araba Motor Tipi Ekle")]
        public async Task<IActionResult> Post(CreateCarEngineTypeCommandRequest createCarEngineTypeCommandRequest)
        {
            CreateCarEngineTypeCommandResponse response = await _mediator.Send(createCarEngineTypeCommandRequest);
            return StatusCode((int)HttpStatusCode.Created);
        }

        [HttpPut("update-car-engine-type")]
        [Authorize(AuthenticationSchemes = "Admin")]
        [AuthorizeDefinition(Menu = AuthorizeDefinitionConstants.CarEngineTypes, ActionType = ActionType.Updating, Definition = "Araba Motor Tipini Güncelle")]
        public async Task<IActionResult> Put([FromBody] UpdateCarEngineTypeCommandRequest updateCarEngineTypeCommandRequest)
        {
            UpdateCarEngineTypeCommandResponse response = await _mediator.Send(updateCarEngineTypeCommandRequest);
            return Ok();
        }

        [HttpDelete("delete-car-engine-type/{CarEngineTypeId}")]
        [Authorize(AuthenticationSchemes = "Admin")]
        [AuthorizeDefinition(Menu = AuthorizeDefinitionConstants.CarEngineTypes, ActionType = ActionType.Deleting, Definition = "Araba Motor Tipini Sil")]
        public async Task<IActionResult> Delete([FromRoute] RemoveCarEngineTypeCommandRequest removeCarEngineTypeCommandRequest)
        {
            RemoveCarEngineTypeCommandResponse response = await _mediator.Send(removeCarEngineTypeCommandRequest);
            return Ok();
        }
    }
}
