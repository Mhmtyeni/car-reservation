using AracTakip.Application.Consts;
using AracTakip.Application.CustomAttributes;
using AracTakip.Application.Enums;
using AracTakip.Application.Features.Commands.Location.CreateLocation;
using AracTakip.Application.Features.Commands.Location.RemoveLocation;
using AracTakip.Application.Features.Commands.Location.UpdateLocation;
using AracTakip.Application.Features.Queries.Location.GetAllLocation;
using AracTakip.Application.Features.Queries.Location.GetByIdLocation;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AracTakip.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LocationsController : ControllerBase
    {
        readonly IMediator _mediator;
        readonly ILogger<LocationsController> _logger;

        public LocationsController(IMediator mediator, ILogger<LocationsController> logger)
        {
            _mediator = mediator;
            _logger = logger;
        }

        [HttpGet("get-all-locations")]
        public async Task<IActionResult> Get([FromQuery] GetAllLocationQueryRequest getAllLocationQueryRequest)
        {
            GetAllLocationQueryResponse response = await _mediator.Send(getAllLocationQueryRequest);
            return Ok(response);
        }
        [HttpGet("get-by-id-location/{LocationId}")]
        public async Task<IActionResult> Get([FromRoute] GetByIdLocationQueryRequest getByIdLocationQueryRequest)
        {
            GetByIdLocationQueryResponse response = await _mediator.Send(getByIdLocationQueryRequest);
            return Ok(response);
        }
        [HttpPost("add-location")]
        [Authorize(AuthenticationSchemes = "Admin")]
        [AuthorizeDefinition(Menu = AuthorizeDefinitionConstants.Locations, ActionType = ActionType.Writing, Definition = "Lokasyon Ekle")]
        public async Task<IActionResult> Post(CreateLocationCommandRequest createLocationCommandRequest)
        {
            CreateLocationCommandResponse response = await _mediator.Send(createLocationCommandRequest);
            return Ok();
        }
        [HttpPut("update-location")]
        [Authorize(AuthenticationSchemes = "Admin")]
        [AuthorizeDefinition(Menu = AuthorizeDefinitionConstants.Locations, ActionType = ActionType.Updating, Definition = "Lokasyonu Güncelle")]
        public async Task<IActionResult> Put([FromBody] UpdateLocationCommandRequest updateLocationCommandRequest)
        {
            UpdateLocationCommandResponse response = await _mediator.Send(updateLocationCommandRequest);
            return Ok();
        }
        [HttpDelete("delete-location/{LocationId}")]
        [Authorize(AuthenticationSchemes = "Admin")]
        [AuthorizeDefinition(Menu = AuthorizeDefinitionConstants.Locations, ActionType = ActionType.Deleting, Definition = "Lokasyonu Sil")]
        public async Task<IActionResult> Delete([FromRoute] RemoveLocationCommandRequest removeLocationCommandRequest)
        {
            RemoveLocationCommandResponse response = await _mediator.Send(removeLocationCommandRequest);
            return Ok();
        }
    }
}
