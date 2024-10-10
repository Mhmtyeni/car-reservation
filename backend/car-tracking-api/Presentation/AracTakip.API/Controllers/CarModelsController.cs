using AracTakip.Application.Consts;
using AracTakip.Application.CustomAttributes;
using AracTakip.Application.Enums;
using AracTakip.Application.Features.Commands.CarModel.CreateCarModel;
using AracTakip.Application.Features.Commands.CarModel.RemoveCarModel;
using AracTakip.Application.Features.Commands.CarModel.UpdateCarModel;
using AracTakip.Application.Features.Queries.CarModel.GetAllCarModel;
using AracTakip.Application.Features.Queries.CarModel.GetAllCarModelByBrandId;
using AracTakip.Application.Features.Queries.CarModel.GetByIdCarModel;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace AracTakip.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CarModelsController : ControllerBase
    {
        readonly IMediator _mediator;
        readonly ILogger<CarModelsController> _logger;

        public CarModelsController(IMediator mediator, ILogger<CarModelsController> logger)
        {
            _mediator = mediator;
            _logger = logger;
        }


        [HttpGet("get-all-car-models")]
        public async Task<IActionResult> Get([FromQuery] GetAllCarModelQueryRequest getAllCarModelQueryRequest)
        {
            GetAllCarModelQueryResponse response = await _mediator.Send(getAllCarModelQueryRequest);
            return Ok(response);
        }


        [HttpGet("get-by-id-car-model/{CarModelId}")]
        public async Task<IActionResult> Get([FromRoute] GetByIdCarModelQueryRequest getByIdCarModelQueryRequest)
        {
            GetByIdCarModelQueryResponse response = await _mediator.Send(getByIdCarModelQueryRequest);
            return Ok(response);
        }
        [HttpGet("get-all-car-model-by-brand-id/{CarBrandId}")]
        public async Task<IActionResult> Get([FromRoute] GetAllCarModelByBrandIdQueryRequest getAllCarModelByBrandIdQueryRequest)
        {
            GetAllCarModelByBrandIdQueryResponse response = await _mediator.Send(getAllCarModelByBrandIdQueryRequest);
            return Ok(response);
        }

        [HttpPost("add-car-model")]
        [Authorize(AuthenticationSchemes = "Admin")]
        [AuthorizeDefinition(Menu = AuthorizeDefinitionConstants.CarModels, ActionType = ActionType.Writing, Definition = "Araba Markası Ekle")]
        public async Task<IActionResult> Post(CreateCarModelCommandRequest createCarModelCommandRequest)
        {
            CreateCarModelCommandResponse response = await _mediator.Send(createCarModelCommandRequest);
            return StatusCode((int)HttpStatusCode.Created);
        }

        [HttpPut("update-car-model")]
        [Authorize(AuthenticationSchemes = "Admin")]
        [AuthorizeDefinition(Menu = AuthorizeDefinitionConstants.CarModels, ActionType = ActionType.Updating, Definition = "Araba Markasını Güncelle")]
        public async Task<IActionResult> Put([FromBody] UpdateCarModelCommandRequest updateCarModelCommandRequest)
        {
            UpdateCarModelCommandResponse response = await _mediator.Send(updateCarModelCommandRequest);
            return Ok();
        }

        [HttpDelete("delete-car-model/{CarModelId}")]
        [Authorize(AuthenticationSchemes = "Admin")]
        [AuthorizeDefinition(Menu = AuthorizeDefinitionConstants.CarModels, ActionType = ActionType.Deleting, Definition = "Araba Markasını Sil")]
        public async Task<IActionResult> Delete([FromRoute] RemoveCarModelCommandRequest removeCarModelCommandRequest)
        {
            RemoveCarModelCommandResponse response = await _mediator.Send(removeCarModelCommandRequest);
            return Ok();
        }
    }
}
