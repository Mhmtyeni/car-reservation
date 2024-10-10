using AracTakip.Application.Consts;
using AracTakip.Application.CustomAttributes;
using AracTakip.Application.Enums;
using AracTakip.Application.Features.Commands.CarCaseType.CreateCarCaseType;
using AracTakip.Application.Features.Commands.CarCaseType.RemoveCarCaseType;
using AracTakip.Application.Features.Commands.CarCaseType.UpdateCarCaseType;
using AracTakip.Application.Features.Queries.CarCaseType.GetAllCarCaseType;
using AracTakip.Application.Features.Queries.CarCaseType.GetByIdCarCaseType;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AracTakip.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CarCaseTypeController : ControllerBase
    {
        readonly IMediator _mediator;
        readonly ILogger<CarCaseTypeController> _logger;

        public CarCaseTypeController(IMediator mediator, ILogger<CarCaseTypeController> logger)
        {
            _mediator = mediator;
            _logger = logger;
        }
        [HttpGet("get-all-car-case-types")]
        public async Task<IActionResult> Get([FromQuery] GetAllCarCaseTypeQueryRequest getAllCarCaseTypeQueryRequest)
        {
            GetAllCarCaseTypeQueryResponse response = await _mediator.Send(getAllCarCaseTypeQueryRequest);
            return Ok(response);
        }

        [HttpGet("get-by-id-car-case-type/{CarCaseTypeId}")]
        public async Task<IActionResult> Get([FromRoute] GetByIdCarCaseTypeQueryRequest getByIdCarCaseTypeQueryRequest)
        {
            GetByIdCarCaseTypeQueryResponse response = await _mediator.Send(getByIdCarCaseTypeQueryRequest);
            return Ok(response);
        }
        [HttpPost("add-car-case-type")]
        [Authorize(AuthenticationSchemes = "Admin")]
        [AuthorizeDefinition(Menu = AuthorizeDefinitionConstants.CarCaseTypes, ActionType = ActionType.Writing, Definition = "Araba Kasa Tipi Ekle")]
        public async Task<IActionResult> Post(CreateCarCaseTypeCommandRequest createCarCaseTypeCommandRequest)
        {
            CreateCarCaseTypeCommandResponse response = await _mediator.Send(createCarCaseTypeCommandRequest);
            return Ok(response);
        }
        [HttpPut("update-car-case-type")]
        [Authorize(AuthenticationSchemes = "Admin")]
        [AuthorizeDefinition(Menu = AuthorizeDefinitionConstants.CarCaseTypes, ActionType = ActionType.Updating, Definition = "Araba Kasa Tipini Güncelle")]
        public async Task<IActionResult> Put([FromBody] UpdateCarCaseTypeCommandRequest updateCarCaseTypeCommandRequest)
        {
            UpdateCarCaseTypeCommandResponse response = await _mediator.Send(updateCarCaseTypeCommandRequest);
            return Ok();
        }

        [HttpDelete("delete-car-case-type/{CarCaseTypeId}")]
        [Authorize(AuthenticationSchemes = "Admin")]
        [AuthorizeDefinition(Menu = AuthorizeDefinitionConstants.CarCaseTypes, ActionType = ActionType.Deleting, Definition = "Araba Kasa Tipini Sil")]
        public async Task<IActionResult> Delete([FromRoute] RemoveCarCaseTypeCommandRequest removeCarCaseTypeCommandRequest)
        {
            RemoveCarCaseTypeCommandResponse response = await _mediator.Send(removeCarCaseTypeCommandRequest);
            return Ok();
        }
    }
}
